const services = require('../services/ServicePost');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const token = req.headers.authorization;
  const newPost = await services.createPost({ title, content, categoryIds, token }, req.userId);
  if (!newPost) return res.status(400).json({ message: '"categoryIds" not found' });
  return res.status(201).json(newPost);
};

const listAll = async (req, res) => {
  const posts = await services.listAll();
  return res.status(200).json(posts);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const posts = await services.findById(id, req.userId);
  if (!posts) return res.status(404).json({ message: 'Post does not exist' });
  return res.status(200).json(posts);
};

const updatedPost = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const newPost = await services.updatedPost({ title, content }, id, req.userId);
  if (!newPost) return res.status(401).json({ message: 'Unauthorized user' });
  return res.status(200).json(newPost);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const delPost = await services.deletePost(id, req.userId);
  if (delPost === 'Post does not exist') return res.status(404).json({ message: delPost });
  if (delPost === 'Unauthorized user') return res.status(401).json({ message: delPost });
  return res.status(204).end();
};

const searchPost = async (req, res) => {
  const { q } = req.query;
  const search = await services.searchPost(q);
  res.status(200).json(search);
};

module.exports = {
  createPost,
  listAll,
  findById,
  updatedPost,
  deletePost,
  searchPost,
};
