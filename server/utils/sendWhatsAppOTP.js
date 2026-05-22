const axios =
  require("axios");

/**
 * Send WhatsApp OTP
 */

const sendWhatsAppOTP =
  async (
    phone,
    otp
  ) => {

    try {

      const response =
        await axios.post(

          "https://api.wque.chat/api/messages/send",

          {

            accountId:
              process.env
                .WQUE_INSTANCE_ID,

            recipient:
              phone,

            message:
`Your Court Case Management OTP is:

${otp}

This OTP expires in 10 minutes.`,

          },

          {

            headers: {

              Authorization:
                `Bearer ${process.env.WQUE_API_KEY}`,

              "Content-Type":
                "application/json",

            },

          }

        );

      console.log(
        "WQUE SUCCESS:",
        response.data
      );

      return response.data;

    } catch (error) {

      console.log(
        "WQUE ERROR:",
        error.response?.data ||
        error.message
      );

      throw new Error(
        "Failed to send WhatsApp OTP"
      );

    }

  };

module.exports =
  sendWhatsAppOTP;