// src/components/otp/OTPTimer.jsx

import { useEffect, useState } from "react";

const OTPTimer = ({ onResend }) => {
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer <= 0) return undefined;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    setTimer(60);

    if (onResend) {
      onResend();
    }
  };

  return (
    <div className="mt-4 text-center">
      {timer > 0 ? (
        <p className="text-sm text-gray-500">
          Resend OTP in {timer}s
        </p>
      ) : (
        <button
          type="button"
          onClick={handleResend}
          className="
            text-blue-600
            dark:text-blue-400
            font-semibold
          "
        >
          Resend OTP
        </button>
      )}
    </div>
  );
};

export default OTPTimer;