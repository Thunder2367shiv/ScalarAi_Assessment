import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // --- AUTH STATE ---
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem('userInfo')) || null
  );

  // --- CART STATE ---
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cart')) || []
  );

  // --- WISHLIST STATE ---
  const [wishlist, setWishlist] = useState([]);

  // Persist Cart to LocalStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Persist UserInfo to LocalStorage
  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      localStorage.removeItem('userInfo');
    }
  }, [userInfo]);

  // --- ACTIONS ---

  const addToCart = (product, qty = 1) => {
    const existItem = cartItems.find((x) => x.product === product._id);
    if (existItem) {
      setCartItems(
        cartItems.map((x) =>
          x.product === product._id ? { ...x, qty: x.qty + qty } : x
        )
      );
    } else {
      // We store product ID as 'product' to match backend expectations
      setCartItems([...cartItems, { ...product, product: product._id, qty }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((x) => x.product !== id));
  };

  const logout = () => {
    setUserInfo(null);
    setCartItems([]);
    setWishlist([]);
    localStorage.clear();
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        userInfo,
        setUserInfo,
        logout,
        wishlist,
        setWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);