import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home";
import { Categories } from "./components/Categories";
import { ProductDisplay } from "./components/ProductDisplay";
import { LoginPage } from "./components/LoginPage";
import { PrivateRoute } from "./components/PrivateRoute";
import { UserProfile } from "./components/private/UserProfile";
import {Wishlist} from "./components/private/Wishlist";
import { useWindowSize } from "./context/useWindowSize";

function App() {
  const [, width] = useWindowSize();
  return (
    <div className="App">
      <Navigation />

      <div style={{ minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<ProductDisplay />} />
          <Route path="/login" element={<LoginPage />} />
          <PrivateRoute path="/profile" element={<UserProfile />} />
          <PrivateRoute path="/wishlist" element={<Wishlist/>} />
        </Routes>
      </div>

      <Footer />
      {width < 600 && (
        <div style={{ height: "10vh", backgroundColor: "#d4d4d4" }}></div>
      )}
    </div>
  );
}

export default App;
