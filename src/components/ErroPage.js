import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./ErrorPage.css";

export function ErrorPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="error-container">
      <div className="error-txt-md">OOPs!!</div>

      <div className="error-txt-sm">Something went wrong</div>
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="btn-empty" style={{ color: "#1E3A8A" }}>
          Go to Home -&gt;
        </div>
      </Link>
    </div>
  );
}
