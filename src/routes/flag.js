import express from 'express';
import checkAuth from '../middlewares/auth';
import Flag from '../controllers/flags';

const Route = express.Router();

Route.post('/flag/report', checkAuth, Flag.createFlag);

export default Route;
