const categoriesService = require('../services/categoriesService');

const create = async (req, res) => {
  const { name } = req.body;

  try {
    const { message, code, data } = await categoriesService.create({ name });

    if (message) return res.status(code).json({ message });

    return res.status(code).json(data);
  } catch (error) {
    console.log(error.messa);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

const findAll = async (req, res) => {
  try {
    const { code, data } = await categoriesService.findAll();

    return res.status(code).json(data);
  } catch (error) {
    console.log(error.messa);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = {
  create,
  findAll,
};