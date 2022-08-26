const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
require('dotenv').config();

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    const { displayName, id } = await User.findOne({
      where: { email },
    });
    req.user = { email, displayName, userId: id };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};