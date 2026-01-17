
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'Clear' | 'Tinted' | 'Glitter' | 'Plumping';
  image: string;
  ingredients: string[];
  shade: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CheckoutDetails {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export enum Page {
  Home = 'home',
  Shop = 'shop',
  Product = 'product',
  Cart = 'cart',
  Checkout = 'checkout'
}
