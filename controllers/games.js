const Game = require("../models/game");
const { returnUserId } = require("../services/jwt");

const showGames = (async (req, res) => {
    userId = returnUserId(req);
    let entries = await Game.find({ userId: userId });
    res.render("index.ejs", { entries: entries });
})

const createGame = async (req, res) => {
    try {
        const userId = returnUserId(req);
        const newEntry = new Game({
            userId: userId,
            ...req.body
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

module.exports = {
    createGame,
    deleteGame,
    showGames
};