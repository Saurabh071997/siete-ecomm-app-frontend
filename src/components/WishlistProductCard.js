import "./WishlistProductCard.css";
import "./ProductCard.css";
import { useCart } from "../context/CartProvider";


export function WishlistProductCard({ product }) {
  const { handleRemoveFromWishlist, handleMoveToCart } = useCart();
  
  return (
    <div className="card-horizontal-container">
      <div className="card-horizontal-block">
        <img
          src={product.imgUrl}
          className="card-horizontal-img"
          alt="card-img"
        />

        <div className="card-horizontal-block-detail">
          <div style={{ margin: "1rem 0rem" }}>
            <div className="card-block-detail-title">{product.brandName}</div>

            <div
              className="card-block-detail-txt "
              style={{ margin: "0.35rem 0rem" }}
            >
              {product.name}
            </div>

            <div
              className="card-block-detail-info "
              style={{ margin: "0.35rem 0rem" }}
            >
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
        </div>
      </div>

      <div className="card-bottom">
        <button
          className="card-btn"
          style={{ backgroundColor: "#F87171" }}
          onClick={() => {
            handleRemoveFromWishlist({
              productId: product._id
            });
          }}
        >
          REMOVE
        </button>
        <button
          className="card-btn"
          style={{ backgroundColor: "#404040" }}
          onClick={() => {
            handleMoveToCart({
              productId: product._id
            });
          }}
        >
          MOVE TO CART
        </button>
      </div>
    </div>
  );
}
