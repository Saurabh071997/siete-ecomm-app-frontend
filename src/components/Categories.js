import './Categories.css'
import {useEffect} from 'react';
import { useCart } from "../context/CartProvider";
import { useNavigate } from "react-router-dom";
import { Loader } from "./Loader";

export function Categories() {
  const {
    state: { subCategoryList, isLoading }
  } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="page-layout">
      <div className="page-head">Categories</div>
      <div className="page-container">
        {subCategoryList?.map(({ _id, name, imgUrl, category }) => {
          return (
            <div
              key={_id}
              className="category-card"
              onClick={() => {
                navigate(`/products/${category?._id}/${_id}`)
              }}
            >
              <div className="category-card-txt">
                <div className="category-card-txt-info">{category?.name}</div>
                <div className="category-card-txt-det">{name} </div>
              </div>

              <img
                src={imgUrl}
                alt="category_img"
                className="category-card-img"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
