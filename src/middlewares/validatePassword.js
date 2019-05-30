
export default (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({
      status: 400,
      error: 'Password field cannot be empty',
    });
  }

  if (password.trim().length < 8) {
    return res.status(400).json({
      status: 400,
      error: 'Password cannot be less than 8 characters',
    });
  }

  return next();
};
