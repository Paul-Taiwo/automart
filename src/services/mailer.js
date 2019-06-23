import mailer from 'nodemailer';
import { info, warn } from 'fancy-log';
import bcrypt from 'bcryptjs';
import { google } from 'googleapis';
import gen from './email/generatePassword';
import DB from '../database/dbconnection';

const OAuth = google.auth.OAuth2;
const oauth2client = new OAuth(
  '988280272567-v08qre9ets9jj31hf95bkfchtfu9n7i7.apps.googleusercontent.com',
  'jGWixSuFSUkMgG8h1ommsnLi',
  'https://developers.google.com/oauthplayground',
);
oauth2client.setCredentials({
  refresh_token: '1/5d0afFfB4oJwglnwfyvA0o6Ik6v2xd5TqYZQNs2zS7Y',
});

class Password {
  static async reset(req, res) {
    const tokens = await oauth2client.getRequestHeaders();
    const accessToken = tokens.Authorization.split(' ')[1];
    // const password = gen();
    let password;
    let newPassword;

    const transporter = mailer.createTransport({
      service: 'gmail',
      auth: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        type: 'OAuth2',
        user: 'services.automart@gmail.com',
        clientId: '988280272567-v08qre9ets9jj31hf95bkfchtfu9n7i7.apps.googleusercontent.com',
        clientSecret: 'jGWixSuFSUkMgG8h1ommsnLi',
        accessToken,
        refreshToken: '1/5d0afFfB4oJwglnwfyvA0o6Ik6v2xd5TqYZQNs2zS7Y',
      },
    });

    try {
      const check = await DB.query(`SELECT * FROM users WHERE email = '${req.params.email}'`);

      if (check.rowCount === 0) {
        return res.status(400).json({
          status: 400,
          error: `User with email ${req.params.email} not found.`,
        });
      }

      if (Object.entries(req.body).length >= 2) {
        const comparePassword = bcrypt.compareSync(req.body.password, check.rows[0].password);

        if (!comparePassword) {
          return res.status(400).json({
            status: 400,
            error: 'Password is incorrect',
          });
        }
        password = req.body.newPassword;
      } else {
        password = gen();
      }
      newPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      await DB.query(`UPDATE users SET password = '${newPassword}'   WHERE email = '${req.params.email}'`);

      const result = await transporter.sendMail({
        from: '"Automart - Password Reset" <services.automart@gmail.com>',
        to: req.params.email,
        subject: 'Your new password',
        html: `<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <meta http-equiv="X-UA-Compatible" content="ie=edge"> <title>Password Reset</title> <style>body{margin: 4% 0;}body h1{background-color: green; font-size: 4em; color: white; padding: 2%; border-radius: 10px; margin: 0; width: 100%; padding: 2% 4%; max-width: 65%; margin: 0 auto;}div{color: white; background-color: #0d0d0d; display: block; padding: 4%; max-width: 65%; margin: 2px auto; border-radius: 22px;}div h2{font-size: 2.8em; margin: 0;}div p{font-size: 1.7em; margin-bottom: 0;}#passwrd{font-size: 1.3em; font-weight: 800;}</style></head><body> <h1>Automart</h1> <div> <h2>Password reset</h2> <p>Your new password is: <span id="passwrd">${password}</span></p></div></body></html>`,
      });
      info(result);

      res.status(201).json({
        status: 201,
        data: 'Check your email for your new password',
      });
    } catch (err) {
      warn(err);
      return res.status(500).json({
        status: 500,
        error: 'Internal Server Error',
      });
    }
    return false;
  }
}

export default Password;
