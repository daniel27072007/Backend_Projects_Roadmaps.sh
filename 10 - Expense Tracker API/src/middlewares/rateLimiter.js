import { rateLimit } from 'express-rate-limit'
import { slowDown } from 'express-slow-down'

export const limiterAuthorization = rateLimit({
    windowMs: 1000 * 60,
    limit: 5,
    message: 'You can only do 5 request per minute',
    skip: () => process.env.NODE_ENV === 'test'
})
export const slowDownAuthorization = slowDown({
    windowMs: 1000 * 60,
    delayAfter: 2,
    delayMs: () => 1000,
    maxDelayMs: 5000,
    skip: () => process.env.NODE_ENV === 'test'
})
export const limitWrite = rateLimit({
    windowMs: 1000 * 60,
    limit: 30,
    message: 'You can only do 30 request per minute',
    skip: () => process.env.NODE_ENV === 'test'
})
export const slowDownWrite = slowDown({
    windowMs: 1000 * 60,
    delayAfter: 10,
    delayMs: () => 500,
    maxDelayMs: 10000,
    skip: () => process.env.NODE_ENV === 'test'
})
export const limitGet = rateLimit({
    windowMs: 1000 * 60,
    limit: 100,
    message: 'You can only do 100 request per minute',
    skip: () => process.env.NODE_ENV === 'test'
})
export const slowDownGet = slowDown({
    windowMs: 1000 * 60,
    delayAfter: 30,
    delayMs: () => 500,
    maxDelayMs: 20000,
    skip: () => process.env.NODE_ENV === 'test'
})