const User = require('../models/user');
const { generateAccessToken } = require('../services/jwt');
const bcrypt = require('bcrypt');

const showAuthPage = (req, res) => {
  res.render('register.ejs');
}

const createNewUser = async (req, res) => {
  const username = req.body.username;
  let user = await User.findOne({ username: username });
  if (user != null) {
    return res.status(400).send('Such user already exists');
  }
  const password = await bcrypt.hash(req.body.password, 10);
  user = new User({
    username: username,
    password: password
  });
  try {
    await user.save();
    res.status(201).send('User created successfully');
  }
  catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

const loginUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  let user = await User.findOne({ username: username });
  if (user == null) {
    return res.status(401).send("No such user");
  }

  try {
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Wrong password");
    }
    const accessToken = generateAccessToken(user);
    res.cookie('token', accessToken, { httpOnly: true });
    return res.status(200).send("You are now logged in");
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

const logoutUser = async (req, res) => {
  res.clearCookie('token');
  res.status(200).send('You are now logged out');
}

module.exports = {
  showAuthPage,
  createNewUser,
  loginUser,
  logoutUser
}