export const initialCart = [];

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_CART":
      return action.payload;
    case "ADD_TO_CART":
      const existingItem = state.find(item => item._id === action.payload._id);
      if (existingItem) {
        return state.map(item =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    case "UPDATE_QUANTITY":
      return state.map(item =>
        item._id === action.payload._id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    case "REMOVE_FROM_CART":
      return state.filter(item => item._id !== action.payload);
    default:
      return state;
  }
};
