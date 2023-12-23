const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();
const port = 3000;

const {verifyToken} = require("./services/jwt.js");

const media_routes = require("./routes/media.js");  
const auth_routes = require("./routes/auth.js");


require('dotenv').config();


const {Game, Movie} = require("./models/media.js");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology:true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
}

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Server is running on port " + port);
  });
})

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.redirect("/auth/register");
  }
  else {
    res.redirect("/media/games");
  }
});

app.use("/media", media_routes)

app.use("/auth", auth_routes)