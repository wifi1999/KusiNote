const request = require('supertest');
const axios = require('axios');
const app  = require('./index'); // Replace './app' with the path to your Express app file
jest.mock('axios');

describe('Event Routing Tests', () => {

    it('should forward events to all services', async () => {
        // Mocking Axios.post to simulate successful requests
        axios.post.mockResolvedValue({ data: {} });

        // Simulate event data
        const eventData = {
            type: 'TestEvent',
            data: { test: 'data' }
        };

        const response = await request(app).post('/events').send(eventData);

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe('OK');

        // Check if axios.post has been called with correct URLs and event data
        expect(axios.post).toHaveBeenCalledWith(process.env.POSTS_URL, eventData);
        expect(axios.post).toHaveBeenCalledWith(process.env.COMMENTS_URL, eventData);
        expect(axios.post).toHaveBeenCalledWith(process.env.QUERY_URL, eventData);
    });

    it('should handle errors in event forwarding', async () => {
        // Mocking Axios.post to simulate a failure in one of the requests
        axios.post.mockRejectedValue(new Error('Network Error'));

        const eventData = {
            type: 'TestEvent',
            data: { test: 'data' }
        };

        const response = await request(app).post('/events').send(eventData);

        expect(response.statusCode).toBe(400);
    });
});
