
const validate = (req, res, next) => {
  let {
    firstname, lastname, price, carId, priceOffered,
  } = req.body;
  const { password } = req.body;

  // Remove unnecessary spaces
  firstname = firstname.trim().replace(/\s+/g, '');
  lastname = lastname.trim().replace(/\s+/g, '');
  carId = parseInt(carId, 10);
  price = parseFloat(price);
  priceOffered = parseFloat(priceOffered);

  if (!firstname || !lastname) {
    return res.status(400).json({
      status: 400,
      error: 'Name fields cannot be empty',
    });
  }

  if (firstname.trim().length <= 2 || lastname.trim().length <= 2) {
    return res.status(400).json({
      status: 400,
      error: 'Name fields cannot be less than 2 characters',
    });
  }

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

  if (Number.isNaN(price) || Number.isNaN(priceOffered)) {
    return res.status(400).json({
      status: 400,
      error: 'Enter a valid price',
    });
  }

  if (Number.isNaN(carId)) {
    return res.status(400).json({
      status: 400,
      error: 'Enter a valid ID',
    });
  }

  return next();
};


export default validate;
