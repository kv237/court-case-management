import {
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
} from "react";

import successLogo from "../assets/success-logo.png";

function PasswordUpdated() {
  const navigate =
    useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const navigationEntries =
        performance.getEntriesByType(
          "navigation"
        );

      if (
        navigationEntries.length >
          0 &&
        navigationEntries[0]
          .type === "reload"
      ) {
        navigate("/");
      }
    }, 0);

    return () =>
      clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex justify-center items-center px-4">

      <div className="w-[360px] min-h-screen rounded-[35px] border border-[#E5E7EB] bg-white px-6 py-8 shadow-sm flex flex-col justify-center">

        {/* LOGO */}

        <div className="flex justify-center">

          <img
            src={successLogo}
            alt="Success Logo"
            className="w-44 h-44 object-contain"
          />

        </div>

        {/* SUCCESS TEXT */}

        <div className="mt-12 text-center">

          <div className="flex justify-center">

            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">

              <CheckCircle2
                size={34}
                className="text-green-600"
              />

            </div>

          </div>

          <h1 className="text-[30px] font-bold text-[#111827] mt-8">

            Password Updated!

          </h1>

          <p className="text-gray-500 text-[16px] leading-8 mt-5 px-2">

            Your password has been changed successfully.

            You can now login using your new password.

          </p>

        </div>

        {/* SECURITY BOX */}

        <div className="mt-10 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-4 flex items-start gap-3">

          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">

            <ShieldCheck
              size={22}
              className="text-blue-600"
            />

          </div>

          <div>

            <h3 className="font-semibold text-[15px] text-[#111827]">

              Secure Access Restored

            </h3>

            <p className="text-gray-500 text-[14px] mt-1 leading-6">

              Your account security has been updated successfully.

            </p>

          </div>

        </div>

        {/* BUTTON */}

        <Link to="/login">

          <button className="w-full h-[60px] rounded-2xl mt-14 text-white text-[20px] font-semibold bg-gradient-to-r from-blue-700 to-blue-500 shadow-lg active:scale-[0.98] transition-all duration-200">

            Back to Login

          </button>

        </Link>

        {/* FOOTER */}

        <div className="mt-10 text-center">

          <p className="text-[14px] text-gray-400">

            Court Case Management System

          </p>

        </div>

      </div>

    </div>
  );
}

export default PasswordUpdated;