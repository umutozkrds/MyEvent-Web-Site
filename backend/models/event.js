const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
});

module.exports = mongoose.model('Event', eventSchema);
