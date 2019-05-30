export default (req, res, next) => {
  let { priceOffered } = req.body;

  priceOffered = parseFloat(priceOffered);

  if (Number.isNaN(priceOffered)) {
    return res.status(400).json({
      status: 400,
      error: 'Enter a valid price',
    });
  }

  return next();
};
