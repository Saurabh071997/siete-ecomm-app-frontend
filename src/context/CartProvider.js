import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { reducerFunction, ACTIONS } from "./reducerFunction";
import { useToast } from "./ToastProvider";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./config";

export const CartContext = createContext();

export function CartProvider({ children }) {
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
        let response = await axios.get(`${API_URL}/products`);
        if (response.status === 200) {
          const {
            data: { data: products },
          } = response;
          dispatch({ TYPE: ACTIONS.SET_PRODUCT_LIST, payload: { products } });
        }

        response = await axios.get(`${API_URL}/categories`);
        if (response.status === 200) {
          const {
            data: { data: categories },
          } = response;
          dispatch({
            TYPE: ACTIONS.SET_CATEGORY_LIST,
            payload: { categories },
          });
        }

        response = await axios.get(`${API_URL}/categories/subcategory`);
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
      let response = await axios.get(`${API_URL}/cart/users`);
      if (response.status === 200) {
        const {
          data: { data },
        } = response;
        const { products: cart } = data;

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
      let response = await axios.get(`${API_URL}/wishlist/users`);

      if (response.status === 200) {
        const {
          data: { data },
        } = response;
        const { products: wishlist } = data;

        dispatch({ TYPE: ACTIONS.SET_WISHLIST, payload: { wishlist } });
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ TYPE: ACTIONS.TOGGLE_LOADER, payload: { toggle: false } });
    }
  }

  async function handleAddToCart({ productId, showToast }) {
    try {
      const response = await axios.post(`${API_URL}/cart/users`, {
        __product: productId,
        action: "INCREMENT",
      });
      if (response.status === 201 || response.status === 200) {
        dispatch({
          TYPE: ACTIONS.ADD_TO_CART,
          payload: { __product: productId },
        });

        if (showToast) {
          toastDispatch({
            TYPE: "TOGGLE_TOAST",
            payload: { toggle: true, message: "Added to Cart " },
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAddToWishlist({ productId, showToast }) {
    try {
      let response = await axios.post(`${API_URL}/wishlist/users`, {
        __product: productId,
      });

      if (response.status === 201 || response.status === 200) {
        dispatch({
          TYPE: ACTIONS.ADD_TO_WISHLIST,
          payload: { __product: productId },
        });

        if (showToast) {
          toastDispatch({
            TYPE: "TOGGLE_TOAST",
            payload: { toggle: true, message: "Added to Wishlist " },
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleRemoveFromCart({ productId, showToast }) {

    try {
      let response = await axios.delete(`${API_URL}/cart/users`, {
        data: {
          __product: productId,
        },
      });

      if (response.status === 200) {
        dispatch({
          TYPE: ACTIONS.REMOVE_FROM_CART,
          payload: { __product: productId },
        });

        if (showToast) {
          toastDispatch({
            TYPE: "TOGGLE_TOAST",
            payload: { toggle: true, message: "Removed from Cart " },
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleRemoveFromWishlist({ productId, showToast }) {

    try {
      let response = await axios.delete(`${API_URL}/wishlist/users`, {
        data: {
          __product: productId,
        },
      });
      if (response.status === 200) {
        dispatch({
          TYPE: ACTIONS.REMOVE_FROM_WISHLIST,
          payload: { __product: productId },
        });

        if (showToast) {
          toastDispatch({
            TYPE: "TOGGLE_TOAST",
            payload: { toggle: true, message: "Removed from Wishlist " },
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleMoveToCart({ productId }) {

    try {
      await handleAddToCart({ productId, showToast: false });
      await handleRemoveFromWishlist({ productId, showToast: false });
      toastDispatch({
        TYPE: "TOGGLE_TOAST",
        payload: { toggle: true, message: "Moved to Cart " },
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function handleMoveToWishlist({ productId }) {

    try {
      await handleAddToWishlist({ productId, showToast: false });
      await handleRemoveFromCart({ productId, showToast: false });
      toastDispatch({
        TYPE: "TOGGLE_TOAST",
        payload: { toggle: true, message: "Moved to Wishlist " },
      });
    } catch (err) {
      console.error(err);
    } 
  }

  async function handleIncrementQuantity({ productId }) {
    try {
      const response = await axios.post(`${API_URL}/cart/users`, {
        __product: productId,
        action: "INCREMENT",
      });

      if (response.status === 200) {
        dispatch({
          TYPE: ACTIONS.INCREMENT_QUANTITY,
          payload: { __product: productId },
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDecrementQuantity({ productId }) {
    try {
      const response = await axios.post(`${API_URL}/cart/users`, {
        __product: productId,
        action: "DECREMENT",
      });

      if (response.status === 200) {
        dispatch({
          TYPE: ACTIONS.DECREMENT_QUANTITY,
          payload: { __product: productId },
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleOrderConfirm() {
    dispatch({ TYPE: ACTIONS.TOGGLE_LOADER, payload: { toggle: true } });
    try {
      const response = await axios.post(`${API_URL}/cart/users/order/confirm`);
      if (response.status === 200) {
        dispatch({ TYPE: ACTIONS.ORDER_CONFIRM });
        navigate('/orderconfirm')
      }
    } catch (err) {
      console.error(err);
    }finally{
      dispatch({ TYPE: ACTIONS.TOGGLE_LOADER, payload: { toggle: false } });
    }
  }

  async function handleCardPayment(token, cart){
    console.log("now call loader")
    dispatch({ TYPE: ACTIONS.TOGGLE_LOADER, payload: { toggle: true } });
    try{
      const response = await axios.post(`${API_URL}/payment`,{
        token,
        cart
      })

      if(response.status === 200){
        dispatch({ TYPE: ACTIONS.ORDER_CONFIRM });
        navigate('/orderconfirm')
      }
    }catch(err){
      console.error(err)
    }finally{
      console.log("now stop loader")
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
        handleOrderConfirm,
        handleCardPayment
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
