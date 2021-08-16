import { useState, useEffect } from "react";
import "./UserAddress.css";
import "./AddressAddPage.css";
import "../LoginPage.css";
import "./EditProfile.css";
import {useAuth} from "../../context/AuthProvider"

export function AddressAddPage() {
  const [addressState, setAddressState] = useState({
    address: null,
    locality: null,
    city: null,
    state: null,
    country: null,
    pincode: null,
    isSelected: false,
  });

  const {handleUserAddressUpdate} = useAuth();

  const [errorMsg, setErrorMsg] = useState(null);

  function validateAddressForm() {
    return (
      !addressState?.address ||
      addressState?.address?.length < 1 ||
      !addressState?.locality ||
      addressState?.locality?.length < 1 ||
      !addressState?.city ||
      addressState?.city?.length < 1 ||
      !addressState?.state ||
      addressState?.state?.length < 1 ||
      !addressState?.country ||
      addressState?.country?.length < 1 ||
      !addressState?.pincode
    );
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="address-block">
      <div className="component-head address-head">Add New Address</div>

      <div className="address-container">
        <div className="floating-form from-width">
          <div className="floating-label width-full margin-1">
            <textarea
              className="floating-input"
              type="text"
              placeholder=" "
              onChange={(e) => {
                setAddressState((addressState) => ({
                  ...addressState,
                  address: e.target.value.trim(),
                }));
                setErrorMsg(null);
              }}
            ></textarea>
            <label>Address*</label>
          </div>

          <div className="floating-label width-full margin-1 ">
            <input
              className="floating-input"
              type="text"
              placeholder=" "
              onChange={(e) => {
                setAddressState((addressState) => ({
                  ...addressState,
                  locality: e.target.value.trim(),
                }));
                setErrorMsg(null);
              }}
            ></input>
            <label>Locality*</label>
          </div>

          <div className="floating-label width-full margin-1 ">
            <input
              className="floating-input"
              type="text"
              placeholder=" "
              onChange={(e) => {
                setAddressState((addressState) => ({
                  ...addressState,
                  city: e.target.value.trim(),
                }));
                setErrorMsg(null);
              }}
            ></input>
            <label>City*</label>
          </div>

          <div className="floating-label width-full margin-1 ">
            <input
              className="floating-input"
              type="text"
              placeholder=" "
              onChange={(e) => {
                setAddressState((addressState) => ({
                  ...addressState,
                  state: e.target.value.trim(),
                }));
                setErrorMsg(null);
              }}
            ></input>
            <label>State*</label>
          </div>

          <div className="floating-label width-full margin-1 ">
            <input
              className="floating-input"
              type="text"
              placeholder=" "
              onChange={(e) => {
                setAddressState((addressState) => ({
                  ...addressState,
                  country: e.target.value.trim(),
                }));
                setErrorMsg(null);
              }}
            ></input>
            <label>Country*</label>
          </div>

          <div className="floating-label width-full margin-1 ">
            <input
              className="floating-input"
              type="text"
              placeholder=" "
              onChange={(e) => {
                setAddressState((addressState) => ({
                  ...addressState,
                  pincode: e.target.value.trim(),
                }));
                setErrorMsg(null);
              }}
            ></input>
            <label>Pincode*</label>
          </div>

          {errorMsg && (
            <div style={{ color: "#EF4444", fontSize: "1rem" }}>{errorMsg}</div>
          )}

          <div className="align-center" style={{ marginTop: "2rem" }}>
            <button
              className="btn-login btn-save"
              onClick={() => {
                let regex = /^[0-9]{6}$/;
                if (validateAddressForm()) {
                  setErrorMsg(`All fields are mandatory`);
                } else if (!regex.test(addressState?.pincode)) {
                  setErrorMsg(`Enter a valid pin code`);
                } else {
                  // console.log("Setting address", addressState);
                  let obj = {
                    addressObj : addressState, 
                    action: "ADD"
                  }
                  handleUserAddressUpdate(obj)
                }
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
