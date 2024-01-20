const express = require('express');
const dotenv = require('dotenv');
const { randomBytes } = require("crypto");
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const logger = require('./logger');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// CREATE A COMMENT
app.post('/posts/:id/comments', async(req, res) => {
    try{
        const id = randomBytes(4).toString("hex");

        await axios.post(process.env.EVENT_BUS_URL, {
            type: "CommentCreated",
            data: {
                id: id,
                postId: req.params.id, 
                content: req.body.content 
            }
        });
        logger.info(`Successfully created a comment with postId: ${req.params.id}, commentId: ${id}, content: ${ req.body.content }`)
        res.status(200).json({ "message" : "Successfully added a comment" });
    } catch(err){
        logger.error(`Failure creating comment: ${err.message}`);
        res.status(400).json({ "error" : err.messsage });
    }
});

// UPDATE A COMMENT
app.put('/posts/:id/comments', async(req, res) => {
    try{
        await axios.post(process.env.EVENT_BUS_URL, {
            type: "CommentUpdated",
            data: {
                commentId: req.body.id,
                postId: req.params.id,
                content: req.body.content
            }
        });
        logger.info(`Successfully updated a comment with postId: ${req.params.id}, commentId: ${req.body.id}, content: ${req.body.content}`);
        res.status(200).json({ "message" : "Successfully updated a comment" });
    } catch(err){
        logger.error(`Failure updating comment: ${err.message}`);
        res.status(400).json({ "error": err.message });
    }
});

// DELETE A COMMENT
app.delete('/posts/:id/comments', async(req, res) => {
    try{
        await axios.post(process.env.EVENT_BUS_URL, {
            type: "CommentDeleted",
            data: {
                commentId: req.body.id,
                postId: req.params.id
            }
        });
        logger.info(`Successfully deleted a comment with postId: ${req.params.id}, commentId: ${req.body.id}`);
        res.status(200).json({ "message" : "Successfully deleted a comment"});
    } catch(err){
        logger.error(`Failure deleting comment: ${err.message}`);
        res.status(400).json({ "error" : err.message });
    }
});

app.post("/events", (req, res) => {
    logger.info(`Received event: ${req.body.type}`);
    res.json({});
});

app.listen(4001, () => {
    console.log("Server listens on port 4001");
})