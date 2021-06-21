import { useState, useEffect } from "react";
import "./EditProfile.css";
// import "./UserProfile.css";
import "../LoginPage.css";

import { useAuth } from "../../context/AuthProvider";
import { useCart } from "../../context/CartProvider";
import profile_img from "../../images/profile.jpg";
import mail_icon from "../../images/mail.svg";
import { Loader } from "../Loader";

export function EditProfile() {
  const {
    authState: { currentUser },updateUserProfile
  } = useAuth();

  const {
    state: { isLoading },
  } = useCart();

  const [profileState, setProfileState] = useState({
    firstname: currentUser?.firstname ? currentUser?.firstname : null,
    lastname: currentUser?.lastname ? currentUser?.lastName : null,
    contact: currentUser?.contact ? currentUser?.contact : null,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="profile-block">
      <div className="profile-img">
        <img src={profile_img} className="user-img" alt="profile-img" />
      </div>

      <div className="profile-edit-form">
        <div className="floating-form" >
          <div className="floating-label w250">
            <input
              className="floating-input"
              type="text"
              placeholder={
                currentUser?.firstname ? currentUser?.firstname : " "
              }
              onChange={(e) =>
                setProfileState((profileState) => ({
                  ...profileState,
                  firstname: e.target.value,
                }))
              }
            ></input>
            {currentUser?.firstname ? (
              <label className="label-focus">First Name</label>
            ) : (
              <label>First Name</label>
            )}
          </div>

          <div className="floating-label w250">
            <input
              className="floating-input"
              type="text"
              placeholder={currentUser?.lastname ? currentUser?.lastname : " "}
              onChange={(e) =>
                setProfileState((profileState) => ({
                  ...profileState,
                  lastname: e.target.value,
                }))
              }
            ></input>
            {currentUser?.lastname ? (
              <label className="label-focus">LastName</label>
            ) : (
              <label>Last Name</label>
            )}
          </div>

          <div className="floating-label w250">
            <input
              className="floating-input"
              type="text"
              placeholder={currentUser?.contact ? currentUser?.contact : " "}
              onChange={(e) =>
                setProfileState((profileState) => ({
                  ...profileState,
                  contact: e.target.value,
                }))
              }
            ></input>
            {currentUser?.contact ? (
              <label className="label-focus">Contact</label>
            ) : (
              <label>Contact</label>
            )}
          </div>

          <div className="profile-mail" style={{ cursor: "pointer" }}>
            <img src={mail_icon} className="profile-info-img" alt="img" />
            {currentUser?.email}
          </div>
        </div>
      </div>

      <button
        className="btn-login btn-save"
        onClick={() => {
        //   console.log({ profileState });
        updateUserProfile(
            profileState.firstname,
            profileState.lastname,
            profileState.contact
          );
        }}
      >
        Save
      </button>
    </div>
  );
}
