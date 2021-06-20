import { useState } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import "./Modal.css";
import { useCart } from "../context/CartProvider";
import { useAuth } from "../context/AuthProvider";
import cross from "../images/close_icon.svg";

export function NewBadge() {
  return (
    <div className="card-block-badge" style={{ fontSize: "0.75rem" }}>
      New
    </div>
  );
}

export function DiscountBadge({ discountVal }) {
  return (
    <div className="card-block-badge-tilt" style={{ fontSize: "0.65rem" }}>
      {discountVal}% Off
    </div>
  );
}

export function ProductCard({ product }) {
  const { handleAddToCart, handleAddToWishlist } = useCart();
  const {
    authState: { userLoggedIn, currentUser },
  } = useAuth();

  const [showLoginModal, setShowLoginModal] = useState(false);

  function LoginModal() {
    return (
      <div className="modal-div">
        <div className="modal-sub-div">
          <div
            style={{
              color: "black",
              fontSize: "1.5rem",
              padding: "0.5rem",
              margin: "0rem auto",
            }}
          >
            Login to continue with this action
          </div>
          <Link to="/login">
            <div style={{ textAlign: "center" }}>
              <button
                style={{
                  color: "white",
                  backgroundColor: "black",
                  fontSize: "1.15rem",
                  padding: "0.5rem 1rem",
                  margin: "0rem auto",
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                Login
              </button>
            </div>
          </Link>
          <button
            style={{
              position: "absolute",
              right: "0.5em",
              top: "0.5em",
              border: "none",
              outline: "none",
              cursor: "pointer",
            }}
            onClick={() => setShowLoginModal(false)}
          >
            <img
              src={cross}
              alt="img"
              style={{
                height: "1rem",
                width: "1rem",
              }}
            />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card-block mob-flex-align">
      {showLoginModal && <LoginModal />}
      <img src={product.imgUrl} alt="img" className="card-block-img" />

      {product.newProduct ? <NewBadge /> : null}

      {product.isDiscounted ? (
        <DiscountBadge discountVal={product.discount} />
      ) : null}

      <div
        className="card-block-detail"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          height: "100%",
        }}
      >
        <div>
          <svg
            className="card-wishlist-icon wishlist-icon-shift"
            viewBox="0 0 32 29.6"
            onClick={() => {
              if (userLoggedIn) {
                handleAddToWishlist({
                  userId: currentUser._id,
                  productId: product._id,
                });
              } else {
                setShowLoginModal(true);
              }
            }}
          >
            <path
              d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
            c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
            />
          </svg>

          <div className="card-block-detail-title">{product.brandName}</div>
          <div className="card-block-detail-txt card-block-detail-txt-style">
            {product.name}
          </div>
          <div className="card-block-detail-info card-block-detail-info-style">
            Rs.
            {product.isDiscounted
              ? product.effectivePrice
              : product.actualPrice}
            {product.isDiscounted ? (
              <span
                className="txt-line-through"
                style={{ opacity: "0.6", marginLeft: "0.5rem" }}
              >
                {" "}
                Rs. {product.actualPrice}
              </span>
            ) : null}
          </div>
        </div>

        <div className="card-block-btn card-block-btn-margin">
          <button
            className="card-block-btn-style"
            onClick={() => {
              if (userLoggedIn) {
                handleAddToCart({
                  userId: currentUser._id,
                  productId: product._id,
                });
              } else {
                setShowLoginModal(true);
              }
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
