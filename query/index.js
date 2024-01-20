const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('./logger');

dotenv.config();
const app = express();

if(process.env.NODE_ENV !== 'test'){
    mongoose.connect(process.env.MONGO_URL);
    mongoose.connection.on("connected", () => console.log("Connected to MongoDB"));
}

const querySchema = new mongoose.Schema({
    id: String,
    title: String,
    comment: [mongoose.Schema.Types.Mixed],
});

const QueryModel = mongoose.model("queryModel", querySchema);

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get("/posts", async (req, res) => {
    try{
        const posts = await QueryModel.find();

        logger.info(`Successfully get all posts`);
        res.status(200).json(posts);
    } catch(err){
        logger.error(`Failure getting all posts`);
        res.status(400).json({ "error" : err.message });
    }
});

app.post("/events", async (req, res) => {
    const { type, data } = req.body;
    
    if(type === 'PostCreated'){
        try{
            const { id, title } = data;
            const newQuery = new QueryModel({
                id: id, 
                title: title,
                comment: []
            });
            await newQuery.save();

            logger.info(`PostCreated query works correctly with postId: ${id}, title: ${title}`);
            res.status(200).json({ "message": "PostCreated query works correctly" });
        }
        catch(err){
            logger.error(`Error for PostCreated query`);
            res.status(400).json({ "error" : err.message });
        }

    } else if(type === 'CommentCreated'){
        try{
            const { id, postId, content } = data;
            const post = await QueryModel.findOne({ id: postId }); 
            post.comment.push({ id: id, content: content });
            await post.save();

            logger.info(`CommentCreated query works correctly with postId: ${postId}, commentId: ${id}, content: ${content}`);
            res.status(200).json({ "message" : "CommentCreated query works correctly" });
        } catch(err){
            logger.error(`Error for CommentCreated query`);
            res.status(400).json({ "error": err.message });
        }
    } else if(type === 'PostDeleted'){
        try{
            const { id } = data;
            await QueryModel.findOneAndDelete({ id: id });

            logger.info(`PostDeleted query works correctly with postId: ${id}`);
            res.status(200).json({ "message": "PostDeleted query work correctly" });
        } catch(err){
            logger.error(`Error for PostDeleted query`);
            res.status(400).json({ "error": err.message });
        }
    } else if(type === 'CommentDeleted'){
        try{
            const { commentId, postId } = data;
           
            const post = await QueryModel.findOne({ id: postId });
            post.comment = post.comment.filter((comment) => comment.id !== commentId);
            await post.save();

            logger.info(`CommentDeleted query works correctly with postId: ${postId}, commentId: ${commentId}`);
            res.status(200).json({ "message": "CommentDeleted query work correctly"});
        } catch(err){
            logger.error(`Error for CommentDeleted query`);
            res.status(400).json({ "error": err.message });
        }
    } else if(type === 'CommentUpdated'){
        try{
            const { commentId, postId, content } = data;
            const post = await QueryModel.findOne({ id: postId });
            const commentToUpdate = post.comment.find((comment) => comment.id === commentId);
            commentToUpdate.content = content;
            post.markModified('comment');
            await post.save();

            logger.info(`CommenetUpdated query work correctly with postId: ${postId}, commentId: ${commentId}, new content: ${content}`);
            res.status(200).json({ "message": "CommentUpdated query work correctly" });
        } catch(err){
            logger.error(`Error for CommentUpdated query`);
            res.status(400).json({ "error": err.message });
        }
    }
});

app.listen(4002, () => console.log("Server listens on port 4002"));

module.exports = { app, QueryModel };