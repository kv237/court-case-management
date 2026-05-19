// src/components/otp/OTPInput.jsx

import { useRef } from "react";

const OTPInput = ({ otp, setOtp }) => {
  const inputs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;

    setOtp(updatedOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData
      .getData("text")
      .trim();

    if (!/^\d{6}$/.test(pasted)) return;

    const otpArray = pasted.split("");

    setOtp(otpArray);

    otpArray.forEach((digit, index) => {
      if (inputs.current[index]) {
        inputs.current[index].value = digit;
      }
    });

    inputs.current[5]?.focus();
  };

  return (
    <div
      className="flex justify-between gap-2"
      onPaste={handlePaste}
    >
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputs.current[index] = el;
          }}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) =>
            handleChange(e.target.value, index)
          }
          onKeyDown={(e) =>
            handleKeyDown(e, index)
          }
          className="
            w-12
            h-14
            rounded-2xl
            border
            border-gray-300
            dark:border-gray-700
            bg-white
            dark:bg-[#111827]
            text-black
            dark:text-white
            text-center
            text-xl
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />
      ))}
    </div>
  );
};

export default OTPInput;