function generateAccessToken(user) {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '24h' });
  }

  module.exports = { generateAccessToken };