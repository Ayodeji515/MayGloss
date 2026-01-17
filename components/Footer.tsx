
import React, { useState } from 'react';
import { Page } from '../types';
import { STORE_INFO } from '../constants';

interface FooterProps {
  navigate: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // Notification is handled globally if we expose the state, 
      // but for simplicity we can dispatch a custom event or just assume App.tsx would handle it.
      // Here we'll rely on the parent component's notification system if we were passing it down,
      // but since we aren't, we'll trigger a window event that App.tsx can listen to if needed, 
      // or simply use a local alert for now as a placeholder for the notification.
      window.dispatchEvent(new CustomEvent('maygloss-notification', { 
        detail: { message: "Successfully subscribed! Check your inbox for 15% off.", type: 'success' } 
      }));
      setEmail('');
    }
  };

  return (
    <footer className="bg-neutral-900 text-white pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-serif font-bold mb-8 tracking-tighter">MAYGLOSS</h2>
            <p className="text-neutral-400 text-sm leading-loose uppercase tracking-wider mb-8">
              Redefining the standard of high-performance glosses. Clean, vegan, and undeniably radiant.
            </p>
            <div className="flex space-x-6 text-neutral-400">
              <a href="#" className="hover:text-white transition-colors uppercase tracking-widest text-[10px] font-bold">Instagram</a>
              <a href="#" className="hover:text-white transition-colors uppercase tracking-widest text-[10px] font-bold">TikTok</a>
              <a href="#" className="hover:text-white transition-colors uppercase tracking-widest text-[10px] font-bold">Pinterest</a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-8 text-neutral-500">Shop</h3>
            <ul className="space-y-4 text-sm text-neutral-300">
              <li><button onClick={() => navigate(Page.Shop)} className="hover:text-white transition-colors">Clear Glosses</button></li>
              <li><button onClick={() => navigate(Page.Shop)} className="hover:text-white transition-colors">Tinted Lustre</button></li>
              <li><button onClick={() => navigate(Page.Shop)} className="hover:text-white transition-colors">Sparkle Finish</button></li>
              <li><button onClick={() => navigate(Page.Shop)} className="hover:text-white transition-colors">Limited Editions</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-8 text-neutral-500">Care</h3>
            <ul className="space-y-4 text-sm text-neutral-300">
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ingredient Glossary</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shade Finder</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-8 text-neutral-500">Stay Glowing</h3>
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed">Join our mailing list for exclusive launches and 15% off your first order.</p>
            <form onSubmit={handleSubscribe} className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address" 
                className="w-full bg-transparent border-b border-neutral-700 py-3 text-sm outline-none focus:border-white transition-colors placeholder:text-neutral-600"
                required
              />
              <button type="submit" className="absolute right-0 bottom-3 text-xs font-bold uppercase tracking-widest hover:text-rose-300 transition-colors">Join</button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-[0.3em]">
            &copy; {new Date().getFullYear()} MAYGLOSS INC. ALL RIGHTS RESERVED.
          </div>
          <div className="flex space-x-12 text-[10px] text-neutral-500 font-bold uppercase tracking-[0.3em]">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>

        <div className="mt-12 text-center text-neutral-700 text-[10px] font-bold uppercase tracking-[0.5em] opacity-30">
          {STORE_INFO.address}
        </div>
      </div>
    </footer>
  );
};
