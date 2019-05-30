import express from 'express';
import orderController from '../controllers/order';
import checkAuth from '../middlewares/auth';
import validate from '../middlewares/index';

const Route = express.Router();

Route.post('/order', checkAuth, validate.CarId, validate.Order, orderController.makeOrder);
Route.patch('/order/:id/price', checkAuth, validate.NewPrice, orderController.updateOrder);

export default Route;
