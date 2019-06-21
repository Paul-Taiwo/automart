import mailer from 'nodemailer';
import { info, warn } from 'fancy-log';
import bcrypt from 'bcryptjs';
import gen from './email/generatePassword';
import DB from '../database/dbconnection';


class Password {
  static async reset(req, res) {
    const password = gen();
    const newPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const mail = `<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <meta http-equiv="X-UA-Compatible" content="ie=edge"> <title>Password Reset</title> <style>body{margin: 4% 0;}body h1{background-color: green; font-size: 4em; color: white; padding: 2%; border-radius: 10px; margin: 0; width: 100%; padding: 2% 4%; max-width: 65%; margin: 0 auto;}div{color: white; background-color: #0d0d0d; display: block; padding: 4%; max-width: 65%; margin: 2px auto; border-radius: 22px;}div h2{font-size: 2.8em; margin: 0;}div p{font-size: 1.7em; margin-bottom: 0;}#passwrd{font-size: 1.3em; font-weight: 800;}</style></head><body> <h1>Automart</h1> <div> <h2>Password reset</h2> <p>Your new password is: <span id="passwrd">${password}</span></p></div></body></html>`;

    const message = {
      from: '"Automart - Password Reset" <services.automart@gmail.com>',
      to: req.body.email,
      subject: 'Your new password',
      html: mail,
    };

    const transporter = mailer.createTransport({
      service: 'gmail',
      auth: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        type: 'OAuth2',
        user: 'services.automart@gmail.com',
        password: 'PAULot2000.',
        clientId: '988280272567-7g5qitg9gogbsg5euagisoh6h5a27bek.apps.googleusercontent.com',
        clientSecret: 'H12cKekdUPY6coQtdD-fdtzO',
        accessToken: 'ya29.GlsuByoxeS0MgYUBG1E8sa6-duIlbYZz5eBgERpnWWXEp75_MVe4uYIfF5frsKqwOeWDSohHbOOO6eDb3W96D6tiaTekhw95PW-lA95jgIw6Dz_7btJqcwcV3fhQ',
        refreshToken: '1/Y0PYvPQ5uVUaTLdvWDWN9ydLXf6PKwzpl2EDuc6cB9Q',
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

      await DB.query(`UPDATE users SET password = '${newPassword}'   WHERE email = '${req.params.email}'`);

      const result = await transporter.sendMail(message);
      info(result);

      res.status(201).json({
        status: 201,
        data: 'Check your mail for your new password',
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
