import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 🌟 MODIFICAÇÃO: O estado inicial tenta ler os dados salvos no navegador, se não houver nada, começa vazio
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('@AcuparAfeto:cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [totalValue, setTotalValue] = useState(0);

  // 🌟 NOVO EFEITO: Salva automaticamente os itens no LocalStorage sempre que o carrinho mudar
  useEffect(() => {
    localStorage.setItem('@AcuparAfeto:cart', JSON.stringify(cartItems));
    
    // Calcula o valor total
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
      return [...prevItems, { ...product, quantidade: 1, observacao: '' }];
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
        .filter(Boolean)
    );
  };

  // Atualiza o texto de observação de um produto específico
  const updateObservacao = (id, texto) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, observacao: texto } : item
      )
    );
  };

  // Remove o item diretamente
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Limpa o carrinho (útil após finalizar o pedido)
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, totalValue, addToCart, updateQuantity, updateObservacao, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
