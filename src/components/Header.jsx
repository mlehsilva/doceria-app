import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Header({ toggleCart }) {
  const { cartItems } = useContext(CartContext);
  const totalItens = cartItems.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between bg-doceria-rosa-100 p-4 shadow-sm border-b border-doceria-rosa-200">
      <div>
        <h1 className="text-xl font-bold text-doceria-rosa-700 tracking-wide">Açúcar & Afeto</h1>
        <p className="text-xs text-doceria-rosa-500">Doceria Artesanal</p>
      </div>
      
      {/* Botão da cesta agora abre o carrinho */}
      <button 
        onClick={toggleCart}
        className="relative p-2 bg-doceria-amarelo-100 rounded-full border border-doceria-amarelo-200 shadow-sm cursor-pointer hover:bg-doceria-amarelo-200 transition-colors"
      >
        <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-doceria-rosa-700">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
        </svg>
        {totalItens > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-doceria-rosa-600 text-xs font-bold text-white animate-bounce">
            {totalItens}
          </span>
        )}
      </button>
    </header>
  );
}
