const crypto =
  require("crypto");

/**
 * Generate 6-digit OTP
 */
const generateOTP =
  () => {
    return Math.floor(
      100000 +
        Math.random() *
          900000
    ).toString();
  };

/**
 * Hash OTP
 */
const hashOTP =
  (otp) => {
    return crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");
  };

/**
 * Compare OTP
 */
const compareOTP =
  (
    plainOTP,
    hashedOTP
  ) => {
    const hashedInput =
      hashOTP(plainOTP);

    return (
      hashedInput ===
      hashedOTP
    );
  };

/**
 * Generate expiry
 */
const generateOTPExpiry =
  (
    minutes = 10
  ) => {
    return new Date(
      Date.now() +
        minutes *
          60 *
          1000
    ).toISOString();
  };

/**
 * Check expiry
 */
const isOTPExpired =
  (
    expiresAt
  ) => {
    return (
      new Date(
        expiresAt
      ) < new Date()
    );
  };

module.exports = {
  generateOTP,
  hashOTP,
  compareOTP,
  generateOTPExpiry,
  isOTPExpired,
};