const nodemailer = require("nodemailer");

// =====================================
// DEBUG ENV VARIABLES
// =====================================

console.log(
  "EMAIL_USER:",
  process.env.EMAIL_USER
);

console.log(
  "EMAIL_PASS:",
  process.env.EMAIL_PASS
    ? "EXISTS"
    : "MISSING"
);

console.log(
  "SENDER_EMAIL:",
  process.env.SENDER_EMAIL
);

// =====================================
// CREATE GMAIL SMTP TRANSPORTER
// =====================================

const transporter =
  nodemailer.createTransport({

    service: "gmail",

    auth: {

      user:
        process.env.EMAIL_USER,

      pass:
        process.env.EMAIL_PASS,

    },

  });

// =====================================
// SEND OTP FUNCTION
// =====================================

const sendOTP =
  async (
    email,
    otp
  ) => {

    try {

      console.log(
        "Sending OTP to:",
        email
      );

      const mailOptions = {

        from:
          process.env.SENDER_EMAIL,

        to: email,

        subject:
          "Court Case Management OTP Verification",

        html: `
          <div style="
            font-family: Arial, sans-serif;
            max-width: 500px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
          ">

            <h2 style="
              color: #2563eb;
            ">
              OTP Verification
            </h2>

            <p>
              Your OTP for email verification is:
            </p>

            <div style="
              font-size: 32px;
              font-weight: bold;
              letter-spacing: 5px;
              margin: 20px 0;
              color: #2563eb;
              text-align: center;
            ">
              ${otp}
            </div>

            <p>
              This OTP expires in
              <strong>
                10 minutes
              </strong>.
            </p>

            <p>
              If you did not request this,
              please ignore this email.
            </p>

          </div>
        `,

      };

      const info =
        await transporter.sendMail(
          mailOptions
        );

      console.log(
        "OTP EMAIL SENT SUCCESSFULLY"
      );

      console.log(
        "MESSAGE ID:",
        info.messageId
      );

      return {

        success: true,

        messageId:
          info.messageId,

      };

    } catch (error) {

      console.error(
        "SEND OTP ERROR:",
        error
      );

      throw new Error(
        error.message ||
        "Failed to send OTP email"
      );

    }

  };

module.exports =
  sendOTP;