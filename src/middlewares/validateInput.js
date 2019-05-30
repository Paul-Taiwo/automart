
export default (req, res, next) => {
  let {
    firstname, lastname, price, carId, priceOffered,
    newPriceOffered, manufacturer, model, state, year, bodyType,
  } = req.body;
  const { password } = req.body;

  // Remove unnecessary spaces
  firstname = firstname.trim().replace(/\s+/g, '');
  lastname = lastname.trim().replace(/\s+/g, '');
  manufacturer = manufacturer.trim().replace(/\s+/g, '');
  model = model.trim().replace(/\s+/g, '');
  state = state.trim().replace(/\s+/g, '');
  bodyType = bodyType.trim().replace(/\s+/g, '');
  carId = parseInt(carId, 10);
  year = parseInt(year, 10);
  price = parseFloat(price);
  priceOffered = parseFloat(priceOffered);
  newPriceOffered = parseFloat(newPriceOffered);

  if (!firstname || !lastname) {
    return res.status(400).json({
      status: 400,
      error: 'Name fields cannot be empty',
    });
  }

  if (!manufacturer) {
    return res.status(400).json({
      status: 400,
      error: 'Manufacturer cannot be empty',
    });
  }

  if (!model) {
    return res.status(400).json({
      status: 400,
      error: 'Model cannot be empty',
    });
  }

  if (!bodyType) {
    return res.status(400).json({
      status: 400,
      error: 'Body type cannot be empty',
    });
  }

  if (!state) {
    return res.status(400).json({
      status: 400,
      error: 'Vehicle state cannot be empty',
    });
  }

  if (!year) {
    return res.status(400).json({
      status: 400,
      error: 'Year cannot be empty',
    });
  }

  if (year.toString().length < 4 || year.toString().length > 4) {
    return res.status(400).json({
      status: 400,
      error: 'Input a valid year',
    });
  }

  if (firstname.trim().length <= 2 || lastname.trim().length <= 2) {
    return res.status(400).json({
      status: 400,
      error: 'Name fields cannot be less than 2 characters',
    });
  }

  if (manufacturer.split('').some(x => Number.isInteger(parseInt(x, 10)))) {
    return res.status(400).json({
      status: 400,
      error: 'Manufacturer field cannot contain number(s)',
    });
  }

  if (state.split('').some(x => Number.isInteger(parseInt(x, 10)))) {
    return res.status(400).json({
      status: 400,
      error: 'Car state field cannot contain number(s)',
    });
  }

  if (bodyType.split('').some(x => Number.isInteger(parseInt(x, 10)))) {
    return res.status(400).json({
      status: 400,
      error: 'Car body type cannot contain number(s)',
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

  if (Number.isNaN(price) || Number.isNaN(priceOffered) || Number.isNaN(newPriceOffered)) {
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

  if (Number.isNaN(year)) {
    return res.status(400).json({
      status: 400,
      error: 'Enter a valid Year',
    });
  }

  return next();
};
