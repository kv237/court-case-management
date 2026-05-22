import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useState,
} from "react";

import {
  showSuccess,
  showError,
} from "../../utils/toast";

import OTPInput
  from "../../components/otp/OTPInput";

import OTPTimer
  from "../../components/otp/OTPTimer";

import Button
  from "../../components/ui/Button";

import {
  verifyPasswordOTP,
  verifyEmailOTP,
  verifyPhoneOTP,
} from "../../api/profileApi";

const VerifyProfileOTP = () => {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const {
    type,
    payload,
  } = location.state || {};

  const [otp, setOtp] =
    useState([
      "",
      "",
      "",
      "",
      "",
      "",
    ]);

  const [loading, setLoading] =
    useState(false);

  // =====================================
  // VERIFY OTP
  // =====================================

  const handleVerify =
    async () => {

      const code =
        otp.join("");

      // VALIDATE OTP

      if (
        code.length !== 6
      ) {

        showError(
          "Enter complete OTP"
        );

        return;

      }

      try {

        setLoading(true);

        // =====================================
        // PASSWORD OTP
        // =====================================

        if (
          type === "password"
        ) {

          await verifyPasswordOTP({

            ...payload,

            otp: code,

          });

          showSuccess(
            "Password updated successfully"
          );

          navigate(
            "/profile"
          );

          return;

        }

        // =====================================
        // EMAIL OTP
        // =====================================

        if (
          type === "email"
        ) {

          await verifyEmailOTP({

            otp: code,

          });

          showSuccess(
            "Email updated successfully"
          );

          // CLEAR OLD SESSION

          localStorage.removeItem(
            "token"
          );

          localStorage.removeItem(
            "user"
          );

          sessionStorage.clear();

          // FORCE LOGIN AGAIN

          navigate(
            "/login"
          );

          return;

        }

        // =====================================
        // PHONE OTP
        // =====================================

        if (
          type === "phone"
        ) {

          await verifyPhoneOTP({

            ...payload,

            otp: code,

          });

          showSuccess(
            "Phone updated successfully"
          );

          navigate(
            "/profile"
          );

          return;

        }

      } catch (error) {

        console.log(error);

        showError(

          error?.response?.data
            ?.message ||

          "Invalid OTP"

        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="min-h-screen bg-gray-50 dark:bg-[#030712] p-4">

      <div className="max-w-md mx-auto mt-20">

        <div
          className="
            bg-white
            dark:bg-[#111827]
            p-6
            rounded-3xl
            shadow-xl
          "
        >

          {/* TITLE */}

          <h1
            className="
              text-2xl
              font-bold
              text-center
              text-gray-900
              dark:text-white
            "
          >
            Verify OTP
          </h1>

          {/* SUBTITLE */}

          <p
            className="
              text-center
              text-gray-500
              mt-2
            "
          >
            Enter the 6-digit code
          </p>

          {/* OTP INPUT */}

          <div className="mt-8">

            <OTPInput
              otp={otp}
              setOtp={setOtp}
            />

          </div>

          {/* TIMER */}

          <OTPTimer
            onResend={() => {

              showSuccess(
                "OTP resent"
              );

            }}
          />

          {/* BUTTON */}

          <div className="mt-6">

            <Button
              text="Verify OTP"
              loading={loading}
              onClick={
                handleVerify
              }
            />

          </div>

        </div>

      </div>

    </div>

  );

};

export default VerifyProfileOTP;