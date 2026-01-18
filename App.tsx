
import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { ShopPage } from './pages/ShopPage.tsx';
import { ProductPage } from './pages/ProductPage.tsx';
import { CheckoutPage } from './pages/CheckoutPage.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { NotificationSystem } from './components/NotificationSystem.tsx';
// Fix: Import AIAssistant component
import { AIAssistant } from './components/AIAssistant.tsx';
import { Page, Product, CartItem, Notification } from './types.ts';
import { PRODUCTS } from './constants.tsx';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('maygloss_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
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
    const handleGlobalNotif = (e: any) => {
      if (e.detail) {
        addNotification(e.detail.message, e.detail.type);
      }
    };
    window.addEventListener('maygloss-notification', handleGlobalNotif);
    return () => window.removeEventListener('maygloss-notification', handleGlobalNotif);
  }, []);

  useEffect(() => {
    localStorage.setItem('maygloss_cart', JSON.stringify(cart));
  }, [cart]);

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
    window.scrollTo(0, 0);
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
    <div className="min-h-screen flex flex-col bg-mauve-50">
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

      {/* Fix: Render AIAssistant component */}
      <AIAssistant />
      <NotificationSystem notifications={notifications} removeNotification={removeNotification} />
    </div>
  );
};

export default App;
