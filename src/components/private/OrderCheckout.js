import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import "./OrderCheckout.css";
import { useAuth } from "../../context/AuthProvider";
import { useCart } from "../../context/CartProvider";
import cod from "../../images/cash.svg";

export function OrderCheckout() {
  const {
    authState: { currentUser, userAddressList },
    getUserDetails,
    getUserAddressDetails
  } = useAuth();

  const {
    state: { itemsInCart, productList },
    getUserCart,
    handleOrderConfirm
  } = useCart();

  const [orderState, setOrderState] = useState({
    orderConfirm: false,
    addressConfirm: false,
    paymentConfirm: false,
    paymentSelected: false,
  });

  // const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getUserDetails();
    getUserAddressDetails();
    getUserCart();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let { totalToPay: totalAmount } = itemsInCart?.reduce(
    (prev, curr) => {
      let product = productList?.find(({ _id }) => _id === curr?.__product);
      return {
        ...prev,
        totalToPay: prev?.totalToPay + product?.effectivePrice * curr?.quantity,
      };
    },
    { totalToPay: 0 }
  );

  let displayAddress = userAddressList?.find(({ isSelected }) => isSelected);

  let addressDisableCondition =
    !currentUser?.firstname ||
    currentUser?.firstname?.length < 1 ||
    !currentUser?.lastname ||
    currentUser?.lastname?.length < 1 ||
    !currentUser?.contact ||
    !displayAddress;

  return (
    <div className="page-section">
      {/* {showModal && <OrderModal />} */}
      <div className="component-head">Order Confirmation</div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          margin: "1.5rem auto",
          position: "relative",
        }}
      >
        <div className="page-section-container">
          <div className="page-section-container-head">Confirm Cart Items</div>
          <div className="page-section-container-content">
            <div style={{ diplay: "flex", flexDirection: "column" }}>
              {itemsInCart?.map(({ __product, quantity }) => {
                let product = productList?.find(({ _id }) => _id === __product);
                return (
                  <div key={__product} className="order-product-card">
                    <div className="order-product-img">
                      <img
                        src={product?.imgUrl}
                        className="order-img"
                        alt="img"
                      />
                    </div>
                    <div className="order-product-detail">
                      <div className="order-product-brand">
                        {product?.brandName}
                      </div>
                      <div className="order-product-name">{product?.name}</div>
                      <div className="order-product-price">
                        &#8377;{" "}
                        {product?.isDiscounted
                          ? product?.effectivePrice
                          : product?.actualPrice}
                        {product?.isDiscounted ? (
                          <span
                            className="txt-line-through"
                            style={{ opacity: "0.6", marginLeft: "0.35rem" }}
                          >
                            {" "}
                            &#8377; {product?.actualPrice}
                          </span>
                        ) : null}
                      </div>

                      <div className="order-product-quantity">{`X ${quantity}`}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="order-total">
              <div>Total Amount</div>
              <div>&#8377;{totalAmount}</div>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <button
              className="btn-manage"
              onClick={() => {
                navigate("/cart");
              }}
            >
              Manage Cart
            </button>
            <button
              className="btn-confirm"
              onClick={() => {
                setOrderState((orderState) => ({
                  ...orderState,
                  orderConfirm: true,
                }));
              }}
            >
              Confirm Cart
            </button>
          </div>
        </div>

        <div
          className={
            orderState?.orderConfirm
              ? "page-section-container"
              : "page-section-container-disabled"
          }
        >
          <div className="page-section-container-head">
            Confirm Billing Information
          </div>
          <div className="page-section-container-content">
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "60%"
                }}
              >
                <div className="user-info">
                  {currentUser?.firstname ? currentUser?.firstname : "--"}
                  {" "}
                  {currentUser?.lastname ? currentUser?.lastname : "--"}
                </div>
                <div className="address-info">
                  {displayAddress ? (
                    <div className="user-address">
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
                </div>
                <div className="user-info">
                  {currentUser?.contact ? currentUser?.contact : "--"}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0.25rem",
                  width: "40%",
                  position: "relative"
                }}
              >
                {(!currentUser?.firstname ||
                  currentUser?.firstname?.length < 1 ||
                  !currentUser?.lastname ||
                  currentUser?.lastname?.length < 1 ||
                  !currentUser?.contact) && (
                  <button
                    className="btn-manage btn-address-align "
                    onClick={() => navigate("/editprofile")}
                  >
                    Complete Profile
                  </button>
                )}
                {displayAddress && (
                  <button
                    className="btn-manage btn-address-align "
                    onClick={() => navigate("/address")}
                  >
                    Change Address
                  </button>
                )}
                {!displayAddress && (
                  <button
                    className="btn-manage btn-address-align "
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

                <button
                  disabled={addressDisableCondition}
                  className={
                    addressDisableCondition
                      ? "btn-confirm btn-address-align btn-disabled"
                      : "btn-confirm btn-address-align"
                  }
                  onClick={() => {
                    setOrderState((orderState) => ({
                      ...orderState,
                      addressConfirm: true,
                    }));
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className={
            orderState?.addressConfirm
              ? "page-section-container"
              : "page-section-container-disabled"
          }

          style={{minHeight:"20vh"}}
        >
          <div className="page-section-container-head">
            Confirm Payment Method
          </div>
          <div className="page-section-container-content">
              <div style={{display:"inline-block" }} >
            <div
              className={orderState?.paymentSelected ? "order-payment-active" : "order-payment"}
              onClick={() => {
                setOrderState((orderState) => ({
                  ...orderState,
                  paymentSelected: true,
                }));
              }}
            >
              <img src={cod} className="order-payment-img" alt="img" />
              <div className="order-payment-txt">Cash On Delivery</div>
            </div>
            </div>
          </div>

          <button
            disabled={!orderState?.paymentSelected}
            className={
              orderState?.paymentSelected
                ? "btn-confirm btn-pay-confirm"
                : "btn-confirm btn-pay-confirm btn-disabled"
            }
            onClick={() => {
              setOrderState((orderState) => ({
                ...orderState,
                paymentConfirm: true,
              }));
            }}
          >
            Confirm
          </button>
        </div>
        
        <div className="place-order">
        <button
          disabled={!orderState?.paymentConfirm}
          className={
            orderState?.paymentConfirm
              ? "btn-place-order"
              : "btn-place-order btn-disabled"
          }
          onClick={() => {
            handleOrderConfirm()
          }}
        >
          Place Order
        </button>
        </div>

      </div>
    </div>
  );
}