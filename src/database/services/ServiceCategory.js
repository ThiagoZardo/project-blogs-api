const { Category } = require('../models');

const createCategory = async (name) => {
  const newCategory = await Category.create({ name });
  return {
    id: newCategory.id,
    name,
  };
};

module.exports = {
  createCategory,
};
