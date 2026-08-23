import express from 'express'
import { rateLimit } from 'express-rate-limit'
import { slowDown } from 'express-slow-down'
import mongoose, { Schema } from 'mongoose'
import 'dotenv/config'
import bcrypt, { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { timeConvert } from './utils/functions.js'

//connecting to DB
let mongoURI
if(process.env.NODE_ENV === 'test'){
    mongoURI = process.env.MONGO_URI_TASKS_TEST
}
else{
    mongoURI = process.env.MONGO_URI_TASKS
}
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
    authorUserID: {type: mongoose.Schema.Types.ObjectId, ref: 'todoUser', required: true}
},{
    timestamps: true,
    toJSON:{
        transform: function (doc, ret){
            const idDoc = ret.id
            const returnCreatedAt = timeConvert(ret.createdAt)
            const returnUpdatedAt = timeConvert(ret.updatedAt)
            delete ret.__v
            delete ret._id
            delete ret.authorUserID
            delete ret.id
            delete ret.createdAt
            delete ret.updatedAt
            
            return{
                id: idDoc,
                ...ret,
                createdAt: returnCreatedAt,
                updatedAt: returnUpdatedAt
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
    password: {type: String, required: true}
},{
    toJSON:{
        transform: function (doc, ret){
            const userID = ret._id
            delete ret.__v
            delete ret._id
            delete ret.password
            return{
                _id: userID,
                ...ret
            }
        }
    }
})
const todoUser = mongoose.model('todoUser', todoUserSchema)

const refreshTokenSchema = new mongoose.Schema({
    token: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "todoUser", required: true },
    expiresAt: { type: Date, required: true }
},{
    timestamps: true
})
const refreshToken = mongoose.model('refreshToken', refreshTokenSchema)

//creating middleware
//limits and throtlling
const limiterRegisterLogin = rateLimit({
    windowMs: 1000 * 60,
    limit: 5,
    message: 'You can only do 5 request per minute',
    skip: () => process.env.NODE_ENV === 'test'
})
const slowDownRegisterLogin = slowDown({
    windowMs: 1000 * 60,
    delayAfter: 2,
    delayMs: (hit) => hit * 1000,
    maxDelayMs: 5000,
    skip: () => process.env.NODE_ENV === 'test'
})
const limitWrite = rateLimit({
    windowMs: 1000 * 60,
    limit: 30,
    message: 'You can only do 30 request per minute',
    skip: () => process.env.NODE_ENV === 'test'
})
const slowDownWrite = slowDown({
    windowMs: 1000 * 60,
    delayAfter: 10,
    delayMs: (hit) => hit * 500,
    maxDelayMs: 10000,
    skip: () => process.env.NODE_ENV === 'test'
})
const limitGet = rateLimit({
    windowMs: 1000 * 60,
    limit: 100,
    message: 'You can only do 100 request per minute',
    skip: () => process.env.NODE_ENV === 'test'
})
const slowDownGet = slowDown({
    windowMs: 1000 * 60,
    delayAfter: 30,
    delayMs: (hit) => hit * 500,
    maxDelayMs: 20000,
    skip: () => process.env.NODE_ENV === 'test'
})
//token auth
function tokenAuthentication (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader ? authHeader.split(' ')[1] : undefined
    if(!token){
        return res.status(401).json({message: "Unauthorized"})
    }
    try{
        const decoded = jwt.verify(token, process.env.TOKEN_KEY)
        req.userID = decoded.userID
        next()
    }catch(error){
        return res.status(403).json({ error: "Invalid or expired token." })
    }
}

//configuring rotes
const app = express();
app.use(express.json())

//creating rotes
app.post('/register', limiterRegisterLogin, slowDownRegisterLogin, async (req, res)=>{
    try {
        const user = req.body
        const bcryptPassword = await bcrypt.hash(user.password, 10)
        user.password = bcryptPassword
        const newUser = new todoUser(user)
        const savedUser = await newUser.save()
        const token = jwt.sign(
            {userID: savedUser._id},
            process.env.TOKEN_KEY,
            {expiresIn: '2h'}
        )
        res.status(201).json({token: token})
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
        res.status(500).json({ error: 'Internal server error, failed to register user'})
    }
})

app.post('/login', limiterRegisterLogin, slowDownRegisterLogin, async (req, res) => {
    try {
        const user = req.body;
        if (!user.email || !user.password) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Email and password are required.'
            });
        }
        
        const userDatabase = await todoUser.findOne({ email: user.email });
        if (!userDatabase) {
            return res.status(401).json({ error: 'Invalid Email or Password.' });
        }
        
        const isPasswordCorrect = await bcrypt.compare(user.password, userDatabase.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: 'Invalid Email or Password.' });
        }
        
        const token = jwt.sign(
            { userID: userDatabase._id },
            process.env.TOKEN_KEY,
            { expiresIn: process.env.TOKEN_KEY_EXPIRES }
        );
        
        const tokenRefresh = jwt.sign(
            { 
                userID: userDatabase._id,
                nonce: Math.random() // Evita o erro E11000 de duplicidade no MongoDB nos testes
            },
            process.env.REFRESH_TOKEN_KEY,
            { expiresIn: process.env.REFRESH_TOKEN_KEY_EXPIRES }
        );
        
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        
        await refreshToken.create({
            token: tokenRefresh,
            userId: userDatabase._id,
            expiresAt: expiresAt
        }); 
        
        return res.status(200).json({ token: token, refreshToken: tokenRefresh });
    } catch (error) {
        console.error('Something went wrong with the server', error.message);
        return res.status(500).json({ error: 'Internal server error, failed to login user' }); 
    }
});

