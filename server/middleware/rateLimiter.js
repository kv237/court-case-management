// server/middleware/rateLimiter.js

const rateLimit =
  require("express-rate-limit");

const otpRateLimiter =
  rateLimit({
    windowMs: 15 * 60 * 1000,

    max: 5,

    message:
      "Too many OTP requests. Try again later.",
  });

module.exports =
  otpRateLimiter;