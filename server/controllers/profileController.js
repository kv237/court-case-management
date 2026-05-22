const supabase =
  require("../config/supabase");

const sendOTP =
  require("../utils/sendOTP");


const {
  generateOTP,
  hashOTP,
  compareOTP,
  generateOTPExpiry,
  isOTPExpired,
} = require("../utils/otp");

/* =========================================
   SEND EMAIL OTP
========================================= */

exports.sendEmailOTP =
  async (req, res) => {

    try {

      const userId =
        req.user.id;

      const {
        newEmail,
      } = req.body;

      /* VALIDATION */

      if (!newEmail) {

        return res.status(400).json({

          success: false,

          message:
            "New email is required",

        });

      }

      /* GENERATE OTP */

      const otp =
        generateOTP();

      const otpHash =
        hashOTP(otp);

      const expiresAt =
        generateOTPExpiry(
          10
        );

      /* INVALIDATE OLD OTPs */

      const {
        error:
          updateError,
      } =
        await supabase
          .from(
            "profile_otps"
          )
          .update({

            verified:
              true,

          })
          .eq(
            "user_id",
            userId
          )
          .eq(
            "type",
            "email_change"
          )
          .eq(
            "verified",
            false
          );

      if (updateError) {

        console.log(
          "INVALIDATE OTP ERROR:",
          updateError
        );

        return res.status(500).json({

          success: false,

          message:
            "Failed to invalidate old OTPs",

        });

      }

      /* STORE OTP */

      const {
        error:
          insertError,
      } =
        await supabase
          .from(
            "profile_otps"
          )
          .insert([
            {

              user_id:
                userId,

              type:
                "email_change",

              otp_hash:
                otpHash,

              target_value:
                newEmail,

              expires_at:
                expiresAt,

              verified:
                false,

            },
          ]);

      if (insertError) {

        console.log(
          "STORE OTP ERROR:",
          insertError
        );

        return res.status(500).json({

          success: false,

          message:
            "Failed to store OTP",

        });

      }

      /* SEND EMAIL OTP */

      await sendOTP(
        newEmail,
        otp
      );

      return res.status(200).json({

        success: true,

        message:
          "OTP sent successfully",

      });

    } catch (error) {

      console.log(
        "SEND EMAIL OTP ERROR:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          "Internal server error",

      });

    }

  };

/* =========================================
   VERIFY EMAIL OTP
========================================= */

exports.verifyEmailOTP =
  async (req, res) => {

    try {

      const userId =
        req.user.id;

      const { otp } =
        req.body;

      /* VALIDATION */

      if (!otp) {

        return res.status(400).json({

          success: false,

          message:
            "OTP is required",

        });

      }

      /* FETCH OTP */

      const {
        data,
        error,
      } =
        await supabase
          .from(
            "profile_otps"
          )
          .select("*")
          .eq(
            "user_id",
            userId
          )
          .eq(
            "type",
            "email_change"
          )
          .eq(
            "verified",
            false
          )
          .order(
            "created_at",
            {
              ascending:
                false,
            }
          )
          .limit(1)
          .single();

      if (
        error ||
        !data
      ) {

        console.log(
          "FETCH OTP ERROR:",
          error
        );

        return res.status(404).json({

          success: false,

          message:
            "OTP not found",

        });

      }

      /* CHECK EXPIRY */

      const expired =
        isOTPExpired(
          data.expires_at
        );

      if (expired) {

        return res.status(400).json({

          success: false,

          message:
            "OTP expired",

        });

      }

      /* VERIFY OTP */

      const validOTP =
        compareOTP(
          otp,
          data.otp_hash
        );

      if (!validOTP) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid OTP",

        });

      }

      /* UPDATE USER EMAIL */

      const {
        error:
          updateError,
      } =
        await supabase
          .from("users")
          .update({

            email:
              data.target_value,

          })
          .eq(
            "id",
            userId
          );

      if (updateError) {

        console.log(
          "UPDATE EMAIL ERROR:",
          updateError
        );

        return res.status(500).json({

          success: false,

          message:
            "Failed to update email",

        });

      }

      /* MARK OTP VERIFIED */

      await supabase
        .from(
          "profile_otps"
        )
        .update({

          verified:
            true,

        })
        .eq(
          "id",
          data.id
        );

      return res.status(200).json({

        success: true,

        message:
          "Email updated successfully",

      });

    } catch (error) {

      console.log(
        "VERIFY EMAIL OTP ERROR:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          "Internal server error",

      });

    }

  };

