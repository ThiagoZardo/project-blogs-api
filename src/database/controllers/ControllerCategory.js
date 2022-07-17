const services = require('../services/ServiceCategory');

const createCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  const newCategory = await services.createCategory(name, req.userId);
  return res.status(201).json(newCategory);  
};

const listCategories = async (req, res) => {
  const categories = await services.listCategories(req.userId);
  return res.status(200).json(categories);
};

module.exports = {
  createCategory,
  listCategories,
};
