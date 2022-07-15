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

const listAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { 
        model: Category,
        as: 'categories',
        attributes: { exclude: 'PostCategory' },
        through: { attributes: [] },
      },
    ],
  });
  return posts;
};

const findById = async (id) => {
  const [posts] = await BlogPost.findAll({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { 
        model: Category,
        as: 'categories',
        attributes: { exclude: 'PostCategory' },
        through: { attributes: [] },
      },
    ],
  });
  return posts;
};

module.exports = {
  createPost,
  listAll,
  findById,
};
