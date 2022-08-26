const { BlogPost, PostCategory, Category, User, sequelize } = require('../database/models');

const create = async ({ title, content, categoryIds }, userId) => {
  if (!title || !content || !categoryIds) {
    return { code: 400, message: 'Some required fields are missing' };
  }

  const { code, message, data } = await sequelize.transaction(async (t) => {
    const { rows } = await Category.findAndCountAll({ where: { id: categoryIds } });
    if (rows.length < categoryIds.length) {
      return { code: 400, message: '"categoryIds" not found' };
    }

    const { dataValues } = await BlogPost.create(
      { title, content, userId }, { t },
    );

    const categoryMap = categoryIds.map((item) => ({
      postId: dataValues.id, categoryId: item,
    }));
    await PostCategory.bulkCreate(categoryMap, { t });
    return { code: 201, data: dataValues };
  });

  return { code, message, data };
};

// multiple includes:  https://stackoverflow.com/questions/57356008/counting-join-with-sequelize-with-multiple-includes

const findAll = async () => {
  const findAllPosts = await BlogPost.findAll({ include: [{
      model: Category,
      as: 'categories',
      through: { attributes: [] },
  },
  {
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
  },
] });

  return { code: 200, data: findAllPosts };
};

const findById = async (id) => {
  const findPostById = await BlogPost.findOne({
    where: { id },
    include: [{
      model: Category,
      as: 'categories',
      through: { attributes: [] },
  },
  {
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
  },
] });

  if (!findPostById) {
    return { code: 404, message: 'Post does not exist' };
  }

  return { code: 200, data: findPostById };
};

module.exports = {
  create,
  findAll,
  findById,
};