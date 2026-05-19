import {
  useEffect,
  useState,
  useCallback,
} from "react";

import AuthContext from "./AuthContextObject";

import { getProfile } from "../api/authApi";

function AuthProvider({
  children,
}) {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // LOAD USER

  const loadUser =
    useCallback(async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {

          setUser(null);

          return;
        }

        const response =
          await getProfile();

        if (
          response?.success
        ) {

          setUser(
            response.user
          );

        } else {

          localStorage.removeItem(
            "token"
          );

          setUser(null);

        }

      } catch (error) {

        console.log(error);

        localStorage.removeItem(
          "token"
        );

        setUser(null);

      } finally {

        setLoading(false);

      }

    }, []);

  // INITIAL LOAD

  useEffect(() => {

    let mounted = true;

    const init =
      async () => {

        if (mounted) {

          await loadUser();

        }

      };

    init();

    return () => {

      mounted = false;

    };

  }, [loadUser]);

  // LOGIN

  const login =
    async (token) => {

      localStorage.setItem(
        "token",
        token
      );

      await loadUser();

    };

  // LOGOUT

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setUser(null);

  };

  return (

    <AuthContext.Provider
      value={{

        user,

        loading,

        login,

        logout,

        setUser,

      }}
    >

      {children}

    </AuthContext.Provider>

  );

}

export default AuthProvider;