import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./OrderConfirm.css";
import img_confirm from "../../images/green_check.svg";
import { useCart } from "../../context/CartProvider";
import { Loader } from "../Loader";

export function OrderConfirm() {
  const navigate = useNavigate();
  const { isLoading } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className="confirm-container">
        <img src={img_confirm} alt="img" className="confirm-img" />
        <div className="confirm-txt-main">Order Confirmed !!</div>
        <div className="confirm-txt-sub">
          Thank you for shopping with us.
          <br />
          An invoice will be sent to your email with the order details.{" "}
        </div>
        <div style={{ margin: "1rem auto", display: "inline-block" }}>
          <button className="btn-nav" onClick={() => navigate("/categories")}>
            Shop more -&gt;{" "}
          </button>
        </div>
      </div>
    </>
  );
}
