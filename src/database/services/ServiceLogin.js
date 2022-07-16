const { User } = require('../models');
const { generateToken } = require('../middlewares/validateToken');

const login = async (email, password) => {
  const userExist = await User.findOne({ where: { email, password } });

  if (userExist) {
    const token = await generateToken(email);
    return token;
  }
  return userExist;
  };

module.exports = {
  login,
};
