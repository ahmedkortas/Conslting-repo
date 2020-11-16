const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const mailer = (emailR: string, obj: any) => {
  console.log('hey');

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
    to: `${emailR}`,
    subject: 'TUber new account',
    text: `Hey Mr/Mrs ${obj.name}, we much appreciate you joining us for the ride.
      You made the right choice you'll never be late again we can guaranty that.
      we look forward to your first ride with us we can't wait to have you in one of our cars  `,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    console.log('done', emailR);
  });
};
export default mailer;
