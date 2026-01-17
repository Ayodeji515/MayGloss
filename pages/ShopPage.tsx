
import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../constants';
import { Filter, SlidersHorizontal } from 'lucide-react';

interface ShopPageProps {
  onProductSelect: (id: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onProductSelect }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'Clear', 'Tinted', 'Glitter', 'Plumping'];

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="container mx-auto px-6 py-12 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-neutral-100 pb-12 gap-8">
        <div>
          <h1 className="text-5xl font-serif font-bold mb-4 tracking-tight">The Gloss Collection</h1>
          <p className="text-neutral-500 max-w-md uppercase tracking-widest text-xs leading-loose">
            From glass-like clarity to multidimensional shimmers, find the perfect finish for your mood.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all border ${
                activeCategory === cat 
                  ? 'bg-neutral-900 text-white border-neutral-900' 
                  : 'bg-transparent text-neutral-400 border-neutral-200 hover:border-neutral-900 hover:text-neutral-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <span className="text-sm font-bold uppercase tracking-widest text-neutral-400">Showing {filteredProducts.length} items</span>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Sort By</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="group cursor-pointer"
            onClick={() => onProductSelect(product.id)}
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-6">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
              <button className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] bg-white/90 backdrop-blur text-neutral-900 py-3 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                View Details
              </button>
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm uppercase tracking-widest">{product.name}</h3>
                <span className="font-bold text-lg">${product.price}</span>
              </div>
              <p className="text-neutral-500 text-xs italic">{product.shade}</p>
              <div className="flex space-x-2 mt-4">
                {product.ingredients.slice(0, 2).map(ing => (
                  <span key={ing} className="text-[10px] text-neutral-400 border border-neutral-200 px-2 py-1 uppercase tracking-tighter">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
