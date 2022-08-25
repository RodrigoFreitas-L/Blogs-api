const usersService = require('../services/usersService');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { code, message, token } = await usersService.login({ email, password });

    if (message) return res.status(code).json({ message });

    return res.status(code).json({ token });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  try {
    const { code, message, token } = await usersService
    .create({ displayName, email, password, image });

    if (message) return res.status(code).json({ message });

    return res.status(code).json({ token });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

const findAll = async (req, res) => {
  try {
    const { code, data } = await usersService.findAll();

    return res.status(code).json(data);
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = {
  login,
  create,
  findAll,
};