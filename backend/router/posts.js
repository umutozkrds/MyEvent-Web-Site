const express = require('express');
const router = express.Router();
const Event = require('../models/event');

const eventController = require('../controllers/event');

router.post('', eventController.createEvent);

router.get('', eventController.getEvents);

module.exports = router;
