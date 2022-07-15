const services = require('../services/ServicePost');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const token = req.headers.authorization;
  const newPost = await services.createPost({ title, content, categoryIds, token });
  if (!newPost) return res.status(400).json({ message: '"categoryIds" not found' });
  return res.status(201).json(newPost);
};

module.exports = {
  createPost,
};
