
import React from 'react';
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Liquid Crystal',
    price: 38,
    category: 'Clear',
    shade: 'Diamond Glass',
    description: 'A masterpiece of clarity. This non-migrating formula creates a high-gloss lens effect that magnifies the natural beauty of your lips with a mirror-like finish.',
    image: 'https://images.unsplash.com/photo-1586776977607-310e9c725c37?auto=format&fit=crop&q=80&w=800',
    ingredients: ['Medical-Grade Polymer', 'Vitamin E Acetate', 'Organic Virgin Coconut Nectar']
  },
  {
    id: '2',
    name: 'Petal Silk',
    price: 42,
    category: 'Tinted',
    shade: 'Morning Mauve',
    description: 'Inspired by the softest silk, this tint provides a wash of sophisticated rose-clay color while delivering clinical-grade hydration to the deeper layers of the dermis.',
    image: 'https://images.unsplash.com/photo-1599733589046-10c005739ef0?auto=format&fit=crop&q=80&w=800',
    ingredients: ['Wild African Shea', 'Israeli Cold-Pressed Jojoba', 'Damask Rose Absolute']
  },
  {
    id: '3',
    name: 'Stardust Veil',
    price: 45,
    category: 'Glitter',
    shade: 'Champagne Aura',
    description: 'Micro-milled ethically sourced pearls suspended in an ultra-hydrating gel. Reflects light from every angle for a sophisticated, multi-dimensional cosmic glow.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800',
    ingredients: ['Bismuth Oxychloride', 'Pure Squalane', 'Organic Aloe Vera Fillet']
  },
  {
    id: '4',
    name: 'Velvet Noir',
    price: 42,
    category: 'Tinted',
    shade: 'Vintage Garnet',
    description: 'A deep, rich pigment that evokes the glamour of old Hollywood. Buildable from a sheer bitten-lip stain to a powerful, glossy statement of elegance.',
    image: 'https://images.unsplash.com/photo-1625093742435-6fa192b6fb1a?auto=format&fit=crop&q=80&w=800',
    ingredients: ['Argan Kernal Extract', 'Purified Beeswax', 'Pomegranate Seed Oil']
  }
];

export const STORE_INFO = {
  name: 'MayGloss',
  address: 'Atelier MayGloss, 42 Mercer Street, Soho, New York, NY 10013',
  email: 'atelier@maygloss.com',
  phone: '+1 (212) 888-2022',
  social: {
    instagram: '@maygloss.atelier',
    tiktok: '@maygloss'
  }
};
