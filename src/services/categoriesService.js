const { Category } = require('../database/models');

const create = async ({ name }) => {
  if (!name) {
    return { code: 400, message: '"name" is required' };
  }

  const createCategory = await Category.create({ name });

  return { code: 201, data: createCategory };
};

module.exports = {
  create,
};