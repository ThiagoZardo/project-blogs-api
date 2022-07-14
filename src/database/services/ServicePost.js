const { BlogPost } = require('../models');

const createPost = async (post) => {
  const { title, content, categoryIds } = post;
  const newPost = await BlogPost.create({ title, content, categoryIds });
  return newPost;
};

module.exports = {
  createPost,
};
