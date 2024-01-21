const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const logger = require('./logger');

dotenv.config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
    const event = req.body;

    try {
        await axios.post(process.env.POSTS_URL, event);
        await axios.post(process.env.COMMENTS_URL, event);
        await axios.post(process.env.QUERY_URL, event);

        logger.info('Event successfully posted to services');
        res.status(200).json({ status: 'OK' });
    
    } catch (err) {
        logger.error(`Error posting event: ${err.message} or Post Not Found or Comment Not Found or Event Not Found`);
        res.status(404).json({ "error": err.message + "or Post Not Found or Comment Not Found or Event Not Found" }); 
    }
});

app.listen(4005, () => {
    console.log("Server listens on port 4005");
})

module.exports = app;
