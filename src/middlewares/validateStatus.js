export default (req, res, next) => {
  let { status } = req.body;

  status = status.trim().replace(/\s+/g, '');

  if (!status) {
    return res.status(400).json({
      status: 400,
      error: 'Status cannot be empty',
    });
  }

  if (status.split('').some(x => Number.isInteger(parseInt(x, 10)))) {
    return res.status(400).json({
      status: 400,
      error: 'Status cannot contain number(s)',
    });
  }

  return next();
};
