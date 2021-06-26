import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import { useAuth } from "../context/AuthProvider";

export function LoginPage() {
  const { loginUserWithCredentials } = useAuth();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <label>Email</label>
          </div>

          <div className="floating-label ">
            <input
              className="floating-input "
              type="password"
              placeholder=" "
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <label>Password</label>
          </div>

          <div className="align-center">

            <div className="page-nav-txt">
              New User?
              <Link to="/signup" style={{ textDecoration: "none" }}>
                {" "}
                <span className="page-nav-link">Create Account </span>{" "}
              </Link>
            </div>

            <button
              type="button"
              className="btn-login"
              onClick={() => {
                loginUserWithCredentials(email, password);
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
