import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ToastProvider";
import {API_URL} from './config'

export const AuthContext = createContext();

function setupAuthHeaderForServiceCalls(token) {
  if (token) {
    delete axios.defaults.headers.common["Authorization"];
    return (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`);
  }
  delete axios.defaults.headers.common["Authorization"];
}

function setupAuthExceptionHandler(logoutUser, navigate, toastDispatch) {
  const UNAUTHORIZED = 401;
  const FORBIDDEN = 403;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        toastDispatch({
          TYPE: "TOGGLE_TOAST",
          payload: { toggle: true, message: "Unauthorised Access" },
        });
        logoutUser();
        navigate("/login");
      } else if (error?.response?.status === FORBIDDEN) {
        toastDispatch({
          TYPE: "TOGGLE_TOAST",
          payload: { toggle: true, message: "User Session Expired" },
        });
        logoutUser();
        navigate("/login");
      } else if(error?.response?.status === 500) {
        toastDispatch({
          TYPE: "TOGGLE_TOAST",
          payload: { toggle: true, message: "NetWork Failure" },
        });
        console.error(error);
        navigate("/error");
      }

      return Promise.reject(error);
    }
  );
}

export function AuthProvider({ children }) {
  const { accessToken: savedToken } = JSON.parse(
    localStorage?.getItem("accessToken")
  ) || { accessToken: null };

  savedToken && setupAuthHeaderForServiceCalls(savedToken);

  const [authState, setAuthState] = useState({
    currentUser: null,
    accessToken: savedToken,
    userAddressList: [],
    authLoader:false
  });

  const { toastDispatch } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // authState?.accessToken &&
      setupAuthExceptionHandler(logoutUser, navigate, toastDispatch);
    // eslint-disable-next-line
  }, []);

  async function loginUserWithCredentials(email, password) {
    setAuthState(authState => ({...authState, authLoader:true}))
    try {
      let response = await axios.post(
        `${API_URL}/login`,
        {
          usermail: email,
          userpassword: password,
        }
      );

      if (response.status === 200) {
        let {
          data: { loggedInUser, accessToken },
        } = response;

        setupAuthHeaderForServiceCalls(accessToken);

        setAuthState((authState) => ({
          ...authState,
          currentUser: loggedInUser,
          accessToken,
        }));

        localStorage?.setItem("accessToken", JSON.stringify({ accessToken }));

        navigate("/");
      }
    } catch (err) {
      if (err?.response?.status === 400 || err?.response?.status === 401) {
        toastDispatch({
          TYPE: "TOGGLE_TOAST",
          payload: { toggle: true, message: "Invalid Credentials" },
        });
      } else {
        console.error(err);
        // navigate('/error');
      }
    }finally{
      setAuthState(authState => ({...authState, authLoader:false}))
    }
  }

  async function handleUserSignUp(email, password) {
    setAuthState(authState => ({...authState, authLoader:true}))
    try {
      let response = await axios.post(
        `${API_URL}/signup`,
        {
          email: email,
          password: password,
        }
      );

      if (response.status === 201) {

        let {data:{newUser, accessToken}} = response;

        setupAuthHeaderForServiceCalls(accessToken);

        setAuthState((authState) => ({
          ...authState,
          currentUser: newUser,
          accessToken,
        }));

        localStorage?.setItem("accessToken", JSON.stringify({ accessToken }));
        toastDispatch({
          TYPE: "TOGGLE_TOAST",
          payload: { toggle: true, message: "Account Created Successfully" },
        });;
        navigate("/");
      }
    } catch (err) {
      // console.log("in signup catch")
      console.log(err?.response);
      if (err?.response?.status === 409) {
        toastDispatch({
          TYPE: "TOGGLE_TOAST",
          payload: { toggle: true, message: "User already exists" },
        });
      } else {
        console.error(err);
        // navigate('/error');
      }
    }finally{
      setAuthState(authState => ({...authState, authLoader:false}))
    }
  }

  async function getUserDetails() {
    try {
      let response = await axios.get(
        `${API_URL}/user/details`
      );

      if (response.status === 200) {
        let {
          data: { data },
        } = response;
        setAuthState((authState) => ({ ...authState, currentUser: data }));
      }
    } catch (err) {
      // handleError(err)
      console.log("now in catch");
      console.log(err?.response);
    }
  }

  async function updateUserProfile(firstname, lastname, contact) {
    try {
      let response = await axios.post(
        `${API_URL}/user/details`,
        {
          firstname,
          lastname,
          contact,
        }
      );

      if (response.status === 200) {
        toastDispatch({
          TYPE: "TOGGLE_TOAST",
          payload: { toggle: true, message: "Profile Updated" },
        });
        navigate("/profile");
      }
    } catch (err) {
      // handleError(err);
      // console.log("now in catch")
      console.error(err);
    }
  }

  async function getUserAddressDetails() {
    try {
      console.log("address detail called")
      let response = await axios.get(
        `${API_URL}/address/users`
      );

      if (response.status === 200) {
        let {
          data: { data },
        } = response;

        let { addresslist } = data;
        setAuthState((authState) => ({
          ...authState,
          userAddressList: addresslist,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUserAddressUpdate({ addressObj, action }) {
    try {
      let response = await axios.post(
        `${API_URL}/address/users`,
        {
          addressObj,
          action,
        }
      );

      if (response.status === 200 || response.status === 201) {
        let {
          data: { data },
        } = response;
        let { addresslist } = data;
        setAuthState((authState) => ({
          ...authState,
          userAddressList: addresslist,
        }));

        let toastMsg;
        if(action==="ADD"){
          toastMsg= `Address added successfully!!`
        }else if(action === "REMOVE"){
          toastMsg = `Address removed successfully`
        }else if(action === "SET_DEFAULT"){
          toastMsg = `Address Selected`
        }

        toastDispatch({
          TYPE: "TOGGLE_TOAST",
          payload: { toggle: true, message: toastMsg },
        });
        navigate("/address");
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function logoutUser() {
    localStorage?.removeItem("accessToken");

    setAuthState((authState) => ({
      ...authState,
      accessToken: null,
      currentUser: null,
      userAddressList: [],
      authLoader:false
    }));

    setupAuthHeaderForServiceCalls(null);
  }

  return (
    <AuthContext.Provider
      value={{
        authState,
        loginUserWithCredentials,
        logoutUser,
        handleUserSignUp,
        getUserDetails,
        updateUserProfile,
        handleUserAddressUpdate,
        getUserAddressDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
