import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import "./UserAddress.css";
import add_icon from "../../images/plus.svg";
import tick_icon from "../../images/tick_mark.svg";

export function UserAddress() {
  const navigate = useNavigate();

  const {
    authState: { userAddressList },
    getUserAddressDetails,
    handleUserAddressUpdate
  } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getUserAddressDetails();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="address-block">
      <div className="component-head address-head">My Addresses</div>
      <div
        className="address-action"
        onClick={() => {
          navigate("/address/new");
        }}
      >
        <img src={add_icon} className="address-add-img" alt="img" />
        <div className="address-add-txt">Add new address</div>
      </div>

      {userAddressList?.length > 0 && (
        <div className="address-content">
          <div className="address-content-head">
            <button>Select a default Address</button>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            {userAddressList?.map((addressItem) => {
              return (
                <div key={addressItem?._id} className="address-item">
                  <div className="address-item-detail" onClick={()=>{
                    let obj = {
                      addressObj: {
                        id: addressItem?._id
                      },
                      action:"SET_DEFAULT"
                    }

                    handleUserAddressUpdate(obj)
                  }}>
                    <div className="address-txt">{addressItem?.address}</div>
                    <div className="address-txt">{addressItem?.locality}</div>
                    <div className="address-txt">{addressItem?.city +", " + addressItem?.state } </div>
                    <div className="address-txt">{addressItem?.country}</div>
                    <div className="address-txt">{addressItem?.pincode}</div>

                    {addressItem?.isSelected && (
                      <div className="address-default">
                        <img
                          src={tick_icon}
                          className="icon-select"
                          alt="img"
                        />
                      </div>
                    )}
                  </div>

                  <div className="address-item-btn">
                    <button onClick={()=>{
                       let obj = {
                        addressObj: {
                          id: addressItem?._id
                        },
                        action:"REMOVE"
                      }
  
                      handleUserAddressUpdate(obj)
                    }}>Remove Address</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
