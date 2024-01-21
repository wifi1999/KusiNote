const axios = require('axios');
test("Create a Post", async () => {
    try {
        const originalPost = jest.spyOn(axios, 'post');

        const response = await axios.post("http://localhost:4000/posts", {
            title: "This is the fake post"
        });
        expect(response.status).toBe(200);
        expect(response.data.message).toBe("Successfully added a post");
        expect(originalPost).toHaveBeenCalledTimes(1);
    } catch (error) {
        console.error(error.message);
    }
});

test("Delete a Post", async () => {
    const postId = '79f3ce91'; // dynamically define
    const response = await axios.delete(`http://localhost:4000/posts/${postId}`);
    expect(response.status).toBe(200);
    expect(response.data.message).toBe("Successfully deleted a post");
});

test("Delete a Post with invalid postId", async () => {
    const id = '21345355';
    try{
        const response = await axios.delete(`http://localhost:4000/posts/${id}`);
        expect(response.status).not.toBe(400);
    } catch(err){
        expect(err.isAxiosError).toBe(true);
        expect(err.response.status).toBe(400);
    }
});

test("Create a Comment", async() => {
    const postId = 'e0f87ffd';
    const response = await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
        content: "This is the fake content"
    });
    expect(response.status).toBe(200);
    expect(response.data.message).toBe("Successfully added a comment");
});

test("Create a Comment with invalid postId", async() => {
    const postId = '02782b0c';
    try{
        const response = await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
            content: "This is the invalid content"
        });
        expect(response.status).not.toBe(400);
    } catch(err){
        expect(err.isAxiosError).toBe(true);
        expect(err.response.status).toBe(400);
    }
});

test("Update a Comment", async () => {
    const postId = 'e0f87ffd';

    const response = await axios.put(`http://localhost:4001/posts/${postId}/comments`, {
        id: '9996264d',
        content: "This is the fake updated content"
    });
    expect(response.status).toBe(200);
    expect(response.data.message).toBe("Successfully updated a comment");
});

test("Update a Comment with invalid postId", async () => {
    const postId = 'e0f87ffe';

    try{
        const response = await axios.put(`http://localhost:4001/posts/${postId}/comments`, {
            id: '9996264d',
            content: "This is the fake invalid updated content"
        });
    }
    catch(err){
        expect(err.isAxiosError).toBe(true);
        expect(err.response.status).toBe(400);
    }
});

test("Update a Comment with invalid commentId", async () => {
    const postId = 'e0f87ffd';

    try{
        const response = await axios.put(`http://localhost:4001/posts/${postId}/comments`, {
            id: '98bd49b2',
            content: "This is the fake invalid updated content"
        });
    }
    catch(err){
        expect(err.isAxiosError).toBe(true);
        expect(err.response.status).toBe(400);
    }
});

test("Delete a Comment", async () => {
    const postId = 'e0f87ffd';

    const response = await axios.delete(`http://localhost:4001/posts/${postId}/comments`, {
        id: '9996264d',
        content: "This is the fake deleted content"
    });
    expect(response.status).toBe(200);
    expect(response.data.message).toBe("Successfully deleted a comment");
});

test("Delete a Comment with invalid postId", async () => {
    const postId = 'e0f87ffr';

    try{
        const response = await axios.delete(`http://localhost:4001/posts/${postId}/comments`, {
            id: '9996264d',
            content: "This is the fake invalid deleted content"
        });
    }
    catch(err){
        expect(err.isAxiosError).toBe(true);
        expect(err.response.status).toBe(400);
    }
});

test("Delete a Comment with invalid commentId", async () => {
    const postId = 'e0f87ffd';

    try{
        const response = await axios.delete(`http://localhost:4001/posts/${postId}/comments`, {
            id: '9996264e',
            content: "This is the fake invalid deleted content"
        });
    }
    catch(err){
        expect(err.isAxiosError).toBe(true);
        expect(err.response.status).toBe(400);
    }
});

test("Get all posts", async () => {
    const response = await axios.get('http://localhost:4002/posts');
    expect(response.status).toBe(200);
}); 

test("Send an invalid Event", async () => {
    try{
        await axios.post("http://localhost:4005/events", {
            type: "Invalid Event",
            data: {
                commentId: "123456",
                postId: "123456",
                content: "Hello World"
            }
        });
    } catch(err){
        expect(err.isAxiosError).toBe(true);
        expect(err.response.status).toBe(404);
    }
});


