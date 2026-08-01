import express from 'express'
import { rateLimit } from 'express-rate-limit'
import mongoose, { Schema } from 'mongoose'
import 'dotenv/config'

//connecting to DB
const mongoURI = process.env.MONGO_URI_TASKS
mongoose.connect(mongoURI)
    .then(()=>{
        console.log('database connected')
    })
    .catch((error)=>{
        console.error('something went wrong when connecting with the database', error)
    })
//creating mongoose schemas and aplining it
const counterSchema = new mongoose.Schema({
    id: {type: String, required: true, unique: true},
    seq: {type: Number, default: 0}
})
const Counter = mongoose.model('Counter', counterSchema);
const todoTaskSchema = new mongoose.Schema({
    id: {type: Number},
    title: {type: String, required: true},
    description: {type: String, required: true},
},{
    toJSON:{
        transform: function (doc, ret){
            const idDoc = ret.id
            delete ret.__v
            delete ret._id
            delete ret.id
            return{
                id: idDoc,
                ...ret
            }
        }
    }
})
todoTaskSchema.pre('save', async function () {
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
})
const todoTask = mongoose.model('todoTask', todoTaskSchema)

const todoUserSchema=  new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: Number, required: true}
},{
    toJSON:{
        transform: function (doc, ret){
            const userID = ret._id
            delete ret.__v
            delete ret._id
            return{
                _id: userID,
                ...ret
            }
        }
    }
})
const todoUser = mongoose.model('todoUser', todoUserSchema)

//configuring rotes
const app = express();
const limiterDefault = rateLimit({
    windowMs: 1000,
    limit: 2,
    message: 'You can only do 2 request per second'
})
app.use(express.json())
app.use(limiterDefault);

app.post('/register', async (req, res)=>{
    try {
        const user = req.body
        const newUser = new todoUser(user)
        const savedUser = await newUser.save()
        //discover how to use tokens
        res.status(201).json(savedUser)
    }catch(error){
        if(error.name === "ValidationError"){
            console.warn('The data send was incomplete:', error.message);
            return res.status(400).json({
                error: 'Bad Request',
                message: error.message
            })
        }
        if(error.code === 11000){
            if(error.message.includes('name')){
                return res.status(400).json({ error: "this name was already registered" })
            }
            if(error.message.includes('email')){
                return res.status(400).json({ error: "this email was already registered" })
            }
        }
        console.error('Something went wrong with the server', error.message)
        res.status(500).json({ error: 'Internal server error, failed to save task'})
    }
})

app.post('/todos', async (req, res)=>{
    try{
        const task = {
            id: undefined,
            ...req.body
        }
        const newTask = new todoTask(task)
        const savedTask = await newTask.save()
        res.status(201).json(savedTask);
    }catch(error){
        if(error.name === "ValidationError"){
            console.warn('The data send was incomplete:', error.message);
            return res.status(400).json({
                error: 'Bad Request',
                message: error.message
            })
        }
        console.error('Something went wrong with the server', error.message)
        res.status(500).json({ error: 'Internal server error, failed to save task'})
    }
})

app.put('/todos/:id', async (req, res)=>{
    try{
        const idQuery = Number(req.params.id)
        if(isNaN(idQuery)){
            return res.status(400).json({
                error: 'Bad Request',
                message: 'id put in the url must be a number'
            })
        }
        const newData = req.body
        const updatedTask = await todoTask.findOneAndUpdate(
            {id: idQuery},
            {id: idQuery, ...newData},
            {
                returnDocument: 'after',
                overwrite: true,
                runValidators: true
            }
        )
        if(!updatedTask){
            return res.status(404).json({ error: 'task not found'})
        }
        res.status(200).json(updatedTask)
    }catch(error){
        if(error.message === 'ValidationError'){
            return res.status(400).json({
                error: 'Bad Request',
                message: error.message
            })
        }
        console.error('Something went wrong with the server', error.message)
        res.status(500).json({ error: 'Internal server error, failed to update post'})
    }
})

app.delete('/todos/:id', async (req, res)=>{
    try{
        const idQuery = Number(req.params.id)
        if(isNaN(idQuery)){
            return res.status(400).json({
                error: 'Bad Request',
                message: 'id put in the url must be a number'
            })
        }
        const deletedTask = await todoTask.findOneAndDelete({id: idQuery})
        if(!deletedTask){
            return res.status(404).json({ error: 'task not found'})
        }
        res.status(204)
    }catch(error){
        console.error('something went wrong with the server', error)
        res.status(500).json({error: 'internal sever error, failed to delete the task'});
    }
})

app.get('/todos', async (req, res)=>{
    const pageRaw = req.query.page ?? '1'
    const limitRaw = req.query.limit ?? '10'
    const page = parseInt(pageRaw)
    const limit = parseInt(limitRaw)
    if(page <= 0 || isNaN(page)){
            return res.status(400).json({ error: "The parameter 'page' must be a NUMBER and needs to be higher than 0." })
    }
    if(limit <= 0 || isNaN(limit)){
            return res.status(400).json({ error: "The paramter 'limit' must be a NUMBER and needs to be higher than 0." })
    }
    const skip = (page - 1) * limit
    try{
        const tasksFullNumber = await todoTask.countDocuments({})
        let totalTasksPages = Math.ceil(tasksFullNumber/limit)
        if(totalTasksPages === 0){
            totalTasksPages = 1;
        }
        if(page > totalTasksPages){
            return res.status(404).json({
                error: 'Page not found',
                message: 'the page you input is higher than the last page avalible'
            })
        }
        const tasksPage = await todoTask.find({}).skip(skip).limit(limit)
        res.status(200).json({
            "data": tasksPage,
            "page": page,
            "limit": limit,
            "total": tasksFullNumber
        })
    }catch(error){
        console.error('something went wrong with the server', error)
        res.status(500).json({error: 'internal sever error, failed to get the tasks'});
    }
})

app.listen(3000, ()=>{
    console.log(`Server running on: http://localhost:3000`)
})