const { BlogPost, Category, User, PostCategory } = require('../models');
const { verifyToken } = require('../utils/jws');

const verifyCategory = async (categoryIds, _userId) => {
  const verify = await Category.findAndCountAll({
    where: {
      id: categoryIds,
    },
  });
  const idsCategory = verify.rows.map((el) => el.dataValues.id);
  return idsCategory;
};

const createPost = async ({ title, content, categoryIds, token }, _userId) => {
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

const listAll = async (_userId) => {
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

const findById = async (id, _userId) => {
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

const updatedPost = async ({ title, content }, id, userId) => {
  const post = await BlogPost.findOne({ where: { id } });
  if (Number(post.userId) !== Number(userId)) return false;
  await BlogPost.update({ title, content }, { where: { userId, id } });
  const newPost = await findById(id);
  return newPost;
};

const deletePost = async (id, userId) => {
  const post = await BlogPost.findOne({ where: { id } });
  if (!post) {
    return 'Post does not exist';
  }
  if (Number(post.userId) !== Number(userId)) {
   return 'Unauthorized user';
  }
  await BlogPost.destroy(
    { where: { id } },
  );
  return true;
};

module.exports = {
  createPost,
  listAll,
  findById,
  updatedPost,
  deletePost,
};
