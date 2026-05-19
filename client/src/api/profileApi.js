import API from "./axios";

export const sendPasswordOTP = async (data) => {
  return API.post("/profile/send-password-otp", data);
};

export const verifyPasswordOTP = async (data) => {
  return API.post("/profile/verify-password-otp", data);
};

export const sendEmailOTP = async (data) => {
  return API.post("/profile/send-email-otp", data);
};

export const verifyEmailOTP = async (data) => {
  return API.post("/profile/verify-email-otp", data);
};

export const sendPhoneOTP = async (data) => {
  return API.post("/profile/send-phone-otp", data);
};

export const verifyPhoneOTP = async (data) => {
  return API.post("/profile/verify-phone-otp", data);
};