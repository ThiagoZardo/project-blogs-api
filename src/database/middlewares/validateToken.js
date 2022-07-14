const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const verifyToken = (token) => {
  const validate = jwt.verify(token, JWT_SECRET);
  return validate;
};

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const verifyTokeValidate = verifyToken(token);
    if (verifyTokeValidate) next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

const generateToken = async (email) => {
  const jwtConfig = {
    expiresIn: '5h',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: email }, JWT_SECRET, jwtConfig);
  return token;
};

module.exports = {
  validateToken,
  generateToken,
};
