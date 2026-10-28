import React, { useState, useContext, useEffect } from 'react';
import { CartProvider, CartContext } from './context/CartContext';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function MainAppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [pulseTrigger, setPulseTrigger] = useState(false);
  const { cartItems } = useContext(CartContext);
  
  // Conta o total de doces na sacola
  const totalItens = cartItems.reduce((acc, item) => acc + item.quantidade, 0);

  // Efeito para disparar a animação física no botão flutuante quando o total mudar
  useEffect(() => {
    if (totalItens === 0) return;
    
    setPulseTrigger(true);
    const timer = setTimeout(() => setPulseTrigger(false), 300);
    
    return () => clearTimeout(timer);
  }, [totalItens]);

  return (
    <div className="min-h-screen bg-doceria-rosa-50 pb-24 font-sans selection:bg-doceria-rosa-200">
      {/* Topo fixo padrão */}
      <Header toggleCart={() => setIsCartOpen(true)} />
      
      <main className="max-w-6xl mx-auto">
        <ProductList />
      </main>

      {/* 🌟 BOTÃO FLUTUANTE DA SACOLA COM ANIMAÇÃO DINÂMICA */}
      <button
        onClick={() => setIsCartOpen(true)}
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-green-500 text-white font-bold px-5 py-4 rounded-full shadow-2xl hover:bg-green-600 border border-green-400 cursor-pointer transition-all duration-300 transform active:scale-95 ${
          pulseTrigger ? 'scale-110 brightness-110 ring-4 ring-green-300' : 'scale-100'
        }`}
      >
        <div className="relative">
          <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
          </svg>
          {totalItens > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-600 text-[10px] font-black text-white border border-white">
              {totalItens}
            </span>
          )}
        </div>
        <span className="text-sm tracking-wide">Ver Sacola</span>
      </button>

      {/* Componente do Carrinho Lateral */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainAppContent />
    </CartProvider>
  );
}
