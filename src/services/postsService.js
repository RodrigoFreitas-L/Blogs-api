const { BlogPost, PostCategory, Category, sequelize } = require('../database/models');

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

module.exports = {
  create,
};