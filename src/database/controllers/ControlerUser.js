const services = require('../services/ServiceUser');

const createUser = async (req, res) => {
  const newUser = await services.createUser(req.body);
  if (!newUser) return res.status(409).json({ message: 'User already registered' });
  return res.status(201).json(newUser);
};

const listUsers = async (req, res) => {
  const users = await services.listUsers(req.userId);
  return res.status(200).json(users);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const user = await services.findById(id, req.userId);
  if (user.length === 0) return res.status(404).json({ message: 'User does not exist' });
  return res.status(200).json(user[0].dataValues);
};

module.exports = {
  createUser,
  listUsers,
  findById,
};
