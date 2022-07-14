const services = require('../services/ServicePost');

const createPost = async (req, res) => {
  const newPost = await services.createPost(req.body);
  return res.status(201).json(newPost);
};

module.exports = {
  createPost,
};
