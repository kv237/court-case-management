// src/components/ui/Input.jsx

const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="
          w-full
          px-4
          py-3
          rounded-2xl
          border
          border-gray-300
          dark:border-gray-700
          bg-white
          dark:bg-[#111827]
          text-gray-900
          dark:text-white
          outline-none
          focus:ring-2
          focus:ring-blue-500
          transition-all
        "
      />
    </div>
  );
};

export default Input;