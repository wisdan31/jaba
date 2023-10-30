const Game = require("../models/game");

const createGame = (async (req, res) => {
    const newEntry = new Game(req.body);
    await newEntry.save();
    res.redirect("/");
});

module.exports = { createGame };