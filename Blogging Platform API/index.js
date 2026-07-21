import express from 'express'
import { rateLimit } from 'express-rate-limit'
import mongoose from 'mongoose'
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

const schemaPOST = new mongoose.Schema({
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
    timestamps:true
});

const post = mongoose.model('Post', schemaPOST);

app.post('/post', async (req, res)=>{
    console.log('post rechead');
    try{
        const newPost = new post(req.body);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
        console.log('post saved in the data base!')
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

const PORT = 3000
app.listen(PORT, ()=>{
    console.log(`Server runnig on: http://localhost:${PORT}`)
});