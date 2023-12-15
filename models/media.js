const mongoose = require("mongoose");
const gameSchema = new mongoose.Schema({
  userId: String,
  title: String,
  developer: String,
  year: Number,
  genre: String,
  status: String,
  score: Number,
  time: Number, // in minutes
});

const movieSchema = new mongoose.Schema({
  userId: String,
  title: String,
  director: String,
  year: Number,
  genre: String,
  status: String,
  score: Number,
});

const bookSchema = new mongoose.Schema({
  userId: String,
  title: String,
  author: String,
  year: Number,
  genre: String,
  status: String,
  score: Number,
});

const Game = mongoose.model("media", gameSchema); // Creating game model
const Movie = mongoose.model("movie", movieSchema); // Creating movie model
const Book = mongoose.model("book", bookSchema); // Creating book model
module.exports = { Game, Movie, Book };
