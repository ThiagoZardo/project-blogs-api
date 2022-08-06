const errorMiddleware = (err, _req, res, _next) => {
  console.error(err.message);
  res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = errorMiddleware;