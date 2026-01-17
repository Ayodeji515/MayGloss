
import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Page } from '../types';
import { PRODUCTS } from '../constants';

interface HomePageProps {
  onShopNow: () => void;
  navigate: (page: Page, id?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onShopNow, navigate }) => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1596462502278-27bfad4573a6?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-white">
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-8xl font-serif font-bold mb-6 tracking-tight leading-[0.9]">
              The Ultimate <br /> <span className="italic font-light">Glow Up.</span>
            </h1>
            <p className="text-lg md:text-xl font-light mb-10 text-white/90 max-w-md uppercase tracking-wider leading-relaxed">
              Experience luxurious, non-sticky hydration with the signature MayGloss shine.
            </p>
            <button 
              onClick={onShopNow}
              className="inline-flex items-center px-10 py-5 bg-white text-neutral-900 font-bold uppercase tracking-[0.2em] text-sm hover:bg-neutral-100 transition-all group"
            >
              Shop The Collection
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Floating badge */}
        <div className="absolute bottom-10 right-10 hidden md:block">
          <div className="w-32 h-32 bg-rose-200/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center p-4 text-center">
            <p className="text-[10px] text-white font-bold uppercase tracking-widest">Vegan & Cruelty Free</p>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-4">New Arrivals</h2>
              <p className="text-neutral-500 uppercase tracking-widest text-xs">Curated for your best look</p>
            </div>
            <button 
              onClick={() => navigate(Page.Shop)}
              className="text-neutral-900 border-b-2 border-neutral-900 pb-1 font-bold uppercase tracking-[0.2em] text-sm flex items-center group"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {PRODUCTS.slice(0, 3).map((product) => (
              <div 
                key={product.id} 
                className="group cursor-pointer"
                onClick={() => navigate(Page.Product, product.id)}
              >
                <div className="aspect-[3/4] overflow-hidden bg-neutral-100 mb-6 relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                    Best Seller
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold uppercase tracking-widest text-sm mb-1">{product.name}</h3>
                    <p className="text-neutral-500 text-xs italic">{product.shade}</p>
                  </div>
                  <span className="font-bold text-lg">${product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Ethos */}
      <section className="bg-neutral-50 py-32 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-tl-[100px]">
                <img 
                  src="https://images.unsplash.com/photo-1599733589046-10c005739ef0?auto=format&fit=crop&q=80&w=1000" 
                  alt="Process" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-rose-50 border-4 border-white hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1586776977607-310e9c725c37?auto=format&fit=crop&q=80&w=600" 
                  alt="Close up" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="max-w-xl">
              <span className="text-rose-400 font-bold uppercase tracking-[0.3em] text-xs mb-6 block">Our Secret Sauce</span>
              <h2 className="text-5xl md:text-6xl font-serif font-bold mb-8 leading-tight">Formula that loves your lips.</h2>
              <p className="text-neutral-600 leading-relaxed mb-10 text-lg">
                At MayGloss, we believe you shouldn't have to choose between high shine and high comfort. Our innovative formula is infused with hyaluronic acid and vitamin E, providing intense moisture that lasts all day without the stickiness.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="flex space-x-1 mb-2">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-rose-300 text-rose-300" />)}
                  </div>
                  <p className="font-bold text-sm mb-1">100k+ Happy Lips</p>
                  <p className="text-xs text-neutral-400">Join our growing community</p>
                </div>
                <div>
                  <div className="flex space-x-1 mb-2">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-rose-300 text-rose-300" />)}
                  </div>
                  <p className="font-bold text-sm mb-1">Dermatologist Tested</p>
                  <p className="text-xs text-neutral-400">Safe for sensitive skin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Banner */}
      <section className="py-24 text-center">
        <h2 className="text-2xl font-serif italic mb-4">Follow the Glow</h2>
        <a href="#" className="text-4xl font-serif font-bold hover:text-rose-400 transition-colors">@MAYGLOSS_BEAUTY</a>
        <div className="grid grid-cols-2 md:grid-cols-4 mt-16 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="aspect-square bg-neutral-100 overflow-hidden">
              <img 
                src={`https://picsum.photos/800/800?random=${i + 10}`} 
                alt="Social item" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
