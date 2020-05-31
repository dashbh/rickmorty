const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const characterSchema = new Schema({
    id: String,
    name: String,
    status: String,
    species: String,
    type: String,
    gender: String,
    origin: {
        name: String
    },
    location: {
        name: String
    },
    image: String,
    episode: [String],
    url: String,
    created: String
});

module.exports = mongoose.model('Character', characterSchema);
