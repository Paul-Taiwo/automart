import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
import { error } from 'fancy-log';
import DB from '../database/dbconnection';
import 'regenerator-runtime';

config();

class Users {
  static async createUser(req, res) {
    let { firstname, lastname, address } = req.body;

    const { email, password } = req.body;

    // Remove unnecessary spaces
    firstname = firstname.trim().replace(/\s+/g, '');
    lastname = lastname.trim().replace(/\s+/g, '');
    address = address.trim().replace(/\s+/g, ' ');

    // Encrypt password
    const encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const query = `
      INSERT INTO users(firstname, lastname, email, password, address)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, firstname, lastname, email, address, is_admin ;`;
    const userData = [
      firstname,
      lastname,
      email,
      encryptedPassword,
      address,
    ];
    try {
      const result = await DB.query(query, userData);

      return res.status(201).json({
        status: 201,
        data: {
          id: result.rows[0].id,
          first_name: result.rows[0].firstname,
          last_name: result.rows[0].lastname,
          email: result.rows[0].email,
          address: result.rows[0].address,
          is_admin: result.rows[0].is_admin,
        },
      });
    } catch (err) {
      if (err) {
        error(err.stack);
      }
    }
    return res.status(500).json({
      status: 500,
      error: 'Internal Server Error',
    });
  }
}

export default Users;
