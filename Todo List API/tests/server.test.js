const request = require('supertest')
const app = require('../index')
const mongoose = require('mongoose')

describe('testing the rotes of my API', ()=>{

    afterAll(async ()=>{
        mongoose.conection.close
    })

    it('Should retrun status 200 when getting the tasks', async ()=>{
        const response = await request(app).get('/todos');
        expect(response.statusCode).toBe(200);
    })
})