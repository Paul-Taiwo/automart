import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import models from '../models';

dotenv.config();

const {
  User,
} = models;

class Users {
  static createUser(req, res) {
    const {
      firstname,
      lastname,
      password,
      address,
      email,
    } = req.body;

    const encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const create = User.createUser({
      firstname,
      lastname,
      encryptedPassword,
      address,
      email,
    });

    const token = jwt.sign({ create }, process.env.SECRETKEY, { expiresIn: '3h' });

    return res.status(201).json({
      status: 201,
      data: {
        token,
        id: create.id,
        firstname: create.firstname,
        lastname: create.lastname,
        email: create.email,
      },
    });
  }
}

export default Users;
