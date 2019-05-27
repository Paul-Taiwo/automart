import models from '../models';

const { Orders } = models;

class Order {
  static makeOrder(req, res) {
    let { carId, price, priceOffered } = req.body;


    carId = parseInt(carId.trim(), 10);
    price = parseFloat(price.trim());
    priceOffered = parseFloat(priceOffered.trim());

    const createdOrder = Orders.createOrder({
      carId,
      price,
      priceOffered,
    });

    return res.status(201).json({
      status: 201,
      data: {
        id: createdOrder.id,
        car_id: createdOrder.carId,
        created_on: createdOrder.created_on,
        status: createdOrder.status,
        price: createdOrder.price,
        priceOffered: createdOrder.priceOffered,
      },
    });
  }
}

export default Order;
