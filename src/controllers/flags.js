import models from '../models/index';

const { Flags } = models;

class Flag {
  static createFlag(req, res) {
    let { carId, reason, description } = req.body;

    carId = parseInt(carId, 10);
    reason = reason.trim().replace(/\s+/g, ' ');
    description = description.trim().replace(/\s+/g, ' ');

    const createdFlag = Flags.createFlag({
      carId,
      reason,
      description,
    });

    return res.status(201).json({
      status: 201,
      data: {
        id: createdFlag.id,
        car_id: createdFlag.carId,
        reason: createdFlag.reason,
        description: createdFlag.description,
      },
    });
  }
}

export default Flag;
