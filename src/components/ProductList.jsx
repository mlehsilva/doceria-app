import React, { useState } from 'react';
import ProductCard from './ProductCard';
import produtosData from '../data/produtos.json';

export default function ProductList() {
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');

  // Categorias baseadas no seu banco de dados json
  const categorias = ['Todos', 'Brigadeiros', 'Bolos de Pote', 'Fatias & Cones', 'Outros Doces'];

  // Lógica de filtragem combinada
  const produtosFiltrados = produtosData.filter((produto) => {
    const correspondeBusca = produto.nome.toLowerCase().includes(busca.toLowerCase()) || 
                             produto.descricao.toLowerCase().includes(busca.toLowerCase());
    const correspondeCategoria = categoriaAtiva === 'Todos' || produto.categoria === categoriaAtiva;
    
    return correspondeBusca && correspondeCategoria;
  });

  return (
    <section className="px-4 py-6">
      
      <div className="mb-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full bg-white p-2 rounded-2xl shadow-xs border border-gray-100">
        
        {/* SELETOR DE CATEGORIAS (Esquerda) */}
        <div className="relative min-w-[160px]">
          <select
            value={categoriaAtiva}
            onChange={(e) => setCategoriaAtiva(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-doceria-rosa-500 cursor-pointer transition-all"
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'Todos' ? 'Lista de categorias' : cat}
              </option>
            ))}
          </select>
          {/* Seta customizada do select dropdown */}
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-xs">
            ▼
          </span>
        </div>

        {/* BARRA DE PESQUISA EXPANSIVA (Direita/Centro) */}
        <div className="relative flex-1">
          {/* 🌟 ÍCONE DE LUPA EM SVG INTEGRADO */}
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Busque por um produto..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-doceria-rosa-500 transition-all"
          />
        </div>



      </div>

      {/* TÍTULO DINÂMICO E GRID */}
      <h2 className="mb-5 text-sm font-bold uppercase tracking-wider text-pink-500">
        {categoriaAtiva === 'Todos' ? 'Nosso Cardápio' : categoriaAtiva} ({produtosFiltrados.length})
      </h2>
      
      {produtosFiltrados.length === 0 ? (
        <div className="text-center py-12">
          <span className="text-4xl">🧁</span>
          <p className="mt-2 text-sm text-gray-400 font-medium">Nenhum doce encontrado para essa busca.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {produtosFiltrados.map((produto) => (
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </div>
      )}
    </section>
  );
}
