const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');

let transporter = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
      user: emailConfig.user,
      pass: emailConfig.pass
    }
  });

  //Generar HTML
  const generarHTML = () => {
    const html = pug.renderFile('${__dirname}/../views/emails/reestablecer-password.pug')
    return juice(html);
  }
  let mailOptions = {
    from: 'UpTask <no-reply@uptask.com>', // sender address
    to: "manel.aguilera91@gmail.com", // list of receivers
    subject: "Password Reset", // Subject line
    text: "Hola", // plain text body
    html: generarHTML()
  };

  transporter.sendMail(mailOptions);

