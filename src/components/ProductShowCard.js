import { NewBadge } from "./ProductCard";
import "./ProductCard.css"

export function DiscountNewBadge({ discountVal }) {
    return (
      <div className="card-block-badge-tilt tilt-position" style={{fontSize:"0.75rem"}}>
        {discountVal}% Off
      </div>
    );
  }

export function ProductShowCard({ product }) {
  return (
    <div className="card-show-block">
      <img src={product.imgUrl} alt="img" className="card-block-img" />

      {product.newProduct ? <NewBadge /> : null}

      {product.isDiscounted ? (
        <DiscountNewBadge discountVal={product.discount} />
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
        <div style={{marginBottom:"1rem"}}>
          <div className="card-block-detail-title">{product.brandName}</div>
          <div className="card-block-detail-txt card-block-detail-txt-style">
            {product.name}
          </div>
          <div className="card-block-detail-info card-block-detail-info-style">
            &#8377;
            {product.isDiscounted
              ? product.effectivePrice
              : product.actualPrice}
            {product.isDiscounted ? (
              <span
                className="txt-line-through"
                style={{ opacity: "0.6", marginLeft: "0.5rem" }}
              >
                {" "}
                &#8377; {product.actualPrice}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
