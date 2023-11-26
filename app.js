const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();
const port = 3000;

const {verifyToken} = require("./services/jwt.js");

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
  const token = req.cookies.token;
  if (!token) {
    res.redirect("/auth/register");
  }
  else {
    res.redirect("/games");
  }
});

app.use("/games", games_routes)

app.use("/auth", auth_routes)


