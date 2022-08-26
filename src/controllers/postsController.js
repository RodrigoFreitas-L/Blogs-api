const postsService = require('../services/postsService');

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { userId } = req.user;

  try {
    const { code, message, data } = await postsService.create({
      title, content, categoryIds }, userId);

    if (message) return res.status(code).json({ message });

    return res.status(code).json(data);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = {
  create,
};