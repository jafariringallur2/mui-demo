import PropTypes from 'prop-types';
import React, { createContext, useState, useContext, useEffect, useMemo, useCallback } from 'react';
import { addToCart as addToCartAPI, getCartCount as getCartCountAPI } from 'src/services/apiService';

// Create a context for the cart
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartLoading, setLoading] = useState(false);

  // Fetch cart count from the backend
  const fetchCartCount = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getCartCountAPI();
      setCartCount(res.count);
    } catch (error) {
      console.error('Failed to fetch cart count:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add item to the cart
  const addToCart = useCallback(async (id,quantity=null) => {
    setLoading(true);
    try {
      await addToCartAPI(id,quantity);
      // Optionally, refetch cart count after adding an item
      await fetchCartCount();
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchCartCount]);

  // Initial fetch of cart count
  useEffect(() => {
    fetchCartCount();
  }, [fetchCartCount]);

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(() => ({ cartCount, addToCart, cartLoading }), [cartCount, addToCart, cartLoading]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Add PropTypes for CartProvider
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);
