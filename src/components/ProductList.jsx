import React from 'react';
import ProductCard from './ProductCard';
import produtosData from '../data/produtos.json';

export default function ProductList() {
  return (
    <section className="px-4 py-6">
      <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-pink-500">Nosso Cardápio</h2>
      
      {/* Grid Responsivo Inteligente */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {produtosData.map((produto) => (
          <ProductCard key={produto.id} produto={produto} />
        ))}
      </div>
    </section>
  );
}
