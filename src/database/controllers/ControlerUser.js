const services = require('../services/ServiceUser');

const createUser = async (req, res) => {
  const newUser = await services.createUser(req.body);
  if (!newUser) return res.status(409).json({ message: 'User already registered' });
  return res.status(201).json(newUser);
};

module.exports = {
  createUser,
};
