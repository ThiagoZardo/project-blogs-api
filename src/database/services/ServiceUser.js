const { User } = require('../models');
const { generateToken } = require('../utils/jws');

const createUser = async (user) => {
  const { displayName, email, password, image } = user;
  const userExist = await User.findOne({ where: { email } });
  if (!userExist) {
    await User.create({ displayName, email, password, image });
    const token = await generateToken(email);
      return {
        token,
      };
    }
  return false;
};

const listUsers = async (_userId) => {
  const users = await User.findAll({ attributes: { exclude: 'password' } });
  return users;
};

const findById = async (id, _userId) => {
  const user = await User.findAll({
    where: { id },
    attributes: { include: 'id', exclude: 'password' },
  });
  return user;
};

const deleteAccount = async (userId) => {
  await User.destroy(
    { where: { id: userId } },
  );
  return true;
};

module.exports = {
  createUser,
  listUsers,
  findById,
  deleteAccount,
};
