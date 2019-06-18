import express from 'express';
import validate from '../middlewares/index';
import userController from '../controllers/users';

const Route = express.Router();

Route.post('/auth/signup', validate.Name, validate.Email, validate.PassWord, userController.createUser);

export default Route;
