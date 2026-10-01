import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchBar } from './components/SearchBar';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { NewArrivalsPage } from './pages/NewArrivalsPage';
import { OffersPage } from './pages/OffersPage';
import { CoupleCustomPage } from './pages/CoupleCustomPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { useCart } from './context/CartContext';
import { Sparkles, CheckCircle2 } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { toastMessage } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#24160F] antialiased">
      <ScrollToTop />
      
      {/* Global Header */}
      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Routed Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* Women and Subcategories */}
          <Route path="/women" element={<CategoryPage forcedCategory="Women" />} />
          <Route path="/women/:subcategory" element={<CategoryPage forcedCategory="Women" />} />
          
          {/* Men and Subcategories */}
          <Route path="/men" element={<CategoryPage forcedCategory="Men" />} />
          <Route path="/men/:subcategory" element={<CategoryPage forcedCategory="Men" />} />
          
          {/* Kids and Subcategories */}
          <Route path="/kids" element={<CategoryPage forcedCategory="Kids" />} />
          <Route path="/kids/:subcategory" element={<CategoryPage forcedCategory="Kids" />} />
          
          {/* Accessories and Subcategories */}
          <Route path="/accessories" element={<CategoryPage forcedCategory="Accessories" />} />
          <Route path="/accessories/:subcategory" element={<CategoryPage forcedCategory="Accessories" />} />
          
          {/* Product Detail */}
          <Route path="/product/:id" element={<ProductDetailPage />} />
          
          {/* Curated Views */}
          <Route path="/new-arrivals" element={<NewArrivalsPage />} />
          <Route path="/offers" element={<OffersPage />} />
          
          {/* Couple & Custom Studio */}
          <Route path="/custom" element={<CoupleCustomPage />} />
          <Route path="/couple-custom" element={<CoupleCustomPage />} />
          
          {/* Boutique Checkout & Razorpay Payment */}
          <Route path="/checkout" element={<CheckoutPage />} />
          
          {/* Fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Drawers & Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-40 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-[#24160F] text-[#FAF6EE] border border-gold-400/70 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs max-w-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};
