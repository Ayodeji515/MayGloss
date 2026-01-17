
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { Page } from '../types';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  navigate: (page: Page) => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick, navigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-neutral-100 py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden p-2 -ml-2 text-neutral-800"
        >
          <Menu className="w-6 h-6" />
        </button>

        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium uppercase tracking-widest text-neutral-600">
          <button onClick={() => navigate(Page.Shop)} className="hover:text-neutral-900 transition-colors">Shop All</button>
          <button onClick={() => navigate(Page.Home)} className="hover:text-neutral-900 transition-colors">About</button>
          <button onClick={() => navigate(Page.Home)} className="hover:text-neutral-900 transition-colors">Collections</button>
        </nav>

        <button 
          onClick={() => navigate(Page.Home)}
          className="text-2xl font-serif font-bold tracking-tighter hover:opacity-80 transition-opacity"
        >
          MAYGLOSS
        </button>

        <div className="flex items-center space-x-6">
          <button className="hidden sm:block text-neutral-600 hover:text-neutral-900 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button 
            onClick={onCartClick}
            className="flex items-center space-x-1 group"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-neutral-800 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider text-neutral-800">Bag</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white z-[60] transition-transform duration-500 lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-12">
            <span className="font-serif font-bold text-xl">MAYGLOSS</span>
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X className="w-8 h-8" />
            </button>
          </div>
          <div className="flex flex-col space-y-8 text-2xl font-light">
            <button onClick={() => { navigate(Page.Shop); setIsMobileMenuOpen(false); }} className="text-left border-b border-neutral-100 pb-4">Shop All</button>
            <button onClick={() => { navigate(Page.Home); setIsMobileMenuOpen(false); }} className="text-left border-b border-neutral-100 pb-4">Collections</button>
            <button onClick={() => { navigate(Page.Home); setIsMobileMenuOpen(false); }} className="text-left border-b border-neutral-100 pb-4">About Us</button>
            <button onClick={() => { navigate(Page.Home); setIsMobileMenuOpen(false); }} className="text-left border-b border-neutral-100 pb-4">Contact</button>
          </div>
        </div>
      </div>
    </header>
  );
};
