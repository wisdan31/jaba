const User = require('../models/user');
const { generateAccessToken } = require('../services/jwt');
const bcrypt = require('bcrypt');

const showAuthPage = (req, res) => {
  res.render('register.ejs');
}

const createNewUser = async (req, res) => {
  const username = req.body.username;
  console.log(username);
  let user = await User.findOne({ username: username });
  if (user != null) {
    return res.status(400).send('Such user already exists');
  }
  console.log(req.body.username);
  console.log(req.body.password)
  const password = await bcrypt.hash(req.body.password, 10);
  user = new User({
    username: username,
    password: password
  });
  try {
    await user.save();
    res.sendStatus(302);
  }
  catch (err) {
    res.sendStatus(500);
  }
}

const loginUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  let user = await User.findOne({ username: username });
  if (user == null) {
    return res.sendStatus(401);
  }

  try {
    if (!(await bcrypt.compare(password, user.password))) {
      res.sendStatus(401);
    }
    const accessToken = generateAccessToken(user);
    res.cookie('token', accessToken, { httpOnly: true });
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
}

module.exports = {
  showAuthPage,
  createNewUser,
  loginUser
}