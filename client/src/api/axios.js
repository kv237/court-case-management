import axios from "axios";

const API = axios.create({

  baseURL:
    import.meta.env
      .VITE_API_URL,

  headers: {
    "Content-Type":
      "application/json",
  },

});

// REQUEST INTERCEPTOR

API.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem(
        "token"
      );

      

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  },

  (error) => {

    return Promise.reject(
      error
    );

  }

);

// RESPONSE INTERCEPTOR

API.interceptors.response.use(

  (response) => response,

  (error) => {

    alert(
      JSON.stringify({
        message: error.message,
        code: error.code,
        status: error.response?.status,
        data: error.response?.data
      })
    );

    if (
      error.response?.status === 401
    ) {

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      if (
        window.location.pathname !== "/login"
      ) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);

  }

);

export default API;