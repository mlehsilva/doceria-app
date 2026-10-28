import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';

export default function Header({ toggleCart }) {
  const { cartItems } = useContext(CartContext);
  const [estaAberto, setEstaAberto] = useState(true);

  const totalItens = cartItems.reduce((acc, item) => acc + item.quantidade, 0);

  // 🕒 Lógica para verificar o horário de funcionamento em tempo real
  useEffect(() => {
    const verificarHorario = () => {
      const agora = new Date();
      const horaAtual = agora.getHours();
      
      // Define o funcionamento das 08h às 20h
      if (horaAtual >= 8 && horaAtual < 20) {
        setEstaAberto(true);
      } else {
        setEstaAberto(false);
      }
    };

    verificarHorario();
    // Atualiza a cada 1 minuto
    const intervalo = setInterval(verificarHorario, 60000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <header className="w-full bg-white shadow-xs border-b border-gray-100">
      {/* 🖼️ BANNER DE FUNDO (Estilo Amoreco) */}
      <div 
        className="h-48 w-full bg-cover bg-center relative" 
        style={{ backgroundImage: "url('public/banner.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
      </div>

      {/* 🏪 CARD DE INFORMAÇÕES DA DOCERIA */}
      <div className="max-w-6xl mx-auto px-4 pb-5 relative flex flex-col sm:flex-row sm:items-end justify-between -mt-12 z-10 gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
          
          {/* 📸 LOGO OFICIAL SOBREPOSTA */}
          <div className="h-24 w-24 rounded-2xl border-4 border-white bg-white overflow-hidden shadow-lg flex items-center justify-center p-1.5 transform transition-transform hover:scale-105">
            <img 
              src="public/icon.jpeg" 
              alt="Logo Açúcar & Afeto" 
              className="h-full w-full object-contain rounded-xl"
            />
          </div>

          {/* 📝 TEXTOS E STATUS DE FUNCIONAMENTO */}
            <div className="mb-1">
              <h1 className="text-2xl font-black text-gray-800 tracking-tight">Açúcar & Afeto</h1>
              
              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-gray-500">
                
                {/* 🟢/🔴 INDICADOR DINÂMICO DE HORÁRIO */}
                {estaAberto ? (
                  <span className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Aberto até às 20h00
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    Fechado • Abre às 08h00
                  </span>
                )}

                <span className="text-gray-300">•</span>
                
                {/* 🌟 ÍCONE DE LOCALIZAÇÃO EM SVG (Substituindo o emoji) */}
                <span className="flex items-center gap-1.5 text-gray-500">
                  <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  Caruaru - PE
                </span>
              </div>
            </div>
      </div>
        
        {/* 🛒 BOTÃO DA CESTA DO TOPO */}
        <button 
          onClick={toggleCart}
          className="relative p-3 bg-doceria-amarelo-100 rounded-full border border-doceria-amarelo-200 shadow-md cursor-pointer hover:bg-doceria-amarelo-200 transition-all hover:scale-105 self-end sm:self-auto mb-1"
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
    </header>
  );
}
