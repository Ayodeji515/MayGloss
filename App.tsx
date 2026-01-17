
import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductPage } from './pages/ProductPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CartDrawer } from './components/CartDrawer';
import { NotificationSystem } from './components/NotificationSystem';
import { AIAssistant } from './components/AIAssistant';
import { Page, Product, CartItem, Notification } from './types';
import { PRODUCTS } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('maygloss_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { id, message, type }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  useEffect(() => {
    localStorage.setItem('maygloss_cart', JSON.stringify(cart));
  }, [cart]);

  // Sync state with URL hash for basic routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash || hash === 'home') {
        setCurrentPage(Page.Home);
      } else if (hash === 'shop') {
        setCurrentPage(Page.Shop);
      } else if (hash.startsWith('product/')) {
        const id = hash.split('/')[1];
        setSelectedProductId(id);
        setCurrentPage(Page.Product);
      } else if (hash === 'checkout') {
        setCurrentPage(Page.Checkout);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page: Page, id?: string) => {
    if (page === Page.Product && id) {
      window.location.hash = `product/${id}`;
    } else {
      window.location.hash = page;
    }
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    addNotification(`${product.name} added to bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    const item = cart.find(i => i.id === id);
    if (item) addNotification(`Removed ${item.name} from bag`, 'info');
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = useMemo(() => 
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  , [cart]);

  const selectedProduct = useMemo(() => 
    PRODUCTS.find(p => p.id === selectedProductId)
  , [selectedProductId]);

  return (
    <div className="min-h-screen flex flex-col selection:bg-rose-100">
      <Header 
        cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
        navigate={navigate}
      />

      <main className="flex-grow pt-20">
        {currentPage === Page.Home && (
          <HomePage onShopNow={() => navigate(Page.Shop)} navigate={navigate} />
        )}
        {currentPage === Page.Shop && (
          <ShopPage onProductSelect={(id) => navigate(Page.Product, id)} />
        )}
        {currentPage === Page.Product && selectedProduct && (
          <ProductPage 
            product={selectedProduct} 
            onAddToCart={() => addToCart(selectedProduct)} 
          />
        )}
        {currentPage === Page.Checkout && (
          <CheckoutPage 
            cart={cart} 
            total={cartTotal} 
            onSuccess={() => {
              addNotification("Order placed successfully!", "success");
              setCart([]);
              navigate(Page.Home);
            }} 
          />
        )}
      </main>

      <Footer navigate={navigate} />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        total={cartTotal}
        onCheckout={() => {
          setIsCartOpen(false);
          navigate(Page.Checkout);
        }}
      />

      <NotificationSystem notifications={notifications} removeNotification={removeNotification} />
      <AIAssistant />
    </div>
  );
};

export default App;
