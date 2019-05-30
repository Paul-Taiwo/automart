export default (req, res, next) => {
  let { price } = req.body;

  price = parseFloat(price);

  if (Number.isNaN(price)) {
    return res.status(400).json({
      status: 400,
      error: 'Enter a valid price',
    });
  }

  return next();
};
