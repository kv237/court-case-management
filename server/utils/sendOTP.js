const { Resend } = require("resend");

// =====================================
// RESEND CONFIG
// =====================================

const resend =
  new Resend(
    process.env.RESEND_API_KEY
  );

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

      const response =
        await resend.emails.send({

          from:
            "onboarding@resend.dev",

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

        });

      console.log(
        "OTP EMAIL SENT SUCCESSFULLY"
      );

      console.log(
        response
      );

      return response;

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