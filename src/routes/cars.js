import express from 'express';
import carController from '../controllers/cars';
import checkAuth from '../middlewares/auth';
import validate from '../middlewares/index';

const Route = express.Router();

Route.post('/car', checkAuth, validate.Input, carController.createAd);
Route.get('/car/:id', checkAuth, carController.findSpecificCar);
Route.get('/car/', checkAuth, carController.find);
Route.patch('/car/:id/status', checkAuth, carController.updateStatus);
Route.patch('/car/:id/price', checkAuth, carController.updateCarPrice);
Route.delete('/car/:id', checkAuth, carController.deleteAd);

export default Route;
