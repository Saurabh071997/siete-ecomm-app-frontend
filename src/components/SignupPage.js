import "./LoginPage.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useAuth } from "../context/AuthProvider";

export const ShowErrorMessage = ({ message }) => {
  return (
    <div
      style={{ color: "#EF4444", margin: "0.5rem auto", fontSize: "1rem" }}
      className="align-center"
    >
      {message}
    </div>
  );
};

export function SignupPage() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(false);

  const errorTypes = {
    emailFormatError: "emailFormatError",
    emptyPasswordError: "emptyPasswordError",
    passwordMismatchError: "passwordMismatchError",
    passwordLengthError: "passwordLengthError",
  };

  const {
    authState: { authLoader },
    handleUserSignUp,
  } = useAuth();

  const handleSignUp = () => {
    let regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!regex.test(email)) {
      setError(errorTypes.emailFormatError);
    } else if (!password || !confirmPassword) {
      setError(errorTypes.emptyPasswordError);
    } else if (password !== confirmPassword) {
      setError(errorTypes.passwordMismatchError);
    } else if (
      password &&
      password.length < 8 &&
      confirmPassword &&
      confirmPassword.length < 8
    ) {
      setError(errorTypes.passwordLengthError);
    } else {
      //   console.log("user signup proceeds");
      handleUserSignUp(email, password);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="component-head">Create Account</div>
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
          {error === errorTypes.emailFormatError && (
            <ShowErrorMessage message="Email must be of type something@something.com" />
          )}

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

          <div className="floating-label ">
            <input
              className="floating-input "
              type="password"
              placeholder=" "
              onChange={(e) => {
                setConfirmPassword(e.target.value.trim());
                setError(false);
              }}
            ></input>
            <label>Confirm Password</label>
          </div>

          {error === errorTypes.emptyPasswordError && (
            <ShowErrorMessage message="Passwords cannot be empty" />
          )}

          {error === errorTypes.passwordMismatchError && (
            <ShowErrorMessage message="Passwords Failed to Match" />
          )}

          {error === errorTypes.passwordLengthError && (
            <ShowErrorMessage message="Password length must be more than 8 characters" />
          )}

          <div className="align-center">
            <button
              type="button"
              className={authLoader ? "btn-login btn-disabled" : "btn-login"}
              onClick={handleSignUp}
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
                "Sign up"
              )}
            </button>

            <div className="page-nav-txt">
              Already a User?
              <Link to="/login" style={{ textDecoration: "none" }}>
                {" "}
                <span className="page-nav-link">Login </span>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
