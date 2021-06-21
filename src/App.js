import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home";
import { Categories } from "./components/Categories";
import { ProductDisplay } from "./components/ProductDisplay";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { PrivateRoute } from "./components/PrivateRoute";
import { UserProfile } from "./components/private/UserProfile";
import { EditProfile } from "./components/private/EditProfile";
import { Wishlist } from "./components/private/Wishlist";
import { Cart } from "./components/private/Cart";
import { ErrorPage } from "./components/ErroPage";
import { useWindowSize } from "./context/useWindowSize";
import { useToast } from "./context/ToastProvider";

function App() {
  const [, width] = useWindowSize();

  const {
    toastState: { toastActive, toastMessage },
    toastDispatch,
  } = useToast();

  useEffect(() => {
    function notify() {
      setTimeout(() => {
        toastDispatch({ TYPE: "TOGGLE_TOAST", payload: { toggle: false } });
        toast(`${toastMessage}`, {
          className: "toast-class",
          bodyClassName: "toast-body",
          closeButton: false,
        });
      }, 1000);
    }

    toastActive && notify();
  }, [toastActive, toastMessage, toastDispatch]);

  return (
    <div className="App">
      <Navigation />

      <div style={{ minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          {/* <Route path="/products" element={<ProductDisplay />} /> */}
          <Route path="/products/:categoryId" element={<ProductDisplay />} />
          <Route
            path="/products/:categoryId/:subcategoryId"
            element={<ProductDisplay />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/*" element={<ErrorPage />} />
          <PrivateRoute path="/profile" element={<UserProfile />} />
          <PrivateRoute path="/editprofile" element={<EditProfile />} />
          <PrivateRoute path="/wishlist" element={<Wishlist />} />
          <PrivateRoute path="/cart" element={<Cart />} />
        </Routes>
      </div>

      <ToastContainer />

      <Footer />
      {width < 600 && (
        <div style={{ height: "10vh", backgroundColor: "#d4d4d4" }}></div>
      )}
    </div>
  );
}

export default App;
