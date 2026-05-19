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
  validatePassword,
} from "../../utils/validators";

import {
  sendPasswordOTP,
} from "../../api/profileApi";

const ChangePassword = () => {

  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({

      currentPassword: "",

      newPassword: "",

      confirmPassword: "",

    });

  const [loading, setLoading] =
    useState(false);

  // =====================================
  // HANDLE CHANGE
  // =====================================

  const handleChange =
    (field, value) => {

      setForm((prev) => ({

        ...prev,

        [field]: value,

      }));

    };

  // =====================================
  // SUBMIT
  // =====================================

  const handleSubmit =
    async () => {

      if (

        !form.currentPassword ||

        !form.newPassword ||

        !form.confirmPassword

      ) {

        showError(
          "All fields are required"
        );

        return;

      }

      if (
        !validatePassword(
          form.newPassword
        )
      ) {

        showError(
          "Password must be at least 8 characters"
        );

        return;

      }

      if (

        form.newPassword !==
        form.confirmPassword

      ) {

        showError(
          "Passwords do not match"
        );

        return;

      }

      try {

        setLoading(true);

        await sendPasswordOTP(
          form
        );

        showSuccess(
          "OTP sent successfully"
        );

        navigate(
          "/verify-profile-otp",
          {

            state: {

              type: "password",

              payload: form,

            },

          }
        );

      } catch (error) {

        console.log(error);

        showError(

          error?.response?.data
            ?.message ||

          "Something went wrong"

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
            Change Password
          </h1>

          {/* FORM */}

          <div className="mt-6 flex flex-col gap-4">

            {/* CURRENT PASSWORD */}

            <Input
              label="Current Password"

              type="password"

              value={
                form.currentPassword
              }

              onChange={(e) =>
                handleChange(
                  "currentPassword",
                  e.target.value
                )
              }
            />

            {/* NEW PASSWORD */}

            <Input
              label="New Password"

              type="password"

              value={
                form.newPassword
              }

              onChange={(e) =>
                handleChange(
                  "newPassword",
                  e.target.value
                )
              }
            />

            {/* CONFIRM PASSWORD */}

            <Input
              label="Confirm Password"

              type="password"

              value={
                form.confirmPassword
              }

              onChange={(e) =>
                handleChange(
                  "confirmPassword",
                  e.target.value
                )
              }
            />

            {/* BUTTON */}

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

  );

};

export default ChangePassword;