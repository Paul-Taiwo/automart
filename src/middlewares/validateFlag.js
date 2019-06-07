export default (req, res, next) => {
  const { reason, description } = req.body;

  if (!reason) {
    return res.status(400).json({
      status: 400,
      error: 'Reason field cannot be empty',
    });
  }

  if (!description) {
    return res.status(400).json({
      status: 400,
      error: 'Description field cannot be empty',
    });
  }

  return next();
};
