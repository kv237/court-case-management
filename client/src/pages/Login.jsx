import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  UserRound,
  Lock,
  Eye,
  EyeOff,
  Fingerprint,
} from "lucide-react";

import {
  useState,
  useEffect,
} from "react";

import {
  showSuccess,
  showError,
} from "../utils/toast";

import logo from "../assets/logo.png";

import {
  loginUser,
} from "../api/authApi";

import useAuth from "../context/useAuth";

function Login() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const {
    login,
    user,
  } = useAuth();

  const from =
    location.state?.from
      ?.pathname ||
    "/dashboard";

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    rememberMe,
    setRememberMe,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(false);

  // =====================================
  // AUTO REDIRECT
  // =====================================

  useEffect(() => {

    if (user) {

      navigate(
        "/dashboard",
        {
          replace: true,
        }
      );

    }

  }, [

    user,

    navigate,

  ]);

  // =====================================
  // LOGIN
  // =====================================

  const handleLogin =
    async () => {

      if (
        !email.trim() ||
        !password.trim()
      ) {

        showError(
          "Please fill all fields"
        );

        return;

      }

      try {

        setLoading(true);

        const data =
          await loginUser({
            email,
            password,
            rememberMe,
          });

        if (
          data?.success &&
          data?.token
        ) {

          await login(
            data.token
          );

          localStorage.setItem(
            "user",
            JSON.stringify(
              data.user
            )
          );

          showSuccess(
            "Login Successful"
          );

          navigate(from, {
            replace: true,
          });

        } else {

          showError(
            data?.message ||
              "Login Failed"
          );

        }

      } 
      catch (error) {

  console.log("LOGIN ERROR:", error);

  alert(
    JSON.stringify({
      message: error?.message,
      status: error?.response?.status,
      response: error?.response?.data
    })
  );

  showError(
    error?.response?.data?.message ||
    error?.message ||
    "Server Error"
  );

}
      finally {

        setLoading(false);

      }

    };

  // =====================================
  // ENTER KEY LOGIN
  // =====================================

  const handleKeyDown =
    (e) => {

      if (e.key === "Enter") {

        handleLogin();

      }

    };

  // =====================================
  // BIOMETRIC LOGIN
  // =====================================

  const handleBiometricLogin =
    async () => {

      if (
        !window.PublicKeyCredential
      ) {

        showError(
          "Biometric Authentication Not Supported"
        );

        return;

      }

      try {

        showSuccess(
          "Biometric Ready"
        );

      } catch {

        showError(
          "Biometric Authentication Failed"
        );

      }

    };

  // =====================================
  // CONTACT ADMIN
  // =====================================

  const handleContactAdmin =
    () => {

      window.location.href =
        "mailto:admin@courtcase.com";

    };

  return (

    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4 py-6 overflow-y-auto">

      {/* MOBILE CONTAINER */}

      <div className="w-[360px] min-h-screen rounded-[35px] border border-[#1E2B52] bg-gradient-to-b from-[#06163D] to-[#020817] px-6 py-8 shadow-2xl">

        {/* LOGO */}

        <div className="flex flex-col items-center mt-6">

          <img
            src={logo}
            alt="Court Logo"
            className="w-52 object-contain"
          />

          <h1 className="text-white text-[42px] font-bold text-center leading-tight mt-4">

            COURT CASE

          </h1>

          <h2 className="text-white text-[24px] font-semibold tracking-wide text-center mt-1">

            MANAGEMENT SYSTEM

          </h2>

          <p className="text-[#C7D0E0] text-center text-[17px] mt-6 leading-8">

            Secure. Organize. Track.

            <br />

            Justice, Digitally.

          </p>

        </div>

        {/* FORM */}

        <div className="mt-12">

          {/* EMAIL */}

          <div className="bg-white rounded-2xl h-[60px] flex items-center px-4 mb-5 shadow-lg">

            <UserRound
              size={22}
              color="#6B7280"
            />

            <input
              type="email"
              placeholder="User ID / Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              onKeyDown={
                handleKeyDown
              }
              className="flex-1 ml-3 outline-none text-[16px] text-black bg-transparent"
            />

          </div>

          {/* PASSWORD */}

          <div className="bg-white rounded-2xl h-[60px] flex items-center px-4 shadow-lg">

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
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              onKeyDown={
                handleKeyDown
              }
              className="flex-1 ml-3 outline-none text-[16px] text-black bg-transparent"
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

          {/* REMEMBER */}

          <div className="flex items-center justify-between mt-5 text-white text-[14px]">

            <label className="flex items-center gap-2">

              <input
                type="checkbox"
                checked={
                  rememberMe
                }
                onChange={(e) =>
                  setRememberMe(
                    e.target.checked
                  )
                }
                className="w-4 h-4"
              />

              Remember Me

            </label>

            <Link
              to="/forgot-password"
              className="text-white"
            >

              Forgot Password?

            </Link>

          </div>

          {/* LOGIN BUTTON */}

          <button
            type="button"

            onClick={handleLogin}

            disabled={loading}

            className="w-full h-[60px] rounded-2xl mt-8 text-white text-[22px] font-semibold bg-gradient-to-r from-blue-700 to-blue-500 shadow-xl shadow-blue-900/40 disabled:opacity-70 active:scale-[0.98] transition-all duration-200"
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

          {/* DIVIDER */}

          <div className="flex items-center mt-8">

            <div className="flex-1 h-[1px] bg-[#5B6788]" />

            <span className="px-4 text-[#C7D0E0] text-[14px]">

              or login with

            </span>

            <div className="flex-1 h-[1px] bg-[#5B6788]" />

          </div>

          {/* BIOMETRIC */}

          <button
            type="button"

            onClick={
              handleBiometricLogin
            }

            className="w-full h-[60px] rounded-2xl mt-6 border border-[#5B6788] text-white text-[18px] flex items-center justify-center gap-3 active:scale-[0.98] transition-all duration-200"
          >

            <Fingerprint size={24} />

            Biometric / Face ID

          </button>

        </div>

        {/* FOOTER */}

        <div className="mt-12 text-center pb-6">

          <p className="text-[#C7D0E0] text-[15px]">

            Don’t have an account?

          </p>

          <button
            type="button"

            onClick={
              handleContactAdmin
            }

            className="text-blue-300 mt-2 text-[15px]"
          >

            Contact Admin

          </button>

        </div>

      </div>

    </div>

  );

}

export default Login;