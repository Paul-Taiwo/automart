import express from 'express';
import checkAuth from '../middlewares/auth';
import validate from '../middlewares/index';
import Flag from '../controllers/flags';

const Route = express.Router();

Route.post('/flag/report', checkAuth, validate.CarId, validate.Flag, Flag.createFlag);

export default Route;
