const Game = require("../models/game");
const { returnUserId } = require("../services/jwt");

const showGames = (async (req, res) => {
    userId = returnUserId(req);
    let entries = await Game.find({ user: userId });
    res.render("index.ejs", { entries: entries });
})

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
    deleteGame,
    showGames
};