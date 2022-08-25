const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const secret = 'sck942';

const login = ({ email, password }) => {
  if (!email || !password) return { code: 400, message: 'Some required fields are missing' };
  const userLogin = User.findOne({ where: { email } });

  if (!userLogin || userLogin.password !== password) {
    return { code: 400, message: 'Invalid fields' };
  }

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: userLogin }, secret, jwtConfig);

  return { code: 200, token };
};

module.exports = {
  login,
};