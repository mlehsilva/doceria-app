import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Cart({ isOpen, onClose }) {
  const { cartItems, totalValue, updateQuantity, removeFromCart } = useContext(CartContext);

  const enviarPedidoWhatsApp = () => {
    const numeroTelefone = "5581998398844";
    let textoPedido = "Olá! Gostaria de fazer o seguinte pedido na Doceria Açúcar & Afeto:\n\n";

    cartItems.forEach(item => {
      const valorItem = (item.preco * item.quantidade).toFixed(2).replace('.', ',');
      textoPedido += `* ${item.quantidade}x ${item.nome} - R$ ${valorItem}\n`;
    });

    const valorTotal = totalValue.toFixed(2).replace('.', ',');
    textoPedido += `\n*Total do Pedido:* R$ ${valorTotal}`;

    // URL usando o formato oficial wa.me perfeitamente interpolado
    const urlFormatada = "https://wa.me/" + numeroTelefone + "?text=" + encodeURIComponent(textoPedido)

    window.open(urlFormatada, '_blank', 'noopener,noreferrer');
  }; // <-- Essa chave fechando a função estava faltando!

  // Se o estado não for "aberto", o componente não renderiza nada na tela
  if (!isOpen) return null;

  return (
    <>
      {/* Fundo escurecido atrás da sacola para dar destaque */}
      <div className="fixed inset-0 z-45 bg-black/30 backdrop-blur-xs lg:hidden" onClick={onClose} />

      <aside className="fixed top-0 right-0 z-50 h-full w-full sm:w-96 border-l border-doceria-rosa-200 bg-white p-6 shadow-2xl flex flex-col justify-between">
        <div>
          {/* Cabeçalho do Carrinho */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span>🛒</span> Sua Sacola
            </h2>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 font-bold text-lg cursor-pointer">
              ✕
            </button>
          </div>

          {/* Carrinho Vazio */}
          {cartItems.length === 0 ? (
            <div className="mt-20 flex flex-col items-center text-center px-4">
              <span className="text-5xl mb-4">🛍️</span>
              <h3 className="font-bold text-gray-700">Sacola vazia</h3>
              <p className="text-xs text-gray-400 mt-1">Que tal adicionar alguns doces para adoçar o seu dia?</p>
            </div>
          ) : (
            /* Lista com rolagem caso tenha muitos itens */
            <div className="divide-y divide-pink-50 max-h-[60vh] overflow-y-auto pr-1 mt-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-3">
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
                    <button onClick={() => removeFromCart(item.id)} className="rounded-xl bg-red-50 p-1.5 text-xs text-red-500 hover:bg-red-100">🗑️</button>
                  </div>
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
