const User = require('../models/user');

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '24h' });
}

const createNewUser = async (req, res) => {
  const username = req.body.username;
  const password = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    username: username,
    password: password
  });
  try {
    await user.save();
    res.sendStatus(201);
  }
  catch (err) {
    res.sendStatus(500);
  }
}

const loginUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({ username: username });
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