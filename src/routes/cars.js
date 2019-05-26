import express from 'express';
import carController from '../controllers/cars';

const Route = express.Router();

Route.post('/car', carController.createAd);

export default Route;
