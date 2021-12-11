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
  const generarHTML = (archivo, opciones = {}) => {
    const html = pug.renderFile(`${__dirname}/../views/emails/${archivo}.pug`, opciones)
    return juice(html);
  }

  exports.enviar = async (opciones) => {

    const {usuario, subject, archivo} = opciones;

    const html = generarHTML(opciones.archivo, opciones);
    const text = htmlToText.fromString(html);
    let mailOptions = {
      from: 'UpTask <no-reply@uptask.com>', // sender address
      to: usuario.email, // list of receivers
      subject, // Subject line
      text,
      html
    };

    const enviarEmail = util.promisify(transporter.sendMail, transporter);

    return enviarEmail.call(transporter, mailOptions); 
  }
  

 

