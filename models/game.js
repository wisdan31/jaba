const mongoose = require('mongoose');
const gameSchema = new mongoose.Schema({
    userId: String,
    title: String,
    developer: String,
    year: Number,
    genre: String,
    status: String,
    score: String,
    time: Number, // in minutes
  })

const Game = mongoose.model('media', gameSchema); // Creating game model
module.exports = Game;