const usersService = require('../services/usersService');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { code, message, data } = await usersService.login({ email, password });

    if (message) return res.status(code).json({ message });

    return res.status(code).json({ token: data });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = {
  login,
};