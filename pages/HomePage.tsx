
import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Page } from '../types';
import { PRODUCTS } from '../constants';
import { motion } from 'framer-motion';

interface HomePageProps {
  onShopNow: () => void;
  navigate: (page: Page, id?: string) => void;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

export const HomePage: React.FC<HomePageProps> = ({ onShopNow, navigate }) => {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1596462502278-27bfad4573a6?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
        
        <div className="container mx-auto px-6 relative z-10 text-white">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-7xl md:text-9xl font-serif font-bold mb-8 tracking-tighter leading-[0.85]"
            >
              The New <br /> <span className="italic font-light opacity-80">Radiance.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-lg md:text-xl font-light mb-12 text-white/90 max-w-md uppercase tracking-[0.2em] leading-relaxed"
            >
              Ultra-glossy hydration meets long-lasting wear. Discover the MayGloss formula.
            </motion.p>
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              onClick={onShopNow}
              className="inline-flex items-center px-12 py-6 bg-white text-neutral-900 font-bold uppercase tracking-[0.3em] text-xs hover:bg-neutral-100 transition-all group"
            >
              Shop Collection
              <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Reveal Collection */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8"
          >
            <div>
              <h2 className="text-5xl font-serif font-bold mb-4 italic">Editor's Picks</h2>
              <p className="text-neutral-400 uppercase tracking-[0.4em] text-[10px] font-bold">The essentials for every season</p>
            </div>
            <button 
              onClick={() => navigate(Page.Shop)}
              className="text-neutral-900 border-b-2 border-neutral-900 pb-1 font-bold uppercase tracking-[0.2em] text-[10px] flex items-center group"
            >
              Explore All
              <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {PRODUCTS.slice(0, 3).map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="group cursor-pointer"
                onClick={() => navigate(Page.Product, product.id)}
              >
                <div className="aspect-[3/4] overflow-hidden bg-neutral-100 mb-8 relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                  />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] shadow-sm">
                    Collection 01
                  </div>
                </div>
                <div className="flex justify-between items-start border-b border-neutral-100 pb-4">
                  <div>
                    <h3 className="font-bold uppercase tracking-[0.2em] text-xs mb-1.5">{product.name}</h3>
                    <p className="text-neutral-400 text-[10px] uppercase tracking-widest">{product.shade}</p>
                  </div>
                  <span className="font-serif italic text-xl">${product.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Statement */}
      <section className="bg-neutral-50 py-40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-tr-[120px] shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1599733589046-10c005739ef0?auto=format&fit=crop&q=80&w=1000" 
                  alt="Quality" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-xl"
            >
              <span className="text-rose-400 font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">The Philosophy</span>
              <h2 className="text-6xl font-serif font-bold mb-10 leading-tight">Comfort is the <br /> <span className="italic font-light">New Couture.</span></h2>
              <p className="text-neutral-500 leading-loose mb-12 text-lg uppercase tracking-wider">
                We've spent 24 months perfecting a formula that provides the shine of a mirror with the comfort of a balm. Infused with botanical extracts and high-potency hydration.
              </p>
              <button className="px-10 py-5 border border-neutral-900 text-xs font-bold uppercase tracking-[0.3em] hover:bg-neutral-900 hover:text-white transition-all">
                The Ingredients
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
