import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { Page, Product } from '../types.ts';
import { PRODUCTS } from '../constants.tsx';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  navigate: (page: Page, id?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick, navigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const filtered = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.shade.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  const handleProductClick = (id: string) => {
    navigate(Page.Product, id);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-mauve-100 py-3 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center lg:w-1/3">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-neutral-800"
            >
              <Menu className="w-5 h-5" />
            </button>

            <nav className="hidden lg:flex items-center space-x-10 text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500">
              <button onClick={() => navigate(Page.Shop)} className="hover:text-neutral-900 transition-colors">Shop</button>
              <button onClick={() => navigate(Page.Home)} className="hover:text-neutral-900 transition-colors">About</button>
              <button onClick={() => navigate(Page.Home)} className="hover:text-neutral-900 transition-colors">Atelier</button>
            </nav>
          </div>

          <button 
            onClick={() => navigate(Page.Home)}
            className={`text-xl md:text-2xl font-serif font-bold tracking-tighter transition-all duration-500 lg:w-1/3 text-center ${isScrolled ? 'text-neutral-900' : 'text-neutral-800'}`}
          >
            MAYGLOSS
          </button>

          <div className="flex items-center justify-end space-x-6 lg:w-1/3">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:block text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
            <button 
              onClick={onCartClick}
              className="flex items-center space-x-2 group"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-neutral-800 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-mauve-600 text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-800">Bag</span>
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        <div className={`absolute inset-0 bg-white z-[60] transition-all duration-500 transform flex items-center ${isSearchOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
          <div className="container mx-auto px-6 flex items-center">
            <Search className="w-5 h-5 text-neutral-300" />
            <input 
              ref={searchInputRef}
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search shades..."
              className="flex-grow bg-transparent border-none outline-none px-6 py-4 text-lg font-light placeholder:text-neutral-200"
            />
            <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} className="p-2">
              <X className="w-5 h-5 text-neutral-800" />
            </button>
          </div>

          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border-t border-neutral-50 shadow-2xl max-h-[60vh] overflow-y-auto no-scrollbar">
              <div className="container mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                  {suggestions.map((p) => (
                    <div 
                      key={p.id} 
                      onClick={() => handleProductClick(p.id)}
                      className="group cursor-pointer flex items-center space-x-5"
                    >
                      <div className="w-16 h-20 bg-mauve-50 flex-shrink-0 overflow-hidden">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest">{p.name}</h4>
                        <p className="text-[9px] text-neutral-400 mt-1">{p.shade}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Sidebar Menu */}
        <div className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[70] transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)} />
        <div className={`fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white z-[71] transition-transform duration-500 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-8 flex flex-col h-full">
            <div className="flex justify-between items-center mb-16">
              <span className="font-serif font-bold text-xl">MAYGLOSS</span>
              <button onClick={() => setIsMobileMenuOpen(false)}><X className="w-6 h-6" /></button>
            </div>
            <div className="flex flex-col space-y-10 text-xl font-serif">
              <button onClick={() => { navigate(Page.Shop); setIsMobileMenuOpen(false); }} className="text-left border-b border-mauve-50 pb-5">Shop All</button>
              <button onClick={() => { navigate(Page.Home); setIsMobileMenuOpen(false); }} className="text-left border-b border-mauve-50 pb-5">Collections</button>
              <button onClick={() => { navigate(Page.Home); setIsMobileMenuOpen(false); }} className="text-left border-b border-mauve-50 pb-5">Our Story</button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};