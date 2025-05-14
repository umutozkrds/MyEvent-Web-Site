const Event = require('../models/event');


exports.createEvent = (req, res, next) => {
    const event = new Event({
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
}

exports.getEvents = (req, res, next) => {
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
}
