const request = require('supertest');
const axios = require('axios');
const app = require('./index');
jest.mock('axios');

describe('Test Comment Service', () => {
    // Test POST /posts/:id/comments
    it('should create a comment and return a success message', async () => {
        const mockComment = { content: 'Test comment' };
        const postId = 'testPostId';

        const response = await request(app)
            .post(`/posts/${postId}/comments`)
            .send(mockComment);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Successfully added a comment');
    });

    // Test PUT /posts/:id/comments
    it('should update a comment and return a success message', async () => {
        const mockCommentUpdate = { id: 'testCommentId', content: 'Updated comment' };
        const postId = 'testPostId';

        const response = await request(app)
            .put(`/posts/${postId}/comments`)
            .send(mockCommentUpdate);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Successfully updated a comment');
    });

    // Test DELETE /posts/:id/comments
    it('should delete a comment and return a success message', async () => {
        const mockCommentId = { id: 'testCommentId' };
        const postId = 'testPostId';
        axios.post.mockResolvedValue({});

        const response = await request(app)
            .delete(`/posts/${postId}/comments`)
            .send(mockCommentId);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Successfully deleted a comment');
    });

    // Test POST /events
    it('should handle an event', async () => {
        const mockEvent = { type: 'TestEvent' };

        const response = await request(app)
            .post('/events')
            .send(mockEvent);

        expect(response.statusCode).toBe(200);
    });

});