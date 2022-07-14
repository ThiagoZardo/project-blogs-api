const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const createUser = async (user) => {
  const { displayName, email, password, image } = user;
  const userExist = await User.findOne({ where: { email } });
  if (!userExist) {
    const newUser = await User.create({ displayName, email, password, image });
    if (newUser) {
      const jwtConfig = {
        expiresIn: '5h',
        algorithm: 'HS256',
      };
      const token = jwt.sign({ data: email }, JWT_SECRET, jwtConfig);
      return {
        token,
      };
    }
  return false;
  }
};

module.exports = {
  createUser,
};
