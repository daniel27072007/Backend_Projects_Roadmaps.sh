import mongoose from "mongoose";
import { incrementalCounterId } from "./Counter.js";
import { timeFormat } from "../utils/functions.js";
import { expenseUser } from "./User.js"

const expenseTaskSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    ammount: { type: Number, required: true },
    category: { type: String, required: true, enum: {values: [ 'Groceries', 'Leisure', 'Electronics', 'Utilities', 'Clothing', 'Health', 'Others'], message: '{VALUE} is not a valid category'}},
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
export const expenseTask = mongoose.model('expenseTask', expenseTaskSchema)