
import React from 'react';
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Glaze Essence',
    price: 32,
    category: 'Clear',
    shade: 'Glassine',
    description: 'A revolutionary non-sticky formula that provides a high-refractive index finish, mimicking the clarity of fresh dew.',
    image: 'https://images.unsplash.com/photo-1586776977607-310e9c725c37?auto=format&fit=crop&q=80&w=800',
    ingredients: ['Low-Molecular Hyaluronic Acid', 'Vitamin E Acetate', 'Organic Cold-Pressed Coconut Oil']
  },
  {
    id: '2',
    name: 'Velvet Petal',
    price: 34,
    category: 'Tinted',
    shade: 'Soft Mauve',
    description: 'A sophisticated dusty rose tint that enhances your natural lip tone while providing 12-hour hydration.',
    image: 'https://images.unsplash.com/photo-1599733589046-10c005739ef0?auto=format&fit=crop&q=80&w=800',
    ingredients: ['African Shea Butter', 'Israeli Jojoba Oil', 'Organic Peppermint Oil']
  },
  {
    id: '3',
    name: 'Astral Glow',
    price: 38,
    category: 'Glitter',
    shade: 'Champagne Shimmer',
    description: 'Infused with ethically sourced micro-pearls for a multidimensional, cosmic shine that stays comfortable all day.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800',
    ingredients: ['Reflective Mica', 'Sunflower Seed Emollients', 'Organic Aloe Leaf Extract']
  },
  {
    id: '4',
    name: 'Royal Crimson',
    price: 34,
    category: 'Tinted',
    shade: 'Deep Garnet',
    description: 'A rich, buildable red that transitions perfectly from a soft stain to a bold, glossy statement.',
    image: 'https://images.unsplash.com/photo-1625093742435-6fa192b6fb1a?auto=format&fit=crop&q=80&w=800',
    ingredients: ['Moroccan Argan Oil', 'Natural Beeswax', 'Anthocyanin-Rich Berry Extract']
  }
];

export const STORE_INFO = {
  name: 'MayGloss',
  address: '122 Glossy Ave, Suite 400, New York, NY 10012',
  email: 'concierge@maygloss.com',
  phone: '+1 (212) 555-0982',
  social: {
    instagram: '@maygloss.official',
    tiktok: '@maygloss'
  }
};
