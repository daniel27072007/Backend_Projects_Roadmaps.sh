import request  from 'supertest'
import mongoose from 'mongoose'
import app from '../index.js'

describe('Intergration Test - Full API ', ()=>{

    afterAll(async ()=>{
        await mongoose.connection.close()
    })

    beforeEach(async ()=>{
        if(mongoose.connection.db && mongoose.connection.collections['todousers']){
            await mongoose.connection.collections['todousers'].deleteMany({ email: {$nin : ['bot@gmail.com', 'bot1@gmail.com']}})
        }
    })

    describe('Register and Login features', ()=>{
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

    describe('POST /todos', ()=>{
        //testing 201, 400, 401, 403
        test('Should post a tasks with success', async ()=>{
            //login
            const loginResponse = await request(app).post('/login').send({
                email: "bot@gmail.com",
                password: "bot"
            })
            const token = loginResponse.body.token
            //creating task
            const randomNumber6Digits = Math.floor(Math.random()*900000)+100000
            const response = await request(app).post('/todos').set('Authorization', `Bearer ${token}`).send({
                title: `Task ${randomNumber6Digits}`,
                description: `${randomNumber6Digits}`
            })
            console.log('response from API:', response.body)
            expect(response.status).toBe(201)
        })

        test.each([
            {}, { title: "test" }, { description: "test" }
        ])('Should give a bad request for missing payload', async (missingPayload)=>{
            //login
            const loginResponse = await request(app).post('/login').send({
                email: "bot@gmail.com",
                password: "bot"
            })
            const token = loginResponse.body.token
            //creating task
            const response = await request(app).post('/todos').set('Authorization', `Bearer ${token}`).send(missingPayload)
            console.log('response from API:', response.body)
            expect(response.status).toBe(400)
        })

        test('Should not authorize because a undenfied token', async ()=>{
            //creating task
            const randomNumber6Digits = Math.floor(Math.random()*900000)+100000
            const response = await request(app).post('/todos').send({
                title: `Task ${randomNumber6Digits}`,
                description: `${randomNumber6Digits}`
            })
            console.log('response from API:', response.body)
            expect(response.status).toBe(401)
        })

        test('Should not authorize because a invalid or expired token', async ()=>{
            //login
            const loginResponse = await request(app).post('/login').send({
                email: "bot@gmail.com",
                password: "bot"
            })
            const token = loginResponse.token
            //creating task
            const randomNumber6Digits = Math.floor(Math.random()*900000)+100000
            const response = await request(app).post('/todos').set('Authorization', `Bearer ${token}`).send({
                title: `Task ${randomNumber6Digits}`,
                description: `${randomNumber6Digits}`
            })
            console.log('response from API:', response.body)
            expect(response.status).toBe(403)
        })
    })

    describe('PUT /todos', ()=>{
        //testing 200, 400, 401, 403, 404
        test('Should update the task with success', async ()=>{
            //login
            const loginResponse = await request(app).post('/login').send({
                email: "bot1@gmail.com",
                password: "bot"
            })
            const token = loginResponse.body.token
            //updating
            const randomNumber6Digits = Math.floor(Math.random()*900000)+100000
            const response = await request(app).put('/todos/12').set('Authorization', `Bearer ${token}`).send({
                title: `TaskUpdated ${randomNumber6Digits}`,
                description: `${randomNumber6Digits}`
            })
            console.log('response from API:', response.body)
            expect(response.status).toBe(200)
        })

        test('Should give a bad request for NaN in the id paramter', async ()=>{
            //login
            const loginResponse = await request(app).post('/login').send({
                email: "bot@gmail.com",
                password: "bot"
            })
            const token = loginResponse.body.token
            //updating
            const randomNumber6Digits = Math.floor(Math.random()*900000)+100000
            const response = await request(app).put('/todos/test').set('Authorization', `Bearer ${token}`).send({
                title: `TaskUpdated ${randomNumber6Digits}`,
                description: `${randomNumber6Digits}`
            })
            console.log('response from API:', response.body)
            expect(response.status).toBe(400)
        })

        test('Should not authorize because a undenfied token', async ()=>{
            //updating task
            const randomNumber6Digits = Math.floor(Math.random()*900000)+100000
            const response = await request(app).put('/todos/1').send({
                title: `Task ${randomNumber6Digits}`,
                description: `${randomNumber6Digits}`
            })
            console.log('response from API:', response.body)
            expect(response.status).toBe(401)
        })

        test('Should not authorize because a invalid or expired token', async ()=>{
            //login
            const loginResponse = await request(app).post('/login').send({
                email: "bot@gmail.com",
                password: "bot"
            })
            const token = 'dhjasoçnu$d298n897172tgb'
            //updating
            const randomNumber6Digits = Math.floor(Math.random()*900000)+100000
            const response = await request(app).put('/todos/1').set('Authorization', `Bearer ${token}`).send({
                title: `TaskUpdated ${randomNumber6Digits}`,
                description: `${randomNumber6Digits}`
            })
            console.log('response from API:', response.body)
            expect(response.status).toBe(403)
        })

        test('Should forbid me for trying to update another person task', async ()=>{
            const loginResponse = await request(app).post('/login').send({
                email: "bot@gmail.com",
                password: "bot"
            })
            const token = loginResponse.body.token
            const randomNumber6Digits = Math.floor(Math.random()*900000)+100000
            const response = await request(app).put('/todos/7').set('Authorization', `Bearer ${token}`).send({
                title: `TaskUpdated ${randomNumber6Digits}`,
                description: `${randomNumber6Digits}`
            })
            console.log('response from API:', response.body)
            expect(response.status).toBe(403)
        })

        test('Should not found the task because that id dosent exist', async ()=>{
            //login
            const loginResponse = await request(app).post('/login').send({
                email: "bot@gmail.com",
                password: "bot"
            })
            const token = loginResponse.body.token
            //updating
            const randomNumber6Digits = Math.floor(Math.random()*900000)+100000
            const response = await request(app).put('/todos/87634242').set('Authorization', `Bearer ${token}`).send({
                title: `TaskUpdated ${randomNumber6Digits}`,
                description: `${randomNumber6Digits}`
            })
            console.log('response from API:', response.body)
            expect(response.status).toBe(404)
        })
    })

    describe('DELETE /todos', ()=>{
        //testing 401, 403 'invalid token', 403 'forbiden', 204 and 404
        test('Should not authorize because a undenfied token', async ()=>{
            //deleting task
            const response = await request(app).delete('/todos/1')
            console.log('response from API:', response.body)
            expect(response.status).toBe(401)
        })

        test('Should not authorize because a invalid or expired token', async ()=>{
            //login
            const loginResponse = await request(app).post('/login').send({
                email: "bot1@gmail.com",
                password: "bot"
            })
            const token = '9327940273948ond02¨$d8cy98'
            //deleting
            const response = await request(app).delete('/todos/134').set('Authorization', `Bearer ${token}`)
            console.log('response from API:', response.body)
            expect(response.status).toBe(403)
        })

        test('Should forbid me for trying to delete another person task', async () => {
            const loginA = await request(app).post('/login').send({
                email: "bot@gmail.com",
                password: "bot"
            });
            const tokenA = loginA.body.token;

            const taskResponse = await request(app)
                .post('/todos')
                .set('Authorization', `Bearer ${tokenA}`)
                .send({ 
                    title: "Tarefa Privada do Bot", 
                    description: "Ninguém pode apagar" 
                })
            const taskID = taskResponse.body.id;
            const loginB = await request(app).post('/login').send({
                email: "bot1@gmail.com",
                password: "bot"
            });
            const tokenB = loginB.body.token;
            const response = await request(app)
                .delete(`/todos/${taskID}`)
                .set('Authorization', `Bearer ${tokenB}`);
            console.log('response from API:', response.body);
            expect(response.status).toBe(404);
        });

        test('Should delete the user task with success', async ()=>{
            //login
            const loginResponse = await request(app).post('/login').send({
                email: "bot@gmail.com",
                password: "bot"
            })
            const token = loginResponse.body.token
            //creating task to delete and get the id
            const randomNumber6Digits = Math.floor(Math.random()*900000)+100000
            const responseTask = await request(app).post('/todos').set('Authorization', `Bearer ${token}`).send({
                title: `Task ${randomNumber6Digits}`,
                description: `${randomNumber6Digits}`
            })
            const taskID = responseTask.body.id
            //deleting
            const response = await request(app).delete(`/todos/${taskID}`).set('Authorization', `Bearer ${token}`)
            console.log('response from API:', response.body)
            expect(response.status).toBe(204)
        })

        test('Should not found the task because that id dosent exist', async ()=>{
            //login
            const loginResponse = await request(app).post('/login').send({
                email: "bot@gmail.com",
                password: "bot"
            })
            const token = loginResponse.body.token
            //deleting
            const response = await request(app).delete('/todos/14932467289').set('Authorization', `Bearer ${token}`)
            console.log('response from API:', response.body)
            expect(response.status).toBe(404)
        })
    })

    describe('GET /todos', ()=>{
        // testing 200, 401, 404, 400 'bad request page', 400 'bad request limit' x 2, 400 'bad request sort'
        test('Should get me all my tasks with success', async () => {
            //login
            const loginResponse = await request(app).post('/login').send({
                email: "bot@gmail.com",
                password: "bot"
            })
            const token = loginResponse.body.token
            const response = await request(app).get(`/todos`).set('Authorization', `Bearer ${token}`)
            console.log('response from API:', response.body)
            expect(response.status).toBe(200)
        })

        test('Should get me all my tasks filtered with success', async () => {
            //login
            const loginResponse = await request(app).post('/login').send({
                email: "bot@gmail.com",
                password: "bot"
            })
            const token = loginResponse.body.token
            const response = await request(app).get(`/todos?filter=TaskUpdated`).set('Authorization', `Bearer ${token}`)
            console.log('response from API:', response.body)
            expect(response.status).toBe(200)
        })

        test('Should not authorize because a undenfied token', async ()=>{
            //deleting task
            const response = await request(app).get('/todos')
            console.log('response from API:', response.body)
            expect(response.status).toBe(401)
        })

        test('Should not found the page because that page dosent exist', async () => {
            //login
            const loginResponse = await request(app).post('/login').send({
                email: "bot@gmail.com",
                password: "bot"
            })
            const token = loginResponse.body.token
            const response = await request(app).get(`/todos?page=42139`).set('Authorization', `Bearer ${token}`)
            console.log('response from API:', response.body)
            expect(response.status).toBe(404)
        })

        test('Should get me a bad request becuase of params page', async () => {
            //login
            const loginResponse = await request(app).post('/login').send({
                email: "bot@gmail.com",
                password: "bot"
            })
            const token = loginResponse.body.token
            const response = await request(app).get(`/todos?page=test`).set('Authorization', `Bearer ${token}`)
            console.log('response from API:', response.body)
            expect(response.status).toBe(400)
        })

        test('Should get me a bad request becuase of params limit', async () => {
            //login
            const loginResponse = await request(app).post('/login').send({
                email: "bot@gmail.com",
                password: "bot"
            })
            const token = loginResponse.body.token
            const response = await request(app).get(`/todos?limit=test`).set('Authorization', `Bearer ${token}`)
            console.log('response from API:', response.body)
            expect(response.status).toBe(400)
        })

        test('Should get me a bad request becuase of params limit higher than 100', async () => {
            //login
            const loginResponse = await request(app).post('/login').send({
                email: "bot@gmail.com",
                password: "bot"
            })
            const token = loginResponse.body.token
            const response = await request(app).get(`/todos?limit=203`).set('Authorization', `Bearer ${token}`)
            console.log('response from API:', response.body)
            expect(response.status).toBe(400)
        })

        test('Should get me a bad request becuase of params sort', async () => {
            //login
            const loginResponse = await request(app).post('/login').send({
                email: "bot@gmail.com",
                password: "bot"
            })
            const token = loginResponse.body.token
            const response = await request(app).get(`/todos?sort=test`).set('Authorization', `Bearer ${token}`)
            console.log('response from API:', response.body)
            expect(response.status).toBe(400)
        })
    })
})