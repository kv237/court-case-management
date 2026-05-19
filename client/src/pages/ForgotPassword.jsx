import {
  ArrowLeft,
  Mail,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useState,
} from "react";

import API from "../api/axios";

import {
  showSuccess,
  showError,
} from "../utils/toast";

function ForgotPassword() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // =====================================
  // SEND OTP
  // =====================================

  const handleSendOTP =
    async () => {

      if (!email.trim()) {

        showError(
          "Please enter email"
        );

        return;

      }

      try {

        setLoading(true);

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

          localStorage.setItem(
            "resetEmail",
            email
          );

          showSuccess(
            "OTP Sent Successfully"
          );

          navigate(
            "/verify-otp"
          );

        } else {

          showError(
            data.message
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

  return (

    <div className="min-h-screen bg-[#F5F7FB] flex justify-center items-center px-4">

      <div className="w-[360px] min-h-screen rounded-[35px] border border-[#E5E7EB] bg-white px-6 py-8 shadow-sm">

        {/* HEADER */}

        <div className="flex items-center mt-6">

          <Link to="/login">

            <ArrowLeft
              size={24}
              className="text-[#111827]"
            />

          </Link>

          <h1 className="flex-1 text-center text-[24px] font-semibold mr-6 text-[#111827]">

            Forgot Password

          </h1>

        </div>

        {/* ICON */}

        <div className="flex justify-center mt-20">

          <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center">

            <Mail
              size={50}
              className="text-blue-600"
            />

          </div>

        </div>

        {/* TEXT */}

        <div className="mt-12 text-center">

          <h2 className="text-[28px] font-bold text-[#111827]">

            Reset Your Password

          </h2>

          <p className="text-gray-500 mt-5 text-[16px] leading-8 px-2">

            Enter your registered email address.

            We will send an OTP for password reset.

          </p>

        </div>

        {/* EMAIL INPUT */}

        <div className="bg-white border border-[#D6D9E4] rounded-2xl h-[60px] flex items-center px-4 mt-12 shadow-sm">

          <Mail
            size={22}
            color="#6B7280"
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="flex-1 ml-3 outline-none text-[16px] text-[#111827]"
          />

        </div>

        {/* BUTTON */}

        <button
          onClick={
            handleSendOTP
          }
          disabled={loading}
          className="w-full h-[60px] rounded-2xl mt-10 text-white text-[20px] font-semibold bg-gradient-to-r from-blue-700 to-blue-500 shadow-lg active:scale-[0.98] transition-all duration-200 disabled:opacity-70"
        >

          {
            loading
              ? "Sending OTP..."
              : "Send OTP"
          }

        </button>

      </div>

    </div>

  );

}

export default ForgotPassword;