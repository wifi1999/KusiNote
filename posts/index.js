const express = require('express');
const dotenv = require('dotenv');
const { randomBytes } = require("crypto");
const axios = require('axios');
const cors = require('cors');
dotenv.config();
const bodyParser = require('body-parser');
const logger = require('./logger'); 

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// CREATE A POST
app.post('/posts', async(req, res) => {
    try{
        const id = randomBytes(4).toString("hex");

        await axios.post(process.env.EVENT_BUS_URL, {
            type: "PostCreated",
            data: {
                id: id,
                title: req.body.title
            }
        });
        logger.info(`Successfully added a post with id: ${id}`)
        res.status(200).json({ "message": "Successfully added a post" });
    } catch(err){
        logger.error(`Failure adding a post: ${err.message}`)
        res.status(400).json({ "error" : err.message });
    }
});

// DELETE A POST
app.delete('/posts/:id', async(req, res) => {
    try{
        const response = await axios.post(process.env.EVENT_BUS_URL, {
            type: "PostDeleted", 
            data: { id: req.params.id }
        });   
        logger.info(`Successfully deleted a post with id: ${req.params.id}`);
        res.status(200).json({ "message": "Successfully deleted a post" });
      
    } catch(err){
        logger.error(`Failure deleting a post: ${err.message} or Post Not Found`);
        res.status(400).json({ "error" : err.message + " or Post Not Found"});
    }
});

app.post("/events", (req, res) => {
    
    logger.info(`Received event: ${req.body.type}`);
    res.json({});
});

app.listen(4000, () => {
    console.log("Server listens on port 4000");
});

module.exports = app;

