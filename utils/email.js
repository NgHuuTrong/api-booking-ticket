const nodemailer = require('nodemailer');
const ejs = require('ejs');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, message) {
    this.to = user.email;
    this.message = message;
    this.name = user.name;
    this.from = `Nguyen Huu Trong ${process.env.EMAIL_FROM}`;
  }

  // 1) Create a transporter
  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Send grid
      return nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL,
          pass: process.env.GMAIL_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(template, subject) {
    console.log(`${__dirname}/../views/email/${template}.ejs`);
    // 1. Render HTML based on a ejs template
    const html = await ejs.renderFile(
      `${__dirname}/../views/email/${template}.ejs`,
      {
        name: this.name,
        message: this.message,
        subject: this.subject,
      },
    );

    // 2. Defind email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html),
    };

    // Create a transport and send email
    this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to FIFA App');
  }

  async sendPasswordReset() {
    await this.send(
      'resetPassword',
      'Your password reset token (valid for only 10min)',
    );
  }

  async sendBookingSuccess() {
    await this.send('bookingSuccess', 'Your tickets are ordered success!');
  }
};
