import { error } from 'fancy-log';
import DB from '../database/dbconnection';
import 'regenerator-runtime';

class Order {
  static async makeOrder(req, res) {
    const { id, email } = req.authData.user;
    let { carId, price, priceOffered } = req.body;


    carId = parseInt(carId, 10);
    price = parseFloat(price);
    priceOffered = parseFloat(priceOffered);

    const query = `
          INSERT INTO orders(buyer, email, car_id, "createdOn", amount)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING id, buyer, email, car_id, "createdOn", amount, status; `;
    const orderData = [
      id,
      email,
      carId,
      new Date().toISOString(),
      priceOffered,
    ];
    try {
      const result = await DB.query(query, orderData);
      const createdOrder = result.rows[0];

      return res.status(201).json({
        status: 201,
        data: {
          id: createdOrder.id,
          car_id: createdOrder.car_id,
          created_on: createdOrder.createdOn,
          status: createdOrder.status,
          price,
          priceOffered: createdOrder.amount,
        },
      });
    } catch (err) {
      error(err.stack);
    }

    return res.status(500).json({
      status: 500,
      error: 'Internal Server Error',
    });
  }
}

export default Order;
