export const ACTIONS = {
    SET_PRODUCT_LIST: "SET_PRODUCT_LIST",
    SET_CATEGORY_LIST: "SET_CATEGORY_LIST",
    SET_SUB_CATEGORY_LIST: "SET_SUB_CATEGORY_LIST",
    SELECT_CATEGORY: "SELECT_CATEGORY",
    SELECT_SUB_CATEGORY: "SELECT_SUB_CATEGORY",
    ADD_TO_CART: "ADD_TO_CART",
    SET_CART: "SET_CART",
    SET_WISHLIST: "SET_WISHLIST",
    ADD_TO_WISHLIST: "ADD_TO_WISHLIST",
    REMOVE_FROM_CART: "REMOVE_FROM_CART",
    REMOVE_FROM_WISHLIST: "REMOVE_FROM_WISHLIST",
    INCREMENT_QUANTITY: "INCREMENT_QUANTITY",
    DECREMENT_QUANTITY: "DECREMENT_QUANTITY",
    ORDER_CONFIRM:"ORDER_CONFIRM",
    SORT: "SORT",
    TOGGLE_NEW: "TOGGLE_NEW",
    TOGGLE_DISCOUNT: "TOGGLE_DISCOUNT",
    TOGGLE_LOADER: "TOGGLE_LOADER",
  };
  
  export function reducerFunction(state, action) {
    switch (action.TYPE) {
      case "SET_PRODUCT_LIST":
        return { ...state, productList: action.payload.products };
  
      case "SET_CATEGORY_LIST":
        return { ...state, categoryList: action.payload.categories };
  
      case "SET_SUB_CATEGORY_LIST":
        return { ...state, subCategoryList: action.payload.subcategories };
  
      case "SELECT_CATEGORY":
        return {
          ...state,
          selectedCategory: action.payload._id,
          selectedSubCategory: null
        };
  
      case "SELECT_SUB_CATEGORY":
        return {
          ...state,
          selectedCategory: action.payload.categoryId,
          selectedSubCategory: action.payload._id
        };
  
      case "SET_CART":
        const { cart } = action.payload;
        return { ...state, itemsInCart: cart };
  
      case "ADD_TO_CART":
        const { __product } = action.payload;
        state = {
          ...state,
          itemsInCart:
            state.itemsInCart.filter((item) => item.__product === __product)
              .length === 1
              ? state.itemsInCart.map((item) =>
                  item.__product === __product
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                )
              : [...state.itemsInCart, { __product, quantity: 1 }]
        };
        return state;
  
      case "REMOVE_FROM_CART":
        state = {
          ...state,
          itemsInCart: state.itemsInCart.filter(
            ({ __product }) => __product !== action.payload.__product
          )
        };
        return state;
  
      case "INCREMENT_QUANTITY":
        state = {
          ...state,
          itemsInCart: state.itemsInCart.map((item) =>
            item.__product === action.payload.__product
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
        return state;
  
      case "DECREMENT_QUANTITY":
        state = {
          ...state,
          itemsInCart: state.itemsInCart.map((item) =>
            item.__product === action.payload.__product
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        };
        return state;

      case "ORDER_CONFIRM":
        return {...state, itemsInCart: []}

      case "SET_WISHLIST":
        const { wishlist } = action.payload;
        return { ...state, itemsInWishlist: wishlist };
  
      case "ADD_TO_WISHLIST":
        state = {
          ...state,
          itemsInWishlist:
            state.itemsInWishlist.filter(
              (item) => item.__product === action.payload.__product
            ).length === 1
              ? [...state.itemsInWishlist]
              : [
                  ...state.itemsInWishlist,
                  { __product: action.payload.__product }
                ]
        };
        return state;
  
      case "REMOVE_FROM_WISHLIST":
        state = {
          ...state,
          itemsInWishlist: state.itemsInWishlist.filter(
            ({ __product }) => __product !== action.payload.__product
          )
        };
        return state;
  
      case "SORT":
        return { ...state, sortBy: action.payload };
  
      case "TOGGLE_NEW":
        return { ...state, showNewOnly: !state.showNewOnly };
  
      case "TOGGLE_DISCOUNT":
        return { ...state, showDiscountOnly: !state.showDiscountOnly };
  
      case "TOGGLE_LOADER":
        return { ...state, isLoading: action.payload.toggle };
  
      default:
        return state;
    }
  }
  