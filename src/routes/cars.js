import express from 'express';
import carController from '../controllers/cars';
import checkAuth from '../middlewares/auth';

const Route = express.Router();

Route.post('/', checkAuth, carController.createAd);
Route.get('/:id', checkAuth, carController.findSpecificCar);
Route.get('/', checkAuth, carController.find);
Route.patch('/:id/status', checkAuth, carController.updateStatus);
Route.patch('/:id/price', checkAuth, carController.updateCarPrice);

export default Route;
