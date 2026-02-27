import { createContext, useContext, useEffect, useState } from 'react';

const GroupageCartContext = createContext(null);

const STORAGE_KEY = 'vodason_groupage_cart';

export const GroupageCartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Erreur chargement panier groupage', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Erreur sauvegarde panier groupage', e);
    }
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <GroupageCartContext.Provider value={value}>
      {children}
    </GroupageCartContext.Provider>
  );
};

export const useGroupageCart = () => {
  const ctx = useContext(GroupageCartContext);
  if (!ctx) {
    throw new Error('useGroupageCart must be used within GroupageCartProvider');
  }
  return ctx;
};


