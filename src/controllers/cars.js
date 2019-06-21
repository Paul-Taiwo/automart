/* eslint-disable camelcase */
import { v2 } from 'cloudinary';
import { warn } from 'fancy-log';
import DB from '../database/dbconnection';


v2.config({
  cloud_name: process.env.CL_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

class CarAds {
  static async createAd(req, res) {
    // Request body
    let id; let userEmail;
    let {
      manufacturer, model, price, state, year, bodyType,
    } = req.body;

    if (req.authData) {
      // Format Inputs
      manufacturer = manufacturer.trim().replace(/\s+/g, '');
      model = model.trim().replace(/\s+/g, '');
      price = parseFloat(price);
      state = state.trim().replace(/\s+/g, '');
      year = parseInt(year, 10);
      bodyType = bodyType.trim().replace(/\s+/g, '');

      ({ id, userEmail } = { id: req.authData.user.id, userEmail: req.authData.user.email });
      // Create promise
      const multipleUpload = new Promise((resolve, reject) => {
        const imageUrl = [];
        if (req.files.image.length > 1) {
          req.files.image.forEach((x) => {
            v2.uploader.upload(x.path, (err, result) => {
              if (result) imageUrl.push(result.url);
              if (imageUrl.length === req.files.image.length) {
                resolve(imageUrl);
              } else if (err) {
                warn(err);
                reject(err);
              }
            });
          });
        }
      })
        .then(result => result)
        .catch(err => err);

      // Wait until promise is resolved
      const imgUrl = await multipleUpload;
      if (imgUrl.code || imgUrl.errno) {
        return res.status(500).json({
          status: 500,
          error: imgUrl,
        });
      }

      const query = `
                INSERT INTO cars(owner, email, "createdOn", manufacturer, model, body_type, price, state, year, images)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                RETURNING id, owner, email, "createdOn", manufacturer, model, body_type, price, state, status, year, images; `;

      const adsData = [
        id,
        userEmail,
        new Date().toISOString(),
        manufacturer,
        model,
        bodyType,
        price,
        state,
        year,
        imgUrl,
      ];

      try {
        const result = await DB.query(query, adsData);
        const createdAd = result.rows[0];

        return res.status(201).json({
          status: 201,
          data: {
            id: createdAd.id,
            owner: createdAd.owner,
            email: createdAd.email,
            created_on: createdAd.createdOn,
            manufacturer: createdAd.manufacturer,
            model: createdAd.model,
            body_type: createdAd.body_type,
            price: createdAd.price,
            state: createdAd.state,
            status: createdAd.status,
            year: createdAd.year,
            images: createdAd.images,
          },
        });
      } catch (err) {
        warn(err.stack);
      }
    }

    return res.status(500).json({
      status: 500,
      error: 'Internal Server Error',
    });
  }

  static async updateStatus(req, res) {
    const id = parseInt(req.params.id, 10);
    let { status } = req.body;
    status = status.trim().replace(/\s+/g, '');

    try {
      const result = await DB.query(`
        UPDATE cars SET status = '${status}' WHERE id = '${id}'
        RETURNING id, owner, email, "createdOn", manufacturer, model, body_type, price, state, status, year, images; `);
      const updatedAd = result.rows[0];

      return res.status(200).json({
        status: 200,
        data: {
          id: updatedAd.id,
          owner: updatedAd.owner,
          email: updatedAd.email,
          updated_on: updatedAd.createdOn,
          manufacturer: updatedAd.manufacturer,
          model: updatedAd.model,
          body_type: updatedAd.body_type,
          price: updatedAd.price,
          state: updatedAd.state,
          status: updatedAd.status,
          year: updatedAd.year,
          images: updatedAd.images,
        },
      });
    } catch (err) {
      warn(err.stack);
      if (err.routine === 'enum_in') {
        return res.status(400).json({
          status: 400,
          error: 'Status can only be updated to sold',
        });
      }
    }
    return res.status(500).json({
      status: 500,
      error: 'Internal Server Error',
    });
  }

  static async updateCarPrice(req, res) {
    const id = parseInt(req.params.id, 10);

    try {
      const result = await DB.query(`
          UPDATE cars SET price = '${req.body.price}' WHERE id = '${id}'
          RETURNING id, owner, email, "createdOn", manufacturer, model, body_type, price, state, status, year, images; `);
      const updatedAd = result.rows[0];

      return res.status(200).json({
        status: 200,
        data: {
          id: updatedAd.id,
          owner: updatedAd.owner,
          email: updatedAd.email,
          updated_on: updatedAd.createdOn,
          manufacturer: updatedAd.manufacturer,
          model: updatedAd.model,
          body_type: updatedAd.body_type,
          price: updatedAd.price,
          state: updatedAd.state,
          status: updatedAd.status,
          year: updatedAd.year,
          images: updatedAd.images,
        },
      });
    } catch (err) {
      warn(err.stack);
      if (err.routine === 'float8in_internal') {
        return res.status(400).json({
          status: 400,
          error: 'Please enter a valid price',
        });
      }
    }
    return res.status(500).json({
      status: 500,
      error: 'Internal Server Error',
    });
  }

  static async findSpecificCar(req, res) {
    const id = parseInt(req.params.id, 10);

    try {
      const result = await DB.query(`SELECT * FROM cars WHERE id = ${id}`);
      const carAd = result.rows[0];

      return res.status(200).json({
        status: 200,
        data: {
          id: carAd.id,
          owner: carAd.owner,
          email: carAd.email,
          created_on: carAd.createdOn,
          manufacturer: carAd.manufacturer,
          model: carAd.model,
          price: carAd.price,
          state: carAd.state,
          status: carAd.status,
          year: carAd.year,
          body_type: carAd.body_type,
          images: carAd.images,
        },
      });
    } catch (err) {
      warn(err.stack);
      return res.status(200).json({
        status: 200,
        data: 'No record found',
      });
    }
  }

  static async find(req, res) {
    const { is_admin } = req.authData.user;
    const { query } = req;

    if (is_admin && Object.entries(query).length === 0) {
      try {
        const { rows } = await DB.query('SELECT * FROM cars');

        return res.status(200).json({
          status: 200,
          data: rows,
        });
      } catch (err) {
        warn(err.stack);

        return res.status(200).json({
          status: 200,
          data: 'No record found',
        });
      }
    }

    if (query.status && query.min_price && query.max_price) {
      try {
        const { rows } = await DB.query(
          `SELECT * FROM cars WHERE status = '${query.status}'
          AND price > '${query.min_price}'
          AND price < '${query.max_price}'`,
        );

        if (rows.length === 0) {
          return res.status(200).json({
            status: 200,
            data: 'No record found',
          });
        }
        return res.status(200).json({
          status: 200,
          data: rows,
        });
      } catch (err) {
        warn(err.stack);
      }
    }

    if (query.status && query.manufacturer) {
      try {
        const { rows } = await DB.query(
          `SELECT * FROM cars WHERE status = '${query.status}'
          AND manufacturer = '${query.manufacturer}'`,
        );

        if (rows.length === 0) {
          return res.status(200).json({
            status: 200,
            data: 'No record found',
          });
        }

        return res.status(200).json({
          status: 200,
          data: rows,
        });
      } catch (err) {
        warn(err.stack);
      }
    }

    if (query.status && query.bodyType) {
      try {
        const { rows } = await DB.query(
          `SELECT * FROM cars WHERE status = '${query.status}'
          AND body_type = '${query.bodyType}'`,
        );

        if (rows.length === 0) {
          return res.status(200).json({
            status: 200,
            data: 'No record found',
          });
        }

        return res.status(200).json({
          status: 200,
          data: rows,
        });
      } catch (err) {
        warn(err.stack);
      }
    }

    if (query.status) {
      try {
        const { rows } = await DB.query(`SELECT * FROM cars WHERE status = '${query.status}'`);
        if (rows.length === 0) {
          return res.status(200).json({
            status: 200,
            data: 'No record found',
          });
        }
        return res.status(200).json({
          status: 200,
          data: rows,
        });
      } catch (err) {
        warn(err.stack);
        return res.status(200).json({
          status: 200,
          data: 'No record found',
        });
      }
    }

    return res.status(400).json({
      status: 400,
      error: 'Bad Request',
    });
  }

  static async deleteAd(req, res) {
    const { is_admin } = req.authData.user;

    if (is_admin) {
      const id = parseInt(req.params.id, 10);

      try {
        const result = await DB.query(`DELETE FROM cars WHERE id = '${id}'`);

        if (result.rowCount === 0) {
          return res.status(200).json({
            status: 200,
            data: 'No record found',
          });
        }

        return res.status(200).json({
          status: 200,
          data: 'Car Ad successfully deleted',
        });
      } catch (err) {
        warn(err);
      }
    }

    return res.status(403).json({
      status: 403,
      error: 'Forbidden: Only Admin can delete an AD',
    });
  }
}

export default CarAds;
