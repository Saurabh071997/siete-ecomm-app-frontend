import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartProvider";
// import { ACTIONS } from "../../context/reducerFunction";
import { WishlistProductCard } from "../WishlistProductCard";
import { Loader } from "../Loader";

export function Wishlist() {
  const {
    state: { productList, itemsInWishlist, isLoading },
    getUserWishlist
  } = useCart();


  useEffect(()=>{
    getUserWishlist();
    // eslint-disable-next-line
  },[])

  return isLoading ? (
    <Loader />
  ) : (
    <div className="page-layout">
      <div className="page-head">Wishlist</div>
      {itemsInWishlist?.length > 0 ? (
        <div className="page-container">
          {itemsInWishlist?.map(({ __product }) => {
            let product = productList?.find(({ _id }) => _id === __product);
            return <WishlistProductCard key={__product} product={product} />;
          })}
        </div>
      ) : (
        <div className="empty-container">
          Wishlist is Empty !!
          <div>
            <Link to="/categories" style={{ textDecoration: "none" }}>
              <div className="btn-empty"> continue shopping -&gt; </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
