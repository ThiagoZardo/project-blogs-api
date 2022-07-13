const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const login = async (email, password) => {
  const userExist = await User.findOne({ where: { email, password } });

  if (userExist) {
    const jwtConfig = {
      expiresIn: '5h',
      algorithm: 'HS256',
    };
  
    const token = jwt.sign({ data: email }, JWT_SECRET, jwtConfig);
    return token;
  }
  return userExist;
  };

module.exports = {
  login,
};
