import express from 'express'
import { rateLimit } from 'express-rate-limit'
import mongoose from 'mongoose';
import 'dotenv/config'

const app = express();
const limiter = rateLimit({
    windowMs: 1000,
    limit: 2,
    message: {error: 'You reach the limit of request. You can only do 2 per second'}
});

app.use(express.json());
app.use(limiter);

const mongoUri = process.env.MONGO_URI

mongoose.connect(mongoUri)
    .then(()=>{
        console.log('conect with success to the cluster!')
    })
    .catch((error)=>{
        console.error('cannot connect with cluster ', error)
    });

const counterSchema = new mongoose.Schema({
    id: {type: String, required: true, unique: true},
    seq: {type: Number, default: 0}
});

const Counter = mongoose.model('Counter', counterSchema);

const schemaPOST = new mongoose.Schema({
    id: {type: Number},
    title: {type: String, required: true},
    content: {type: String, required: true},
    category: {type: String, required: true},
    tags: {
        type: [String],
        validate: {
            validator: function(array){
                return array && array.length > 0;
            },
            message: 'The post need to have at least one tag'
        }
    }
},{
    timestamps:true,
    toJSON:{
        transform: function (doc, ret) {
            const idDoc = ret.id
            delete ret._id
            delete ret.__v
            delete ret.id
            return {
                id: idDoc,
                ...ret
            }
        }
    }
});

schemaPOST.pre('save', async function () {
    const documentoPost = this;
    if (documentoPost.isNew) {
        try {
            const contadorAtualizado = await Counter.findOneAndUpdate(
                { id: 'id' },
                { $inc: { seq: 1 } },
                { returnDocument: 'after', upsert: true }
            );
            documentoPost.id = contadorAtualizado.seq;
        } catch (error) {
            throw error;
        }
    }
});

const post = mongoose.model('Post', schemaPOST);

app.post('/posts', async (req, res)=>{
    console.log('post found');
    try{
        const postData = {
            id: undefined,
            ...req.body
        }
        const newPost = new post(postData);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
        console.log('post saved in the database!')
    }
    catch(error){
        if(error.name === 'ValidationError'){
            console.warn('The data send was incomplete:', error.message);
            return res.status(400).json({
                error: 'Bad Request',
                message: error.message
            });
        }
        console.error('Something gone wrong with the server: ', error);
        res.status(500).json({error: 'Internal server error, failed to save post'})
    }
});

app.put('/posts/:id', async (req, res)=>{
    console.log('post/id found')
    try{
        const idQuery =  Number(req.params.id);
        if(isNaN(idQuery)){
            return res.status(400).json({
                error: 'Bad Request',
                message: 'The id parameter must be a valid number'
            })
        }
        const newData = req.body
        const updatedPost = await post.findOneAndUpdate(
            {id: idQuery},
            {id: idQuery, ...newData},
            {
                returnDocument: 'after',
                overwrite: true,
                runValidators: true
            }
        )
        if(!updatedPost){
            return res.status(404).json({ error: 'cannot find this post'});
        }
        res.status(200).json(updatedPost);
        console.log('post updated in the database!')
    }catch(error){
        if(error.name === 'ValidationError'){
            return res.status(400).json({
                error: 'Bad Request',
                message: error.message
            })
        }
        console.error('Something went wrong with the server', error);
        res.status(500).json({error: 'internal sever error, failed to update the post'});
    }
})

app.delete('/posts/:id', async (req, res)=>{
    const idQuery = Number(req.params.id)
    if(isNaN(idQuery)){
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The id must be a number'
        })
    }
    try{
        const deletedPost = await post.findOneAndDelete(
            {id: idQuery}
        )
        if(!deletedPost){
            return res.status(404).json({message: 'post not found' })
        }
        res.status(204).json({message:'the blog post was successfully deleted'})
    }catch(error){
        console.error('something went wrong with the server', error)
        res.status(500).json({error: 'internal sever error, failed to delete the post'});
    }
    
})

app.get('/posts/:id', async (req, res)=>{
    const idQuery = Number(req.params.id)
    if(isNaN(idQuery)){
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The id must be a number'
        })
    }
    try{
        const postSearchedDB = await post.findOne({id: idQuery})
        if(!postSearchedDB){
            return res.status(404).json({message: 'post not found'})
        }
        res.status(200).json(postSearchedDB)   
    }catch(error){
        console.error('something went wrong with the server', error)
        res.status(500).json({error: 'internal sever error, failed to get the post'});
    }
})

app.get('/posts', async (req, res)=>{
    if(Object.keys(req.query).length > 0){
        try{
            const term = req.query
            if(!term){
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'You must put a term to filter'
                })
            }
            const everyPost = await post.find({})
            res.status(200).json(everyPost)
        }catch(error){
            console.error('something went wrong with the server', error)
            res.status(500).json({error: 'internal sever error, failed to get the post'});
        }
    }
    else{
        try{
            const everyPost = await post.find({})
            res.status(200).json(everyPost)
        }catch(error){
            console.error('something went wrong with the server', error)
            res.status(500).json({error: 'internal sever error, failed to get the post'});
        }
    }
})

const PORT = 3000
app.listen(PORT, ()=>{
    console.log(`Server runnig on: http://localhost:${PORT}`)
});