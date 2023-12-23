const { Game, Movie, Book } = require("../models/media");
const { returnUserId } = require("../services/jwt");

const showMovies = async (req, res) => {
  userId = returnUserId(req);
  let entries = await Movie.find({ userId: userId });
  res.render("movies.ejs", { entries: entries });
};

const showBooks = async (req, res) => {
  userId = returnUserId(req);
  let entries = await Book.find({ userId: userId });
  res.render("books.ejs", { entries: entries });
};

const createMovie = async (req, res) => {
  try {
    const userId = returnUserId(req);
    const newEntry = new Movie({
      userId: userId,
      ...req.body,
    });
    await newEntry.save();
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const createBook = async (req, res) => {
  try {
    const userId = returnUserId(req);
    const newEntry = new Book({
      userId: userId,
      ...req.body,
    });
    await newEntry.save();
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const showGames = async (req, res) => {
  userId = returnUserId(req);
  let entries = await Game.find({ userId: userId });
  res.render("index.ejs", { entries: entries });
};

const createGame = async (req, res) => {
  try {
    const userId = returnUserId(req);
    const newEntry = new Game({
      userId: userId,
      ...req.body,
    });
    await newEntry.save();
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteGame = async (req, res) => {
  try {
    await Game.deleteOne({ _id: req.params.id });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteMovie = async (req, res) => {
  try {
    await Movie.deleteOne({ _id: req.params.id });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteBook = async (req, res) => {
  try {
    await Book.deleteOne({ _id: req.params.id });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const editGame = async (req, res) => {
  try {
    await Game.updateOne({ _id: req.params.id }, req.body);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createGame,
  deleteGame,
  showGames,
  showMovies,
  createMovie,
  deleteMovie,
  showBooks,
  createBook,
  deleteBook,
};
