import mongoose from "mongoose";
import { expenseUser } from "./User.js";

const refreshTokenSchema = new mongoose.Schema({
    refreshToken: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'expenseUser', required: true},
    expiresAt: { type: Date, required: true }
},{
    timestamps: true
})

refreshTokenSchema.index({ expiresIn: 1 }, { expireAfterSeconds: 0 });

export const refreshToken = mongoose.model('refreshToken', refreshTokenSchema)