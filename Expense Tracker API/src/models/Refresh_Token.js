import mongoose from "mongoose";
import { expenseUser } from "./User";

const refreshTokenSchema = new mongoose.Schema({
    refreshToken: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'expenseUser', required: true},
    expiresIn: { type: Date, required: true }
},{
    timestamps: true
})

export const refreshToken = mongoose.model('refreshToken', refreshTokenSchema)