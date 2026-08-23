import { Router } from "express";
import { registerUser, loginUser, refreshUser, logoutUser } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { limiterAuthorization, slowDownAuthorization } from "../middlewares/rateLimiter.js" 

const authRouter = Router()

authRouter.post('/register', slowDownAuthorization, limiterAuthorization, registerUser)

authRouter.post('/login', slowDownAuthorization, limiterAuthorization, loginUser)

authRouter.post('/refresh', slowDownAuthorization, limiterAuthorization, refreshUser)

authRouter.post('/logout', slowDownAuthorization, limiterAuthorization, authMiddleware, logoutUser)

export default authRouter