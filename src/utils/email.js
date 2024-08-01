// /src/utils/email.js

const nodemailer = require("nodemailer");

async function sendEmail(to, subject, text) {
  let transporter = nodemailer.createTransport({
    host: "your.smtp.host.com",
    port: 587,
    secure: false,
    auth: {
      user: "your.email@example.com",
      pass: "yourpassword",
    },
  });

  let info = await transporter.sendMail({
    from: "sumanrajsharma2014@gmail.com",
    to: to,
    subject: subject,
    text: text,
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = { sendEmail };
