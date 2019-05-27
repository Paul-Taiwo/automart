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
}

export default CarAds;
