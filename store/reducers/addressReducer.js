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
          return { ...address, ...action.payload }; // Cập nhật địa chỉ trùng ID
        } else if (action.payload.isDefault) {
          return { ...address, isDefault: false }; // Đặt các địa chỉ khác về isDefault: false
        }
        return address; // Giữ nguyên các địa chỉ khác
      });

    case 'DELETE_ADDRESS':
      return state.filter(
        address => address._id !== action.payload
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
