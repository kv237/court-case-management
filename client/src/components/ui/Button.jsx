// src/components/ui/Button.jsx

const Button = ({
  text,
  onClick,
  loading = false,
  type = "button",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`
        w-full
        py-3
        rounded-2xl
        font-semibold
        transition-all
        bg-blue-600
        hover:bg-blue-700
        text-white
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {loading ? "Please wait..." : text}
    </button>
  );
};

export default Button;