const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { app } = require('./index'); // Adjust the path to your app file
const QueryModel = require('./index'); // Adjust the path to your QueryModel

describe('Post and Comment Service Tests', () => {
    let mongoServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    // Test GET /posts
    it('should retrieve all posts', async () => {
        // You can insert test data into your in-memory database here
        const response = await request(app).get('/posts');
        expect(response.statusCode).toBe(200);
    });

    // Test POST /events for various event types
    it('should handle PostCreated event', async () => {
        const mockEvent = {
            type: 'PostCreated',
            data: { id: '123', title: 'Test Post' }
        };
        const response = await request(app)
            .post('/events')
            .send(mockEvent);
        expect(response.statusCode).toBe(200);
    });

});
