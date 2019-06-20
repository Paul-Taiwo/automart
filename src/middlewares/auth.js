import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      status: 401,
      error: 'Authentication failed! Please Login again',
    });
  }
  const token = authorization.split(' ')[1].trim();

  try {
    const decodedData = jwt.verify(token, process.env.SECRETKEY);
    req.authData = decodedData;
    return next();
  } catch (err) {
    return res.status(401).json({
      status: 401,
      error: 'Authentication failed! Please Login again',
    });
  }
};
