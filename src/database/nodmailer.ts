const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const mailer = (emailR: string, msg: any, subject: string, html: any) => {
  var transporter = nodemailer.createTransport(
    smtpTransport({
      service: 'gmail',
      port: 465,
      secure: false,
      host: 'smtp.gmail.com',
      auth: {
        user: 'allinclusivenoabo@gmail.com',
        pass: 'noabo123456789',
      },
      tls: {
        rejectUnauthorized: false,
      },
    }),
  );

  let mailOptions = {
    from: 'Irada consulting',
    to: emailR,
    subject: subject,
    text: `${msg}`,
    html: html,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    console.log('done', emailR);
  });
};
export default mailer;
