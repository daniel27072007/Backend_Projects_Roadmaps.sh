import { expenseUser } from '../models/User.js'
import { refreshToken } from '../models/Refresh_Token.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import mongoose from 'mongoose'

export const registerUser = async (req, res)=>{
    try {
        const user = req.body
        if (!user.name || !user.email || !user.password) {
            return res.status(400).json({ 
                error: 'Bad Request', 
                message: 'Name, Email and Password are required' 
            });
        }
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
        const expiresAt = new Date()
        expiresAt.setHours(expiresAt.getHours() + 2)
        await refreshToken.create({
            refreshToken: tokenRefresh,
            userId: savedUser._id,
            expiresAt: expiresAt
        })
        return res.status(201).json({'access-token': tokenAccess, 'refresh-token': tokenRefresh})
    } catch (error) {
        if(error.code === 11000){
            if(error.message.includes('name')){
                return res.status(400).json({ error: 'Bad Request', message: 'This name was already registered' })
            }
            if(error.message.includes('email')){
                return res.status(400).json({ error: 'Bad Request', message: 'This email was already registered' })
            }
        }
        res.status(500).json({ error: error, message: 'something wrong happend when registring the user'})
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
        const expiresAt = new Date()
        expiresAt.setHours(expiresAt.getHours() + 2)
        await refreshToken.create({
            refreshToken: tokenRefresh,
            userId: userDatabase._id,
            expiresAt: expiresAt
        })
        return res.status(200).json({ 'access-token': tokenAccess, 'refresh-token': tokenRefresh})
    } catch (error) {
        if(error.name === "ValidationError"){
            return res.status(400).json({ error: 'Bad Request', message: error.message})
        }
        res.status(500).json({ error: 'Something went wrong with the server when login the user.', error})
    }
}

export const refreshUser = async (req, res)=>{
    try {
        const { refreshToken: clientRefreshToken } = req.body;
        if(!clientRefreshToken){
            return res.status(400).json({ error: 'Bad Request', message: 'Refresh token not sent'})
        }
        const refreshTokenDoc = await refreshToken.findOne({ refreshToken: clientRefreshToken})
        if(!refreshTokenDoc){
            return res.status(401).json({ error: 'Invalid refresh token' });
        }
        const now = new Date()
        if(now > refreshTokenDoc.expiresAt){
            await refreshToken.deleteOne({ _id: refreshTokenDoc._id })
            return res.status(401).json({ error: 'Refresh token has expired. You must login again' });
        }
        try {
            const decoded = jwt.verify(clientRefreshToken, process.env.REFRESH_TOKEN_KEY)
            const accessToken = jwt.sign(
                {userId: decoded.userId},
                process.env.ACCESS_TOKEN_KEY,
                {expiresIn: process.env.ACCESS_TOKEN_EXPIRES}
            )
            return res.status(200).json({ 'access-token': accessToken })
        } catch (errorJwt) {
            return res.status(401).json({ error: 'Invalid or tampered refresh token' });
        }   
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong with the server when refreshing access token of the user.', error})
    }
}

export const logoutUser = async (req, res)=>{
    try{
        const { refreshToken: clientRefreshToken } = req.body
        if(!clientRefreshToken){
            return res.status(400).json({ error: 'Bad Request', message: 'Refresh token not sent'})
        }
        const refreshTokenToDelete = await refreshToken.deleteOne({ refreshToken: clientRefreshToken })
        if(refreshTokenToDelete.deletedCount === 0){
            return res.status(401).json({ error: 'Invalid or already invalidated refresh token' });
        }
        return res.status(200).json({ message: 'Logged out successfully. Session invalidated.' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error, failed to logout' }); 
    }
}