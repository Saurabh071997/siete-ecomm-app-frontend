import "bootstrap/dist/css/bootstrap.min.css";
import './Home.css'
import { Carousel } from "react-bootstrap";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartProvider";
import { ACTIONS } from "../context/reducerFunction";
import { Loader } from "./Loader";

import banner_img_1 from "../images/banner1.jpg";
import banner_img_2 from "../images/banner2.jpg";
import banner_img_3 from "../images/banner3.png";
import home_1 from "../images/home_banner_1.jpg";
import home_2 from "../images/home_banner_2.jpg";
import home_3 from "../images/home_banner_3.jpg";

export function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className="carousels">
      <Carousel.Item>
        <img
          className="d-block w-100 h-carousel"
          src={banner_img_1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 h-carousel"
          src={banner_img_2}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 h-carousel"
          src={banner_img_3}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export function CategoriesBlock() {
  const {
    state: { categoryList },
    dispatch
  } = useCart();

  const navigate = useNavigate();

  return (
    <div className="block-categories">
      <div className="block-sub-head">Pick from the best</div>
      <div className="block-cat ">
        {categoryList.map(({ _id, name, imgUrl }) => {
          return (
            <div
              className="block-cat-item"
              key={_id}
              onClick={() => {
                dispatch({ TYPE: ACTIONS.SELECT_CATEGORY, payload: { _id } });
                navigate("/products");
              }}
            >
              <img src={imgUrl} alt="img_cat" className="cat-img" />
              <div className="block-cat-detail">{name}</div>
            </div>
          );
        })}
      </div>
      <NavLink to="/categories">
        <div className="txt-view">View All</div>
      </NavLink>
    </div>
  );
}

export function Banners() {
  return (
    <div>
      <div className="home-banner">
        <img src={home_1} alt="home_banner_1" className="home-banner-img" />
        <div className="home-banner-txt txt-left">Men's Active Wear</div>
      </div>

      <div className="home-banner">
        <img src={home_2} alt="home_banner_1" className="home-banner-img" />
      </div>

      <div className="home-banner">
        <img src={home_3} alt="home_banner_1" className="home-banner-img" />
      </div>
    </div>
  );
}

export function Home() {
  const {
    state: { isLoading }
  } = useCart();
  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <ControlledCarousel />
      <CategoriesBlock />
      <Banners />
    </div>
  );
}
