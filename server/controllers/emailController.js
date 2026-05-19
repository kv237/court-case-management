const nodemailer =
require("nodemailer");



const sendEmail =
async (req, res) => {

  try {

    const {
      to,
      subject,
      text,
    } = req.body;

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

    await transporter.sendMail({

      from:
        process.env.EMAIL_USER,

      to,

      subject,

      text,

    });

    res.status(200).json({

      success: true,

      message:
        "Email Sent Successfully",

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }

};

module.exports = {
  sendEmail,
};