import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function ProductCard({ produto }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white border border-doceria-rosa-100 shadow-sm transition-transform active:scale-95">
      <div className="h-44 w-full bg-doceria-rosa-50 flex items-center justify-center overflow-hidden">
        <img 
          src={produto.imagem} 
          alt={produto.nome} 
          className="h-full w-full object-cover block"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="text-base font-bold text-gray-800 line-clamp-1">{produto.nome}</h3>
          <p className="mt-1 text-xs text-gray-500 line-clamp-2 leading-relaxed">{produto.descricao}</p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-extrabold text-doceria-rosa-600">
            R$ {produto.preco.toFixed(2).replace('.', ',')}
          </span>
          <button
            onClick={() => addToCart(produto)}
            className="rounded-xl bg-doceria-amarelo-200 px-3 py-2 text-xs font-bold text-doceria-amarelo-800 shadow-sm border border-doceria-amarelo-300 cursor-pointer transition-colors"
          >
            Adicionar +
          </button>
        </div>
      </div>
    </div>
  );
}
