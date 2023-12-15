const express = require("express");
const router = express.Router();

router.use(express.json());

const {
    createGame,
    deleteGame,
    showGames,
    showMovies,
    createMovie,
    deleteMovie,
    showBooks,
    createBook,
    deleteBook
} = require("../controllers/media.js");

const { verifyToken } = require("../services/jwt.js");

const {Game, Movie} = require("../models/media.js");
const e = require("express");

router.get("/games", verifyToken, showGames)

router.post("/add", createGame);

router.post("/addMovie", createMovie);

router.post("/addBook", createBook);

router.delete("/delete/:id", deleteGame);

router.delete("/deleteMovie/:id", deleteMovie);

router.delete("/deleteBook/:id", deleteBook);

router.get("/movies", verifyToken, showMovies);

router.get("/books", verifyToken, showBooks);

module.exports = router;

