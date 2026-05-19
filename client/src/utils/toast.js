import toast from "react-hot-toast";

// =====================================
// ACTIVE TOAST TRACKER
// =====================================

const activeToasts = new Set();

// =====================================
// COMMON TOAST CONFIG
// =====================================

const commonConfig = {
  duration: 3000,
  position: "top-right",

  style: {
    borderRadius: "16px",
    background: "#18181b",
    color: "#ffffff",
    fontSize: "13px",
    padding: "14px 16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  },
};

// =====================================
// PREVENT DUPLICATE TOASTS
// =====================================

const createToast = (
  type,
  message
) => {
  if (!message) return;

  const toastKey =
    `${type}-${message}`;

  // Prevent duplicate popup
  if (
    activeToasts.has(toastKey)
  ) {
    return;
  }

  activeToasts.add(toastKey);

  toast[type](message, {
    ...commonConfig,

    onClose: () => {
      activeToasts.delete(
        toastKey
      );
    },
  });
};

// =====================================
// SUCCESS TOAST
// =====================================

export const showSuccess = (
  message
) => {
  createToast(
    "success",
    message
  );
};

// =====================================
// ERROR TOAST
// =====================================

export const showError = (
  message
) => {
  createToast(
    "error",
    message
  );
};

// =====================================
// LOADING TOAST
// =====================================

export const showLoading = (
  message = "Please wait..."
) => {
  return toast.loading(
    message,
    {
      ...commonConfig,
    }
  );
};

// =====================================
// UPDATE TOAST
// =====================================

export const updateToast = (
  toastId,
  type,
  message
) => {
  toast.dismiss(toastId);

  if (type === "success") {
    showSuccess(message);
  }

  if (type === "error") {
    showError(message);
  }
};

// =====================================
// DISMISS SINGLE TOAST
// =====================================

export const hideToast = (
  toastId
) => {
  toast.dismiss(toastId);
};

// =====================================
// DISMISS ALL TOASTS
// =====================================

export const hideAllToasts = () => {
  toast.dismiss();
};

export default toast;