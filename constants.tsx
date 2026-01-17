
import React from 'react';
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Crystal Dew',
    price: 24,
    category: 'Clear',
    shade: 'Transparent',
    description: 'A non-sticky, high-shine clear gloss that delivers a glass-like finish.',
    image: 'https://images.unsplash.com/photo-1586776977607-310e9c725c37?auto=format&fit=crop&q=80&w=800',
    ingredients: ['Hyaluronic Acid', 'Vitamin E', 'Coconut Oil']
  },
  {
    id: '2',
    name: 'Rose Quartz',
    price: 26,
    category: 'Tinted',
    shade: 'Soft Pink',
    description: 'A delicate pink tint with nourishing botanicals for everyday elegance.',
    image: 'https://images.unsplash.com/photo-1599733589046-10c005739ef0?auto=format&fit=crop&q=80&w=800',
    ingredients: ['Shea Butter', 'Jojoba Oil', 'Peppermint Extract']
  },
  {
    id: '3',
    name: 'Starlight Shimmer',
    price: 28,
    category: 'Glitter',
    shade: 'Iridescent Gold',
    description: 'Multidimensional pearls that catch the light from every angle.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800',
    ingredients: ['Mica', 'Sunflower Seed Oil', 'Aloe Vera']
  },
  {
    id: '4',
    name: 'Ruby Velvet',
    price: 26,
    category: 'Tinted',
    shade: 'Deep Crimson',
    description: 'Bold pigmentation meets moisturizing gloss for a powerful statement.',
    image: 'https://images.unsplash.com/photo-1625093742435-6fa192b6fb1a?auto=format&fit=crop&q=80&w=800',
    ingredients: ['Argan Oil', 'Beeswax', 'Red Berry Extract']
  },
  {
    id: '5',
    name: 'Peach Sorbet',
    price: 24,
    category: 'Plumping',
    shade: 'Warm Coral',
    description: 'Gently plumps lips while providing a juicy coral sheen.',
    image: 'https://images.unsplash.com/photo-1617348981459-715783321523?auto=format&fit=crop&q=80&w=800',
    ingredients: ['Capsicum Extract', 'Collagen', 'Avocado Oil']
  },
  {
    id: '6',
    name: 'Midnight Mauve',
    price: 28,
    category: 'Tinted',
    shade: 'Dusty Rose',
    description: 'A sophisticated mauve that complements any skin tone.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfad4573a6?auto=format&fit=crop&q=80&w=800',
    ingredients: ['Squalane', 'Vitamin C', 'Grapeseed Oil']
  }
];

export const STORE_INFO = {
  name: 'MayGloss',
  address: '122 Glossy Ave, Suite 400, New York, NY 10012',
  email: 'hello@maygloss.com',
  phone: '+1 (555) 012-3456',
  social: {
    instagram: '@maygloss_beauty',
    tiktok: '@maygloss'
  }
};
