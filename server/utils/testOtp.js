const {
  generateOTP,
  hashOTP,
  compareOTP,
} = require("./utils/otp");

const otp =
  generateOTP();

console.log("OTP:", otp);

const hash =
  hashOTP(otp);

console.log("Hash:", hash);

console.log(
  "Compare:",
  compareOTP(otp, hash)
);