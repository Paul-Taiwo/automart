import mailer from 'nodemailer';
import { info, warn } from 'fancy-log';
import bcrypt from 'bcryptjs';
import { google } from 'googleapis';
import { config } from 'dotenv';
import gen from './email/generatePassword';
import DB from '../database/dbconnection';

config();

const OAuth = google.auth.OAuth2;
const oauth2client = new OAuth(
  process.env.CLIENT_ID,
  process.env.CLIENTSECRET,
  'https://developers.google.com/oauthplayground',
);
oauth2client.setCredentials({
  refresh_token: process.env.REFRESHTOKEN,
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
        authentication: true,
        secure: true,
        type: 'OAuth2',
        user: 'services.automart@gmail.com',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENTSECRET,
        accessToken,
        refreshToken: process.env.REFRESHTOKEN,
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
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <meta name="format-detection" content="telephone=no"/> <meta name="x-apple-disable-message-reformatting"/> <title></title><!--[if mso]> <style type="text/css"> .pc-fb-font{font-family: Helvetica, Arial, sans-serif !important;}</style><![endif]--> <style>@media screen{@font-face{font-family: 'Fira Sans'; font-style: normal; font-weight: 400; src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v8/va9E4kDNxMZdWfMOD5Vvl4jLazX3dA.woff2) format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}@font-face{font-family: 'Fira Sans'; font-style: normal; font-weight: 400; src: local(Fira Sans Regular), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v8/va9E4kDNxMZdWfMOD5Vvk4jLazX3dGTP.woff2) format(woff2); unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;}@font-face{font-family: 'Fira Sans'; font-style: normal; font-weight: 500; src: local(Fira Sans Medium), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnZKveRhf6Xl7Glw.woff2) format(woff2); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}@font-face{font-family: 'Fira Sans'; font-style: normal; font-weight: 500; src: local('Fira Sans Medium'), local(FiraSans-Medium), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnZKveQhf6Xl7Gl3LX.woff2) format('woff2'); unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;}@font-face{font-family: 'Fira Sans'; font-style: normal; font-weight: 700; src: local('Fira Sans Bold'), local(FiraSans-Bold), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnLK3eRhf6Xl7Glw.woff2) format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}@font-face{font-family: Fira Sans; font-style: normal; font-weight: 700; src: local(Fira Sans Bold), local(FiraSans-Bold), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnLK3eQhf6Xl7Gl3LX.woff2) format(woff2); unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;}@font-face{font-family: Fira Sans; font-style: normal; font-weight: 800; src: local(Fira Sans ExtraBold), local(FiraSans-ExtraBold), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnMK7eRhf6Xl7Glw.woff2) format(woff2); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}@font-face{font-family: Fira Sans; font-style: normal; font-weight: 800; src: local(Fira Sans ExtraBold), local(FiraSans-ExtraBold), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnMK7eQhf6Xl7Gl3LX.woff2) format(woff2); unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;}}.ReadMsgBody{width: 100%;}.ExternalClass{width: 100%;}.ExternalClass{line-height: 100%;}body{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule: exactly;}img{border: 0; outline: none; line-height: 100%; text-decoration: none; -ms-interpolation-mode: bicubic;}body{margin: 0; padding: 0; width: 100% !important; -webkit-font-smoothing: antialiased;}@media screen and (min-width: 621px){.pc-email-container{width: 620px !important;}}@media screen and (max-width:620px){.pc-sm-p-24-20-30{padding: 24px 20px 30px !important;}.pc-sm-mw-100pc{max-width: 100% !important;}.pc-sm-ta-center{text-align: center !important;}.pc-sm-p-35-10-15{padding: 35px 10px 15px !important;}}@media screen and (max-width:525px){.pc-xs-p-15-10-20{padding: 15px 10px 20px !important;}.pc-xs-h-100{height: 100px !important;}.pc-xs-br-disabled br{display: none !important;}.pc-xs-fs-30{font-size: 30px !important;}.pc-xs-lh-42{line-height: 42px !important;}.pc-xs-p-25-0-5{padding: 25px 0 5px !important;}}</style></head><body style="width: 100% !important; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; margin: 0; padding: 0;" class="" bgcolor="#f4f4f4"> <span style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule: exactly;">This is preheader text. Some clients will show this text as a preview.</span> <table class="pc-email-body" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="table-layout: fixed; mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse;"> <tbody> <tr style="border-collapse: collapse;"> <td class="pc-email-body-inner" align="center" valign="top" style="mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule: exactly;"><!--[if gte mso 9]> <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" src="" color="#f4f4f4"/> </v:background><![endif]--> <table class="pc-email-container" width="100%" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 620px; mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse; margin: 0 auto;"> <tbody> <tr style="border-collapse: collapse;"> <td align="left" valign="top" style="mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule: exactly; padding: 0 10px;"> <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse;"> <tbody> <tr style="border-collapse: collapse;"> <td height="20" style="font-size: 1px; line-height: 1px; mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule: exactly;"></td></tr></tbody> </table> <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse;"> <tbody> <tr style="border-collapse: collapse;"> <td background="https://images.unsplash.com/photo-1475275083424-b4ff81625b60?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=752&amp;q=80" bgcolor="#1B1B1B" align="center" valign="top" style="border-radius: 8px; mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule: exactly; background: url(https://images.unsplash.com/photo-1475275083424-b4ff81625b60?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=752&amp;q=80) center / cover;"><!--[if gte mso 9]> <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width: 600px;"> <v:fill type="frame" src="images/header-1-image-1.jpg" color="#FFFFFF"></v:fill> <v:textbox style="mso-fit-shape-to-text: true;" inset="0,0,0,0"> <div style="font-size: 0; line-height: 0;"> <table width="600" border="0" cellpadding="0" cellspacing="0" role="presentation" align="center"> <tr> <td style="font-size: 14px; line-height: 1.5;" valign="top"> <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation"> <tr> <td colspan="3" height="24" style="line-height: 1px; font-size: 1px;">&nbsp;</td></tr><tr> <td width="30" style="line-height: 1px; font-size: 1px;" valign="top">&nbsp;</td><td valign="top" align="left"><![endif]--> <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse;"> <tbody> <tr style="border-collapse: collapse;"> <td class="pc-sm-p-24-20-30 pc-xs-p-15-10-20" style="mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule: exactly; padding: 24px 30px;" valign="top"> <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse;"> <tbody> <tr style="border-collapse: collapse;"> <td valign="top" style="mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule: exactly;"> <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse;"> <tbody> <tr style="border-collapse: collapse;"> <td class="pc-sm-ta-center" valign="top" style="line-height: 18px; font-family: Helvetica, sans-serif; font-size: 14px; mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule: exactly; padding: 10px;"> <a style="text-decoration: none; font-family: Fira Sans, Helvetica, Arial, sans-serif; font-size: 43px; font-weight: 500; color: #ffffff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule: exactly;">Automart</a> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table><!--[if gte mso 9]> </td><td width="30" style="line-height: 1px; font-size: 1px;" valign="top">&nbsp;</td></tr><tr> <td colspan="3" height="40" style="line-height: 1px; font-size: 1px;">&nbsp;</td></tr></table> </td></tr></table> </div></v:textbox> </v:rect><![endif]--> </td></tr></tbody> </table> <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse;"> <tbody> <tr style="border-collapse: collapse;"> <td bgcolor="#FFFFFF" align="center" valign="top" style="border-radius: 8px; box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1); mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule: exactly;"><!--[if gte mso 9]> <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width: 600px;"> <v:fill type="frame" src="images/header-1-image-1.jpg" color="#FFFFFF"></v:fill> <v:textbox style="mso-fit-shape-to-text: true;" inset="0,0,0,0"> <div style="font-size: 0; line-height: 0;"> <table width="600" border="0" cellpadding="0" cellspacing="0" role="presentation" align="center"> <tr> <td style="font-size: 14px; line-height: 1.5;" valign="top"> <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation"> <tr> <td colspan="3" height="24" style="line-height: 1px; font-size: 1px;">&nbsp;</td></tr><tr> <td width="30" style="line-height: 1px; font-size: 1px;" valign="top">&nbsp;</td><td valign="top" align="left"><![endif]--> <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse;"> <tbody> <tr style="border-collapse: collapse;"> <td class="pc-sm-p-24-20-30 pc-xs-p-15-10-20" style="mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule: exactly; padding: 24px 30px 40px;" valign="top"> <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse;"> <tbody> <tr style="border-collapse: collapse;"> <td class="pc-xs-h-100" height="10" style="line-height: 1px; font-size: 1px; mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule: exactly;"></td></tr><tr style="border-collapse: collapse;"> <td class="pc-fb-font" style="mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule: exactly; padding: 0 10px;" valign="top"> <a style="text-decoration: none; font-family: Fira Sans, Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 500; color: #1B1B1B; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule: exactly;">Your request to reset your password</a> </td></tr><tr style="border-collapse: collapse;"> <td class="pc-xs-fs-30 pc-xs-lh-42 pc-fb-font" style="letter-spacing: -0.7px; line-height: 46px; font-family: Fira Sans, Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 700; color: #1B1B1B; mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule: exactly; padding: 13px 10px 0;" valign="top">Your new Password is : ${password}</td></tr></tbody> </table> </td></tr></tbody> </table><!--[if gte mso 9]> </td><td width="30" style="line-height: 1px; font-size: 1px;" valign="top">&nbsp;</td></tr><tr> <td colspan="3" height="40" style="line-height: 1px; font-size: 1px;">&nbsp;</td></tr></table> </td></tr></table> </div></v:textbox> </v:rect><![endif]--> </td></tr></tbody> </table> <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse;"> <tbody> <tr style="border-collapse: collapse;"> <td height="20" style="font-size: 1px; line-height: 1px; mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule: exactly;"></td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> <div class="pc-gmail-fix" style="white-space: nowrap; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule: exactly; display: none !important; font: 15px courier;"></div></body></html>`,
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
