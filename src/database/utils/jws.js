const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const verifyToken = (token) => {
  const validate = jwt.verify(token, JWT_SECRET);
  return validate;
};

const generateToken = async (email) => {
  const jwtConfig = {
    expiresIn: '12h',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: email }, JWT_SECRET, jwtConfig);
  return token;
};

module.exports = {
  generateToken,
  verifyToken,
};
