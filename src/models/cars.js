const allCarsAds = [];

const createCarAds = (data = null) => {
  if (!data) {
    throw new Error('Please provide an object');
  }

  const id = parseInt(allCarsAds.length + 1123420, 10);
  const carData = {
    id,
    ...data,
    createdOn: new Date().toISOString(),
    status: 'available',
  };

  allCarsAds.push(carData);

  return carData;
};

export {
  createCarAds,
  allCarsAds,
};
