import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./LoginPage.css";
import { useAuth } from "../context/AuthProvider";
import { ShowErrorMessage } from "./SignupPage";

export function LoginPage() {
  const {
    authState: { authLoader },
    loginUserWithCredentials,
  } = useAuth();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = () => {
    if (!email || email?.length < 1 || !password || password?.length < 1) {
      setError(true);
    } else {
      loginUserWithCredentials(email, password);
    }
  };

  const guestLogin = () => {
    loginUserWithCredentials("guest@mail.com", "123456789");
  };

  return (
    <>
      <div className="component-head">Login</div>
      <div className="login-block">
        <div className="floating-form">
          <div className="floating-label ">
            <input
              className="floating-input"
              type="text"
              placeholder=" "
              onChange={(e) => {
                setEmail(e.target.value.trim());
                setError(false);
              }}
            ></input>
            <label>Email</label>
          </div>

          <div className="floating-label ">
            <input
              className="floating-input "
              type="password"
              placeholder=" "
              onChange={(e) => {
                setPassword(e.target.value.trim());
                setError(false);
              }}
            ></input>
            <label>Password</label>
          </div>

          {error && <ShowErrorMessage message="All fields are mandatory" />}

          <div className="align-center">
            <button
              type="button"
              className={authLoader ? "btn-login btn-disabled" : "btn-login"}
              onClick={handleLogin}
            >
              {authLoader ? (
                <CircularProgress
                  style={{
                    color: "whitesmoke",
                    height: "1.5rem",
                    width: "1.5rem",
                  }}
                />
              ) : (
                "Login"
              )}
            </button>

            <div style={{ color: "#3B82F6", fontSize: "1.15rem" }}>Or</div>

            <button
              type="button"
              className={authLoader ? "btn-login btn-disabled" : "btn-login"}
              onClick={guestLogin}
            >
              {authLoader ? (
                <CircularProgress
                  style={{
                    color: "whitesmoke",
                    height: "1.5rem",
                    width: "1.5rem",
                  }}
                />
              ) : (
                "Login as Guest"
              )}
            </button>

            <div className="page-nav-txt">
              New User?
              <Link to="/signup" style={{ textDecoration: "none" }}>
                {" "}
                <span className="page-nav-link">Create Account </span>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
