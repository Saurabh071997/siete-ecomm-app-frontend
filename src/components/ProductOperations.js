import { useReducer } from "react";
import "./ProductOperations.css";
import close from "../images/close_icon.svg";
import { ReactComponent as Sort } from "../images/sort-icon.svg";
import { ReactComponent as Filter } from "../images/filter-icon.svg";
import { useWindowSize } from "../context/useWindowSize";
import { ACTIONS } from "../context/reducerFunction";
import { useCart } from "../context/CartProvider";

export function operationReducerFunc(btnState, action) {
  switch (action.TYPE) {
    case "OPEN_SORT":
      return { sort: true, filter: false };
    case "OPEN_FILTER":
      return { filter: true, sort: false };
    case "CLOSE_SORT":
      return { sort: false };
    case "CLOSE_FILTER":
      return { filter: false };
    default:
      return btnState;
  }
}

export function ProductOperations() {
  const [, width] = useWindowSize();

  const [btnState, btnDispatch] = useReducer(operationReducerFunc, {
    sort: false,
    filter: false
  });

  const {
    state: { sortBy, showNewOnly, showDiscountOnly },
    dispatch
  } = useCart();

  function FilterDropDown() {
    return (
      <div className="dropdown-div">
        <div className="input-checkbox">
          <input
            type="checkbox"
            id="show_new"
            className="btn-checkbox"
            checked={showNewOnly}
            onChange={() => dispatch({ TYPE: ACTIONS.TOGGLE_NEW })}
          />
          <label className="checkbox-label">New</label>
        </div>

        <div className="input-checkbox">
          <input
            type="checkbox"
            id="show_discounted"
            className="btn-checkbox"
            checked={showDiscountOnly}
            onChange={() => dispatch({ TYPE: ACTIONS.TOGGLE_DISCOUNT })}
          />
          <label className="checkbox-label">Discount</label>
        </div>

        <button
          className="btn-icon"
          onClick={() => btnDispatch({ TYPE: "CLOSE_FILTER" })}
        >
          <img src={close} alt="delete" className="icon-del img20x20" />
        </button>
      </div>
    );
  }

  function SortDropDown() {
    return (
      <div className="dropdown-div">
        <div className="input-radio">
          <input
            type="radio"
            name="sort"
            id="sort_high_to_low"
            className="btn-radio"
            onChange={() =>
              dispatch({ TYPE: ACTIONS.SORT, payload: "PRICE_HIGH_TO_LOW" })
            }
            checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
          ></input>{" "}
          <label className="radio-label">Price (High To Low)</label>
        </div>

        <div className="input-radio">
          <input
            type="radio"
            name="sort"
            id="sort_low_to_high"
            className="btn-radio"
            onChange={() =>
              dispatch({ TYPE: ACTIONS.SORT, payload: "PRICE_LOW_TO_HIGH" })
            }
            checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
          ></input>{" "}
          <label className="radio-label">Price (Low To High)</label>
        </div>

        <button
          className="btn-icon"
          onClick={() => btnDispatch({ TYPE: "CLOSE_SORT" })}
        >
          <img src={close} alt="delete" className="icon-del img20x20" />
        </button>
      </div>
    );
  }

  function ShowOperations() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        {btnState.sort ? <SortDropDown /> : null}
        {btnState.filter ? <FilterDropDown /> : null}

        <div style={{ display: "flex", margin: "0rem auto", width: "100%" }}>
          <button
            className="btn-sort"
            onClick={() => {
              btnDispatch({ TYPE: "OPEN_SORT" });
            }}
          >
            <div
              style={{
                display: "flex",
                margin: "0rem auto"
              }}
            >
              <Sort className="img-sort" />
              <div>SORT</div>
            </div>
          </button>

          <button
            className="btn-filter"
            onClick={() => {
              btnDispatch({ TYPE: "OPEN_FILTER" });
            }}
          >
            <div
              style={{
                display: "flex",
                margin: "0rem auto"
              }}
            >
              <Filter className="img-filter" />
              <div>FILTER</div>
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "sticky", bottom: "4em", zIndex: "10" }}>
      {width <= 600 && <ShowOperations />}
    </div>
  );
}
