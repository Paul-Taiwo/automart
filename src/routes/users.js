import express from 'express';
import userController from '../controllers/users';

const Route = express.Router();

Route.post('/auth/signup', userController.createUser);

export default Route;
