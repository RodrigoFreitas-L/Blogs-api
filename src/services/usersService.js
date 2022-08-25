const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
require('dotenv').config();

const login = async ({ email, password }) => {
  if (!email || !password) return { code: 400, message: 'Some required fields are missing' };
  const userLogin = await User.findOne({ where: { email } });

  if (!userLogin || userLogin.password !== password) {
    return { code: 400, message: 'Invalid fields' };
  }

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: userLogin }, process.env.JWT_SECRET, jwtConfig);

  return { code: 200, data: token };
};

module.exports = {
  login,
};