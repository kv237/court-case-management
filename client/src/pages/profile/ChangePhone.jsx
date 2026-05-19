import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  showSuccess,
  showError,
} from "../../utils/toast";

import Input
  from "../../components/ui/Input";

import Button
  from "../../components/ui/Button";

import {
  validatePhone,
} from "../../utils/validators";

import {
  sendPhoneOTP,
} from "../../api/profileApi";

const ChangePhone = () => {

  const navigate =
    useNavigate();

  const [phone, setPhone] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // =====================================
  // SUBMIT
  // =====================================

  const handleSubmit =
    async () => {

      if (
        !validatePhone(phone)
      ) {

        showError(
          "Invalid phone number"
        );

        return;

      }

      try {

        setLoading(true);

        await sendPhoneOTP({
          phone,
        });

        showSuccess(
          "OTP sent"
        );

        navigate(
          "/verify-profile-otp",
          {

            state: {

              type: "phone",

              payload: {
                phone,
              },

            },

          }
        );

      } catch (error) {

        console.log(error);

        showError(

          error?.response?.data
            ?.message ||

          "Failed to send OTP"

        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="min-h-screen bg-gray-50 dark:bg-[#030712] p-4">

      <div className="max-w-md mx-auto mt-10">

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

              text-gray-900
              dark:text-white
            "
          >
            Change Phone Number
          </h1>

          {/* FORM */}

          <div className="mt-6">

            <Input
              label="New Phone Number"

              value={phone}

              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }
            />

            {/* BUTTON */}

            <div className="mt-6">

              <Button
                text="Send OTP"

                loading={loading}

                onClick={
                  handleSubmit
                }
              />

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default ChangePhone;