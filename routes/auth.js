const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


const {
    showAuthPage,
    createNewUser,
    loginUser,
} = require("../controllers/auth.js");

const {authCheck} = require("../services/jwt.js");

const User = require("../models/user.js");

router.use(authCheck);

router.get("/register", showAuthPage);

router.post("/register", createNewUser);

router.post("/login", loginUser);

module.exports = router;