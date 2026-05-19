import { useState } from "react";

import {
  User,
  Mail,
  Phone,
  Shield,
  LogOut,
  Edit3,
  Bell,
  Lock,
  ChevronRight,
  FileText,
  Briefcase,
  KeyRound,
  Smartphone,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import BottomNavigation from "../components/documents/BottomNavigation";

import ThemeToggle from "../components/ThemeToggle";

function Profile() {
  const navigate = useNavigate();

  // =====================================
  // USER
  // =====================================

  const [user] = useState(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    return {
      name:
        storedUser?.name ||
        "Superintendent",

      email:
        storedUser?.email ||
        "superintendent@court.gov",

      phone:
        storedUser?.phone ||
        "+91 9876543210",

      role:
        storedUser?.role ||
        "District Court Admin",
    };
  });

  // =====================================
  // LOGOUT
  // =====================================

 const handleLogout = () => {

  // CLEAR STORAGE

  localStorage.removeItem("token");

  localStorage.removeItem("user");

  sessionStorage.clear();

  // FORCE FULL RELOAD

  window.location.replace("/login");
};
  // =====================================
  // SETTINGS MENU
  // =====================================

  const menuItems = [
    {
      icon: Bell,
      title: "Notifications",
      subtitle: "Manage alerts",
    },

    {
      icon: Lock,
      title: "Privacy & Security",
      subtitle: "Security settings",
    },

    {
      icon: KeyRound,
      title: "Change Password",
      subtitle: "Update account password",

      onClick: () =>
        navigate("/change-password"),
    },

    {
      icon: Mail,
      title: "Change Email",
      subtitle: "Update email address",

      onClick: () =>
        navigate("/change-email"),
    },

    {
      icon: Smartphone,
      title: "Change Phone",
      subtitle: "Update phone number",

      onClick: () =>
        navigate("/change-phone"),
    },

    {
      icon: FileText,
      title: "Documents",
      subtitle: "Manage files",

      onClick: () =>
        navigate("/documents"),
    },

    {
      icon: Briefcase,
      title: "Cases",
      subtitle: "View case records",

      onClick: () =>
        navigate("/cases"),
    },
  ];

  return (
    <div
      className="
        min-h-screen
        bg-[#f5f7fb]
        dark:bg-[#050816]
        pb-28
        transition-all
        duration-300
      "
    >
      {/* MAIN */}

      <div
        className="
          max-w-sm
          mx-auto
          min-h-screen
          px-4
          pt-5
        "
      >
        {/* HEADER */}

        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <div>
            <h1
              className="
                text-[24px]
                font-bold
                text-black
                dark:text-white
              "
            >
              Profile
            </h1>

            <p
              className="
                text-[12px]
                text-gray-500
                dark:text-gray-400
                mt-1
              "
            >
              Manage your account
            </p>
          </div>

          {/* EDIT BUTTON */}

          <button
            onClick={() =>
              navigate("/change-email")
            }
            className="
              w-11
              h-11
              rounded-2xl
              bg-white
              dark:bg-[#0B1120]
              border
              border-gray-200
              dark:border-slate-800
              flex
              items-center
              justify-center
            "
          >
            <Edit3
              size={18}
              className="
                text-cyan-500
              "
            />
          </button>
        </div>

        {/* PROFILE CARD */}

        <div
          className="
            mt-6
            rounded-3xl
            bg-gradient-to-br
            from-cyan-500
            to-blue-600
            p-5
            text-white
            shadow-[0_10px_40px_rgba(0,229,255,0.25)]
          "
        >
          <div
            className="
              flex
              items-center
              gap-4
            "
          >
            {/* AVATAR */}

            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-white/20
                border
                border-white/20
                flex
                items-center
                justify-center
              "
            >
              <User size={34} />
            </div>

            {/* INFO */}

            <div>
              <h2
                className="
                  text-[22px]
                  font-bold
                "
              >
                {user.name}
              </h2>

              <p
                className="
                  text-[12px]
                  opacity-90
                  mt-1
                "
              >
                {user.role}
              </p>
            </div>
          </div>
        </div>

        {/* DETAILS */}

        <div className="mt-6 space-y-4">
          {/* EMAIL */}

          <div
            className="
              bg-white
              dark:bg-[#0B1120]
              rounded-3xl
              p-4
              border
              border-gray-200
              dark:border-slate-800
              flex
              items-center
              gap-4
            "
          >
            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-cyan-100
                dark:bg-cyan-500/10
                flex
                items-center
                justify-center
              "
            >
              <Mail
                size={20}
                className="
                  text-cyan-500
                "
              />
            </div>

            <div className="flex-1">
              <p
                className="
                  text-[11px]
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Email Address
              </p>

              <h3
                className="
                  text-[13px]
                  font-semibold
                  text-black
                  dark:text-white
                  mt-1
                "
              >
                {user.email}
              </h3>
            </div>

            <button
              onClick={() =>
                navigate("/change-email")
              }
              className="
                text-cyan-500
                text-xs
                font-semibold
              "
            >
              Change
            </button>
          </div>

          {/* PHONE */}

          <div
            className="
              bg-white
              dark:bg-[#0B1120]
              rounded-3xl
              p-4
              border
              border-gray-200
              dark:border-slate-800
              flex
              items-center
              gap-4
            "
          >
            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-green-100
                dark:bg-green-500/10
                flex
                items-center
                justify-center
              "
            >
              <Phone
                size={20}
                className="
                  text-green-500
                "
              />
            </div>

            <div className="flex-1">
              <p
                className="
                  text-[11px]
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Phone Number
              </p>

              <h3
                className="
                  text-[13px]
                  font-semibold
                  text-black
                  dark:text-white
                  mt-1
                "
              >
                {user.phone}
              </h3>
            </div>

            <button
              onClick={() =>
                navigate("/change-phone")
              }
              className="
                text-green-500
                text-xs
                font-semibold
              "
            >
              Change
            </button>
          </div>

          {/* ROLE */}

          <div
            className="
              bg-white
              dark:bg-[#0B1120]
              rounded-3xl
              p-4
              border
              border-gray-200
              dark:border-slate-800
              flex
              items-center
              gap-4
            "
          >
            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-purple-100
                dark:bg-purple-500/10
                flex
                items-center
                justify-center
              "
            >
              <Shield
                size={20}
                className="
                  text-purple-500
                "
              />
            </div>

            <div>
              <p
                className="
                  text-[11px]
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Role
              </p>

              <h3
                className="
                  text-[13px]
                  font-semibold
                  text-black
                  dark:text-white
                  mt-1
                "
              >
                {user.role}
              </h3>
            </div>
          </div>
        </div>

        {/* THEME */}

        <div className="mt-6">
          <ThemeToggle />
        </div>

        {/* SETTINGS */}

        <div className="mt-6">
          <h2
            className="
              text-[15px]
              font-bold
              text-black
              dark:text-white
              mb-4
            "
          >
            Security & Settings
          </h2>

          <div className="space-y-3">
            {menuItems.map(
              (item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="
                    w-full
                    bg-white
                    dark:bg-[#0B1120]
                    rounded-3xl
                    p-4
                    border
                    border-gray-200
                    dark:border-slate-800
                    flex
                    items-center
                    justify-between
                    transition-all
                    duration-300
                    hover:scale-[1.01]
                  "
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="
                        w-11
                        h-11
                        rounded-2xl
                        bg-gray-100
                        dark:bg-[#050816]
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <item.icon
                        size={18}
                        className="
                          text-cyan-500
                        "
                      />
                    </div>

                    <div className="text-left">
                      <h3
                        className="
                          text-[13px]
                          font-semibold
                          text-black
                          dark:text-white
                        "
                      >
                        {item.title}
                      </h3>

                      <p
                        className="
                          text-[11px]
                          text-gray-500
                          dark:text-gray-400
                          mt-1
                        "
                      >
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    size={18}
                    className="
                      text-gray-400
                    "
                  />
                </button>
              )
            )}
          </div>
        </div>

        {/* LOGOUT */}

        <button
          onClick={handleLogout}
          className="
            w-full
            mt-8
            bg-red-500
            hover:bg-red-600
            text-white
            rounded-3xl
            py-4
            flex
            items-center
            justify-center
            gap-3
            text-[14px]
            font-semibold
            transition-all
            duration-300
          "
        >
          <LogOut size={18} />

          Logout
        </button>
      </div>

      {/* BOTTOM NAV */}

      <BottomNavigation />
    </div>
  );
}

export default Profile;