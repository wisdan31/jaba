const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

const Game = require("./models/game.js");

mongoose.connect("mongodb://localhost:27017/backlog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); // Making a connection with the database

app.use(express.static("public"));

app.use(express.json());
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  res.set("Content-Type", "text/html");
  let entries = await Game.find();
  res.render("index.ejs", { entries: entries });
});

app.post("/add", async (req, res) => {
  const newEntry = new Game(req.body);
  await newEntry.save();
  res.redirect("/");
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
