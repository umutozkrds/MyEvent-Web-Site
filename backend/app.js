const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Event = require('./models/event');

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

app.post('/api/events', (req, res, next) => {
    const event = new Event({
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        location: req.body.location,
        city: req.body.city || '',
        state: req.body.state || '',
        category: req.body.category
    });
    event.save().then((result) => {
        res.status(201).json({
            message: 'Event added successfully!',
            event: result
        });
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
});


app.get('/api/events', (req, res, next) => {
    Event.find().then((events) => {
        res.status(200).json({
            message: 'Events fetched successfully!',
            events: events
        });
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = app;

//9fqassqBgqD55Kt0