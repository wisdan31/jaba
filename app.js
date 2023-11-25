const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();
const port = 3000;

const games_routes = require("./routes/games.js");
const auth_routes = require("./routes/auth.js");


require('dotenv').config();


const Game = require("./models/game.js");

mongoose.connect("mongodb://localhost:27017/backlog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); // Making a connection with the database

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

app.get("/", async (req, res) => {
  res.set("Content-Type", "text/html");
  let entries = await Game.find();
  res.render("index.ejs", { entries: entries });
});

app.use("/games", games_routes)

app.use("/auth", auth_routes)


