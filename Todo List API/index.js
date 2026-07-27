import express from 'express'
import { rateLimit } from 'express-rate-limit'
import mongoose, { Schema } from 'mongoose'
import 'dotenv/config'

const mongoURI = process.env.MONGO_URI_TASKS
mongoose.connect(mongoURI)
    .then(()=>{
        console.log('database connected')
    })
    .catch((error)=>{
        console.error('something went wrong when connecting with the database', error)
    })
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
    timestamps: true,
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


const app = express();
const limiterDefault = rateLimit({
    windowMs: 1000,
    limit: 2,
    message: 'You can only do 2 request per second'
})
app.use(express.json())
app.use(limiterDefault);

app.listen(3000, ()=>{
    console.log(`Server running on: http://localhost:3000`)
})