import { error } from 'fancy-log';
import DB from '../database/dbconnection';
import 'regenerator-runtime';

class Order {
  static async makeOrder(req, res) {
    let { carId, price, priceOffered } = req.body;
    let id; let email;

    if (req.authData) {
      ({ id, email } = { id: req.authData.user.id, email: req.authData.user.email });
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
        return error(err.stack);
      }
    }

    return res.status(500).json({
      status: 500,
      error: 'Internal Server Error',
    });
  }

  static async updateOrder(req, res) {
    const id = parseInt(req.params.id, 10);
    const { newPriceOffered } = req.body;

    try {
      const checkResult = await DB.query(`SELECT * FROM orders WHERE id = ${id}`);
      if (checkResult.rowCount === 1) {
        if (checkResult.rows[0].status === 'accepted' || checkResult.rows[0].status === 'rejected') {
          return res.status(400).json({
            status: 400,
            error: 'Cannot update price because order status is either accepted or rejected',
          });
        }

        const oldPrice = checkResult.rows[0].amount;
        const result = await DB.query(`
        UPDATE orders SET amount = ${newPriceOffered} WHERE id = ${id}
        RETURNING id, car_id, status, amount`);
        const updatedOrder = result.rows[0];

        return res.status(200).json({
          status: 200,
          data: {
            id: updatedOrder.id,
            car_id: updatedOrder.car_id,
            status: updatedOrder.status,
            old_price_offered: oldPrice,
            new_price_offered: updatedOrder.amount,
          },
        });
      }
      return res.status(200).json({
        status: 200,
        data: 'No record found',
      });
    } catch (err) {
      error(err);
    }

    return res.status(500).json({
      status: 500,
      error: 'Internal Server Error',
    });
  }
}

export default Order;
