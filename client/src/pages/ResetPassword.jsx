import {
  ArrowLeft,
  Lock,
  Eye,
  EyeOff,
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

function ResetPassword() {

  const navigate =
    useNavigate();

  const email =
    localStorage.getItem(
      "resetEmail"
    );

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  // =====================================
  // RESET PASSWORD
  // =====================================

  const handleResetPassword =
    async () => {

      if (
        !password.trim() ||
        !confirmPassword.trim()
      ) {

        showError(
          "Please fill all fields"
        );

        return;

      }

      if (
        password !==
        confirmPassword
      ) {

        showError(
          "Passwords do not match"
        );

        return;

      }

      if (
        password.length < 6
      ) {

        showError(
          "Password must be at least 6 characters"
        );

        return;

      }

      try {

        setLoading(true);

        const response =
          await API.post(
            "/auth/reset-password",
            {
              email,
              password,
            }
          );

        const data =
          response.data;

        if (data.success) {

          showSuccess(
            "Password Reset Successful"
          );

          localStorage.removeItem(
            "resetEmail"
          );

          navigate("/success");

        } else {

          showError(
            data.message ||
              "Reset Failed"
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

          <Link to="/verify-otp">

            <ArrowLeft
              size={24}
              className="text-[#111827]"
            />

          </Link>

          <h1 className="flex-1 text-center text-[24px] font-semibold mr-6 text-[#111827]">

            Reset Password

          </h1>

        </div>

        {/* TITLE */}

        <div className="mt-16 text-center">

          <h2 className="text-[30px] font-bold text-[#111827]">

            Create New Password

          </h2>

          <p className="text-gray-500 mt-5 text-[16px] leading-8 px-2">

            Your new password must be different from previously used passwords.

          </p>

        </div>

        {/* PASSWORD */}

        <div className="bg-white border border-[#D6D9E4] rounded-2xl h-[60px] flex items-center px-4 mt-14 shadow-sm">

          <Lock
            size={22}
            color="#6B7280"
          />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="New Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="flex-1 ml-3 outline-none text-[16px] text-[#111827]"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
          >

            {showPassword ? (

              <EyeOff
                size={20}
                color="#6B7280"
              />

            ) : (

              <Eye
                size={20}
                color="#6B7280"
              />

            )}

          </button>

        </div>

        {/* CONFIRM PASSWORD */}

        <div className="bg-white border border-[#D6D9E4] rounded-2xl h-[60px] flex items-center px-4 mt-6 shadow-sm">

          <Lock
            size={22}
            color="#6B7280"
          />

          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            className="flex-1 ml-3 outline-none text-[16px] text-[#111827]"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
          >

            {showConfirmPassword ? (

              <EyeOff
                size={20}
                color="#6B7280"
              />

            ) : (

              <Eye
                size={20}
                color="#6B7280"
              />

            )}

          </button>

        </div>

        {/* BUTTON */}

        <button
          onClick={
            handleResetPassword
          }
          disabled={loading}
          className="w-full h-[60px] rounded-2xl mt-10 text-white text-[20px] font-semibold bg-gradient-to-r from-blue-700 to-blue-500 shadow-lg active:scale-[0.98] transition-all duration-200 disabled:opacity-70"
        >

          {
            loading
              ? "Updating..."
              : "Reset Password"
          }

        </button>

      </div>

    </div>

  );

}

export default ResetPassword;