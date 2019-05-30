export default (req, res, next) => {
  let {
    manufacturer, model, state, year, bodyType, price,
  } = req.body;

  manufacturer = manufacturer.trim().replace(/\s+/g, '');
  model = model.trim().replace(/\s+/g, '');
  state = state.trim().replace(/\s+/g, '');
  bodyType = bodyType.trim().replace(/\s+/g, '');
  year = parseInt(year, 10);
  price = parseFloat(price);

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

  if (Number.isNaN(price)) {
    return res.status(400).json({
      status: 400,
      error: 'Enter a valid price',
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
