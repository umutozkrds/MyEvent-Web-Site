const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Event = require('./models/event');
const eventRoutes = require('./router/posts');
const userRoutes = require('./router/users');

// Fixed MongoDB connection string - removing appName and using standard format
mongoose.connect('mongodb+srv://umutozkardes0:9fqassqBgqD55Kt0@cluster0.adncq66.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {


        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err);
    });

const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);

module.exports = app;

//9fqassqBgqD55Kt0