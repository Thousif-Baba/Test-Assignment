const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    id: Number,
    eventName: String,
    description: String,
    website: String,
    instagramLink: String,
    googleMapsLink: String,
    locality: String,
    city: String,
    category: String
});

module.exports = mongoose.model('Event', eventSchema);
