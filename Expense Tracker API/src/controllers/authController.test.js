import { describe, it, mock } from 'node:test'
import assert from 'node:assert'
import { registerUser, loginUser, refreshUser, logoutUser } from './authController.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { expenseUser } from '../models/User.js'
import { refreshToken } from '../models/Refresh_Token.js'

describe('authController - registerUser', ()=>{
    it('should return status 201, the access token and the refresh token to the user if the operation was a success', async () => {
        mock.method(bcrypt, 'hash', async () => {
            return 'crypt-password-false'
        })
        mock.method(expenseUser.prototype, 'save', async () => {
            return {
                _id: '18h0382nmmex',
                name: 'tester01',
                email: 'tester01@gmail.com',
                password: 'TESTER01'
            }
        })
        mock.method(jwt, 'sign', async () => {
            return 'mock-token-false'
        })
        mock.method(refreshToken, 'create', async () =>{
            return { success: true }
        })
        const req = {
            body: {
                name: 'tester01',
                email: 'tester01@gmail.com',
                password: 'TESTER01'
            }
        }
        const res = { 
            statusCode: null,
            bodyData: null,
            status: function (code) {
                this.statusCode = code
                return this
            },
            json: function (data) {
                this.bodyData = data
                return this
            }
        }
        await registerUser(req, res)
        assert.strictEqual(res.statusCode, 201)
        assert.ok(res.bodyData['access-token'], 'should contain access-token in the response')
        assert.ok(res.bodyData['refresh-token'], 'should contain refresh-token in the response')
    })

    it('should return status 400 since the user sended a bad request. Because Name, Email and Password are required', async () => {
        
    })

    it('should return status 400 since the user sended a bad request. Because that Name was already registered', async () => {
        
    })

    it('should return status 400 since the user sended a bad request. Because that Email was already registered', async () => {
        
    })

    it('should return status 500, Because of a internal function error', async () => {
        
    })
})

describe('authController - loginUser', ()=>{

})

describe('authController - refreshUser', ()=>{

})

describe('authController - logoutUser', ()=>{

})