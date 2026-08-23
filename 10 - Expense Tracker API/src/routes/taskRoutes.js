import { Router } from "express";
import { createExpense, updateExpense, deleteExpense, readExpense } from "../controllers/taskController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { limitWrite, slowDownWrite, limitGet, slowDownGet } from "../middlewares/rateLimiter.js";

const taskRouter = Router()

taskRouter.post('/expenses', slowDownWrite, limitWrite, authMiddleware, createExpense)

taskRouter.put('/expenses/:id', slowDownWrite, limitWrite, authMiddleware, updateExpense)

taskRouter.delete('/expenses/:id', slowDownWrite, limitWrite, authMiddleware, deleteExpense)

taskRouter.get('/expenses', slowDownGet, limitGet, authMiddleware, readExpense)

export default taskRouter