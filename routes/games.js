const express = require("express");
const router = express.Router();

router.use(express.json());

const {
    createGame,
    deleteGame,
    showGames
} = require("../controllers/games.js");

const { verifyToken } = require("../services/jwt.js");

const Game = require("../models/game.js");

router.get("/", verifyToken, showGames)

router.post("/add", createGame);

router.delete("/delete/:id", deleteGame);

module.exports = router;

