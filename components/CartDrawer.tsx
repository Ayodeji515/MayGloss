
import React from 'react';
import { X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  total: number;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen, onClose, items, onRemove, onUpdateQuantity, total, onCheckout
}) => {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] transition-transform duration-500 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex items-center justify-between border-b border-neutral-100">
          <h2 className="text-lg font-bold uppercase tracking-widest">Your Bag ({items.length})</h2>
          <button onClick={onClose} className="p-2 -mr-2 hover:bg-neutral-50 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-8 no-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-neutral-400 space-y-4">
              <ShoppingBagIcon className="w-16 h-16 opacity-20" />
              <p className="text-sm uppercase tracking-widest">Your bag is empty</p>
              <button onClick={onClose} className="text-neutral-900 underline text-sm font-bold uppercase tracking-wider">Start Shopping</button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex space-x-4">
                <div className="w-24 h-32 bg-neutral-100 rounded overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-sm uppercase tracking-tight">{item.name}</h3>
                      <button onClick={() => onRemove(item.id)} className="text-neutral-400 hover:text-rose-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">{item.shade}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-neutral-200 rounded-full px-2 py-1">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 hover:text-rose-500"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 hover:text-rose-500"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-neutral-100 bg-neutral-50/50 space-y-4">
            <div className="flex justify-between items-center text-sm uppercase tracking-widest text-neutral-500">
              <span>Subtotal</span>
              <span className="font-bold text-neutral-900">${total.toFixed(2)}</span>
            </div>
            <p className="text-[10px] text-neutral-400 uppercase tracking-widest">Shipping & taxes calculated at checkout</p>
            <button 
              onClick={onCheckout}
              className="w-full bg-neutral-900 text-white py-4 font-bold uppercase tracking-[0.2em] flex items-center justify-center group hover:bg-neutral-800 transition-colors"
            >
              Checkout
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const ShoppingBagIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);
