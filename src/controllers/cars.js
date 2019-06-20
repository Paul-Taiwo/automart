import { v2 } from 'cloudinary';
import { warn, error } from 'fancy-log';
import DB from '../database/dbconnection';


v2.config({
  cloud_name: process.env.ClOUD_NAME,
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
            body_type: createdAd.bodyType,
            price: createdAd.price,
            state: createdAd.state,
            status: createdAd.status,
            year: createdAd.year,
            images: createdAd.images,
          },
        });
      } catch (err) {
        error(err);
      }
    }

    return res.status(500).json({
      status: 500,
      error: 'Internal Server Error',
    });
  }
}

export default CarAds;
