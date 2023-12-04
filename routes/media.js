const express = require("express");
const router = express.Router();

router.use(express.json());

const {
    createGame,
    deleteGame,
    showGames,
    showMovies
} = require("../controllers/media.js");

const { verifyToken } = require("../services/jwt.js");

const {Game, Movie} = require("../models/media.js");
const e = require("express");

router.get("/games", verifyToken, showGames)

router.post("/add", createGame);

router.delete("/delete/:id", deleteGame);

router.get("/movies", verifyToken, showMovies);

module.exports = router;

