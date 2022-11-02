const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const updetedCart = [...state.cart];
      const updatedItemIndex = updetedCart.findIndex(
        (item) => item.id == action.payload.id
      );
      if (updatedItemIndex < 0) {
        updetedCart.push({ ...action.payload, quantity: 1 });
      } else {
        const updatedItem = { ...updetedCart[updatedItemIndex] };
        updatedItem.quantity++;
        updetedCart[updatedItemIndex] = updatedItem;
      }
      return { ...state, cart: updetedCart };
    }
    default:
      return state;
  }
};

export default CartReducer;
