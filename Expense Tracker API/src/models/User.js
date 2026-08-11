import mongoose from "mongoose";

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
export const expenseUser = mongoose.model('expenseUser', expenseUserSchema)