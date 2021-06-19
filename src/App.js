import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home";

import { useWindowSize } from "./context/useWindowSize";

function App() {
  const [, width] = useWindowSize();
  return (
    <div className="App">
      <Navigation />

      <div style={{ minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
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
