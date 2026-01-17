
import React, { useState } from 'react';
import { Product } from '../types';
import { ShieldCheck, Truck, RefreshCw, ChevronRight, Share2, Heart } from 'lucide-react';

interface ProductPageProps {
  product: Product;
  onAddToCart: () => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ product, onAddToCart }) => {
  const [activeTab, setActiveTab] = useState<'desc' | 'ingredients' | 'shipping'>('desc');

  return (
    <div className="container mx-auto px-6 py-12 animate-in fade-in duration-500">
      <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-12">
        <span>Home</span>
        <ChevronRight className="w-3 h-3" />
        <span>Shop All</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-neutral-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        {/* Left: Gallery */}
        <div className="grid grid-cols-1 gap-6">
          <div className="aspect-[4/5] overflow-hidden bg-neutral-100">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="aspect-square bg-neutral-100 overflow-hidden">
              <img src={`https://picsum.photos/800/800?random=${product.id}`} className="w-full h-full object-cover opacity-80" />
            </div>
            <div className="aspect-square bg-neutral-100 overflow-hidden">
              <img src={`https://picsum.photos/801/801?random=${product.id}`} className="w-full h-full object-cover opacity-80" />
            </div>
          </div>
        </div>

        {/* Right: Info */}
        <div className="sticky top-28">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-rose-400 text-xs font-bold uppercase tracking-[0.3em] mb-2 block">{product.category}</span>
              <h1 className="text-5xl font-serif font-bold mb-2">{product.name}</h1>
              <p className="text-xl italic text-neutral-500 font-light">{product.shade}</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 border border-neutral-100 rounded-full hover:bg-neutral-50 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 border border-neutral-100 rounded-full hover:bg-neutral-50 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-8">
            <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            <span className="bg-neutral-900 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">In Stock</span>
          </div>

          <div className="space-y-6 mb-12">
            <p className="text-neutral-600 leading-relaxed text-lg">
              {product.description}
            </p>
            
            <button 
              onClick={onAddToCart}
              className="w-full bg-neutral-900 text-white py-6 font-bold uppercase tracking-[0.3em] hover:bg-neutral-800 transition-all flex items-center justify-center group"
            >
              Add To Bag
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-t border-neutral-100">
            <div className="flex border-b border-neutral-100">
              <button 
                onClick={() => setActiveTab('desc')}
                className={`py-4 text-xs font-bold uppercase tracking-widest mr-8 border-b-2 transition-all ${activeTab === 'desc' ? 'border-neutral-900 text-neutral-900' : 'border-transparent text-neutral-400 hover:text-neutral-600'}`}
              >
                Details
              </button>
              <button 
                onClick={() => setActiveTab('ingredients')}
                className={`py-4 text-xs font-bold uppercase tracking-widest mr-8 border-b-2 transition-all ${activeTab === 'ingredients' ? 'border-neutral-900 text-neutral-900' : 'border-transparent text-neutral-400 hover:text-neutral-600'}`}
              >
                Ingredients
              </button>
              <button 
                onClick={() => setActiveTab('shipping')}
                className={`py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${activeTab === 'shipping' ? 'border-neutral-900 text-neutral-900' : 'border-transparent text-neutral-400 hover:text-neutral-600'}`}
              >
                Shipping
              </button>
            </div>
            
            <div className="py-8 animate-in fade-in slide-in-from-top-2 duration-300">
              {activeTab === 'desc' && (
                <ul className="space-y-4 text-sm text-neutral-600 list-disc pl-4">
                  <li>High-intensity pigment for rich color payoff</li>
                  <li>Infused with botanical oils for deep hydration</li>
                  <li>Sleek, ergonomic applicator for precise finish</li>
                  <li>Paraben-free and PETA certified cruelty-free</li>
                </ul>
              )}
              {activeTab === 'ingredients' && (
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map(ing => (
                    <span key={ing} className="bg-neutral-50 px-4 py-2 rounded text-xs font-medium text-neutral-600">
                      {ing}
                    </span>
                  ))}
                  <p className="text-[10px] text-neutral-400 mt-4 leading-relaxed uppercase tracking-wider italic">
                    Note: Our formula is regularly updated. Please refer to the packaging for the most accurate ingredient list.
                  </p>
                </div>
              )}
              {activeTab === 'shipping' && (
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Truck className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-sm mb-1 uppercase tracking-widest">Free Express Shipping</p>
                      <p className="text-xs text-neutral-500">On all orders over $50. Estimated delivery 2-4 business days.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <RefreshCw className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-sm mb-1 uppercase tracking-widest">Easy 30-Day Returns</p>
                      <p className="text-xs text-neutral-500">If you're not glowing, we're not happy. Free returns on all orders.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
