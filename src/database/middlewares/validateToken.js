const { verifyToken } = require('../utils/jws');
const { User } = require('../models');

const middlewareValidateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const verifyTokeValidate = verifyToken(token);
    /* Aqui salvei o id do usuário que fez a requisição para que possa ser ser tratado
    por todos os métodos. */
    const emailUser = verifyTokeValidate.data;
    const user = await User.findOne({ where: { email: emailUser } });
    req.userId = user.id;
    if (verifyTokeValidate) next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  middlewareValidateToken,
};
