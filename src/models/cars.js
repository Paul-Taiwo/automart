const allCarsAds = [];

const createCarAds = (data = null) => {
  if (!data) {
    throw new Error('Please provide an Object');
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

// Find one car AD
const findOneCarAd = id => allCarsAds.find(carAd => carAd.id === id);

const updateStatus = (id, data) => {
  // Find the car AD
  const carAd = findOneCarAd(id);

  carAd.status = data;

  return carAd;
};

const updateCarAdPrice = (id, data) => {
  // Find the car AD
  const carAd = findOneCarAd(id);

  carAd.price = parseFloat(data);

  return carAd;
};

export {
  createCarAds,
  updateStatus,
  updateCarAdPrice,
  allCarsAds,
};
