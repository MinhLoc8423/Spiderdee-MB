const initialStateReducer = [];

const saveItemReducer = (state, action) => {
  switch (action.type) {
    case "SET_SAVED_ITEMS":
      return action.payload || []; 
    case "ADD_TO_SAVED_ITEMS":
      return [...state, action.payload]; 
    case "REMOVE_FROM_SAVED_ITEMS":
      return state.filter(item => item._id !== action.payload);
    default:
      return state; 
  }
};


export { saveItemReducer, initialStateReducer };
