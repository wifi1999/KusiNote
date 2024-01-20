const request = require('supertest');
const axios = require('axios');
const app = require('./index');
jest.mock('axios');

describe('Test Posts Service', () => {
    it('should create a new post and return a success message', async() => {
      
        const response = await request(app).post('/posts').send({ title: "Test post"}); // the request function is from the supertest. 

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Successfully added a post');
    });

    it("should delete a post and return a success message", async() => {
        
        const response = await request(app).delete('/posts/e05b8c82');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Successfully deleted a post');
    });

    it("should handle an event", async() => {
        
        const response = await request(app).post('/events').send({ type: 'MockEvent' });

        expect(response.status).toBe(200);
    });

})