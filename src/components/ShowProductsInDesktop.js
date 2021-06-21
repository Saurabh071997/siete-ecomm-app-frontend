import { Link, useNavigate } from "react-router-dom";
import "./ShowProducts.css";
import { ShowProducts } from "./ShowProducts";
import { ACTIONS } from "../context/reducerFunction";
import { useCart } from "../context/CartProvider";

export function ShowProductsInDesktop() {
  const {
    state: { sortBy, showNewOnly, showDiscountOnly, categoryList },
    dispatch
  } = useCart();

  const navigate = useNavigate();

  return (
    <div className="body-container">
      <div className="sidenav">
        <ul>
          <div className="sidenav-head">Categories</div>
          {categoryList.map(({ _id, name }) => {
            return (
              <li
                key={_id}
                onClick={() => {
                  // dispatch({ TYPE: ACTIONS.SELECT_CATEGORY, payload: { _id } });
                  navigate(`/products/${_id}`)
                }}
              >
                <div className="sidenav-item">{name}</div>
              </li>
            );
          })}
          <Link to="/categories" style={{ textDecoration: "none" }}>
            <div
              style={{
                color: "#dc2626",
                padding: "0.25rem 0rem 0.25rem 1rem",
                cursor: "pointer"
              }}
            >
              view more ...
            </div>
          </Link>
        </ul>

        <ul>
          <div className="sidenav-head">Sort</div>
          <li>
            <div className="div-sort">
              <input
                type="radio"
                name="sort"
                id="sort_high_to_low"
                className="btn-radio"
                onChange={() =>
                  dispatch({
                    TYPE: ACTIONS.SORT,
                    payload: "PRICE_HIGH_TO_LOW"
                  })
                }
                checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
              ></input>{" "}
              <span className="label-radio">Price (High To Low)</span>
            </div>
          </li>
          <li>
            <div className="div-sort">
              <input
                type="radio"
                name="sort"
                id="sort_low_to_high"
                className="btn-radio"
                onChange={() =>
                  dispatch({
                    TYPE: ACTIONS.SORT,
                    payload: "PRICE_LOW_TO_HIGH"
                  })
                }
                checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
              ></input>{" "}
              <span className="label-radio">Price (Low To High) </span>
            </div>
          </li>
        </ul>

        <ul>
          <div className="sidenav-head">Filter</div>
          <li>
            <div className="div-filter">
              <input
                type="checkbox"
                id="show_new"
                className="btn-checkbox"
                checked={showNewOnly}
                onChange={() => dispatch({ TYPE: ACTIONS.TOGGLE_NEW })}
              />
              <span className="label-filter">New</span>
            </div>
          </li>
          <li>
            <div className="div-filter">
              <input
                type="checkbox"
                id="show_discounted"
                className="btn-checkbox"
                checked={showDiscountOnly}
                onChange={() => dispatch({ TYPE: ACTIONS.TOGGLE_DISCOUNT })}
              />
              <span className="label-filter">Discount</span>
            </div>
          </li>
        </ul>
      </div>

      <div className="body-content">
        <ShowProducts />
      </div>
    </div>
  );
}
