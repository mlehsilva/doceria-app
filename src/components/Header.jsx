import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Header({ toggleCart }) {
  const { cartItems } = useContext(CartContext);
  const totalItens = cartItems.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <div className="w-full bg-white shadow-sm border-b border-doceria-rosa-100">
      {/* Banner de fundo no topo */}
      <div className="h-32 w-full bg-cover bg-center relative" style={{ backgroundImage: "url('public/banner.png')" }}>
        <div className="absolute inset-0 bg-black/20" /> {/* Filtro escuro para dar contraste */}
      </div>

      {/* Info da Doceria com Logo flutuante */}
      <div className="max-w-6xl mx-auto px-4 pb-4 relative flex items-end justify-between -mt-8 z-10">
        <div className="flex items-end gap-3">
          {/* Foto de perfil/Logo da doceria */}
          <div className="h-20 w-20 rounded-full border-4 border-white bg-doceria-rosa-100 overflow-hidden shadow-md flex items-center justify-center text-3xl">
            🍰
          </div>
          <div className="mb-1">
            <h1 className="text-xl font-black text-gray-800 tracking-wide">Açúcar & Afeto</h1>
            <p className="text-xs font-semibold text-doceria-rosa-500">✨ Doceria Artesanal & Afeto</p>
          </div>
        </div>
        
        {/* Botão da cesta ajustado */}
        <button 
          onClick={toggleCart}
          className="relative p-3 bg-doceria-amarelo-100 rounded-full border border-doceria-amarelo-200 shadow-md cursor-pointer hover:bg-doceria-amarelo-200 transition-all hover:scale-105 mb-1"
        >
          <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-doceria-rosa-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
          </svg>
          {totalItens > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-doceria-rosa-600 text-[10px] font-bold text-white animate-bounce">
              {totalItens}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
