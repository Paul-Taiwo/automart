export default (req, res, next) => {
  let { newPriceOffered } = req.body;

  newPriceOffered = parseFloat(newPriceOffered);

  if (Number.isNaN(newPriceOffered)) {
    return res.status(400).json({
      status: 400,
      error: 'Enter a valid price',
    });
  }

  return next();
};
