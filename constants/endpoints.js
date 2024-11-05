// export const API_BASE_URL = 'https://spiderdee-be.vercel.app/';
export const API_BASE_URL = 'https://modern-cockatoo-musical.ngrok-free.app/';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/auth/login/',
  REGISTER: '/auth/register/',
  SENDOTP: '/auth/send-otp/',
  VERIFYOTP: '/auth/verify-otp/',
  RESTPASSWORD: '/auth/reset-password/',

  // Category endpoints
  CATEGORIES: '/api/categories/',

  // Product endpoints
  PRODUCTS: '/api/products/',
  PRODUCTSSEARCH: '/api/products/search/',

  //Wish list endpoints
  WISHLIST: '/api/wish-list/',
  WISHLISTGETUSER: '/api/wish-list/user/',

  //Order endpoints
  ORDER: '/api/orders/',

  //Payment endpoints
  PAYMENT: '/api/payment/',

  //Address endpointsshipping
  ADDRESS: '/api/address/',
};

