const { Resend } = require("resend");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const supabase = require("../config/supabase");

// =====================================
// RESEND CONFIG
// =====================================

const resend = new Resend(
  process.env.RESEND_API_KEY
);

// =====================================
// TEMP OTP STORE
// =====================================

let otpStore = {};

// =====================================
// REGISTER USER
// =====================================

exports.registerUser =
  async (req, res) => {

    try {

      const {
        fullName,
        email,
        password,
      } = req.body;

      if (
        !fullName ||
        !email ||
        !password
      ) {

        return res.status(400).json({

          success: false,

          message:
            "All fields required",

        });

      }

      // CHECK EXISTING USER

      const {
        data: existingUser,
      } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      if (existingUser) {

        return res.status(400).json({

          success: false,

          message:
            "User already exists",

        });

      }

      // HASH PASSWORD

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      // INSERT USER

      const { data, error } =
        await supabase
          .from("users")
          .insert([
            {
              full_name:
                fullName,

              email,

              password:
                hashedPassword,
            },
          ])
          .select();

      if (error) {

        return res.status(500).json({

          success: false,

          message:
            error.message,

        });

      }

      res.status(201).json({

        success: true,

        message:
          "User Registered Successfully",

        user: data[0],

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Server Error",

      });

    }

  };

// =====================================
// SEND OTP
// =====================================

exports.sendOTP =
  async (req, res) => {

    try {

      const { email } = req.body;

      if (!email) {

        return res.status(400).json({

          success: false,

          message:
            "Email required",

        });

      }

      // GENERATE OTP

      const otp = Math.floor(

        100000 +
          Math.random() *
            900000

      ).toString();

      // STORE OTP

      otpStore[email] = {

        otp,

        expires:
          Date.now() +
          5 * 60 * 1000,

      };

      // SEND EMAIL

      await resend.emails.send({

        from:
          "onboarding@resend.dev",

        to: email,

        subject:
          "Court Case OTP Verification",

        html: `
          <div style="font-family: Arial; padding: 20px;">

            <h2>OTP Verification</h2>

            <p>Your OTP code is:</p>

            <h1 style="letter-spacing: 5px;">
              ${otp}
            </h1>

            <p>
              OTP expires in 5 minutes.
            </p>

          </div>
        `,

      });

      res.json({

        success: true,

        message:
          "OTP sent successfully",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message ||

          "Server Error",

      });

    }

  };

// =====================================
// VERIFY OTP
// =====================================

exports.verifyOTP =
  async (req, res) => {

    try {

      const {
        email,
        otp,
      } = req.body;

      const storedData =
        otpStore[email];

      if (!storedData) {

        return res.status(400).json({

          success: false,

          message:
            "OTP not found",

        });

      }

      // CHECK EXPIRY

      if (
        Date.now() >
        storedData.expires
      ) {

        delete otpStore[email];

        return res.status(400).json({

          success: false,

          message:
            "OTP Expired",

        });

      }

      // CHECK OTP

      if (
        storedData.otp !== otp
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid OTP",

        });

      }

      delete otpStore[email];

      res.json({

        success: true,

        message:
          "OTP Verified Successfully",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Server Error",

      });

    }

  };

// =====================================
// RESET PASSWORD
// =====================================

exports.resetPassword =
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      if (!email || !password) {

        return res.status(400).json({

          success: false,

          message:
            "Email and Password required",

        });

      }

      // HASH PASSWORD

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      // UPDATE PASSWORD

      const { error } =
        await supabase
          .from("users")
          .update({
            password:
              hashedPassword,
          })
          .eq("email", email);

      if (error) {

        return res.status(500).json({

          success: false,

          message:
            error.message,

        });

      }

      res.json({

        success: true,

        message:
          "Password Updated Successfully",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Server Error",

      });

    }

  };

// =====================================
// LOGIN
// =====================================

exports.login =
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      if (!email || !password) {

        return res.status(400).json({

          success: false,

          message:
            "All fields required",

        });

      }

      // FIND USER

      const { data: user } =
        await supabase
          .from("users")
          .select("*")
          .eq("email", email)
          .single();

      if (!user) {

        return res.status(401).json({

          success: false,

          message:
            "User not found",

        });

      }

      // CHECK PASSWORD

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {

        return res.status(401).json({

          success: false,

          message:
            "Invalid Password",

        });

      }

      // GENERATE JWT TOKEN

      const token = jwt.sign(

        {
          id: user.id,
          email: user.email,
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "7d",
        }

      );

      res.json({

        success: true,

        message:
          "Login Successful",

        token,

        user: {

          id: user.id,

          fullName:
            user.full_name,

          email:
            user.email,

          role:
            user.role,

        },

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Server Error",

      });

    }

  };

// =====================================
// GET PROFILE
// =====================================

exports.getProfile =
  async (req, res) => {

    try {

      const {
        data: user,
        error,
      } = await supabase
        .from("users")
        .select(`
          id,
          full_name,
          email,
          role
        `)
        .eq("id", req.user.id)
        .single();

      if (error || !user) {

        return res.status(404).json({

          success: false,

          message:
            "User not found",

        });

      }

      res.status(200).json({

        success: true,

        user: {

          id: user.id,

          fullName:
            user.full_name,

          email:
            user.email,

          role:
            user.role,

        },

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Server Error",

      });

    }

  };