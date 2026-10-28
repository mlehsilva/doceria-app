import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Cart({ isOpen, onClose }) {
  const { cartItems, totalValue, updateQuantity, updateObservacao, removeFromCart } = useContext(CartContext);

  const enviarPedidoWhatsApp = () => {
    const numeroTelefone = "5581998398844";
    let textoPedido = "Olá! Gostaria de fazer o seguinte pedido na Doceria Açúcar & Afeto:\n\n";

    cartItems.forEach(item => {
      const valorItem = (item.preco * item.quantidade).toFixed(2).replace('.', ',');
      textoPedido += `* ${item.quantidade}x ${item.nome} - R$ ${valorItem}\n`;
      if (item.observacao && item.observacao.trim() !== '') {
        textoPedido += `  └ _Obs: ${item.observacao.trim()}_\n`;
      }
    });

    const valorTotal = totalValue.toFixed(2).replace('.', ',');
    textoPedido += `\n*Total do Pedido:* R$ ${valorTotal}`;

    const urlFormatada = "https://wa.me/" + numeroTelefone + "?text=" + encodeURIComponent(textoPedido);
    window.open(urlFormatada, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Fundo escurecido atrás da sacola para dar destaque */}
      <div className="fixed inset-0 z-45 bg-black/30 backdrop-blur-xs lg:hidden" onClick={onClose} />

      <aside className="fixed top-0 right-0 z-50 h-full w-full sm:w-96 border-l border-doceria-rosa-200 bg-white p-6 shadow-2xl flex flex-col justify-between">
        <div>
          {/* Cabeçalho do Carrinho */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2.5">
              {/* 🌟 ÍCONE DE SACOLA/CARRINHO EM SVG */}
              <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-doceria-rosa-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
              Sua Sacola
            </h2>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 font-bold text-lg cursor-pointer">
              ✕
            </button>
          </div>

          {/* Carrinho Vazio */}
          {cartItems.length === 0 ? (
            <div className="mt-20 flex flex-col items-center text-center px-4">
              {/* 🌟 ÍCONE DE SACOLA VAZIA EM SVG DE LINHA */}
              <div className="p-4 bg-gray-50 rounded-full mb-4 text-gray-400">
                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-700 text-sm">Sacola vazia</h3>
              <p className="text-xs text-gray-400 mt-1 max-w-[200px]">Que tal adicionar alguns doces para adoçar o seu dia?</p>
            </div>
          ) : (
            /* Lista com rolagem caso tenha muitos itens */
            <div className="divide-y divide-pink-50 max-h-[55vh] overflow-y-auto pr-1 mt-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col py-3.5 gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-2">
                      <h4 className="text-sm font-bold text-gray-800 line-clamp-1">{item.nome}</h4>
                      <p className="text-xs text-doceria-rosa-600 font-semibold">R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex items-center rounded-xl bg-doceria-rosa-50 border border-doceria-rosa-200 overflow-hidden">
                        <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 text-xs font-bold text-doceria-rosa-700 hover:bg-doceria-rosa-100">-</button>
                        <span className="px-1 text-xs font-bold text-gray-700">{item.quantidade}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 text-xs font-bold text-doceria-rosa-700 hover:bg-doceria-rosa-100">+</button>
                      </div>
                      
                      {/* 🌟 BOTÃO DE REMOVER COM ÍCONE DE LIXEIRA EM SVG */}
                      <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="rounded-xl bg-red-50 p-2 text-red-500 hover:bg-red-100 transition-colors cursor-pointer"
                      >
                        <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* ✏️ CAMPO DE OBSERVAÇÃO INDIVIDUAL DO PRODUTO */}
                  <input
                    type="text"
                    placeholder="Adicionar observação (ex: sem granulado, p/ presente)"
                    value={item.observacao || ''}
                    onChange={(e) => updateObservacao(item.id, e.target.value)}
                    className="w-full text-[11px] px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-doceria-rosa-300 focus:bg-white text-gray-600 placeholder-gray-400 transition-all"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rodapé fixado na parte de baixo da sacola */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 pt-4 bg-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-gray-500">Subtotal:</span>
              <span className="text-xl font-black text-doceria-rosa-700">R$ {totalValue.toFixed(2).replace('.', ',')}</span>
            </div>
            <button
              onClick={enviarPedidoWhatsApp}
              className="w-full rounded-xl bg-green-500 py-3 text-center text-sm font-bold text-white shadow-md hover:bg-green-600 transition-colors cursor-pointer"
            >
              Finalizar Pedido 📲
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
