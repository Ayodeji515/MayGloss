
import React, { useState } from 'react';
import { CartItem } from '../types';
import { ChevronLeft, Lock, CreditCard, CheckCircle2 } from 'lucide-react';

interface CheckoutPageProps {
  cart: CartItem[];
  total: number;
  onSuccess: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, total, onSuccess }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const shippingCost = total > 50 ? 0 : 5.95;
  const grandTotal = total + shippingCost;

  if (step === 3) {
    return (
      <div className="container mx-auto px-6 py-24 text-center max-w-lg">
        <div className="mb-8 inline-flex items-center justify-center w-24 h-24 bg-green-50 text-green-500 rounded-full">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="text-4xl font-serif font-bold mb-4">Your Glow is On Its Way!</h1>
        <p className="text-neutral-500 mb-12">Order #MG-8829-10 is confirmed. You'll receive an email with tracking details shortly.</p>
        <button 
          onClick={onSuccess}
          className="bg-neutral-900 text-white px-12 py-5 font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Left: Form */}
        <div>
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-3xl font-serif font-bold">Checkout</h1>
            <div className="flex items-center space-x-4">
              <span className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-neutral-900' : 'bg-neutral-200'}`} />
              <div className="h-px w-8 bg-neutral-200" />
              <span className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-neutral-900' : 'bg-neutral-200'}`} />
            </div>
          </div>

          {step === 1 ? (
            <div className="space-y-12 animate-in fade-in slide-in-from-left-4 duration-500">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-6">Contact Information</h3>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full border-b border-neutral-200 py-4 focus:border-neutral-900 outline-none transition-all placeholder:text-neutral-300"
                />
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-6">Shipping Address</h3>
                <div className="grid grid-cols-2 gap-6">
                  <input type="text" placeholder="First Name" className="border-b border-neutral-200 py-4 outline-none" />
                  <input type="text" placeholder="Last Name" className="border-b border-neutral-200 py-4 outline-none" />
                </div>
                <input type="text" placeholder="Address" className="w-full border-b border-neutral-200 py-4 outline-none mt-4" />
                <div className="grid grid-cols-3 gap-6 mt-4">
                  <input type="text" placeholder="City" className="border-b border-neutral-200 py-4 outline-none" />
                  <input type="text" placeholder="ZIP Code" className="border-b border-neutral-200 py-4 outline-none" />
                  <input type="text" placeholder="State" className="border-b border-neutral-200 py-4 outline-none" />
                </div>
              </div>

              <button 
                onClick={() => setStep(2)}
                className="w-full bg-neutral-900 text-white py-5 font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all"
              >
                Continue to Payment
              </button>
            </div>
          ) : (
            <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
              <button 
                onClick={() => setStep(1)}
                className="flex items-center text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Shipping
              </button>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em]">Payment Method</h3>
                  <div className="flex space-x-2">
                    <CreditCard className="w-5 h-5 text-neutral-400" />
                    <Lock className="w-5 h-5 text-neutral-400" />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <input 
                    type="text" 
                    placeholder="Card Number" 
                    className="w-full border-b border-neutral-200 py-4 outline-none" 
                  />
                  <div className="grid grid-cols-2 gap-6">
                    <input type="text" placeholder="MM/YY" className="border-b border-neutral-200 py-4 outline-none" />
                    <input type="text" placeholder="CVV" className="border-b border-neutral-200 py-4 outline-none" />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-neutral-50 flex items-center space-x-4">
                <Lock className="w-5 h-5 text-neutral-400" />
                <p className="text-xs text-neutral-500">Your connection is encrypted and payment is processed securely. We never store your full card details.</p>
              </div>

              <button 
                onClick={() => setStep(3)}
                className="w-full bg-neutral-900 text-white py-5 font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all"
              >
                Pay ${grandTotal.toFixed(2)}
              </button>
            </div>
          )}
        </div>

        {/* Right: Summary */}
        <div className="lg:sticky lg:top-28">
          <div className="bg-neutral-50 p-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-8">Order Summary</h2>
            <div className="space-y-6 mb-8 border-b border-neutral-200 pb-8">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-20 bg-neutral-200 flex-shrink-0">
                      <img src={item.image} className="w-full h-full object-cover" />
                      <span className="absolute -top-2 -right-2 bg-neutral-900 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-tight">{item.name}</p>
                      <p className="text-xs text-neutral-400 italic">{item.shade}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500 uppercase tracking-widest">Subtotal</span>
                <span className="font-bold">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500 uppercase tracking-widest">Shipping</span>
                <span className="font-bold">{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-lg border-t border-neutral-200 pt-4">
                <span className="font-bold uppercase tracking-[0.2em]">Total</span>
                <span className="font-bold">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
