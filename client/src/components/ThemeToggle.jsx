import {
  Moon,
  Sun,
} from "lucide-react";

import useTheme
  from "../hooks/useTheme";

function ThemeToggle() {
  const {
    theme,
    setTheme,
    isDark,
  } = useTheme();

  return (
    <div
      className="
        rounded-2xl

        border
        border-gray-200
        dark:border-slate-800

        bg-[#f5f7fb]
        dark:bg-[#050816]

        p-1.5

        shadow-sm

        transition-all
        duration-300
      "
    >
      {/* LABEL */}

      <div
        className="
          flex items-center
          justify-between

          px-2
          pb-2
        "
      >
        <p
          className="
            text-[11px]
            font-semibold

            text-gray-500
            dark:text-gray-400
          "
        >
          Appearance
        </p>

        <div
          className={`
            w-2 h-2
            rounded-full

            transition-all
            duration-300

            ${
              isDark
                ? "bg-cyan-400"
                : "bg-yellow-400"
            }
          `}
        />
      </div>

      {/* TOGGLE */}

      <div
        className="
          relative

          flex items-center

          rounded-2xl

          bg-white
          dark:bg-[#0B1120]

          p-1

          border
          border-gray-100
          dark:border-slate-800

          overflow-hidden
        "
      >
        {/* ACTIVE SLIDER */}

        <div
          className={`
            absolute
            top-1
            bottom-1

            w-[calc(50%-4px)]

            rounded-xl

            transition-all
            duration-300

            ${
              theme === "light"
                ? `
                  left-1

                  bg-white

                  shadow-md
                `
                : `
                  left-[calc(50%+2px)]

                  bg-cyan-500
                `
            }
          `}
        />

        {/* LIGHT */}

        <button
          onClick={() =>
            setTheme(
              "light"
            )
          }
          className={`
            relative
            z-10

            flex-1

            flex items-center
            justify-center
            gap-2

            rounded-xl

            px-3
            py-2.5

            text-[12px]
            font-semibold

            transition-all
            duration-300

            ${
              theme ===
              "light"
                ? `
                  text-black
                `
                : `
                  text-gray-500
                  dark:text-gray-400
                `
            }
          `}
        >
          <Sun size={15} />

          Light
        </button>

        {/* DARK */}

        <button
          onClick={() =>
            setTheme(
              "dark"
            )
          }
          className={`
            relative
            z-10

            flex-1

            flex items-center
            justify-center
            gap-2

            rounded-xl

            px-3
            py-2.5

            text-[12px]
            font-semibold

            transition-all
            duration-300

            ${
              theme ===
              "dark"
                ? `
                  text-black
                `
                : `
                  text-gray-500
                  dark:text-gray-400
                `
            }
          `}
        >
          <Moon size={15} />

          Dark
        </button>
      </div>
    </div>
  );
}

export default ThemeToggle;