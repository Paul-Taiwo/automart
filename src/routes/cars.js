import express from 'express';
import multer from 'multer';
import carController from '../controllers/cars';
import checkAuth from '../middlewares/auth';
import validate from '../middlewares/index';

const Route = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage }).array('images');

Route.post('/car', checkAuth, upload, validate.Car, carController.createAd);
Route.patch('/car/:id/status', checkAuth, validate.Status, carController.updateStatus);
Route.patch('/car/:id/price', checkAuth, validate.Price, carController.updateCarPrice);
Route.get('/car/:id', checkAuth, carController.findSpecificCar);
Route.get('/car/', checkAuth, carController.find);
Route.delete('/car/:id', checkAuth, carController.deleteAd);

export default Route;
