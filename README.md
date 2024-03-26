# KusiNote App

## Overview

The KusiNote App is a microservices-based application that allows users to create, edit, and organize their notes. It is built using React.js for the frontend, Empress.js for microservices-based servers (posts, queries, comments, and event notifications), Winston for logging and monitoring, Jest for automated testing, and Docker for efficient containerization.

## Project Structure

### post service 
Manages user posts. Frontend post requests are forwarded to the event-bus service for event notification.

### comment service
Manage user comments. Frontend comment requests are forwarded to the event-bus service for event notification.

### event-bus service 
Manages post/comment request notifications. Requests from post and comment services are forwarded to the query service for database management

### query service 
Manages user data, including posts and comments, connected with MongoDB database through Mongoose operations

### client
Renders web pages for the note-taking app.


## Features

### User-Friendly Interface
- Crafted with React.js, the frontend provides an exceptionally intuitive and user-friendly experience.

### Microservices Architecture: 
- Express.js is employed to create interconnected microservices-based servers for posts, queries, comments, and event notifications.

### Logging and Monitoring: 
- Integrated Winston API for a logging system, enabling real-time performance tracking across microservices

### Automated Testing: 
- Jest is used for comprehensive and reliable automated testing across microservices to ensure robust testing coverage.

### Docker Containerization
- Docker is leveraged to containerize each microservice, ensuring efficient resource utilization and streamlined dependency management.



## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- MongoDB
- Docker

### Installation

1. Clone the repository:
   ```bash
      git clone https://github.com/wifi1999/KusiNote.git

2. Install the dependencies:  
   ```bash
      cd posts
      npm install
   ```
   ```bash 
      cd comments
      npm install
   ```
   ```bash
      cd event-bus 
      npm install
   ```
   ```bash 
      cd query
      npm install
   ```
   ```bash
      cd client
      npm install
   ```
   
3. Create Environmental Variables: 
```bash
   cd posts 
   touch .env
   EVENT_BUS_URL=http://localhost:4005/events
``` 
```bash
   cd comments
   touch .env
   EVENT_BUS_URL=http://localhost:4005/events
```
```bash
   cd event-bus
   touch .env
   POSTS_URL=http://localhost:4000/events
   COMMENTS_URL=http://localhost:4001/events
   QUERY_URL=http://localhost:4002/events
```
```bash
   cd query
   touch .env
   MONGO_URL=YOUR_MONGODB_URL # create your own mongoURL
   NODE_ENV='DEVELOPMENT'
```
```bash
   cd client
   touch .env
   REACT_APP_POSTS_CONTAINER_URL=localhost
   REACT_APP_COMMENTS_CONTAINER_URL=localhost
   REACT_APP_QUERY_CONTAINER_URL=localhost
```

4. Starting the Application:
- (Option 1) You can run the application by running the Docker container (if you already installed one)
```bash
  docker-compose up --build # --build flag ensures that the images are built if not already present.
```

- (Option 2) You can also run the application by starting each microservices and the frontend client
```bash
   cd posts
   npm run dev
```
   The posts service will run on http://localhost:4000.

```bash
   cd comments
   npm run dev
```
   The comments will run on http://localhost:4001.

```bash
   cd event-bus
   npm run dev
```
   The comments will run on http://localhost:4005.

```bash
   cd query
   npm run dev
```
   The Server will run on http://localhost:4002.

```bash
   cd client
   npm start
```
   The Server will run on http://localhost:3000.

### Open your browser and go to http://localhost:3000 to use the application. Enjoy!


