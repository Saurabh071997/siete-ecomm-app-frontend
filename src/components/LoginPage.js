import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { useAuth } from "../context/AuthProvider";

export function LoginPage() {
  const { loginUserWithCredentials } = useAuth();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  let navigate = useNavigate();

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
            <button
              type="button"
              className="btn-login"
              onClick={() => {
                loginUserWithCredentials(email, password);
                navigate("/");
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
