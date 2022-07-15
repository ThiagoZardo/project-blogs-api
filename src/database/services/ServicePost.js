const { BlogPost, Category, User, PostCategory } = require('../models');
const { verifyToken } = require('../middlewares/validateToken');

const verifyCategory = async (categoryIds) => {
  const verify = await Category.findAndCountAll({
    where: {
      id: categoryIds,
    },
  });
  const idsCategory = verify.rows.map((el) => el.dataValues.id);
  return idsCategory;
};

const createPost = async ({ title, content, categoryIds, token }) => {
  const emailUser = await verifyToken(token).data;
  const verify = await verifyCategory(categoryIds);
  const user = await User.findOne({ where: { email: emailUser } });
  if (verify.length > 0) {
    const newPost = await BlogPost.create({ 
      title,
      content,
      userId: user.id,
    });
    await Promise.all(verify.map(async (el) => {
      PostCategory.create({
        postId: newPost.id,
        categoryId: el,
      });
    }));
    return newPost;
    }
  return false;
};

module.exports = {
  createPost,
};
