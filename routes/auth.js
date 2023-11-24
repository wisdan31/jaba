const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


const {
    showAuthPage,
    createNewUser,
    aunthenticateUser
} = require("../controllers/auth.js");

const User = require("../models/user.js");

router.get("/register", showAuthPage);

router.post("/register", createNewUser);

module.exports = router;