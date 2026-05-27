const SibApiV3Sdk =
  require("sib-api-v3-sdk");

// =====================================
// CONFIGURE BREVO API
// =====================================

const client =
  SibApiV3Sdk.ApiClient
    .instance;

const apiKey =
  client.authentications[
    "api-key"
  ];

apiKey.apiKey =
  process.env.BREVO_API_KEY;

const transactionalApi =
  new SibApiV3Sdk
    .TransactionalEmailsApi();

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
        await transactionalApi
          .sendTransacEmail({

            sender: {

              email:
                process.env
                  .SENDER_EMAIL,

              name:
                "Court Case Management",

            },

            to: [
              {
                email,
              },
            ],

            subject:
              "Court Case Management OTP Verification",

            htmlContent: `
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

      return {

        success: true,

        response,

      };

    } catch (error) {

      console.error(
        "BREVO API ERROR:",
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