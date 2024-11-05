export const initialAddress = [];

export const addressReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_ADDRESSES':
      return action.payload; // payload là danh sách địa chỉ được load vào

    case 'ADD_ADDRESS':
      const isNewAddressDefault = action.payload.isDefault;
      return state.map(address => ({
        ...address,
        isDefault: isNewAddressDefault ? false : address.isDefault,
      })).concat(isNewAddressDefault ? { ...action.payload, isDefault: true } : action.payload
      );

    case 'UPDATE_ADDRESS':
      return state.map(address => {
        if (address._id === action.payload._id) {
          return { ...address, isDefault: action.payload.isDefault };
        } else {
          return { ...address, isDefault: false };
        }
      });

    case 'REMOVE_ADDRESS':
      return state.filter(
        address => address.shipment_id !== action.payload.shipment_id
      );

    case 'SET_DEFAULT_ADDRESS':
      return state.map(address => ({
        ...address,
        defaultStatus: address.shipment_id === action.payload.shipment_id,
      }));

    default:
      return state;
  }
};
