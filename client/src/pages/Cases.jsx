import BottomNav from "../components/BottomNav";

import {
  Menu,
  Search,
  ChevronDown,
  RefreshCcw,
} from "lucide-react";

import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  getCases,
  searchCases,
} from "../api/caseApi";

function Cases() {

  const navigate =
    useNavigate();

  const [activeTab, setActiveTab] =
    useState("All");

  const [cases, setCases] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  // =====================================
  // FETCH CASES
  // =====================================

  const fetchCases =
    async () => {

      try {

        setLoading(true);

        const data =
          await getCases();

        setCases(
          data.cases || []
        );

      } catch {

        toast.error(
          "Failed to load cases"
        );

      } finally {

        setLoading(false);

      }

    };

  // =====================================
  // SEARCH CASES
  // =====================================

  const handleSearch =
    async (value) => {

      setSearch(value);

      try {

        if (!value.trim()) {

          fetchCases();

          return;

        }

        const data =
          await searchCases(
            value
          );

        setCases(
          data.cases || []
        );

      } catch {

        toast.error(
          "Search failed"
        );

      }

    };

  // =====================================
  // LOAD ON START
  // =====================================

  useEffect(() => {

    const timer =
      setTimeout(() => {

        fetchCases();

      }, 0);

    return () =>
      clearTimeout(timer);

  }, []);

  // =====================================
  // FILTER CASES
  // =====================================

  const filteredCases =

    activeTab === "All"

      ? cases.filter(
          (item) =>

            item.case_title
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||

            item.case_number
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )
        )

      : cases.filter(
          (item) =>

            item.case_status ===
              activeTab &&

            (

              item.case_title
                ?.toLowerCase()
                .includes(
                  search.toLowerCase()
                ) ||

              item.case_number
                ?.toLowerCase()
                .includes(
                  search.toLowerCase()
                )

            )
        );

  // =====================================
  // STATUS COLORS
  // =====================================

  const getStatusStyle = (
    status
  ) => {

    if (status === "Pending") {

      return "bg-yellow-100 text-yellow-700";

    }

    if (status === "Verified") {

      return "bg-green-100 text-green-700";

    }

    if (status === "Closed") {

      return "bg-red-100 text-red-700";

    }

    return "bg-purple-100 text-purple-700";

  };

  return (

    <div className="min-h-screen bg-[#f7f8fc] pb-24">

      {/* HEADER */}

      <div className="bg-white px-5 pt-5 pb-4 shadow-sm">

        <div className="flex justify-between items-center">

          <button>

            <Menu size={26} />

          </button>

          <h1 className="text-2xl font-bold">

            Cases

          </h1>

          <button
            onClick={fetchCases}
          >

            <RefreshCcw
              size={22}
            />

          </button>

        </div>

      </div>

      {/* SEARCH */}

      <div className="px-5 mt-6">

        <div className="bg-white rounded-2xl border border-gray-200 flex items-center gap-3 px-4 py-4">

          <Search
            size={20}
            className="text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by Case ID / Title"
            value={search}
            onChange={(e) =>
              handleSearch(
                e.target.value
              )
            }
            className="outline-none bg-transparent w-full"
          />

        </div>

      </div>

      {/* FILTERS */}

      <div className="flex gap-3 overflow-x-auto px-5 mt-5 no-scrollbar">

        {[
          "All",
          "Pending",
          "Verified",
          "Closed",
        ].map((tab, index) => (

          <button
            key={index}
            onClick={() =>
              setActiveTab(tab)
            }
            className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all
            ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-200"
            }`}
          >

            {tab}

          </button>

        ))}

      </div>

      {/* CASE LIST */}

      <div className="px-5 mt-6 space-y-4">

        {loading ? (

          <div className="text-center mt-20 text-gray-500">

            Loading Cases...

          </div>

        ) : filteredCases.length === 0 ? (

          <div className="text-center mt-20 text-gray-500">

            No Cases Found

          </div>

        ) : (

          filteredCases.map(
            (item, index) => (

              <div
  key={index}

  onClick={() =>

    navigate(
      "/case-details",

      {
        state: {

          case_number:
            item.case_number,

        },
      }

    )

  }

  className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm cursor-pointer active:scale-[0.98] transition-all"
>

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="font-bold text-[20px] text-[#111827]">

                      {item.case_number ||
                        "Case ID"}

                    </h2>

                    <p className="text-gray-700 mt-2 text-[16px]">

                      {item.case_title ||
                        "Untitled Case"}

                    </p>

                    <p className="text-gray-500 mt-3 text-[15px]">

                      Next Hearing:
                      {" "}

                      {item.hearing_date ||
                        "Not Scheduled"}

                    </p>

                  </div>

                  <div className="flex flex-col items-end gap-4">

                    <span
                      className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                        item.case_status
                      )}`}
                    >

                      {item.case_status ||
                        "Pending"}

                    </span>

                    <ChevronDown
                      size={20}
                      className="text-gray-400"
                    />

                  </div>

                </div>

              </div>

            )
          )

        )}

      </div>

      {/* CREATE CASE BUTTON */}

      <button
        onClick={() =>
          navigate("/create-case")
        }
        className="fixed bottom-28 right-5 w-16 h-16 rounded-full bg-blue-700 text-white text-4xl shadow-2xl flex items-center justify-center"
      >

        +

      </button>

      {/* BOTTOM NAV */}

      <BottomNav />

    </div>

  );

}

export default Cases;