app.post('/refresh', limiterRegisterLogin, slowDownRegisterLogin, async (req, res) => {
    try {
        const { refreshToken: clientRefreshToken } = req.body;
        
        if (!clientRefreshToken) {
            return res.status(400).json({ error: 'Bad Request', message: 'Refresh token not sent' });
        }
        
        const tokenDoc = await refreshToken.findOne({ token: clientRefreshToken });
        if (!tokenDoc) {
            return res.status(401).json({ error: 'Invalid refresh token' });
        }
        
        const now = new Date();
        if (now > tokenDoc.expiresAt) {
            await refreshToken.deleteOne({ _id: tokenDoc._id });
            return res.status(401).json({ error: 'Refresh token has expired. You must login again' });
        }
        
        // CORREÇÃO AQUI: Rodamos o verify de forma síncrona/direta usando o próprio bloco try/catch
        try {
            const decoded = jwt.verify(clientRefreshToken, process.env.REFRESH_TOKEN_KEY);
            
            const newAccessToken = jwt.sign(
                { userID: decoded.userID },
                process.env.TOKEN_KEY,
                { expiresIn: process.env.TOKEN_KEY_EXPIRES }
            );
            
            return res.status(200).json({ token: newAccessToken });
        } catch (jwtError) {
            return res.status(401).json({ error: 'Invalid or tampered refresh token' });
        }
        
    } catch (error) {
        console.error('Something went wrong with the refresh route', error.message);
        return res.status(500).json({ error: 'Internal server error, failed to refresh token' });
    }
});

app.post('/logout', limiterRegisterLogin, slowDownRegisterLogin, async (req, res) => {
    try {
        const { refreshToken: clientRefreshToken } = req.body;

        if (!clientRefreshToken) {
            return res.status(400).json({ error: 'Bad Request', message: 'Refresh token is required for logout.' });
        }

        const deleteResult = await refreshToken.deleteOne({ token: clientRefreshToken });

        if (deleteResult.deletedCount === 0) {
            return res.status(401).json({ error: 'Invalid or already invalidated refresh token' });
        }

        return res.status(200).json({ message: 'Logged out successfully. Session invalidated.' });

    } catch (error) {
        console.error('Something went wrong with the logout route', error.message);
        return res.status(500).json({ error: 'Internal server error, failed to logout' });
    }
});

