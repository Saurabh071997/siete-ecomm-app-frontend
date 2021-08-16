import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ProductPage.css";
import "./Modal.css";
import { useCart } from "../context/CartProvider";
import { useAuth } from "../context/AuthProvider";
import { ProductShowCard } from "./ProductShowCard";
import cross from "../images/close_icon.svg";

export function ProductPage() {
  const { productId } = useParams();
  const {
    state: { productList },
    handleAddToCart,
    handleAddToWishlist,
  } = useCart();

  const {
    authState: { accessToken },
  } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const product = productList?.find(({ _id }) => _id === productId);

  const currentCategory = product?.subcategory?.category?._id;

  const [pin, setPin] = useState(null);
  const [message, setMessage] = useState(null);

  const [showLoginModal, setShowLoginModal] = useState(false);

  function LoginModal() {
    return (
      <>
        <div className="overlay">
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
                      padding: "0.25rem 3rem",
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
        </div>
      </>
    );
  }

  return (
    <>
      {showLoginModal && <LoginModal />}
      <div className="product-block">
        <div className="product-main">
          <div className="product-main-img">
            <img src={product?.imgUrl} alt="product" className="product-img" />
          </div>
          <div className="product-main-detail">
            {product?.newProduct && <div className="product-new">NEW</div>}

            <div className="product-cat">
              <div className="product-cat-main">
                {product?.subcategory?.category?.name}
              </div>
              <div className="product-cat-sep">&#9679;</div>
              <div className="product-cat-sub">
                {product?.subcategory?.name}
              </div>
            </div>

            <div className="product-brand">{product?.brandName}</div>

            <div className="product-name">{product?.name}</div>

            <div>
              {product?.isDiscounted && (
                <button className="product-discount">
                  Discount: {product?.discount}% OFF
                </button>
              )}
            </div>

            <div className="product-price">
              &#8377;{" "}
              {product?.isDiscounted
                ? product?.effectivePrice
                : product?.actualPrice}
              {product?.isDiscounted ? (
                <span
                  className="txt-line-through"
                  style={{ opacity: "0.6", marginLeft: "0.5rem" }}
                >
                  {" "}
                  &#8377; {product?.actualPrice}
                </span>
              ) : null}
              <div className="tax-msg">incl. of all taxes</div>
            </div>

            {message && (
              <div style={{ color: "#EF4444", fontSize: "1rem" }}>
                {message}
              </div>
            )}
            <div className="product-del">
              <div className="del-msg"> check for availability</div>
              <div>
                <input
                  className="product-pin"
                  placeholder="pincode"
                  onChange={(e) => {
                    setPin(e.target.value);
                    setMessage(null);
                  }}
                />
                <button
                  className="btn-pin"
                  onClick={() => {
                    let regex = /^[0-9]{6}$/;
                    if (regex.test(pin)) {
                      let today = new Date();
                      let delivery = new Date(Number(today));
                      delivery = new Date(
                        delivery.setDate(today.getDate() + 5)
                      ).toDateString();
                      let msg = `Will be delivered on ${delivery}`;
                      setMessage(msg);
                    } else {
                      let msg = `Enter valid pincode`;
                      setMessage(msg);
                    }
                  }}
                >
                  check
                </button>
              </div>
            </div>

            <div className="product-btn">
              <button
                onClick={() => {
                  if (accessToken) {
                    handleAddToCart({
                      productId: product?._id,
                      showToast: true,
                    });
                  } else {
                    setShowLoginModal(true);
                  }
                }}
              >
                ADD TO CART
              </button>
              <button
                onClick={() => {
                  if (accessToken) {
                    handleAddToWishlist({
                      productId: product?._id,
                      showToast: true,
                    });
                  } else {
                    setShowLoginModal(true);
                  }
                }}
              >
                ADD TO WISHLIST
              </button>
            </div>
          </div>
        </div>

        <div className="product-sub">
          <div className="product-sub-head">
            {`More from ${product?.subcategory?.category?.name}`}
          </div>

          <div className="product-sub-content">
            {productList?.map((productItem) => {
              let productCategory = productItem?.subcategory?.category?._id;
              if (
                productCategory === currentCategory &&
                productItem?._id !== product?._id
              ) {
                return (
                  <div key={productItem?._id} className="width270">
                    <Link
                      to={`/product/view/${productItem?._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <ProductShowCard product={productItem} />
                    </Link>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
