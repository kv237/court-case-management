import {
  ArrowLeft,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useState,
  useEffect,
} from "react";

import otpLogo from "../assets/otp-logo.png";

import API from "../api/axios";

import {
  showSuccess,
  showError,
} from "../utils/toast";

function VerifyOTP() {

  const navigate =
    useNavigate();

  const email =
    localStorage.getItem(
      "resetEmail"
    );

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

  const [
    resendTimer,
    setResendTimer,
  ] = useState(60);

  const [
    resendLoading,
    setResendLoading,
  ] = useState(false);

  // =====================================
  // CHECK EMAIL
  // =====================================

  useEffect(() => {

    if (!email) {

      navigate(
        "/forgot-password"
      );

    }

  }, [email, navigate]);

  // =====================================
  // RESEND TIMER
  // =====================================

  useEffect(() => {

    if (resendTimer <= 0) {

      return;

    }

    const timer =
      setInterval(() => {

        setResendTimer(
          (prev) => prev - 1
        );

      }, 1000);

    return () =>
      clearInterval(timer);

  }, [resendTimer]);

  // =====================================
  // HANDLE CHANGE
  // =====================================

  const handleChange =
    (value, index) => {

      // ONLY NUMBERS

      if (
        !/^[0-9]?$/.test(
          value
        )
      ) {

        return;

      }

      const updatedOTP = [
        ...otp,
      ];

      updatedOTP[index] =
        value;

      setOtp(updatedOTP);

      // AUTO NEXT

      if (
        value &&
        index < 5
      ) {

        document
          .getElementById(
            `otp-${index + 1}`
          )
          ?.focus();

      }

    };

  // =====================================
  // HANDLE KEY DOWN
  // =====================================

  const handleKeyDown =
    (e, index) => {

      // BACKSPACE

      if (
        e.key === "Backspace"
      ) {

        if (
          otp[index] === "" &&
          index > 0
        ) {

          document
            .getElementById(
              `otp-${index - 1}`
            )
            ?.focus();

        }

      }

      // LEFT ARROW

      if (
        e.key === "ArrowLeft" &&
        index > 0
      ) {

        document
          .getElementById(
            `otp-${index - 1}`
          )
          ?.focus();

      }

      // RIGHT ARROW

      if (
        e.key === "ArrowRight" &&
        index < 5
      ) {

        document
          .getElementById(
            `otp-${index + 1}`
          )
          ?.focus();

      }

    };

  // =====================================
  // HANDLE PASTE
  // =====================================

  const handlePaste =
    (e) => {

      e.preventDefault();

      const pastedData =
        e.clipboardData
          .getData("text")
          .trim();

      if (
        !/^\d+$/.test(
          pastedData
        )
      ) {

        return;

      }

      const digits =
        pastedData
          .slice(0, 6)
          .split("");

      const updatedOTP = [
        "",
        "",
        "",
        "",
        "",
        "",
      ];

      digits.forEach(
        (
          digit,
          index
        ) => {

          updatedOTP[index] =
            digit;

        }
      );

      setOtp(updatedOTP);

    };

  // =====================================
  // VERIFY OTP
  // =====================================

  const handleVerifyOTP =
    async () => {

      const finalOTP =
        otp.join("");

      if (
        finalOTP.length !== 6
      ) {

        showError(
          "Enter complete OTP"
        );

        return;

      }

      try {

        setLoading(true);

        const response =
          await API.post(
            "/auth/verify-otp",
            {
              email,
              otp: finalOTP,
            }
          );

        const data =
          response.data;

        if (data.success) {

          showSuccess(
            "OTP Verified"
          );

          navigate(
            "/reset-password"
          );

        } else {

          showError(
            data.message ||
              "Invalid OTP"
          );

        }

      } catch (error) {

        console.log(error);

        showError(

          error.response?.data
            ?.message ||

          "Server Error"

        );

      } finally {

        setLoading(false);

      }

    };

  // =====================================
  // RESEND OTP
  // =====================================

  const handleResendOTP =
    async () => {

      if (resendTimer > 0) {

        return;

      }

      try {

        setResendLoading(true);

        const response =
          await API.post(
            "/auth/send-otp",
            {
              email,
            }
          );

        const data =
          response.data;

        if (data.success) {

          showSuccess(
            "OTP Resent Successfully"
          );

          setResendTimer(60);

        } else {

          showError(
            data.message ||
              "Failed to resend OTP"
          );

        }

      } catch (error) {

        console.log(error);

        showError(

          error.response?.data
            ?.message ||

          "Failed to resend OTP"

        );

      } finally {

        setResendLoading(false);

      }

    };

  return (

    <div className="min-h-screen bg-[#F5F7FB] flex justify-center items-center px-4">

      <div className="w-[360px] min-h-screen rounded-[35px] border border-[#E5E7EB] bg-white px-6 py-8 shadow-sm">

        {/* HEADER */}

        <div className="flex items-center mt-6">

          <Link to="/forgot-password">

            <ArrowLeft
              size={24}
              className="text-[#111827]"
            />

          </Link>

          <h1 className="flex-1 text-center text-[24px] font-semibold mr-6 text-[#111827]">

            Verify OTP

          </h1>

        </div>

        {/* LOGO */}

        <div className="flex justify-center mt-16">

          <img
            src={otpLogo}
            alt="OTP Logo"
            className="w-40 h-40 object-contain"
          />

        </div>

        {/* TEXT */}

        <div className="mt-12 text-center">

          <h2 className="text-[28px] leading-[38px] font-bold text-[#111827]">

            Enter OTP

          </h2>

          <p className="text-gray-500 mt-5 text-[16px] leading-8 px-2">

            We have sent a 6 digit OTP to

          </p>

          <p className="text-[#111827] font-semibold text-[17px] mt-2 break-all">

            {email}

          </p>

        </div>

        {/* OTP INPUTS */}

        <div className="flex justify-between mt-10 gap-2">

          {otp.map(
            (
              digit,
              index
            ) => (

              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength="1"
                value={digit}
                onChange={(e) =>
                  handleChange(
                    e.target.value,
                    index
                  )
                }
                onKeyDown={(e) =>
                  handleKeyDown(
                    e,
                    index
                  )
                }
                onPaste={
                  handlePaste
                }
                className="
                  w-12 h-14
                  border border-[#D6D9E4]
                  rounded-xl
                  text-center
                  text-[22px]
                  text-[#111827]
                  font-semibold
                  outline-none
                  bg-white
                  caret-blue-600
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-200
                  transition-all
                  duration-200
                "
              />

            )
          )}

        </div>

        {/* RESEND */}

        <div className="text-center mt-8">

          {resendTimer > 0 ? (

            <p className="text-gray-500 text-[15px]">

              Resend OTP in

              <span className="text-blue-600 font-semibold ml-2">

                {resendTimer}s

              </span>

            </p>

          ) : (

            <p className="text-gray-500 text-[15px]">

              Didn't receive OTP?

              <button
                onClick={
                  handleResendOTP
                }
                disabled={
                  resendLoading
                }
                className="text-blue-600 font-semibold ml-2"
              >

                {
                  resendLoading
                    ? "Sending..."
                    : "Resend OTP"
                }

              </button>

            </p>

          )}

        </div>

        {/* VERIFY BUTTON */}

        <button
          onClick={
            handleVerifyOTP
          }
          disabled={loading}
          className="w-full h-[60px] rounded-2xl mt-10 text-white text-[20px] font-semibold bg-gradient-to-r from-blue-700 to-blue-500 shadow-lg active:scale-[0.98] transition-all duration-200 disabled:opacity-70"
        >

          {loading
            ? "Verifying..."
            : "Verify OTP"}

        </button>

      </div>

    </div>

  );

}

export default VerifyOTP;