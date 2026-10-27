import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function ProductCard({ produto }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
      {/* Imagem com cantos arredondados perfeitamente integrados */}
      <div className="h-48 w-full bg-doceria-rosa-50 overflow-hidden relative group">
        <img 
          src={produto.imagem} 
          alt={produto.nome} 
          className="h-full w-full object-cover block transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs text-[10px] text-gray-600 font-bold px-2 py-1 rounded-full shadow-xs">
          ✨ Destaque
        </span>
      </div>

      {/* Conteúdo de Texto com espaçamentos corrigidos */}
      <div className="flex flex-1 flex-col justify-between p-4 bg-linear-to-b from-white to-gray-50/30">
        <div>
          <h3 className="text-base font-bold text-gray-800 tracking-tight line-clamp-1">{produto.nome}</h3>
          <p className="mt-1 text-xs text-gray-400 line-clamp-2 leading-relaxed">{produto.descricao}</p>
        </div>

        {/* Preço estilo etiqueta e botão arredondado moderno */}
        <div className="mt-4 flex items-center justify-between pt-2 border-t border-gray-50">
          <div className="bg-doceria-rosa-50 px-2.5 py-1 rounded-lg border border-doceria-rosa-100">
            <span className="text-sm font-black text-doceria-rosa-700">
              R$ {produto.preco.toFixed(2).replace('.', ',')}
            </span>
          </div>
          <button
            onClick={() => addToCart(produto)}
            className="rounded-xl bg-doceria-amarelo-200 hover:bg-doceria-amarelo-300 px-3 py-2 text-xs font-black text-doceria-amarelo-800 shadow-xs border border-doceria-amarelo-300 cursor-pointer transition-all active:scale-95"
          >
            Adicionar +
          </button>
        </div>
      </div>
    </div>
  );
}
