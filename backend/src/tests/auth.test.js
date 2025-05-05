const request = require('supertest');
const app = require('./setup');
const User = require('../models/User');

describe('Auth API', () => {
    beforeEach(async () => {
        await User.deleteMany();
    });

    it('should register a new user and return a token', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ name: 'Test', email: 'test@example.com', password: 'secret' });

        expect(res.statusCode).toBe(201);
        expect(res.body.token).toBeDefined();
    });

    it('should not register with invalid data', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ email: 'invalid', password: 'short' });

        expect(res.statusCode).toBe(400);
    });

    it('should login an existing user', async () => {
        // first register
        await request(app)
            .post('/api/auth/register')
            .send({ name: 'Test', email: 'test2@example.com', password: 'secret' });

        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'test2@example.com', password: 'secret' });

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
    });
});