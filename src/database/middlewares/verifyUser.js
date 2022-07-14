const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: 'Some required fields are missing',
    });
  }
  next();
};

const validateUser = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const emailRegex = /\S+@\S+\.\S+/;
  let errorMessage = ''; 
  if (displayName.length < 8) {
    errorMessage = '"displayName" length must be at least 8 characters long';
    return res.status(400).json({ message: errorMessage });
  }
  if (!emailRegex.test(email)) {
    errorMessage = '"email" must be a valid email';
    return res.status(400).json({ message: errorMessage });
  }
  if (password.length < 6) {
    errorMessage = '"password" length must be at least 6 characters long';
    return res.status(400).json({ message: errorMessage });
  }
  next();
};

module.exports = {
  validateLogin,
  validateUser,
};
