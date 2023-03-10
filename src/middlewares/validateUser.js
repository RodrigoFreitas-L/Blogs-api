const { User } = require('../database/models');

const alreadyExists = async (req, res, next) => {
  const { email } = req.body;

  try {
    const findUser = await User.findAll({ where: { email } });

    if (findUser.length !== 0) {
      return res.status(409).json({ message: 'User already registered' });
    }

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

const validateFields = async (req, res, next) => {
  const { displayName, email, password } = req.body;

  try {
    if (displayName.length < 8) {
      return res.status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
    }

    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;

    if (!regexEmail.test(email)) {
      return res.status(400).json({ message: '"email" must be a valid email' });
    }

    if (password.length < 6) {
      return res.status(400)
      .json({ message: '"password" length must be at least 6 characters long' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = {
  alreadyExists,
  validateFields,
};