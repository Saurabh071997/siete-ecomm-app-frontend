import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";
import { CartProductCard } from "../CartProductCard";
import { useCart } from "../../context/CartProvider";
import { useAuth } from "../../context/AuthProvider";
import { Loader } from "../Loader";
import location_icon from "../../images/location.svg";

export function Cart() {
  const {
    state: { productList, itemsInCart, isLoading },
    getUserCart,
  } = useCart();

  const navigate = useNavigate();

  const {
    authState: { currentUser, userAddressList },
    getUserDetails,
    getUserAddressDetails,
  } = useAuth();

  useEffect(() => {
    getUserDetails();
    getUserAddressDetails();
    getUserCart();
    // eslint-disable-next-line
  }, []);

  let payableAmount = itemsInCart?.reduce(
    (prev, curr) => {
      let product = productList?.find(({ _id }) => _id === curr?.__product);
      return {
        ...prev,
        totalAmount: prev?.totalAmount + product?.actualPrice * curr?.quantity,
        totalToPay: prev?.totalToPay + product?.effectivePrice * curr?.quantity,
        totalSaved:
          prev?.totalSaved +
          (product?.actualPrice - product?.effectivePrice) * curr?.quantity,
      };
    },
    { totalAmount: 0, totalToPay: 0, totalSaved: 0 }
  );

  function AddressContainer() {
    let displayAddress = userAddressList?.find(({ isSelected }) => isSelected);

    return (
      <div className="page-address-block">
        <div className="page-address-block-head">
          <img
            src={location_icon}
            className="page-address-block-img"
            alt="img"
          />
          <div className="page-address-block-txt">Deliver to</div>
        </div>

        <div className="page-user">
          {currentUser?.firstname ? currentUser?.firstname : "--"}
          {currentUser?.lastname ? currentUser?.lastname : "--"}
        </div>

        {displayAddress ? (
          <div className="page-address">
            {displayAddress?.address +
              ", " +
              displayAddress?.locality +
              ", " +
              displayAddress?.city +
              ", " +
              displayAddress?.state +
              ", " +
              displayAddress?.country +
              " - " +
              displayAddress?.pincode}
          </div>
        ) : (
          "--"
        )}

        {displayAddress && (
          <button className="btn-page-nav" onClick={() => navigate("/address")}>
            Change Address
          </button>
        )}
        {!displayAddress && (
          <button
            className="btn-page-nav"
            onClick={() => {
              if (userAddressList?.length > 0) {
                navigate("/address");
              } else {
                navigate("/address/new");
              }
            }}
          >
            {userAddressList?.length > 0
              ? "Choose a delivery address"
              : "Add Address"}
          </button>
        )}
      </div>
    );
  }

  function EmptyCart() {
    return (
      <div className="empty-container">
        Cart is Empty !!
        <div>
          <Link to="/categories" style={{ textDecoration: "none" }}>
            <div className="btn-empty"> continue shopping -&gt; </div>
          </Link>
        </div>
      </div>
    );
  }

  function DisplayCart() {
    return (
      <div className="page-block">
        <div className="page-block-content">
          {itemsInCart.map(({ __product, quantity }) => {
            let product = productList?.find(({ _id }) => _id === __product);
            return (
              <CartProductCard
                key={__product}
                product={product}
                quantity={quantity}
              />
            );
          })}
        </div>

        <div className="page-block-sub-content">
          <div className="page-sub-head">Billing Information</div>
          <div className="page-sub-data">
            <div className="page-sub-txt">Total Amount</div>
            <div className="page-sub-info">
              &#8377;{" "}
              {payableAmount?.totalSaved > 0 ? (
                <span
                  className="txt-line-through"
                  style={{ opacity: "0.6", marginLeft: "0.5rem" }}
                >
                  {payableAmount?.totalAmount}
                </span>
              ) : (
                payableAmount?.totalAmount
              )}
            </div>
          </div>

          <div className="page-sub-data">
            <div className="page-sub-txt">Payable Amount</div>
            <div className="page-sub-info">
              &#8377; {payableAmount?.totalToPay}
            </div>
          </div>

          {payableAmount?.totalSaved > 0 ? (
            <div className="page-sub-data">
              <div className="page-sub-txt"> Savings </div>
              <div className="page-sub-info" style={{ color: "#16A34A" }}>
                &#8377; {payableAmount?.totalSaved}
              </div>
            </div>
          ) : null}

          <div
            style={{
              position: "relative",
              margin: "1rem 0rem",
              padding: "0rem 1rem",
              height: "10vh",
            }}
          >
            {" "}
            <button
              className="btn-checkout"
              onClick={() => {
                navigate("/cart/checkout");
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return isLoading ? (
    <Loader />
  ) : (
    <div className="page-sub-layout">
      <div className="page-head">Cart</div>
      {/* {itemsInCart.length > 0 ? <DisplayCart /> : <EmptyCart />} */}
      {itemsInCart.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <AddressContainer />
          <DisplayCart />
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
