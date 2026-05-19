import {
  useEffect,
  useState,
} from "react";

import {
  Menu,
  Bell,
  Home,
  Briefcase,
  Search,
  FileText,
  Calendar,
  Scale,
  LogOut,
  X,
  Users,
  Settings,
  Gavel,
  ClipboardList,
  BarChart3,
} from "lucide-react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import axios from "axios";

import {
  showSuccess,
  showError,
} from "../utils/toast";

import ThemeToggle
  from "../components/ThemeToggle";

import BottomNavigation
  from "../components/documents/BottomNavigation";

import FilePreviewModal
  from "../components/documents/FilePreviewModal";

import {
  getGreeting,
} from "../utils/getGreeting";

export default function Dashboard() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [previewFile, setPreviewFile] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const greeting =
    getGreeting();

    const user =
  JSON.parse(
    localStorage.getItem("user")
  ) || {};

  // =====================================
  // STATES
  // =====================================

  const [stats, setStats] =
    useState({
      totalCases: 0,
      pendingCases: 0,
      totalHearings: 0,
      totalDocuments: 0,
    });

  const [recentDocs, setRecentDocs] =
    useState([]);

  const token =
    localStorage.getItem("token");

  const API =
    import.meta.env.VITE_API_URL;

  // =====================================
  // FETCH DASHBOARD
  // =====================================

  useEffect(() => {

    let mounted = true;

    const fetchDashboard =
      async () => {

        try {

          const dashboardRes =
            await axios.get(
              `${API}/dashboard/stats`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          if (mounted) {

            setStats(
              dashboardRes.data
                .stats || {}
            );

          }

          const docsRes =
            await axios.get(
              `${API}/documents/all`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          if (mounted) {

            setRecentDocs(
              docsRes.data
                .documents || []
            );

          }

        } catch (error) {

          console.log(error);

        }

      };

    fetchDashboard();

    return () => {

      mounted = false;

    };

  }, [API, token]);

  // =====================================
  // FILTER DOCUMENTS
  // =====================================

  const filteredDocs =
    recentDocs.filter(
      (doc) => {

        const query =
          search.toLowerCase();

        const documentName =
          doc.document_name?.toLowerCase() ||
          "";

        const caseNumber =
          doc.case_number?.toLowerCase() ||
          "";

        return (

          documentName.includes(query) ||

          caseNumber.includes(query)

        );

      }
    );

  // =====================================
  // PREVIEW
  // =====================================

  const openPreview =
    (doc) => {

      setPreviewFile(doc);

    };

  const closePreview =
    () => {

      setPreviewFile(null);

    };

  // =====================================
  // LOGOUT
  // =====================================

const handleLogout =
  () => {

    localStorage.clear();

    sessionStorage.clear();

    showSuccess(
      "Logged out successfully"
    );

    setTimeout(() => {

      window.location.replace(
        "/login"
      );

    }, 500);

  };

  // =====================================
  // SIDEBAR ITEMS
  // =====================================

  const menuItems = [

    {
      icon: Home,
      label: "Dashboard",
      path: "/dashboard",
      disabled: false,
    },

    {
      icon: Briefcase,
      label: "Cases",
      disabled: true,
    },

    {
      icon: FileText,
      label: "Documents",
      path: "/documents",
      disabled: false,
    },

    {
      icon: ClipboardList,
      label: "Petitions",
      disabled: true,
    },

    {
      icon: Gavel,
      label: "Hearing",
      disabled: true,
    },

    {
      icon: Users,
      label: "Advocates",
      disabled: true,
    },

    {
      icon: Calendar,
      label: "Calendar",
      disabled: true,
    },

    {
      icon: BarChart3,
      label: "Reports",
      disabled: true,
    },

    {
      icon: Users,
      label: "Users",
      disabled: true,
    },

    {
      icon: Settings,
      label: "Settings",
      path: "/profile",
      disabled: false,
    },

  ];

  return (

    <div
      className="
        min-h-screen
        bg-[#f5f7fb]
        dark:bg-[#050816]
        text-[#111827]
        dark:text-white
        transition-all
        duration-300
      "
    >

      {/* PREVIEW */}

      <FilePreviewModal
        file={previewFile}
        onClose={closePreview}
      />

      {/* OVERLAY */}

      {sidebarOpen && (

        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="
            fixed inset-0
            bg-black/50
            backdrop-blur-sm
            z-40
          "
        />

      )}

      {/* SIDEBAR */}

      <div
  className={`
    fixed
    top-0
    left-0

    h-screen
    w-[260px]

    overflow-y-auto

    bg-gradient-to-b
    from-[#08142E]
    to-[#020817]

    text-white

    z-50

    transition-all
    duration-300

    border-r
    border-blue-900/40

    scrollbar-thin
    scrollbar-thumb-blue-800
    scrollbar-track-transparent

    ${
      sidebarOpen
        ? "translate-x-0"
        : "-translate-x-full"
    }
  `}
>  
      


        <div className="p-5 pb-32">

          {/* PROFILE */}

          <div className="flex items-center justify-between mb-8">

            <div className="flex items-center gap-3">

              <div
                className="
                  w-12 h-12
                  rounded-2xl
                  bg-[#0D1F45]
                  border
                  border-blue-500/20
                  flex
                  items-center
                  justify-center
                "
              >

                <Scale
                  size={22}
                  className="
                    text-yellow-400
                  "
                />

              </div>

              <div>

                <h2
  className="
    font-semibold
    text-[15px]
  "
>
  {user?.name || "User"}
</h2>
                <p
                  className="
                    text-[11px]
                    text-gray-400
                  "
                >
                  District Court
                </p>

              </div>

            </div>

            <button
              onClick={() =>
                setSidebarOpen(false)
              }
            >

              <X size={18} />

            </button>

          </div>

          {/* MENU */}

          <div className="space-y-2">

            {menuItems.map(
              (item, index) => (

                <button
                  key={index}

                  onClick={() => {

                    if (item.disabled) {

  showError(
    "Coming Soon 🚀"
  );

  return;

}

                    navigate(
                      item.path
                    );

                    setSidebarOpen(
                      false
                    );

                  }}

                  className={`
                    w-full
                    flex
                    items-center
                    gap-4
                    px-4
                    py-3
                    rounded-2xl
                    transition-all
                    duration-300
                    relative

                    ${
                      location.pathname ===
                        item.path

                        ? `
                          bg-gradient-to-r
                          from-blue-700
                          to-blue-600
                          text-white
                        `

                        : `
                          text-gray-300
                          hover:bg-white/10
                        `
                    }
                  `}
                >

                  <item.icon
                    size={18}
                  />

                  <span
                    className="
                      text-[14px]
                      font-medium
                    "
                  >
                    {item.label}
                  </span>

                  {item.disabled && (

                    <span
                      className="
                        ml-auto
                        text-[10px]
                        bg-white/10
                        px-2
                        py-1
                        rounded-full
                      "
                    >
                      Soon
                    </span>

                  )}

                </button>

              )
            )}

          </div>

          {/* THEME */}

          <div className="mt-6">

            <ThemeToggle />

          </div>

          {/* LOGOUT */}

          <button
            onClick={handleLogout}
            className="
              flex items-center
              gap-3
              mt-8
              px-4
              py-3
              text-red-400
              hover:bg-red-500/10
              rounded-2xl
              transition-all
              duration-300
            "
          >

            <LogOut size={18} />

            <span
              className="
                text-[13px]
                font-medium
              "
            >
              Logout
            </span>

          </button>

        </div>

      </div>

      {/* MAIN */}

      <div
        className="
          max-w-sm
          mx-auto
          min-h-screen
          pb-24
        "
      >

        {/* HEADER */}

        <div className="flex items-center justify-between px-4 pt-5">

          <div className="flex items-center gap-3">

            <button
              onClick={() =>
                setSidebarOpen(true)
              }
            >

              <Menu size={22} />

            </button>

            <h1
              className="
                text-[20px]
                font-bold
              "
            >
              Dashboard
            </h1>

          </div>

          <button className="relative">

            <Bell size={20} />

            <div
              className="
                absolute
                -top-1
                -right-1
                w-2 h-2
                rounded-full
                bg-red-500
              "
            />

          </button>

        </div>

        {/* HERO */}

        <div className="px-4 mt-5">

          <div
            className="
              rounded-3xl
              bg-gradient-to-br
              from-cyan-500
              to-blue-600
              p-5
              text-white
            "
          >

            <p className="text-[13px] opacity-90">
              {greeting},
            </p>

            <h1
              className="
                text-[28px]
                font-bold
                mt-1
              "
            >
              Superintendent
            </h1>

            <p
              className="
                text-[12px]
                mt-2
                opacity-80
              "
            >
              Welcome back to Court
              Case Management
            </p>

          </div>

        </div>

        {/* SEARCH */}

        <div className="px-4 mt-5">

          <div
            className="
              bg-white
              dark:bg-[#0B1120]
              rounded-2xl
              px-4
              h-[52px]
              flex items-center
              gap-3
            "
          >

            <Search
              size={18}
              className="
                text-gray-400
              "
            />

            <input
              type="text"
              placeholder="Search documents..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="
                bg-transparent
                outline-none
                flex-1
                text-[13px]
              "
            />

          </div>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-2 gap-3 px-4 mt-6">

          {[
            {
              title:
                "Total Cases",
              value:
                stats.totalCases,
            },

            {
              title:
                "Pending Cases",
              value:
                stats.pendingCases,
            },

            {
              title:
                "Hearings",
              value:
                stats.totalHearings,
            },

            {
              title:
                "Documents",
              value:
                stats.totalDocuments,
            },

          ].map(
            (card, index) => (

              <div
                key={index}
                className="
                  bg-white
                  dark:bg-[#0B1120]
                  rounded-3xl
                  p-4
                "
              >

                <p
                  className="
                    text-[11px]
                    text-gray-500
                  "
                >
                  {card.title}
                </p>

                <h2
                  className="
                    text-[28px]
                    font-bold
                    mt-3
                  "
                >
                  {card.value || 0}
                </h2>

              </div>

            )
          )}

        </div>

        {/* RECENT DOCUMENTS */}

        <div className="px-4 mt-8">

          <div className="flex items-center justify-between mb-4">

            <h2
              className="
                text-[18px]
                font-bold
              "
            >
              Recent Documents
            </h2>

            <button
              onClick={() =>
                navigate(
                  "/documents"
                )
              }
              className="
                text-cyan-500
                text-[12px]
                font-semibold
              "
            >
              View All
            </button>

          </div>

          <div className="space-y-3">

            {filteredDocs
              .slice(0, 5)
              .map(
                (
                  doc,
                  index
                ) => (

                  <div
                    key={index}
                    onClick={() =>
                      openPreview(doc)
                    }
                    className="
                      bg-white
                      dark:bg-[#0B1120]
                      rounded-3xl
                      p-3
                      flex items-center justify-between
                      cursor-pointer
                    "
                  >

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          w-10 h-10
                          rounded-2xl
                          bg-red-100
                          dark:bg-red-500/10
                          flex items-center
                          justify-center
                        "
                      >

                        <FileText
                          size={18}
                          className="
                            text-red-500
                          "
                        />

                      </div>

                      <div>

                        <h3
                          className="
                            font-semibold
                            text-[13px]
                          "
                        >
                          {
                            doc.document_name
                          }
                        </h3>

                        <p
                          className="
                            text-[11px]
                            text-gray-500
                            mt-1
                          "
                        >
                          {
                            doc.case_number
                          }
                        </p>

                      </div>

                    </div>

                    <p
                      className="
                        text-[10px]
                        text-cyan-500
                        font-medium
                      "
                    >
                      Open
                    </p>

                  </div>

                )
              )}

          </div>

        </div>

        {/* BOTTOM NAV */}

        <BottomNavigation />

      </div>

    </div>

  );

}