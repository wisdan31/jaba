const express = require("express");
const router = express.Router();

const {createGame} = require("../controllers/games.js");

router.post("/add", createGame);

module.exports = router;

