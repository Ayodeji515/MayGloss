
import React, { useState } from 'react';
import { CartItem } from '../types';
import { ChevronLeft, Lock, CreditCard, CheckCircle2, Loader2, ShieldCheck, MapPin } from 'lucide-react';
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
    }, 3000);
  };

  if (step === 3) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="container mx-auto px-6 py-32 text-center max-w-xl"
      >
        <div className="mb-12 inline-flex items-center justify-center w-24 h-24 bg-neutral-900 text-white rounded-full">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="text-6xl font-serif font-bold mb-6 tracking-tighter italic">Thank You.</h1>
        <p className="text-neutral-500 mb-12 uppercase tracking-[0.3em] text-[11px] leading-loose">
          Your MayGloss order #MG-8821 is being prepared in our NYC Atelier. <br />
          Expect a confirmation in your inbox momentarily.
        </p>
        <button 
          onClick={onSuccess}
          className="w-full max-w-xs bg-neutral-900 text-white px-12 py-6 font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-neutral-800 transition-all shadow-2xl"
        >
          Return to Studio
        </button>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-20 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
        {/* Left Side: Forms */}
        <div className="lg:col-span-7">
          <div className="mb-16">
            <h1 className="text-5xl font-serif font-bold mb-4 tracking-tight">Checkout</h1>
            <div className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-300">
              <span className={step >= 1 ? 'text-neutral-900' : ''}>01. Shipping</span>
              <span className="h-[1px] w-8 bg-neutral-100" />
              <span className={step >= 2 ? 'text-neutral-900' : ''}>02. Payment</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div className="space-y-10">
                  <div className="group space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 group-focus-within:text-neutral-900 transition-colors">Email Recipient</label>
                    <input type="email" placeholder="concierge@example.com" className="w-full bg-transparent border-b border-neutral-200 py-4 text-sm focus:border-neutral-900 outline-none transition-all" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">First Name</label>
                      <input type="text" className="w-full bg-transparent border-b border-neutral-200 py-4 text-sm outline-none" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">Last Name</label>
                      <input type="text" className="w-full bg-transparent border-b border-neutral-200 py-4 text-sm outline-none" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">Shipping Address</label>
                    <div className="relative">
                      <input type="text" placeholder="Street name and number" className="w-full bg-transparent border-b border-neutral-200 py-4 text-sm outline-none" />
                      <MapPin className="absolute right-0 top-4 w-4 h-4 text-neutral-300" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-10">
                    <input type="text" placeholder="City" className="bg-transparent border-b border-neutral-200 py-4 text-sm outline-none" />
                    <input type="text" placeholder="Postal Code" className="bg-transparent border-b border-neutral-200 py-4 text-sm outline-none" />
                    <input type="text" placeholder="Country" className="bg-transparent border-b border-neutral-200 py-4 text-sm outline-none" />
                  </div>
                </div>

                <button 
                  onClick={() => setStep(2)}
                  className="w-full bg-neutral-900 text-white py-8 font-bold uppercase tracking-[0.5em] text-[11px] hover:bg-neutral-800 transition-all shadow-xl"
                >
                  Confirm & Proceed
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <button 
                  onClick={() => setStep(1)}
                  className="flex items-center text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 hover:text-neutral-900 group"
                >
                  <ChevronLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Modify Shipping
                </button>

                <div className="p-12 bg-mauve-50/50 rounded-[40px] border border-mauve-100 space-y-10">
                  <div className="flex justify-between items-center">
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-neutral-900">Vault Secure Payment</h3>
                    <div className="flex space-x-3 grayscale opacity-40">
                      <CreditCard className="w-5 h-5" />
                      <Lock className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">Cardholder Name</label>
                      <input type="text" placeholder="JANE DOE" className="w-full bg-white border border-neutral-100 p-6 text-sm tracking-widest outline-none focus:border-neutral-900" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">Card Details</label>
                      <div className="relative">
                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-white border border-neutral-100 p-6 text-sm tracking-[0.3em] outline-none" />
                        <CreditCard className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-300" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-10">
                      <input type="text" placeholder="MM / YY" className="w-full bg-white border border-neutral-100 p-6 text-sm outline-none" />
                      <input type="text" placeholder="CVC" className="w-full bg-white border border-neutral-100 p-6 text-sm outline-none" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-5 p-8 border border-neutral-100 rounded-3xl bg-neutral-50/30">
                  <ShieldCheck className="w-6 h-6 text-neutral-900" />
                  <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold leading-relaxed">
                    Transactions are encrypted with RSA-4096. <br />
                    MayGloss Atelier does not store sensitive card data.
                  </p>
                </div>

                <button 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-neutral-900 text-white py-8 font-bold uppercase tracking-[0.5em] text-[11px] hover:bg-neutral-800 transition-all flex items-center justify-center disabled:opacity-50 shadow-2xl"
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <Loader2 className="w-4 h-4 mr-3 animate-spin" />
                      Authenticating...
                    </div>
                  ) : (
                    `Purchase — $${grandTotal.toFixed(2)}`
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Sidebar */}
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <div className="bg-neutral-50/50 rounded-[50px] p-12 border border-neutral-100 shadow-sm">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.5em] mb-12 text-neutral-400">Review Selection</h2>
            <div className="space-y-12 mb-12 border-b border-neutral-200 pb-12">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center group">
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-24 bg-white overflow-hidden rounded-2xl shadow-sm">
                      <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.3em]">{item.name}</p>
                      <p className="text-[10px] text-neutral-400 italic mt-1.5">{item.shade} (x{item.quantity})</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold tracking-tighter">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                <span className="text-neutral-400">Merchandise Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                <span className="text-neutral-400">Atelier Shipping</span>
                <span className="text-rose-400">{shippingCost === 0 ? 'COMPLIMENTARY' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="pt-10 mt-10 border-t border-neutral-200 flex justify-between items-center">
                <span className="font-serif font-bold text-3xl italic tracking-tighter">Total Due</span>
                <span className="font-bold text-4xl tracking-tighter">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
