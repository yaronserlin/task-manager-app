const request = require('supertest');
const app = require('./setup');
const Task = require('../models/Task');

let token;

describe('Tasks API', () => {
    beforeAll(async () => {
        // register and login to get token
        await request(app)
            .post('/api/auth/register')
            .send({ name: 'User', email: 'user@example.com', password: 'secret' });

        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'user@example.com', password: 'secret' });

        token = res.body.token;
    });

    beforeEach(async () => {
        await Task.deleteMany();
    });

    it('should create a new task', async () => {
        const res = await request(app)
            .post('/api/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Test Task' });

        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe('Test Task');
    });

    it('should fetch all tasks for user', async () => {
        await request(app)
            .post('/api/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Another Task' });

        const res = await request(app)
            .get('/api/tasks')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
    });
});