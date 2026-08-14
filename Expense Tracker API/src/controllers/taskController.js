import mongoose from 'mongoose'
import { expenseTask } from '../models/Task.js'

export const createExpense = async (req, res)=>{
    try{
        const data = {
            id: undefined,
            ...req.body,
            authorId: req.userId
        }
        const newExpense = expenseTask(data)
        const savedExpense = await newExpense.save()
        return res.status(201).json(savedExpense)
    } catch (error) {
        if(error.name === "ValidationError"){
            return res.status(400).json({ error: 'Bad Request', message: error.message })
        }
        return res.status(500).json({ error: 'Internal server error, failed to save expense'})
    }
}

export const updateExpense = async (req, res)=>{
    try{
        const idQuery = req.params.id
        if(isNaN(idQuery)){
            return res.status(400).json({ error: "Bad Request",  message: "The id must be a number"})
        }
        if(idQuery < 0){
            return res.status(400).json({ error: "Bad Request",  message: "The id must be a number higher than 0"})
        }
        const newData = req.body
        const data = await expenseTask.findOne({ id: idQuery })
        if(!data){
            return res.status(404).json({ error: "Expense not found" })
        }
        if(data.authorId !== req.userId){
            return res.status(403).json({ error: "Forbiden" })            
        }
        const updatedExpense = await expenseTask.findByIdAndUpdate(
            {id: idQuery},
            {id: idQuery, ...newData, authorId: req.userId},
            {returnDocument: 'after', overwrite: true, runValidators: true}
        )
        return res.status(200).json(updatedExpense)
    } catch (error) {
        if(error.name === 'ValidationError'){
            return res.status(400).json({
                error: 'Bad Request',
                message: error.message
            })
        }
        res.status(500).json({ error: 'Internal server error, failed to update the expense'})
    }
}

export const deleteExpense = async (req, res)=>{
    try {
        const idQuery = req.params.id
        if(isNaN(idQuery)){
            return res.status(400).json({ error: "Bad Request",  message: "The id must be a number"})
        }
        if(idQuery < 0){
            return res.status(400).json({ error: "Bad Request",  message: "The id must be a number higher than 0"})
        }
        const deletedExpense = await expenseTask.findOneAndDelete({id: idQuery, authorUserID: req.userID})
        if(!deleteExpense){
            return res.status(404).json({ error: "Expense not found"})
        }
        return res.status(401).json({ message: 'Task deleted with successs' })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error, failed to delete the expense'})
    }
}

export const readExpense = async (req, res)=>{
    // checking and creating page, limit and skip varibles
    const pageString = req.query.page ?? '1'
    const limitString = req.query.limit ?? '10'
    const page = parseInt(pageString)
    const limit = parseInt(limitString)
    if(page <= 0 || isNaN(page)){
        return res.status(400).json({ error: "Bad Request", message: "Params 'page' must be a number and be higher than 0"})
    }
    if(limit <= 0 || isNaN(limit)){
        return res.status(400).json({ error: "Bad Request", message: "Params 'limit' must be a number and be higher than 0"})
    }
    if(limit > 100){
        return res.status(400).json({ error: "Bad Request", message: "Params 'limit' must be lower than 100"})
    }
    const skip = (page-1) * limit
    // checking / adding filter and sort
    const filter = req.query.filter ?? 'none'
    const sort = req.query.sort ?? 'old'
    if(sort !== 'new' || sort !== 'old'){
        return res.status(400).json({ error: "The parameter 'sort' must be either 'new' or 'old'." })
    }
    const mongooseQuery = { authorId: req.userId }
    if(filter !== 'none'){
        const escapedFilter = filter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        mongooseQuery.title = { $regex: escapedFilter, $options: 'i'}
    }
    const mongooseSort = {}
    if(sort === 'new'){
        mongooseSort.createAt = -1
    }
    else{
        mongooseSort.createAt = 1
    }
    try {
        const expenseFullNumber = await expenseTask.countDocuments(mongooseQuery)
        let totalExpensePages = Math.celi(expenseFullNumber/limit)
        if(totalExpensePages === 0){
            totalExpensePages = 1
        }
        if(page > totalExpensePages){
            return res.status(404).json({ error: 'page not found', message: 'you selected a page higher than the actual number of pages'})
        }
        const expenseData = await expenseTask.find(mongooseQuery).sort(mongooseSort).skip(skip).limit(limit)
        return res.status(200).json({
            'expense-page': expenseData,
            'page': page,
            'limit': limit,
            'total-expenses': expenseFullNumber,
            'total-pages': totalExpensePages
        })
    } catch (error) {
        
    }
}