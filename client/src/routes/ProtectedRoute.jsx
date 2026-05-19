import {
  Navigate,
  useLocation,
} from "react-router-dom";

import useAuth from "../context/useAuth";

function ProtectedRoute({
  children,
}) {

  const {
    user,
    loading,
  } = useAuth();

  const location =
    useLocation();

  // LOADING SCREEN

  if (loading) {

    return (

      <div className="h-screen bg-[#050816] flex items-center justify-center text-white text-lg">

        Loading...

      </div>

    );

  }

  // NO USER

  if (!user) {

    return (

      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />

    );

  }

  return children;

}

export default ProtectedRoute;