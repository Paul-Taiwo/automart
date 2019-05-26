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
    let { firstname, lastname, address } = req.body;

    const { email, password } = req.body;

    firstname = firstname.trim();
    lastname = lastname.trim();
    address = address.trim();

    const encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const user = User.createUser({
      firstname,
      lastname,
      encryptedPassword,
      address,
      email,
    });

    const token = jwt.sign({ user }, process.env.SECRETKEY, { expiresIn: '3h' });

    if (Object.keys(user).length < 1) {
      return res.status(500).json({
        status: 500,
        error: 'Unexpected server error occured.',
      });
    }

    return res.status(201).json({
      status: 201,
      data: {
        token,
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        address: user.address,
      },
    });
  }
}

export default Users;
