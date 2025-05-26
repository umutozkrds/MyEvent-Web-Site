const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Event = require('./models/event');
const eventRoutes = require('./router/events');
const userRoutes = require('./router/users');
const categoryRoutes = require('./router/categories');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// Fixed MongoDB connection string - removing appName and using standard format
mongoose.connect('mongodb+srv://umutozkardes0:9fqassqBgqD55Kt0@cluster0.adncq66.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err);
    });

const app = express();

// Increase payload size limits
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Serve static images from backend/images
app.use('/images', express.static(path.join('backend/images')));

app.use(cors({
    origin: ['http://localhost:4200', 'https://res.cloudinary.com', 'https://eventnest.online'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);

module.exports = app;

//9fqassqBgqD55Kt0