const express = require("express");

const router = express.Router();

const {
  verifyToken,
} = require(
  "../middleware/authMiddleware"
);

const {

  sendOTP,

  verifyOTP,

  resetPassword,

  login,

  registerUser,

} = require("../controllers/authController");



// =============================
// AUTH ROUTES
// =============================



// Register User

router.post(
  "/register",
  registerUser
);



// Send OTP

router.post(
  "/send-otp",
  sendOTP
);



// Verify OTP

router.post(
  "/verify-otp",
  verifyOTP
);



// Reset Password

router.post(
  "/reset-password",
  resetPassword
);



// Login

router.post(
  "/login",
  login
);




// Protected Profile Route

router.get(
  "/profile",

  verifyToken,

  async (req, res) => {

    try {

      const supabase =
        require(
          "../config/supabase");

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

  }
);



// Test Route

router.get(
  "/test",
  (req, res) => {

    res.status(200).json({
      success: true,
      message: "Auth Route Working",
    });

  }
);



module.exports = router;