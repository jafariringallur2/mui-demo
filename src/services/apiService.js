const BASE_URL = 'https://web.botire.in/api';
const BusinessUrl = 'boat';
const getAuthToken = () => localStorage.getItem('token');


const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'An error occurred');
  }
  return response.json();
};

const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'BusinessUrl': BusinessUrl,
    'x-authorization': `Bearer ${token}`,
  } : {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'BusinessUrl': BusinessUrl,
  };
};

export const getCategories = () =>
  fetch(`${BASE_URL}/categories`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'BusinessUrl': BusinessUrl,
    },
  }).then(handleResponse);

  export const getProducts = (limit = 8, category = null) => {
    let queryParams = `?limit=${limit}`;
    if (category) {
      queryParams += `&category=${encodeURIComponent(category)}`;
    }
  
    return fetch(`${BASE_URL}/products${queryParams}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'BusinessUrl': BusinessUrl,
      },
    }).then(handleResponse);
  };

export const getProductDetails = (id) =>
  fetch(`${BASE_URL}/product/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'BusinessUrl': BusinessUrl,
    },
  }).then(handleResponse);

export const sendOtp = (phone) =>
  fetch(`${BASE_URL}/send-login-otp`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'BusinessUrl': BusinessUrl,
    },
    body: JSON.stringify({ userPhoneNumber: phone }),
  }).then(handleResponse);

export const verifyOtp = (phone,otp) =>
  fetch(`${BASE_URL}/validate-login-otp`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'BusinessUrl': BusinessUrl,
    },
    body: JSON.stringify({ userPhoneNumber: phone,otpValue: otp }),
  }).then(handleResponse);

  export const addToCart = (id, quantity = null) => {
    const body = { id };
    if (quantity !== null) {
      body.qty = quantity;
    }
    return fetch(`${BASE_URL}/add-to-cart`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    }).then(handleResponse);
  };

export const getCartCount = () =>
  fetch(`${BASE_URL}/cart-count`, {
    method: 'GET',
    headers: getAuthHeaders(),
  }).then(handleResponse);
  
export const getCartItems = () =>
  fetch(`${BASE_URL}/cart-items`, {
    method: 'GET',
    headers: getAuthHeaders(),
  }).then(handleResponse);