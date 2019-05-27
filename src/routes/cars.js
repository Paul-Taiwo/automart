import express from 'express';
import carController from '../controllers/cars';
import checkAuth from '../middlewares/auth';

const Route = express.Router();

Route.post('/car', checkAuth, carController.createAd);
Route.get('/car/:id', checkAuth, carController.findSpecificCar);
Route.patch('/car/:id/status', checkAuth, carController.updateStatus);
Route.patch('/car/:id/price', checkAuth, carController.updateCarPrice);

export default Route;
