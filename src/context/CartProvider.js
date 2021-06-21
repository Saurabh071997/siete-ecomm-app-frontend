import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { reducerFunction, ACTIONS } from "./reducerFunction";
// import { useAuth } from "./AuthProvider";
import { useToast } from "./ToastProvider";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

export function CartProvider({ children }) {
  // const {
  //   // eslint-disable-next-line
  //   authState: { currentUser },
  // } = useAuth();

  const { toastDispatch } = useToast();
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducerFunction, {
    productList: [],
    categoryList: [],
    subCategoryList: [],
    itemsInCart: [],
    itemsInWishlist: [],
    selectedCategory: null,
    selectedSubCategory: null,
    showNewOnly: false,
    showDiscountOnly: false,
    sortBy: null,
    isLoading: false,
  });

  useEffect(() => {
    (async function () {
      dispatch({ TYPE: ACTIONS.TOGGLE_LOADER, payload: { toggle: true } });
      try {
        let response = await axios.get(
          "https://siete-ecomm-app-backend.saurabhkamboj.repl.co/products"
        );
        if (response.status === 200) {
          const {
            data: { data: products },
          } = response;
          dispatch({ TYPE: ACTIONS.SET_PRODUCT_LIST, payload: { products } });
        }

        response = await axios.get(
          "https://siete-ecomm-app-backend.saurabhkamboj.repl.co/categories"
        );
        if (response.status === 200) {
          const {
            data: { data: categories },
          } = response;
          dispatch({
            TYPE: ACTIONS.SET_CATEGORY_LIST,
            payload: { categories },
          });
        }

        response = await axios.get(
          "https://siete-ecomm-app-backend.saurabhkamboj.repl.co/categories/subcategory"
        );
        if (response.status === 200) {
          const {
            data: { data: subcategories },
          } = response;

          dispatch({
            TYPE: ACTIONS.SET_SUB_CATEGORY_LIST,
            payload: { subcategories },
          });
        }
      } catch (err) {
        console.error(err);
        navigate("/error");
      } finally {
        dispatch({ TYPE: ACTIONS.TOGGLE_LOADER, payload: { toggle: false } });
      }
    })();
  }, [navigate]);


  async function getUserCart() {
    dispatch({ TYPE: ACTIONS.TOGGLE_LOADER, payload: { toggle: true } });
    try {
      let response = await axios.get(
        `https://siete-ecomm-app-backend.saurabhkamboj.repl.co/cart/users`
      );
      if (response.status === 200) {
        const {
          data: { data },
        } = response;
        const { products: cart } = data;
        // localStorage?.setItem("cart", JSON.stringify(cart));
        dispatch({ TYPE: ACTIONS.SET_CART, payload: { cart } });
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ TYPE: ACTIONS.TOGGLE_LOADER, payload: { toggle: false } });
    }
  }

  async function getUserWishlist() {
    dispatch({ TYPE: ACTIONS.TOGGLE_LOADER, payload: { toggle: true } });
    try {
      let response = await axios.get(
        `https://siete-ecomm-app-backend.saurabhkamboj.repl.co/wishlist/users`
      );

      if (response.status === 200) {
        const {
          data: { data },
        } = response;
        const { products: wishlist } = data;
        // localStorage?.setItem("wishlist", JSON.stringify(wishlist));
        dispatch({ TYPE: ACTIONS.SET_WISHLIST, payload: { wishlist } });
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ TYPE: ACTIONS.TOGGLE_LOADER, payload: { toggle: false } });
    }
  }

  async function handleAddToCart({ productId }) {
    dispatch({ TYPE: ACTIONS.TOGGLE_LOADER, payload: { toggle: true } });
    try {
      const response = await axios.post(
        `https://siete-ecomm-app-backend.saurabhkamboj.repl.co/cart/users`,
        {
          __product: productId,
          action: "INCREMENT",
        }
      );
      if (response.status === 201 || response.status === 200) {
        dispatch({
          TYPE: ACTIONS.ADD_TO_CART,
          payload: { __product: productId },
        });

        toastDispatch({
          TYPE: "TOGGLE_TOAST",
          payload: { toggle: true, message: "Added to Cart " },
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ TYPE: ACTIONS.TOGGLE_LOADER, payload: { toggle: false } });
    }
  }

  async function handleAddToWishlist({ productId }) {
    dispatch({ TYPE: ACTIONS.TOGGLE_LOADER, payload: { toggle: true } });
    try {
      let response = await axios.post(
        `https://siete-ecomm-app-backend.saurabhkamboj.repl.co/wishlist/users`,
        {
          __product: productId,
        }
      );

      if (response.status === 201 || response.status === 200) {
        dispatch({
          TYPE: ACTIONS.ADD_TO_WISHLIST,
          payload: { __product: productId },
        });

        toastDispatch({
          TYPE: "TOGGLE_TOAST",
          payload: { toggle: true, message: "Added to Wishlist " },
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ TYPE: ACTIONS.TOGGLE_LOADER, payload: { toggle: false } });
    }
  }

  async function handleRemoveFromCart({ productId }) {
    dispatch({ TYPE: ACTIONS.TOGGLE_LOADER, payload: { toggle: true } });
    try {
      let response = await axios.delete(
        `https://siete-ecomm-app-backend.saurabhkamboj.repl.co/cart/users`,
        {
          data: {
            __product: productId,
          },
        }
      );

      if (response.status === 200) {
        dispatch({
          TYPE: ACTIONS.REMOVE_FROM_CART,
          payload: { __product: productId },
        });

        toastDispatch({
          TYPE: "TOGGLE_TOAST",
          payload: { toggle: true, message: "Removed from Cart " },
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ TYPE: ACTIONS.TOGGLE_LOADER, payload: { toggle: false } });
    }
  }

  async function handleRemoveFromWishlist({ productId }) {
    dispatch({ TYPE: ACTIONS.TOGGLE_LOADER, payload: { toggle: true } });
    try {
      let response = await axios.delete(
        `https://siete-ecomm-app-backend.saurabhkamboj.repl.co/wishlist/users`,
        {
          data: {
            __product: productId,
          },
        }
      );
      if (response.status === 200) {
        dispatch({
          TYPE: ACTIONS.REMOVE_FROM_WISHLIST,
          payload: { __product: productId },
        });

        toastDispatch({
          TYPE: "TOGGLE_TOAST",
          payload: { toggle: true, message: "Removed from Wishlist " },
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ TYPE: ACTIONS.TOGGLE_LOADER, payload: { toggle: false } });
    }
  }

  async function handleMoveToCart({ productId }) {
    dispatch({ TYPE: ACTIONS.TOGGLE_LOADER, payload: { toggle: true } });
    try {
      handleAddToCart({ productId });
      handleRemoveFromWishlist({ productId });
      toastDispatch({
        TYPE: "TOGGLE_TOAST",
        payload: { toggle: true, message: "Moved to Cart " },
      });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ TYPE: ACTIONS.TOGGLE_LOADER, payload: { toggle: false } });
    }
  }

  async function handleMoveToWishlist({ productId }) {
    dispatch({ TYPE: ACTIONS.TOGGLE_LOADER, payload: { toggle: true } });
    try {
      handleAddToWishlist({ productId });
      handleRemoveFromCart({ productId });
      toastDispatch({
        TYPE: "TOGGLE_TOAST",
        payload: { toggle: true, message: "Moved to Wishlist " },
      });
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ TYPE: ACTIONS.TOGGLE_LOADER, payload: { toggle: false } });
    }
  }

  async function handleIncrementQuantity({ productId }) {
    dispatch({ TYPE: ACTIONS.TOGGLE_LOADER, payload: { toggle: true } });
    try {
      const response = await axios.post(
        `https://siete-ecomm-app-backend.saurabhkamboj.repl.co/cart/users`,
        {
          __product: productId,
          action: "INCREMENT",
        }
      );

      if (response.status === 200) {
        dispatch({
          TYPE: ACTIONS.INCREMENT_QUANTITY,
          payload: { __product: productId },
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ TYPE: ACTIONS.TOGGLE_LOADER, payload: { toggle: false } });
    }
  }

  async function handleDecrementQuantity({ productId }) {
    dispatch({ TYPE: ACTIONS.TOGGLE_LOADER, payload: { toggle: true } });
    try {
      const response = await axios.post(
        `https://siete-ecomm-app-backend.saurabhkamboj.repl.co/cart/users`,
        {
          __product: productId,
          action: "DECREMENT",
        }
      );

      if (response.status === 200) {
        dispatch({
          TYPE: ACTIONS.DECREMENT_QUANTITY,
          payload: { __product: productId },
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ TYPE: ACTIONS.TOGGLE_LOADER, payload: { toggle: false } });
    }
  }

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        getUserCart,
        getUserWishlist,
        handleAddToCart,
        handleAddToWishlist,
        handleRemoveFromCart,
        handleRemoveFromWishlist,
        handleMoveToCart,
        handleMoveToWishlist,
        handleIncrementQuantity,
        handleDecrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

  // useEffect(() => {
  //   async function fillCartAndWishlist() {
  //     dispatch({ TYPE: ACTIONS.TOGGLE_LOADER, payload: { toggle: true } });
  //     try {
  //       let response = await axios.get(
  //         `https://siete-backend.herokuapp.com/cart/${currentUser?._id}`
  //       );
  //       if (response.status === 200) {
  //         const {
  //           data: { data }
  //         } = response;
  //         const { products: cart } = data;
  //         localStorage?.setItem("cart", JSON.stringify(cart));
  //         dispatch({ TYPE: ACTIONS.SET_CART, payload: { cart } });
  //       }

  //       response = await axios.get(
  //         `https://siete-backend.herokuapp.com/wishlist/${currentUser?._id}`
  //       );
  //       if (response.status === 200) {
  //         const {
  //           data: { data }
  //         } = response;
  //         const { products: wishlist } = data;
  //         localStorage?.setItem("wishlist", JSON.stringify(wishlist));
  //         dispatch({ TYPE: ACTIONS.SET_WISHLIST, payload: { wishlist } });
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       dispatch({ TYPE: ACTIONS.TOGGLE_LOADER, payload: { toggle: false } });
  //     }
  //   }

  //   currentUser !== null && fillCartAndWishlist();
  // }, [currentUser]);