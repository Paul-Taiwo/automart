import { error } from 'fancy-log';
import DB from '../database/dbconnection';
import 'regenerator-runtime';

class Flag {
  static async createFlag(req, res) {
    let { carId, reason, description } = req.body;

    carId = parseInt(carId, 10);
    reason = reason.trim().replace(/\s+/g, ' ');
    description = description.trim().replace(/\s+/g, ' ');

    const query = `
    INSERT INTO flags("createdOn", car_id, reason, description)
    VALUES ($1, $2, $3, $4)
    RETURNING id, "createdOn", car_id, reason, description;
    `;
    const userData = [
      new Date().toISOString(),
      carId,
      reason,
      description,
    ];

    try {
      const result = await DB.query(query, userData);
      const createdFlag = result.rows[0];
      return res.status(201).json({
        status: 201,
        data: {
          id: createdFlag.id,
          created_on: createdFlag.createdOn,
          car_id: createdFlag.car_id,
          reason: createdFlag.reason,
          description: createdFlag.description,
        },
      });
    } catch (err) {
      // swallow error
    }

    return res.status(500).json({
      status: 500,
      error: 'Internal Server Error',
    });
  }
}

export default Flag;
