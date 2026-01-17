
import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { Page, Product } from '../types';
import { PRODUCTS } from '../constants';

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
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const filtered = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:block text-neutral-600 hover:text-neutral-900 transition-colors"
            >
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

        {/* Desktop Search Overlay */}
        <div className={`absolute inset-0 bg-white z-[60] transition-all duration-300 transform flex items-center ${isSearchOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
          <div className="container mx-auto px-6 flex items-center">
            <Search className="w-6 h-6 text-neutral-400" />
            <input 
              ref={searchInputRef}
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for shades, textures, or products..."
              className="flex-grow bg-transparent border-none outline-none px-6 py-4 text-xl font-light placeholder:text-neutral-200"
            />
            <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} className="p-2">
              <X className="w-6 h-6 text-neutral-800" />
            </button>
          </div>

          {/* Search Suggestions */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border-t border-neutral-100 shadow-2xl max-h-[70vh] overflow-y-auto no-scrollbar">
              <div className="container mx-auto px-6 py-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-6">Suggested Results</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {suggestions.map((p) => (
                    <div 
                      key={p.id} 
                      onClick={() => handleProductClick(p.id)}
                      className="group cursor-pointer flex items-center space-x-4 p-2 hover:bg-neutral-50 transition-colors"
                    >
                      <div className="w-16 h-20 bg-neutral-100 flex-shrink-0 overflow-hidden">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest">{p.name}</h4>
                        <p className="text-[10px] text-neutral-400 italic mt-1">{p.shade}</p>
                        <p className="text-xs font-bold mt-1">${p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {searchQuery.length > 1 && suggestions.length === 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border-t border-neutral-100 py-12 text-center text-neutral-400 uppercase tracking-widest text-xs">
              No products found for "{searchQuery}"
            </div>
          )}
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
    </>
  );
};
