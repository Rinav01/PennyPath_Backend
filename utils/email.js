const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'madisen.murazik69@ethereal.email',
          pass: 'J2tY1j6e1YJ1X2M61a'
      }
  });

    await transporter.sendMail({
      from: '"PennyPath" <noreply@pennypath.com>',
      to: email,
      subject: subject,
      text: text,
    });

    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

module.exports = sendEmail;
