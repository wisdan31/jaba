const express = require("express");
const router = express.Router();

const {
    createNewUser,
    aunthenticateUser
} = require("../controllers/auth.js");

const User = require("../models/user.js");

router.get("/register", (req, res) => {
    res.render("register.ejs");
})

router.post("/register", auntenticateUser);

module.exports = router;