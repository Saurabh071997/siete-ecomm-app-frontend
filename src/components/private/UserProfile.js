import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./UserProfile.css";
import { useAuth } from "../../context/AuthProvider";
import { useCart } from "../../context/CartProvider";
import phone from "../../images/phone-icon.svg";
import mail_icon from "../../images/mail.svg";
import profile_img from "../../images/profile.jpg";
import location_icon from "../../images/location.svg";
import { Loader } from "../Loader";

export function UserProfile() {
  const {
    authState: { currentUser },
    logoutUser,
    getUserDetails,
  } = useAuth();

  const {
    state: { isLoading },
  } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getUserDetails();
    // eslint-disable-next-line
  }, []);

  const navigate = useNavigate();

  return isLoading ? (
    <Loader />
  ) : (
    <div className="profile-block">
      <div className="profile-img">
        <img src={profile_img} className="user-img" alt="profile-img" />
      </div>
      <div className="profile-name">
        {currentUser?.firstname ? (
          currentUser?.firstname + " " + currentUser?.lastname
        ) : (
          <span className="txt-empty"> -- </span>
        )}
      </div>

      <div className="link-edit">
        <Link to="/editprofile" style={{ textDecoration: "none" }}>
          {" "}
          <span style={{ color: "#0284C7" }}>Edit Profile</span>
        </Link>
      </div>

      <hr />

      <div className="profile-contact">
        <img src={phone} className="profile-info-img" alt="img" />
        {currentUser?.contact ? (
          currentUser?.contact
        ) : (
          <span className="txt-empty"> -- </span>
        )}
      </div>

      <div className="profile-location">
        <Link to="/address" style={{ textDecoration: "none"}}>
          <img src={location_icon} className="profile-info-img" alt="img" />
          My addresses
        </Link>
      </div>

      <div className="profile-mail">
        <img src={mail_icon} className="profile-info-img" alt="img" />
        {currentUser?.email}
      </div>

      <button
        className="btn-logout"
        onClick={() => {
          logoutUser();
          navigate("/");
        }}
      >
        Log out
      </button>
    </div>
  );
}
