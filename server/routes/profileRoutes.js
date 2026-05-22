const express = require("express");

const router = express.Router();

const profileController = require(
  "../controllers/profileController"
);

const {
  verifyToken,
} = require(
  "../middleware/authMiddleware"
);

const otpRateLimiter = require(
  "../middleware/rateLimiter"
);

/* =========================================
   PASSWORD OTP
========================================= */

// TEMPORARILY DISABLED
// Rebuild later using new OTP architecture

// router.post(
//   "/send-password-otp",
//   verifyToken,
//   otpRateLimiter,
//   profileController.sendPasswordOTP
// );

// router.post(
//   "/verify-password-otp",
//   verifyToken,
//   profileController.verifyPasswordOTP
// );

/* =========================================
   EMAIL OTP
========================================= */

router.post(
  "/send-email-otp",
  verifyToken,
  otpRateLimiter,
  profileController.sendEmailOTP
);

router.post(
  "/verify-email-otp",
  verifyToken,
  profileController.verifyEmailOTP
);

/* =========================================
   PHONE OTP
========================================= */

// TEMPORARILY REMOVED
// Rebuild later with stable SMS provider

// router.post(
//   "/send-phone-otp",
//   verifyToken,
//   otpRateLimiter,
//   profileController.sendPhoneOTP
// );

module.exports = router;