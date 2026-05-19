// server/utils/sendOTP.js

const nodemailer = require("nodemailer");

const transporter =
  nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

const sendOTP = async (
  email,
  otp
) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,

    to: email,

    subject:
      "Court Case Management OTP",

    html: `
      <div style="font-family:sans-serif;padding:20px;">
        <h2>OTP Verification</h2>

        <p>Your OTP is:</p>

        <h1>${otp}</h1>

        <p>
          This OTP expires in 5 minutes.
        </p>
      </div>
    `,
  });
};

module.exports = sendOTP;