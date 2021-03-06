export default (req, res, next) => {
  const { firstname, lastname } = req.body;
  // Check if firstname and lastname contains a number

  if (!firstname || !lastname) {
    return res.status(400).json({
      status: 400,
      error: 'Name fields cannot be empty',
    });
  }

  const yes = `${firstname}${lastname}`.split('').some(x => Number.isInteger(parseInt(x, 10)));

  if (yes) {
    return res.status(400).json({
      status: 400,
      error: 'Name cannot contain number(s)',
    });
  }

  if (firstname.trim().length <= 2 || lastname.trim().length <= 2) {
    return res.status(400).json({
      status: 400,
      error: 'Name fields cannot be less than 2 characters',
    });
  }


  return next();
};
