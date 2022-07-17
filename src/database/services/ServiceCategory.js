const { Category } = require('../models');

const createCategory = async (name, _userId) => {
  const newCategory = await Category.create({ name });
  return {
    id: newCategory.id,
    name,
  };
};

const listCategories = async (_userId) => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  createCategory,
  listCategories,
};
