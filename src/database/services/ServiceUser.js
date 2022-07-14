const { User } = require('../models');
const { generateToken } = require('../middlewares/validateToken');

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

const listUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: 'password' } });
  console.log(users);
  return users;
};

module.exports = {
  createUser,
  listUsers,
};
