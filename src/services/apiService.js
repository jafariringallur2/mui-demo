const BASE_URL = 'https://web.botire.in/api';
const BusinessUrl = 'boat';
// const BASE_URL = 'http://127.0.0.1:8000/api';
// const BusinessUrl = 'botire-digital-solutions';
const getAuthToken = () => localStorage.getItem('token');

const cacheData = (key, version, data) => {
  localStorage.setItem(key, JSON.stringify({ version, data }));
};

const getCachedData = (key) => {
  const cached = localStorage.getItem(key);
  return cached ? JSON.parse(cached) : null;
};

const updateCacheIfNeeded = (versions) => {
  Object.keys(versions).forEach((key) => {
    const cached = getCachedData(key);
    if (cached && cached.version !== versions[key]) {
      localStorage.removeItem(key);
    }
  });
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'An error occurred');
  }
  const result = await response.json();
  if (result.versions) {
    updateCacheIfNeeded(result.versions);
  }
  return result;
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

const fetchWithCache = async (key, url) => {
  const cached = getCachedData(key);
  if (cached) {
   return cached.data;
  }
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'BusinessUrl': BusinessUrl,
      },
    });
    const result = await handleResponse(response);
    cacheData(key, result.version, result.data);
    return result.data;
  
  } catch (error) {
    console.error(`Error fetching ${key}:`, error);
    return null;
  }
};

export const getHeaderAPI = () => fetchWithCache('headerData', `${BASE_URL}/header`);
export const getSliders = () => fetchWithCache('sliderData', `${BASE_URL}/sliders`);
export const getCategories = () => fetchWithCache('categoryData', `${BASE_URL}/categories`);


  export const getProducts = (limit = 8, category = null,page = 1,search=false) => {
    let queryParams = `?limit=${limit}&page=${page}&search=${search}`;
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

  export const addToCart = (id, quantity = null,variant=null) => {
    const body = { id };
    if (quantity !== null) {
      body.qty = quantity;
    }
    if (variant !== null) {
      body.variant_id = variant;
    }
    return fetch(`${BASE_URL}/add-to-cart`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    }).then(handleResponse);
  };

  export const removeCartItem = (id) => {
    const body = { id };
    return fetch(`${BASE_URL}/cart-item`, {
      method: 'DELETE',
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

export const applyCoupon = (coupon_code) => {
  const body = { coupon_code };
  return fetch(`${BASE_URL}/apply-coupon`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  }).then(handleResponse);
};
export const saveCustomerAddresses = (address_data) => {
  const body = address_data;
  return fetch(`${BASE_URL}/customer-address`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  }).then(handleResponse);
};
export const getCustomerAddresses = () =>
  fetch(`${BASE_URL}/customer-address`, {
    method: 'GET',
    headers: getAuthHeaders(),
  }).then(handleResponse);

export const getOrders = () =>
  fetch(`${BASE_URL}/orders`, {
    method: 'GET',
    headers: getAuthHeaders(),
  }).then(handleResponse);

  export const createOnlinePayment = (data) => {
    const body = data;
    return fetch(`${BASE_URL}/create-payment`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    }).then(handleResponse);
  };
  export const createOrder = (data) => {
    const body = data;
    return fetch(`${BASE_URL}/order`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    }).then(handleResponse);
  };

  export const getOrderDetails = (id) =>
  fetch(`${BASE_URL}/order/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'BusinessUrl': BusinessUrl,
    },
  }).then(handleResponse);