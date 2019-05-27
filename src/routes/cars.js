import express from 'express';
import carController from '../controllers/cars';
import checkAuth from '../middlewares/auth';

const Route = express.Router();

Route.post('/car', checkAuth, carController.createAd);
Route.patch('/car/:id/status', checkAuth, carController.updateStatus);

export default Route;
