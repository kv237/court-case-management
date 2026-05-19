// src/App.jsx

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  Toaster,
} from "react-hot-toast";

/* AUTH PAGES */

import Login from "./pages/Login";

import ForgotPassword from "./pages/ForgotPassword";

import VerifyOTP from "./pages/VerifyOTP";

import ResetPassword from "./pages/ResetPassword";

import Success from "./pages/Success";

/* MAIN PAGES */

import Dashboard from "./pages/Dashboard";

import Cases from "./pages/Cases";

import CreateCase from "./pages/CreateCase";

import CaseDetails from "./pages/CaseDetails";

import Upload from "./pages/Upload";

import Search from "./pages/Search";

import HearingCalendar from "./pages/HearingCalendar";

import AdvocateDetails from "./pages/AdvocateDetails";

import StatusTracking from "./pages/StatusTracking";

import Documents from "./pages/Documents";

import Profile from "./pages/Profile";

import Test from "./pages/Test";

/* PROFILE SECURITY PAGES */

import ChangePassword from "./pages/profile/ChangePassword";

import ChangeEmail from "./pages/profile/ChangeEmail";

import ChangePhone from "./pages/profile/ChangePhone";

import VerifyProfileOTP from "./pages/profile/VerifyProfileOTP";

/* ROUTES */

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <div
      className="
        min-h-screen
        bg-gray-100
        text-gray-900
        transition-colors
        duration-300
        dark:bg-[#050816]
        dark:text-white
      "
    >
      {/* ONLY ONE GLOBAL TOASTER */}

      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerStyle={{
          top: 20,
          right: 20,
        }}
        toastOptions={{
          duration: 3000,

          style: {
            borderRadius: "16px",
            background: "#18181b",
            color: "#ffffff",
            fontSize: "13px",
            padding: "14px 16px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.25)",
          },

          success: {
            iconTheme: {
              primary: "#2563eb",
              secondary: "#ffffff",
            },
          },

          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
      />

      <Routes>

        {/* DEFAULT */}

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

        {/* AUTH */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/forgot-password"
          element={
            <ForgotPassword />
          }
        />

        <Route
          path="/verify-otp"
          element={
            <VerifyOTP />
          }
        />

        <Route
          path="/reset-password"
          element={
            <ResetPassword />
          }
        />

        <Route
          path="/success"
          element={<Success />}
        />

        {/* TEST */}

        <Route
          path="/test"
          element={<Test />}
        />

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* DOCUMENTS */}

        <Route
          path="/documents"
          element={
            <ProtectedRoute>
              <Documents />
            </ProtectedRoute>
          }
        />

        {/* CASES */}

        <Route
          path="/cases"
          element={
            <ProtectedRoute>
              <Cases />
            </ProtectedRoute>
          }
        />

        {/* CREATE CASE */}

        <Route
          path="/create-case"
          element={
            <ProtectedRoute>
              <CreateCase />
            </ProtectedRoute>
          }
        />

        {/* CASE DETAILS */}

        <Route
          path="/case-details"
          element={
            <ProtectedRoute>
              <CaseDetails />
            </ProtectedRoute>
          }
        />

        {/* UPLOAD */}

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />

        {/* SEARCH */}

        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />

        {/* PROFILE */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* CHANGE PASSWORD */}

        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

        {/* CHANGE EMAIL */}

        <Route
          path="/change-email"
          element={
            <ProtectedRoute>
              <ChangeEmail />
            </ProtectedRoute>
          }
        />

        {/* CHANGE PHONE */}

        <Route
          path="/change-phone"
          element={
            <ProtectedRoute>
              <ChangePhone />
            </ProtectedRoute>
          }
        />

        {/* VERIFY PROFILE OTP */}

        <Route
          path="/verify-profile-otp"
          element={
            <ProtectedRoute>
              <VerifyProfileOTP />
            </ProtectedRoute>
          }
        />

        {/* CALENDAR */}

        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <HearingCalendar />
            </ProtectedRoute>
          }
        />

        {/* ADVOCATES */}

        <Route
          path="/advocates"
          element={
            <ProtectedRoute>
              <AdvocateDetails />
            </ProtectedRoute>
          }
        />

        {/* TRACKING */}

        <Route
          path="/tracking"
          element={
            <ProtectedRoute>
              <StatusTracking />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

      </Routes>
    </div>
  );
}

export default App;