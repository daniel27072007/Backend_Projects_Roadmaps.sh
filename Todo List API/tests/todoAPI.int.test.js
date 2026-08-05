import request  from 'supertest'
import mongoose from 'mongoose'
import app from '../index.js'

describe('Intergration Test - Authentication', ()=>{

    afterAll(async ()=>{
        await mongoose.connection.close()
    })

    beforeEach(async ()=>{
        if(mongoose.connection.db && mongoose.connection.collections['todousers']){
            await mongoose.connection.collections['todousers'].deleteMany({ email: {$ne : 'bot@gmail.com'}})
        }
    })

    //testing register 201 and 400
    test('Should register a user with success', async ()=>{
        const randomNumber6Digits = Math.floor(Math.random()*900000)+100000
        const response = await request(app).post('/register').send({
            name: randomNumber6Digits,
            email: `bot${randomNumber6Digits}@gmail.com`,
            password: "bot"
        })
        console.log('response from API:', response.body)
        expect(response.status).toBe(201)
    })

    test('Should not register a user, name or email already used', async ()=>{
        const response = await request(app).post('/register').send({
            name: "bot",
            email: "bot@gmail.com",
            password: "bot"
        })
        console.log('response from API:', response.body)
        expect(response.status).toBe(400)
    })

    //testing login 200, 400, 401
    test('Should login the user with success', async ()=>{
        const response = await request(app).post('/login').send({
            name: "bot",
            email: "bot@gmail.com",
            password: "bot"
        })
        console.log('response from API:', response.body)
        expect(response.status).toBe(200)
    })

    test.each([
        { email: 'bot@gmail.com'},
        { password: 'bot' }
        ])('Should not login the user for bad request', async (missingPayload)=>{
        const response = await request(app).post('/login').send(missingPayload)
        console.log('response from API:', response.body)
        expect(response.status).toBe(400)
    })

    test.each([
        { email: 'bot@gmail.com', password: 'tob' },
        { email: 'tob@gmail.com', password: 'bot'}
    ])('Should not login the user for invalid email or password', async (invalidLogin)=>{
        const response = await request(app).post('/login').send(invalidLogin)
        console.log('response from API:', response.body)
        expect(response.status).toBe(401)
    })
})