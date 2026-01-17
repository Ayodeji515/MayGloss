import React from 'react';
import { ArrowRight, Star, Quote } from 'lucide-react';
import { Page } from '../types.ts';
import { PRODUCTS } from '../constants.tsx';
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
    <div className="overflow-x-hidden bg-mauve-50">
      {/* Hero Section */}
      <section className="relative h-[100vh] flex items-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1596462502278-27bfad4573a6?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-mauve-900/40 to-transparent" />
        </motion.div>
        
        <div className="container mx-auto px-6 relative z-10 text-white">
          <div className="max-w-4xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="inline-block text-[10px] font-bold uppercase tracking-[0.5em] mb-6 text-mauve-100"
            >
              Autumn Winter '24
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="text-7xl md:text-[11rem] font-serif font-bold mb-10 tracking-tighter leading-[0.8] mix-blend-plus-lighter"
            >
              The New <br /> <span className="italic font-light opacity-90 font-serif">Aura.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-lg md:text-xl font-light mb-14 text-white/90 max-w-md uppercase tracking-[0.3em] leading-relaxed"
            >
              Lightweight textures. Heavyweight radiance. Discover the Atelier secret.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center space-x-8"
            >
              <button 
                onClick={onShopNow}
                className="inline-flex items-center px-14 py-7 bg-white text-neutral-900 font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-mauve-200 transition-all group"
              >
                Shop Collection
                <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="hidden md:block text-white border-b border-white/30 pb-1 text-[10px] font-bold uppercase tracking-[0.3em] hover:border-white transition-all">
                The Film
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy / Intro */}
      <section className="py-40 bg-white">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Quote className="w-12 h-12 text-mauve-200 mx-auto mb-10 opacity-50" />
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-12 leading-tight">
              "We didn't just create a gloss. We created a <span className="italic font-light text-mauve-500">moment of luxury</span> that lasts all day."
            </h2>
            <p className="text-neutral-400 uppercase tracking-[0.4em] text-[10px] font-bold">
              — ELARA MAY, FOUNDER
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Collection Grid */}
      <section className="pb-32 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8"
          >
            <div>
              <span className="text-mauve-400 font-bold uppercase tracking-[0.5em] text-[9px] mb-4 block">Selected Works</span>
              <h2 className="text-5xl font-serif font-bold italic">Atelier Picks</h2>
            </div>
            <button 
              onClick={() => navigate(Page.Shop)}
              className="text-neutral-900 border-b border-neutral-200 pb-1 font-bold uppercase tracking-[0.2em] text-[10px] flex items-center group hover:border-neutral-900 transition-all"
            >
              View Full Catalog
              <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
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
                <div className="aspect-[4/5] overflow-hidden bg-mauve-50 mb-8 relative rounded-sm">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
                  />
                  <div className="absolute inset-0 bg-mauve-900/0 group-hover:bg-mauve-900/5 transition-colors duration-700" />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-5 py-2 text-[8px] font-bold uppercase tracking-[0.3em] shadow-sm">
                    Series 0{idx + 1}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold uppercase tracking-[0.2em] text-[11px] group-hover:text-mauve-600 transition-colors">{product.name}</h3>
                    <span className="font-serif italic text-lg text-neutral-400">${product.price}</span>
                  </div>
                  <p className="text-neutral-400 text-[10px] uppercase tracking-widest">{product.shade}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Split Statement */}
      <section className="bg-mauve-100 py-40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="relative order-2 lg:order-1"
            >
              <div className="aspect-[3/4] overflow-hidden shadow-[40px_-40px_0px_0px_rgba(242,225,219,1)]">
                <img 
                  src="https://images.unsplash.com/photo-1599733589046-10c005739ef0?auto=format&fit=crop&q=80&w=1000" 
                  alt="Texture Detail" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="max-w-xl order-1 lg:order-2"
            >
              <span className="text-mauve-600 font-bold uppercase tracking-[0.4em] text-[9px] mb-10 block">The Formulation</span>
              <h2 className="text-5xl md:text-7xl font-serif font-bold mb-10 leading-[0.95]">Clean Beauty. <br /> <span className="italic font-light">Elevated.</span></h2>
              <p className="text-neutral-500 leading-relaxed mb-12 text-sm md:text-base uppercase tracking-widest">
                Our proprietary hydration matrix binds moisture to the lip surface for up to 12 hours. Paraben-free, cruelty-free, and crafted with rare botanical extracts in small batches.
              </p>
              <div className="flex flex-col space-y-6">
                <button className="w-fit px-12 py-5 bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-mauve-900 transition-all">
                  The Ingredients
                </button>
                <p className="text-[10px] text-mauve-400 font-bold uppercase tracking-[0.2em]">Crafted in New York, NY.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};