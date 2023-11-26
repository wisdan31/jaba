require('dotenv').config();

const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
  user = user.toObject();
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '24h' });
}

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    next();
  })
}

const returnUserId = (req) => {
  const token = req.cookies.token;
  const decoded = jwt.decode(token);
  return decoded._id;
}

const authCheck = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    next();
  }
  else {
    res.sendStatus(403);
  }
}

module.exports = { generateAccessToken, verifyToken, returnUserId, authCheck };
