const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Todo = require('../src/models/Todo');

describe('Todo Operations', () => {
    let authToken;
    let userId;

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

        // Register a test user and get token
        const registerResponse = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'todouser',
                email: 'todo@example.com',
                password: 'password123',
            });

        authToken = registerResponse.body.token;
        userId = registerResponse.body.user.id;
    });

    it('should create a new todo', async () => {
        const response = await request(app)
            .post('/api/todos')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                title: 'Test Todo',
                description: 'This is a test todo',
                priority: 'high',
                userId, // Add userId if required
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('title', 'Test Todo');
    });

    it('should get todos for authenticated user', async () => {
        // Create a todo first
        await request(app)
            .post('/api/todos')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                title: 'Test Todo',
                description: 'This is a test todo',
                userId, // Add userId if required
            });

        const response = await request(app)
            .get('/api/todos')
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty('title', 'Test Todo');
    });
});
