import { useNavigate } from "react-router-dom";

import BottomNav from "../components/BottomNav";

function More() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.clear();

    navigate("/");

  };

  return (

    <div className="min-h-screen bg-gray-100 pb-24 p-5">

      <h1 className="text-3xl font-bold mb-5">

        More

      </h1>

      <div className="space-y-4">

        <button

          onClick={() =>
            navigate("/calendar")
          }

          className="bg-white p-5 rounded-2xl shadow-sm w-full text-left"
        >

          Hearing Calendar

        </button>

        <button

          onClick={() =>
            navigate("/advocates")
          }

          className="bg-white p-5 rounded-2xl shadow-sm w-full text-left"
        >

          Advocate Details

        </button>

        <button

          onClick={() =>
            navigate("/tracking")
          }

          className="bg-white p-5 rounded-2xl shadow-sm w-full text-left"
        >

          Status Tracking

        </button>

        <button

          className="bg-white p-5 rounded-2xl shadow-sm w-full text-left"
        >

          Reports

        </button>

        <button

          className="bg-white p-5 rounded-2xl shadow-sm w-full text-left"
        >

          Settings

        </button>

        <button

          onClick={logout}

          className="bg-red-500 text-white p-5 rounded-2xl w-full"
        >

          Logout

        </button>

      </div>

      <BottomNav />

    </div>
  );
}

export default More;