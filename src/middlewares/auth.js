import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(403).json({
      status: 403,
      error: 'Authentication failed! Please Login again',
    });
  }

  const token = authorization.split(' ')[1].trim();

  jwt.verify(token, process.env.SECRETKEY, (err, decodedData) => {
    if (err) {
      res.status(401).json({
        status: 401,
        error: 'Authentication failed! Please Login again',
      });
    }

    req.authData = decodedData;
    next();
  });
};
