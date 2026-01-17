
import React, { useState } from 'react';
import { CartItem } from '../types';
import { ChevronLeft, Lock, CreditCard, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CheckoutPageProps {
  cart: CartItem[];
  total: number;
  onSuccess: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, total, onSuccess }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const shippingCost = total > 60 ? 0 : 8.00;
  const grandTotal = total + shippingCost;

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2800);
  };

  if (step === 3) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-6 py-32 text-center max-w-lg"
      >
        <div className="mb-10 inline-flex items-center justify-center w-20 h-20 bg-neutral-900 text-white rounded-full">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-5xl font-serif font-bold mb-6 italic">Confirmed.</h1>
        <p className="text-neutral-500 mb-12 uppercase tracking-[0.2em] text-xs leading-loose">
          Your order #MG-992-01 is being handcrafted in our New York studio. A confirmation email is on its way.
        </p>
        <button 
          onClick={onSuccess}
          className="w-full bg-neutral-900 text-white px-12 py-6 font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-neutral-800 transition-all"
        >
          Return to Atelier
        </button>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-20 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
        {/* Main Flow */}
        <div className="lg:col-span-7">
          <div className="mb-16">
            <h1 className="text-4xl font-serif font-bold mb-4 tracking-tight">Checkout</h1>
            <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-300">
              <span className={step >= 1 ? 'text-neutral-900' : ''}>Shipping</span>
              <span className="h-[1px] w-8 bg-neutral-100 mx-2" />
              <span className={step >= 2 ? 'text-neutral-900' : ''}>Payment</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-12"
              >
                <div className="grid grid-cols-1 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">Email Address</label>
                    <input type="email" placeholder="client@maygloss.com" className="w-full bg-neutral-50 border-none p-5 text-sm focus:ring-1 focus:ring-neutral-200 outline-none transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">First Name</label>
                      <input type="text" className="w-full bg-neutral-50 border-none p-5 text-sm" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">Last Name</label>
                      <input type="text" className="w-full bg-neutral-50 border-none p-5 text-sm" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">Mailing Address</label>
                    <input type="text" className="w-full bg-neutral-50 border-none p-5 text-sm" />
                  </div>
                </div>

                <button 
                  onClick={() => setStep(2)}
                  className="w-full bg-neutral-900 text-white py-7 font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-neutral-800 transition-all"
                >
                  Continue to Payment
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-12"
              >
                <button 
                  onClick={() => setStep(1)}
                  className="flex items-center text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 hover:text-neutral-900"
                >
                  <ChevronLeft className="w-3 h-3 mr-2" />
                  Shipping details
                </button>

                <div className="p-10 bg-neutral-50/50 border border-neutral-100 rounded-3xl space-y-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-900">Secure Payment</h3>
                    <div className="flex space-x-2">
                      <div className="w-8 h-5 bg-neutral-200 rounded-sm opacity-50" />
                      <div className="w-8 h-5 bg-neutral-200 rounded-sm opacity-50" />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">Card Number</label>
                      <div className="relative">
                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-white border-none p-5 text-sm tracking-[0.2em]" />
                        <CreditCard className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">Expiration</label>
                        <input type="text" placeholder="MM / YY" className="w-full bg-white border-none p-5 text-sm" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">CVC</label>
                        <input type="text" placeholder="123" className="w-full bg-white border-none p-5 text-sm" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-6 border border-neutral-100 rounded-2xl">
                  <ShieldCheck className="w-5 h-5 text-neutral-900" />
                  <p className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                    Authenticated via Secure Atomics™ — Your data is never cached or stored.
                  </p>
                </div>

                <button 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-neutral-900 text-white py-7 font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-neutral-800 transition-all flex items-center justify-center disabled:opacity-50"
                >
                  {isProcessing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    `Complete Transaction — $${grandTotal.toFixed(2)}`
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <div className="bg-neutral-50 rounded-[40px] p-12 border border-neutral-100">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-12 text-neutral-400">Bag Summary</h2>
            <div className="space-y-10 mb-12 border-b border-neutral-100 pb-12">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center group">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-20 bg-neutral-100 overflow-hidden rounded-xl">
                      <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em]">{item.name}</p>
                      <p className="text-[9px] text-neutral-400 italic mt-1">{item.shade} (x{item.quantity})</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                <span className="text-neutral-400">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                <span className="text-neutral-400">White Glove Delivery</span>
                <span>{shippingCost === 0 ? 'Complimentary' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="pt-8 mt-8 border-t border-neutral-200 flex justify-between items-center">
                <span className="font-serif font-bold text-2xl italic tracking-tight">Total</span>
                <span className="font-bold text-3xl tracking-tighter">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
