import models from '../models';

const { Cars } = models;

class CarAds {
  static createAd(req, res) {
    let {
      manufacturer, model, price, state, year, bodyType,
    } = req.body;

    const { email } = req.authData.user;
    manufacturer = manufacturer.trim();
    model = model.trim();
    price = parseFloat(price.trim());
    state = state.trim();
    year = parseInt(year.trim(), 10);
    bodyType = bodyType.trim();

    const adsData = Cars.createCarAds({
      email,
      manufacturer,
      model,
      price,
      state,
      year,
      bodyType,
    });

    return res.status(201).json({
      status: 201,
      data: {
        id: adsData.id,
        email: adsData.email,
        createdOn: adsData.createdOn,
        manufacturer: adsData.manufacturer,
        model: adsData.model,
        price: adsData.price,
        state: adsData.state,
        status: adsData.status,
        year: adsData.year,
        bodyType: adsData.bodyType,
      },
    });
  }

  static updateStatus(req, res) {
    const id = parseInt(req.params.id, 10);
    const updatedAd = Cars.updateStatus(id, req.body.status.trim());

    return res.status(200).json({
      status: 200,
      data: {
        id: updatedAd.id,
        email: updatedAd.email,
        createdOn: updatedAd.createdOn,
        manufacturer: updatedAd.manufacturer,
        model: updatedAd.model,
        price: updatedAd.price,
        state: updatedAd.state,
        status: updatedAd.status,
        year: updatedAd.year,
        bodyType: updatedAd.bodyType,
      },
    });
  }

  static updateCarPrice(req, res) {
    const id = parseInt(req.params.id, 10);
    const updatedAd = Cars.updateCarAdPrice(id, req.body.price);

    return res.status(200).json({
      status: 200,
      data: {
        id: updatedAd.id,
        email: updatedAd.email,
        createdOn: updatedAd.createdOn,
        manufacturer: updatedAd.manufacturer,
        model: updatedAd.model,
        price: updatedAd.price,
        state: updatedAd.state,
        status: updatedAd.status,
        year: updatedAd.year,
        bodyType: updatedAd.bodyType,
      },
    });
  }

  static findSpecificCar(req, res) {
    const id = parseInt(req.params.id, 10);
    const carAd = Cars.allCarsAds.find(car => car.id === id);
    return res.status(200).json({
      id: carAd.id,
      email: carAd.email,
      createdOn: carAd.createdOn,
      manufacturer: carAd.manufacturer,
      model: carAd.model,
      price: carAd.price,
      state: carAd.state,
      status: carAd.status,
      year: carAd.year,
      bodyType: carAd.bodyType,
    });
  }

  static filterAds(req, res) {
    const { query } = req;

    if (query.status && query.min_price && query.max_price) {
      // eslint-disable-next-line max-len
      const filtered = Cars.allCarsAds.filter(x => x.status === query.status && x.price > query.min_price && x.price < query.max_price);
      return res.status(200).json({
        status: 200,
        data: filtered,
      });
    }

    if (query.status && query.manufacturer) {
      // eslint-disable-next-line max-len
      const filtered = Cars.allCarsAds.filter(x => x.status === query.status && x.manufacturer === query.manufacturer);
      return res.status(200).json({
        status: 200,
        data: filtered,
      });
    }

    if (query.status && query.state) {
      // eslint-disable-next-line max-len
      const filtered = Cars.allCarsAds.filter(x => x.status === query.status && x.state === query.state);
      return res.status(200).json({
        status: 200,
        data: filtered,
      });
    }

    const carAds = Cars.allCarsAds.filter(carAd => carAd.status === req.query.status);
    return res.status(200).json({
      status: 200,
      data: carAds,
    });
  }
}

export default CarAds;