app.use(tokenAuthentication)

app.post('/todos',limitWrite, slowDownWrite, async (req, res)=>{
    try{
        const task = {
            id: undefined,
            ...req.body,
            authorUserID: req.userID
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

app.put('/todos/:id',limitWrite, slowDownWrite, async (req, res)=>{
    try{
        const idQuery = Number(req.params.id)
        if(isNaN(idQuery)){
            return res.status(400).json({
                error: 'Bad Request',
                message: 'id put in the url must be a number'
            })
        }
        const newData = req.body
        const task =  await todoTask.findOne({ id: idQuery})
        if(!task){
            return res.status(404).json({error: 'task not found'})
        }
        if(task.authorUserID.toString() !== req.userID){
            return res.status(403).json({message: "forbiden"})
        }
        const updatedTask = await todoTask.findOneAndUpdate(
            {id: idQuery},
            {id: idQuery, ...newData, authorUserID: req.userID},
            {
                returnDocument: 'after',
                overwrite: true,
                runValidators: true
            }
        )
        res.status(200).json(updatedTask)
    }catch(error){
        if(error.name === 'ValidationError'){
            return res.status(400).json({
                error: 'Bad Request',
                message: error.message
            })
        }
        console.error('Something went wrong with the server', error.message)
        res.status(500).json({ error: 'Internal server error, failed to update post'})
    }
})

app.delete('/todos/:id',limitWrite, slowDownWrite, async (req, res)=>{
    try{
        const idQuery = Number(req.params.id)
        if(isNaN(idQuery)){
            return res.status(400).json({
                error: 'Bad Request',
                message: 'id put in the url must be a number'
            })
        }
        const deletedTask = await todoTask.findOneAndDelete({id: idQuery, authorUserID: req.userID})
        if(!deletedTask){
            return res.status(404).json({ error: 'task not found'})
        }
        res.status(204).end()
    }catch(error){
        console.error('something went wrong with the server', error)
        res.status(500).json({error: 'internal sever error, failed to delete the task'});
    }
})

app.get('/todos',limitGet, slowDownGet, async (req, res)=>{
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
    if(limit > 100){
        return res.status(400).json({ error: "The parameter 'limit' cannot be higher than 100."})
    }
    const skip = (page - 1) * limit
    //filter or sorting
    const filter = req.query.filter ?? 'none'
    const sort = req.query.sort ?? 'old'
    if (sort !== 'new' && sort !== 'old') {
        return res.status(400).json({ error: "The parameter 'sort' must be either 'new' or 'old'." })
    }
    const mongooseQuery = { authorUserID: req.userID }
    if(filter !== 'none'){
        const escapedFilter = filter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        mongooseQuery.title = { $regex: escapedFilter, $options: 'i'}
    }
    const mongooseSort = {}
    if(sort === 'new'){
        mongooseSort.createdAt = -1
    }
    else{
        mongooseSort.createdAt = 1
    }
    try{
        const tasksFullNumber = await todoTask.countDocuments(mongooseQuery)
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
        const tasksPage = await todoTask.find(mongooseQuery).sort(mongooseSort).skip(skip).limit(limit)
        return res.status(200).json({
            "data": tasksPage,
            "page": page,
            "limit": limit,
            "total": tasksFullNumber,
            "totalPages": totalTasksPages
        })
    }catch(error){
        console.error('something went wrong with the server', error)
        return res.status(500).json({error: 'internal sever error, failed to get the tasks'});
    }
})

if(process.env.NODE_ENV !== 'test'){
    app.listen(3000, ()=>{
    console.log(`Server running on: http://localhost:3000`)
})
}

export default app;