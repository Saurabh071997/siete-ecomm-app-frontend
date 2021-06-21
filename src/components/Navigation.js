import './Navigation.css'
import { useWindowSize } from "../context/useWindowSize";
import { useAuth } from "../context/AuthProvider";
import { NavLink, Link } from "react-router-dom";
import user_icon from "../images/user-icon.svg";
import home_icon from "../images/home.svg";
import category_icon from "../images/category-icon.svg";
import wish_icon from "../images/wishlist.svg";
import cart_icon from "../images/cart-icon.svg";

function SignIn() {
  return (
    <NavLink to="/login">
      <div>
        <button className="btn-sign-in"> sign in</button>
      </div>
    </NavLink>
  );
}

function DisplayProfile() {
  return (
    <NavLink to="/profile">
      <button type="button" className="btn-icon">
        <img
          src={user_icon}
          title="Account"
          className="img30x30"
          alt="user_icon"
        />
      </button>
    </NavLink>
  );
}

export function MobileNavigation() {
  const {
    authState: { accessToken }
  } = useAuth();

  return (
    <div className="nav-mob">
      <div className="nav-mob-top">
        <div className="nav-mob-logo">Siete</div>

        {accessToken ? <DisplayProfile /> : <SignIn />}
      </div>
      <div className="nav-mob-bottom">
        <NavLink to="/">
          <button type="button" className="btn-icon">
            <img src={home_icon} className="img30x30" alt="home_icon" />
          </button>
        </NavLink>

        <NavLink to="/categories">
          <button type="button" className="btn-icon">
            <img src={category_icon} className="img30x30" alt="category_icon" />
          </button>
        </NavLink>

        <NavLink to="/wishlist">
          <button type="button" className="btn-icon">
            <img src={wish_icon} className="img30x30" alt="wish_icon" />
          </button>
        </NavLink>

        <NavLink to="/cart">
          <button type="button" className="btn-icon">
            <img src={cart_icon} className="img30x30" alt="cart_icon" />
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export function DesktopNavigation() {
  const {
    authState: { accessToken }
  } = useAuth();

  return (
    <div style={{ margin: "0rem", padding: "0rem" }}>
      <div className="nav-mob-top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="nav-mob-logo">Siete</div>
        </Link>

        <div style={{ display: "flex" }}>
          <NavLink to="/wishlist">
            <button type="button" className="btn-icon">
              <img
                src={wish_icon}
                title="Playlist"
                className="nav-icon-img"
                alt="wish_icon"
              />
            </button>
          </NavLink>

          <NavLink to="/cart">
            <button type="button" className="btn-icon">
              <img
                src={cart_icon}
                title="Watch Later"
                className="nav-icon-img"
                alt="cart_icon"
              />
            </button>
          </NavLink>

          {accessToken ? <DisplayProfile /> : <SignIn />}
        </div>
      </div>
    </div>
  );
}

export function Navigation() {
  const [, width] = useWindowSize();
  return (
    <div
      style={{
        position: "sticky",
        top: "0em",
        zIndex: "10",
        marginBottom: "0.5rem"
      }}
    >
      {width <= 600 ? <MobileNavigation /> : <DesktopNavigation />}
    </div>
  );
}
