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

  const token = jwt.sign({ email }, process.env.JWT_SECRET, jwtConfig);

  return { code: 200, token };
};

// A criação de usuário acabou ficando muito longa, irei refatorar usando middlewares (por mais que não goste)
// const create = async ({ displayName, email, password, image }) => {
//   const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
//   if (displayName.length < 8) {
//     return { code: 400, message: '"displayName" length must be at least 8 characters long' };
//   }

//   if (!regexEmail.test(email)) {
//     return { code: 400, message: '"email" must be a valid email' };
//   }

//   if (password.length < 6) {
//     return { code: 400, message: '"password" length must be at least 6 characters long' };
//   }

//   const findUser = await User.findOne({ where: { email } });

//   if (findUser.length !== 0) {
//     return { code: 409, message: 'User already registered' };
//   }

//   await User.create({ displayName, email, password, image });

//   const jwtConfig = {
//     expiresIn: '7d',
//     algorithm: 'HS256',
//   };

//   const token = jwt.sign({ data: userLogin }, process.env.JWT_SECRET, jwtConfig);

//   return { code: 200, data: token };
// };

const create = async ({ displayName, email, password, image }) => {
    await User.create({ displayName, email, password, image });

    const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
    };

    const token = jwt.sign({ email }, process.env.JWT_SECRET, jwtConfig);

    return { code: 201, token };
};

const findAll = async () => {
  const findUsers = await User.findAll({ attributes: { exclude: ['password'] } });

  return { code: 200, data: findUsers };
};

module.exports = {
  login,
  create,
  findAll,
};