import { expenseUser } from '../models/User.js'
import { refreshToken } from '../models/Refresh_Token.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import mongoose from 'mongoose'

export const registerUser = async (req, res)=>{
    try {
        const user = req.body
        const bcryptPassword = await bcrypt.hash(user.password, 10)
        const updatedUser = {
            name: user.name,
            email: user.email,
            password: bcryptPassword
        }
        const registeredUser = new expenseUser(updatedUser)
        const savedUser = await registeredUser.save()
        const tokenAccess = jwt.sign(
            {userId: savedUser._id},
            process.env.ACCESS_TOKEN_KEY,
            {expiresIn: process.env.ACCESS_TOKEN_EXPIRES}
        )
        const tokenRefresh = jwt.sign(
            {userId: savedUser._id},
            process.env.REFRESH_TOKEN_KEY,
            {expiresIn: process.env.REFRESH_TOKEN_EXPIRES}
        )
        const expiresIn = new Date()
        expiresIn.setDate(expiresIn.getDate() + 7)
        await refreshToken.create({
            refreshToken: tokenRefresh,
            userId: savedUser._id,
            expiresIn: expiresIn
        })
        return res.status(201).json({'access-token': tokenAccess, 'refresh-token': tokenRefresh})
    } catch (error) {
        if(error.name === 'ValidationError'){
            return res.status(400).json({ error: 'Bad Request', message: 'Name, Email and Password are required' })
        }
        if(error.code === 11000){
            if(error.message.includes('name')){
                return res.status(400).json({ error: 'Bad Request', message: 'This name was already registered' })
            }
            if(error.message.includes('email')){
                return res.status(400).json({ error: 'Bad Request', message: 'This email was already registered' })
            }
        }
        res.status(500).json({ error: 'something wrong happend when registring the user', error})
    }
}

export const loginUser = async (req, res)=>{
    try {
        const user = req.body
        if(!user.email || !user.password){
            return res.status(400).json({ error: 'Bad Request', message: 'Email and password are required.' })
        }
        const userDatabase = await expenseUser.findOne({ email: user.email })
        if(!userDatabase){
            return res.status(401).json({ error: 'Invalid Email or Password.' });
        }
        const isPasswordValid = await bcrypt.compare(user.password, userDatabase.password)
        if(!isPasswordValid){
            return res.status(401).json({ error: 'Invalid Email or Password.' });         
        }
        const tokenAccess = jwt.sign(
            { userId: userDatabase._id },
            process.env.ACCESS_TOKEN_KEY,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRES }
        )
        const tokenRefresh = jwt.sign(
            { userId: userDatabase._id },
            process.env.REFRESH_TOKEN_KEY,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRES }
        )
        await refreshToken.deleteMany({ userId: userDatabase._id })
        const expiresIn = new Date()
        expiresIn.setDate(expiresIn.getDate() + 7)
        await refreshToken.create({
            refreshToken: tokenRefresh,
            userId: userDatabase._id,
            expiresIn: expiresIn
        })
        return res.status(200).json({ 'access-token': tokenAccess, 'refresh-token': tokenRefresh})
    } catch (error) {
        if(error.name === "ValidationError"){
            return res.status(400).json({ error: 'Bad Request', message: error.message})
        }
        res.status(500).json({ error: 'Something went wrong with the server when login the user.', error})
    }
}