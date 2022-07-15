const services = require('../services/ServicePost');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const token = req.headers.authorization;
  const newPost = await services.createPost({ title, content, categoryIds, token });
  if (!newPost) return res.status(400).json({ message: '"categoryIds" not found' });
  return res.status(201).json(newPost);
};

const listAll = async (req, res) => {
  const posts = await services.listAll();
  return res.status(200).json(posts);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const posts = await services.findById(id);
  if (!posts) return res.status(404).json({ message: 'Post does not exist' });
  return res.status(200).json(posts);
};

module.exports = {
  createPost,
  listAll,
  findById,
};
