// importing dependencies
import express from 'express'
import { rateLimit } from 'express-rate-limit'
import { slowDown } from 'express-slow-down'
import mongoose, { model } from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import 'dotenv/config'
import { type } from 'node:os'

//functions
const timeFormat = (dateToBeFormated) => {
    const date = new Date(dateToBeFormated)
    const dateFormated = date.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).replace(',', '')
    return dateFormated
}

//connecting to the database
let mongoURI
if(process.env.NODE_ENV === "test"){
    mongoURI = process.env.URI_MONGODB_TESTS
}
else{
    mongoURI = process.env.URI_MONGODB
}
mongoose.connect(mongoURI)
    .then(()=>{console.log("database conected")})
    .catch((error)=>{console.error("something went wrong while trying to connect with the database", error)})

//creating and configuring mongoose models and schemas
const expenseUserSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true}
},{
    toJSON:{
        transform: function (doc, ret) {
            const userId = doc._id
            delete ret.__v
            delete ret._id
            delete ret.password
            return {
                _id: userId,
                ...ret
            }
        }
    }
})
const expenseUser = mongoose.model('expenseUser', expenseUserSchema)
const incrementalCounterIdSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    seq: { type: Number, default: 0}
})
const incrementalCounterId = mongoose.model('incrementalCounterId', incrementalCounterIdSchema)
const expenseTaskSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    ammount: { type: Number, required: true },
    category: { type: String, required: true},//see how to force the user to pick at least one of the listed
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'expenseUser', required: true}
},{
    timestamps:true,
    toJSON: {
        transform: function (doc, ret) {
            const taskId = doc.id
            const createdAtFormated = timeFormat(ret.createdAt)
            const updatedAtFormated = timeFormat(ret.updatedAt)
            const authorId = doc.authorId
            delete ret.id
            delete ret._id
            delete ret.__v
            delete ret.createdAt
            delete ret.updatedAt
            delete ret.authorId
            return {
                id: taskId,
                ...ret,
                createdAt: createdAtFormated,
                updatedAt: updatedAtFormated,
                authorId: authorId
            }
        }
    }
})
expenseTaskSchema.pre('save', async function () {
    const documentoPost = this;
    if (documentoPost.isNew) {
        try {
            const contadorAtualizado = await incrementalCounterId.findOneAndUpdate(
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
const expenseTask = mongoose.model('expenseTask', expenseTaskSchema)