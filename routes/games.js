const express = require("express");
const router = express.Router();

const {
    createGame,
    deleteGame
    } = require("../controllers/games.js");

const Game = require("../models/game.js");

router.post("/add", createGame);

router.delete("/delete/:id", deleteGame);

module.exports = router;

