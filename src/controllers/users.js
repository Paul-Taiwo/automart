import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import models from '../models';

dotenv.config();

const { User } = models;

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

  static login(req, res) {
    const { email, password } = req.body;

    // Check if email is present in Users array
    const found = User.allUsers.some(user => user.email === email);

    if (!found) {
      return res.status(400).json({
        status: 400,
        error: 'Email not found',
      });
    }

    // Get User using the email
    const user = User.findEmail(email);

    // Compare password
    const comparePassword = bcrypt.compareSync(password, user.encryptedPassword);
    if (!comparePassword) {
      res.status(400).json({
        status: 400,
        error: 'Password is incorrect',
      });
    }

    const token = jwt.sign({ user }, process.env.SECRETKEY, { expiresIn: '3h' });

    return res.status(200).json({
      status: 200,
      data: {
        token,
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  }
}

export default Users;
