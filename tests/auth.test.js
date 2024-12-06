const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../src/models/User');

describe('Authentication', () => {
    beforeAll(async () => {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_TEST_URI);
        }
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        const collections = Object.keys(mongoose.connection.collections);
        for (const collection of collections) {
            await mongoose.connection.collections[collection].deleteMany({});
        }
    });

    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('token');
        expect(response.body.user).toHaveProperty('username', 'testuser');
    });

    it('should login an existing user', async () => {
        // First register a user
        await request(app)
            .post('/api/auth/register')
            .send({
                username: 'loginuser',
                email: 'login@example.com',
                password: 'password123',
            });

        // Then attempt to login
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'login@example.com',
                password: 'password123',
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
});
