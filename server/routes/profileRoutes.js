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

/* PASSWORD */

router.post(
  "/send-password-otp",
  verifyToken,
  otpRateLimiter,
  profileController.sendPasswordOTP
);

router.post(
  "/verify-password-otp",
  verifyToken,
  profileController.verifyPasswordOTP
);

/* EMAIL */

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

/* PHONE */

router.post(
  "/send-phone-otp",
  verifyToken,
  otpRateLimiter,
  profileController.sendPhoneOTP
);

router.post(
  "/verify-phone-otp",
  verifyToken,
  profileController.verifyPhoneOTP
);

module.exports = router;