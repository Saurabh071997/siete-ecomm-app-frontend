import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    userLoggedIn: false,
    currentUser: null
  });

  useEffect(() => {
    const loginStatus = JSON.parse(localStorage?.getItem("user"));
    loginStatus?.userLoggedIn &&
      setAuthState((authState) => ({
        ...authState,
        userLoggedIn: true,
        currentUser: loginStatus?.userCredentials
      }));
  }, []);

  async function loginUserWithCredentials(email, password) {
    try {
      const response = await axios.post(
        "https://siete-backend.herokuapp.com/login",
        {
          usermail: email,
          userpassword: password
        }
      );

      if (response.status === 201) {
        const {
          data: { userLogin, loggedInUser }
        } = response;

        setAuthState((authState) => ({
          ...authState,
          userLoggedIn: userLogin,
          currentUser: loggedInUser
        }));

        localStorage?.setItem(
          "user",
          JSON.stringify({
            userLoggedIn: true,
            userCredentials: loggedInUser
          })
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function logoutUser() {
    localStorage?.removeItem("user");
    localStorage?.removeItem("cart");
    localStorage?.removeItem("wishlist");
    setAuthState((authState) => ({
      ...authState,
      userLoggedIn: false,
      currentUser: null
    }));
  }

  return (
    <AuthContext.Provider
      value={{ authState, loginUserWithCredentials, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
