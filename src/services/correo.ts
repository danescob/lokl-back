
import nodemailer from "nodemailer";
import {render, renderFile} from "ejs"
import SMTPTransport from "nodemailer/lib/smtp-transport";

export class CorreoService {

  static enviar = (para: string | null, asunto: string, mensaje: string ) => {
    const smtpDatos = new SMTPTransport({
      host: process.env.MAIL_HOST ?? 'localhost',
      port: Number(process.env.MAIL_PORT ?? 465),
      secure: Boolean(process.env.MAIL_SECURE ?? true), // use TLS
      auth: {
        user: process.env.MAIL_USER ?? 'user',
        pass: process.env.MAIL_PASS ?? "pass",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const transporter = nodemailer.createTransport(smtpDatos);

    const mailOptions = {
      from: 'descobars@neverbit.com', // sender address
      to: para??'descobars@neverbit.com', // list of receivers
      subject: asunto, // Subject line
      html: mensaje
    };
    transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    });
  }
}