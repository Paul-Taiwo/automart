import express from 'express';
import validate from '../middlewares/index';
import userController from '../controllers/users';
import password from '../services/mailer';

const Route = express.Router();

Route.post('/auth/signup', validate.Name, validate.Email, validate.PassWord, userController.createUser);
Route.post('/auth/admin/signup', validate.Name, validate.Email, validate.PassWord, userController.createUser);
Route.post('/auth/signin', validate.Email, userController.login);
Route.post('/users/:email/reset_password', password.reset);

export default Route;
