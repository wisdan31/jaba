const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


const {
    showAuthPage,
    createNewUser,
    loginUser,
    logoutUser
} = require("../controllers/auth.js");

const User = require("../models/user.js");

const {authCheck} = require("../services/jwt.js");

router.use((req, res, next) => {
    if (req.path == "/logout") {
        return next();
    }
    authCheck(req, res, next);
});

router.get("/register", showAuthPage);

router.post("/register", createNewUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

module.exports = router;