const services = require('../services/ServiceLogin');

const login = async (req, res) => {
  const { email, password } = req.body;
  const userLogin = await services.login(email, password);
  console.log(userLogin);
  if (!userLogin) {
    return res.status(400).json({
      message: 'Invalid fields',
    });
  }
  return res.status(200).json({
    token: userLogin,
  });
};

module.exports = {
  login,
};
