import {
  Home,
  FileText,
  Upload,
  Search,
  MoreHorizontal,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function BottomNav() {

  const navigate = useNavigate();

  return (

    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 flex justify-around items-center py-3 z-50 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">

      {/* DASHBOARD */}

      <button
        onClick={() =>
          navigate("/dashboard")
        }
        className="flex flex-col items-center text-[#2f5cff]"
      >

        <Home
          size={22}
          strokeWidth={2.5}
        />

        <span className="text-[11px] mt-1 font-medium">

          Dashboard

        </span>

      </button>

      {/* CASES */}

      <button
        onClick={() =>
          navigate("/cases")
        }
        className="flex flex-col items-center text-gray-500"
      >

        <FileText
          size={22}
          strokeWidth={2.2}
        />

        <span className="text-[11px] mt-1 font-medium">

          Cases

        </span>

      </button>

      {/* UPLOAD */}

      <button
        onClick={() =>
          navigate("/upload")
        }
        className="relative flex flex-col items-center"
      >

        <div className="bg-[#2f5cff] text-white rounded-full p-4 shadow-xl -mt-10 border-4 border-white">

          <Upload
            size={24}
            strokeWidth={2.5}
          />

        </div>

        <span className="text-[11px] mt-1 text-gray-500 font-medium">

          Upload

        </span>

      </button>

      {/* SEARCH */}

      <button
        onClick={() =>
          navigate("/search")
        }
        className="flex flex-col items-center text-gray-500"
      >

        <Search
          size={22}
          strokeWidth={2.2}
        />

        <span className="text-[11px] mt-1 font-medium">

          Search

        </span>

      </button>

      {/* MORE */}

      <button
        onClick={() =>
          navigate("/more")
        }
        className="flex flex-col items-center text-gray-500"
      >

        <MoreHorizontal
          size={22}
          strokeWidth={2.2}
        />

        <span className="text-[11px] mt-1 font-medium">

          More

        </span>

      </button>

    </div>
  );
}

export default BottomNav;