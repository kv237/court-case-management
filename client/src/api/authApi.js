import API from "./axios";

// LOGIN

export const loginUser =
  async (data) => {

    const response =
      await API.post(
        "/auth/login",
        data
      );

    return response.data;

  };

// REGISTER

export const registerUser =
  async (data) => {

    const response =
      await API.post(
        "/auth/register",
        data
      );

    return response.data;

  };

// PROFILE

export const getProfile =
  async () => {

    const response =
      await API.get(
        "/auth/profile"
      );

    return response.data;

  };

// SEND OTP

export const sendOTP =
  async (data) => {

    const response =
      await API.post(
        "/auth/send-otp",
        data
      );

    return response.data;

  };

// VERIFY OTP

export const verifyOTP =
  async (data) => {

    const response =
      await API.post(
        "/auth/verify-otp",
        data
      );

    return response.data;

  };

// RESET PASSWORD

export const resetPassword =
  async (data) => {

    const response =
      await API.post(
        "/auth/reset-password",
        data
      );

    return response.data;

  };