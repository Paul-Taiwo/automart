import express from 'express';
import multipart from 'connect-multiparty';
import carController from '../controllers/cars';
import checkAuth from '../middlewares/auth';
import validate from '../middlewares/index';

const Route = express.Router();
const multiparty = multipart();

Route.post('/car', checkAuth, multiparty, validate.Car, carController.createAd);

export default Route;
