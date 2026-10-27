import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  // Calcula o valor total sempre que o carrinho mudar
  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    setTotalValue(total);
  }, [cartItems]);

  // Adiciona item ou incrementa a quantidade se já existir
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantidade: 1 }];
    });
  };

  // Altera a quantidade (aumentar ou diminuir)
  const updateQuantity = (id, amount) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantidade + amount;
            return newQuantity > 0 ? { ...item, quantidade: newQuantity } : null;
          }
          return item;
        })
        .filter(Boolean) // Remove o item se a quantidade chegar a 0
    );
  };

  // Remove o item diretamente
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Limpa o carrinho
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, totalValue, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
