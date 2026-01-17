
import React, { useState, useEffect } from 'react';
import { CartItem } from '../types';
import { ChevronLeft, Lock, CreditCard, CheckCircle2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CheckoutPageProps {
  cart: CartItem[];
  total: number;
  onSuccess: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, total, onSuccess }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const shippingCost = total > 50 ? 0 : 5.95;
  const grandTotal = total + shippingCost;

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment gateway delay
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2500);
  };

  if (step === 3) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="container mx-auto px-6 py-24 text-center max-w-lg"
      >
        <div className="mb-8 inline-flex items-center justify-center w-24 h-24 bg-green-50 text-green-500 rounded-full">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="text-4xl font-serif font-bold mb-4">Payment Confirmed</h1>
        <p className="text-neutral-500 mb-12">Thank you for choosing MayGloss. Your order #MG-8829-10 is being prepared with care in our NYC studio.</p>
        <button 
          onClick={onSuccess}
          className="bg-neutral-900 text-white px-12 py-5 font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all"
        >
          Return Home
        </button>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Left: Form */}
        <div>
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-4xl font-serif font-bold tracking-tight">Checkout</h1>
            <div className="flex items-center space-x-4">
              <span className={`w-2 h-2 rounded-full ${step >= 1 ? 'bg-neutral-900' : 'bg-neutral-200'}`} />
              <div className="h-px w-6 bg-neutral-200" />
              <span className={`w-2 h-2 rounded-full ${step >= 2 ? 'bg-neutral-900' : 'bg-neutral-200'}`} />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-10"
              >
                <div className="space-y-6">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">01. Shipping Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Email Address</label>
                      <input type="email" placeholder="email@example.com" className="w-full border-b border-neutral-200 py-3 focus:border-neutral-900 outline-none transition-all placeholder:text-neutral-200 bg-transparent" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">First Name</label>
                      <input type="text" placeholder="Jane" className="w-full border-b border-neutral-200 py-3 outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Last Name</label>
                      <input type="text" placeholder="Doe" className="w-full border-b border-neutral-200 py-3 outline-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Address</label>
                    <input type="text" placeholder="123 Glossy Road" className="w-full border-b border-neutral-200 py-3 outline-none" />
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <input type="text" placeholder="City" className="border-b border-neutral-200 py-3 outline-none" />
                    <input type="text" placeholder="ZIP" className="border-b border-neutral-200 py-3 outline-none" />
                    <input type="text" placeholder="State" className="border-b border-neutral-200 py-3 outline-none" />
                  </div>
                </div>

                <button 
                  onClick={() => setStep(2)}
                  className="w-full bg-neutral-900 text-white py-6 font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all text-xs"
                >
                  Continue to Payment
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <button 
                  onClick={() => setStep(1)}
                  className="flex items-center text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors"
                >
                  <ChevronLeft className="w-3 h-3 mr-1" />
                  Back to Shipping
                </button>

                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">02. Secure Payment</h3>
                    <div className="flex space-x-3 opacity-30">
                      <CreditCard className="w-4 h-4" />
                      <Lock className="w-4 h-4" />
                    </div>
                  </div>
                  
                  <div className="p-8 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Card Number</label>
                      <input 
                        type="text" 
                        placeholder="0000 0000 0000 0000" 
                        className="w-full bg-transparent border-b border-neutral-200 py-3 outline-none text-lg tracking-[0.2em]" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Expiry</label>
                        <input type="text" placeholder="MM/YY" className="w-full bg-transparent border-b border-neutral-200 py-3 outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">CVC</label>
                        <input type="text" placeholder="123" className="w-full bg-transparent border-b border-neutral-200 py-3 outline-none" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-neutral-50 rounded-lg flex items-start space-x-4">
                  <Lock className="w-4 h-4 text-neutral-400 mt-0.5" />
                  <p className="text-[10px] text-neutral-400 leading-relaxed uppercase tracking-wider">
                    Encrypted with 256-bit SSL technology. Your payment details are never stored on our servers.
                  </p>
                </div>

                <button 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-neutral-900 text-white py-6 font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all flex items-center justify-center disabled:opacity-50 text-xs"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Complete Purchase — $${grandTotal.toFixed(2)}`
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Summary */}
        <div className="lg:sticky lg:top-32 h-fit">
          <div className="bg-neutral-50 p-10 border border-neutral-100 rounded-2xl">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-10 text-neutral-400">Order Summary</h2>
            <div className="space-y-8 mb-10 border-b border-neutral-200 pb-10">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-6">
                    <div className="relative w-16 h-20 bg-neutral-200 overflow-hidden rounded-md">
                      <img src={item.image} className="w-full h-full object-cover" />
                      <span className="absolute -top-1 -right-1 bg-neutral-900 text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest">{item.name}</p>
                      <p className="text-[10px] text-neutral-400 italic mt-1">{item.shade}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-5">
              <div className="flex justify-between text-[11px] uppercase tracking-widest">
                <span className="text-neutral-400">Subtotal</span>
                <span className="font-bold">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[11px] uppercase tracking-widest">
                <span className="text-neutral-400">Shipping</span>
                <span className="font-bold">{shippingCost === 0 ? 'COMPLIMENTARY' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-base border-t border-neutral-200 pt-6 mt-6">
                <span className="font-serif font-bold italic">Total</span>
                <span className="font-bold text-xl tracking-tight">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
