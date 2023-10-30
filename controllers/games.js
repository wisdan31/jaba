const Game = require("../models/game");

const createGame = (async (req, res) => {
    const newEntry = new Game(req.body);
    await newEntry.save();
    res.redirect("/");
});

const deleteGame = (async (req, res) => {
    await Game.deleteOne({ _id: req.params.id });
    res.redirect("/");
})

module.exports =
{
    createGame,
    deleteGame
};