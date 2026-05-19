import {
  Home,
  Briefcase,
  Upload,
  User,
  Folder,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

const BottomNavigation = () => {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  // =====================================
  // NAVIGATION ITEMS
  // =====================================

  const navItems = [

    {
      icon: Home,
      label: "Home",
      path: "/dashboard",
      disabled: false,
    },

    {
      icon: Briefcase,
      label: "Cases",
      disabled: true,
    },

    {
      icon: Folder,
      label: "Docs",
      path: "/documents",
      disabled: false,
    },

    {
      icon: Upload,
      label: "Upload",
      path: "/upload",
      disabled: false,
    },

    {
      icon: User,
      label: "Profile",
      path: "/profile",
      disabled: false,
    },

  ];

  return (

    <div
      className="
        fixed
        bottom-0
        left-1/2
        -translate-x-1/2

        w-full
        max-w-sm

        bg-white/90
        dark:bg-[#050816]/90

        backdrop-blur-xl

        border-t
        border-gray-200
        dark:border-zinc-800

        px-4
        py-3

        flex
        items-center
        justify-between

        z-50
      "
    >

      {navItems.map(
        (item, index) => {

          const isActive =
            location.pathname ===
            item.path;

          return (

            <button
              key={index}

              onClick={() => {

                // COMING SOON

                if (item.disabled) {

                  toast(
                    "Coming Soon 🚀"
                  );

                  return;

                }

                navigate(
                  item.path
                );

              }}

              className="
                relative

                flex
                flex-col

                items-center
                gap-1

                transition-all
                duration-300
              "
            >

              {/* SOON BADGE */}

              {item.disabled && (

                <span
                  className="
                    absolute
                    -top-1
                    right-0

                    text-[8px]

                    bg-yellow-500
                    text-black

                    px-1.5
                    py-[1px]

                    rounded-full

                    font-bold
                  "
                >
                  Soon
                </span>

              )}

              {/* ICON */}

              <div
                className={`
                  w-10 h-10

                  rounded-2xl

                  flex
                  items-center
                  justify-center

                  transition-all
                  duration-300

                  ${
                    isActive

                      ? `
                        bg-cyan-500
                        text-black

                        shadow-lg
                        shadow-cyan-500/30
                      `

                      : `
                        text-gray-500
                        dark:text-zinc-400
                      `
                  }

                  ${
                    item.disabled
                      ? "opacity-70"
                      : ""
                  }
                `}
              >

                <item.icon
                  size={18}
                />

              </div>

              {/* LABEL */}

              <span
                className={`
                  text-[9px]
                  font-medium

                  ${
                    isActive

                      ? `
                        text-cyan-500
                      `

                      : `
                        text-gray-500
                        dark:text-zinc-400
                      `
                  }
                `}
              >

                {item.label}

              </span>

            </button>

          );

        }
      )}

    </div>

  );

};

export default BottomNavigation;