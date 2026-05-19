import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
} from "react-router-dom";

import App from "./App";

import "./index.css";

import AuthProvider
  from "./context/AuthContext.jsx";

import {
  ThemeProvider,
} from "./context/ThemeContext";

// =====================================
// ROOT RENDER
// =====================================

// IMPORTANT:
// Removed React.StrictMode
// to prevent duplicate
// toast popups in development.
//
// ONLY ONE Toaster
// should exist inside App.jsx

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <ThemeProvider>

    <BrowserRouter>

      <AuthProvider>

        <App />

      </AuthProvider>

    </BrowserRouter>

  </ThemeProvider>

);