import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronDown, 
  MapPin, 
  Sparkles 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  const location = useLocation();

  const { totalItems, setIsCartOpen } = useCart();
  const { totalWishlistItems, setIsWishlistOpen } = useWishlist();

  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'Women', 
      path: '/women',
      hasDropdown: true,
      subcategories: [
        { name: 'All Women', path: '/women' },
        { name: 'Sarees', path: '/women/sarees' },
        { name: 'Kurtis', path: '/women/kurtis' },
        { name: 'Anarkali', path: '/women/anarkali' },
        { name: 'Ethnic Sets', path: '/women/ethnic-sets' },
        { name: 'Western', path: '/women/western' },
      ]
    },
    { 
      name: 'Men', 
      path: '/men',
      hasDropdown: true,
      subcategories: [
        { name: 'All Men', path: '/men' },
        { name: "Men's Ethnic", path: '/men/ethnic' },
        { name: "Men's Western", path: '/men/western' },
      ]
    },
    { 
      name: 'Kids', 
      path: '/kids',
      hasDropdown: true,
      subcategories: [
        { name: 'All Kids', path: '/kids' },
        { name: 'Boys Ethnic', path: '/kids/boys-ethnic' },
        { name: 'Boys Western', path: '/kids/boys-western' },
        { name: 'Girls Ethnic', path: '/kids/girls-ethnic' },
        { name: 'Girls Western', path: '/kids/girls-western' },
      ]
    },
    { 
      name: 'Accessories', 
      path: '/accessories',
      hasDropdown: true,
      subcategories: [
        { name: 'All Accessories', path: '/accessories' },
        { name: 'Earrings', path: '/accessories/earrings' },
        { name: 'Bangles', path: '/accessories/bangles' },
        { name: 'Necklaces', path: '/accessories/necklaces' },
        { name: 'Aram Sets', path: '/accessories/aram-sets' },
        { name: 'Hair Accessories', path: '/accessories/hair-accessories' },
        { name: 'Purses & Clutches', path: '/accessories/purses-clutches' },
        { name: 'Rings', path: '/accessories/rings' },
      ]
    },
    { name: 'Couple & Custom', path: '/custom' },
    { name: 'New Arrivals', path: '/new-arrivals', badge: 'New' },
    { name: 'Offers', path: '/offers', badge: 'Sale' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-gold-300/40 transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-[#540D22] text-[#FAF6EE] text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-gold-300 animate-pulse" />
            <span>Sathyamangalam, Tamil Nadu — Handcrafted Heritage &amp; Pure Silks</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-cream-200">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-gold-400" /> Boutique Flagship, TN
            </span>
            <span className="hidden md:inline text-gold-300/60">•</span>
            <span className="hidden md:inline">Complimentary Express Shipping across India</span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          
          {/* Mobile Menu Trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 text-darkbrown-800 hover:text-maroon-700 transition"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={onOpenSearch}
              className="p-2 text-darkbrown-800 hover:text-maroon-700 transition lg:hidden"
              aria-label="Search Products"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo & Tagline */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <Link to="/" className="inline-flex flex-col items-center lg:items-start group">
              <span className="font-serif text-2xl md:text-3xl lg:text-4xl tracking-[0.12em] font-semibold text-[#540D22] group-hover:text-maroon-800 transition">
                ROOP VASTRA
              </span>
              <span className="font-sans text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-gold-600 font-semibold -mt-0.5">
                Tradition Woven with Elegance
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3">
            {navLinks.map((link) => (
              link.hasDropdown ? (
                <div 
                  key={link.name} 
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium tracking-wide transition rounded-md ${
                      isActive(link.path)
                        ? 'text-maroon-800 font-semibold bg-cream-100/80'
                        : 'text-darkbrown-800 hover:text-maroon-700 hover:bg-cream-100/50'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gold-600 transition-transform duration-200 group-hover:rotate-180" />
                  </Link>

                  {/* Dropdown Menu */}
                  {activeDropdown === link.name && (
                    <div className="absolute top-full left-0 min-w-[200px] pt-2 z-50">
                      <div className="bg-[#FAF7F2] border border-gold-300/60 rounded-lg shadow-luxury py-2 animate-in fade-in slide-in-from-top-1 duration-150">
                        {link.subcategories?.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            onClick={() => setActiveDropdown(null)}
                            className="block px-4 py-2 text-xs font-medium text-darkbrown-800 hover:text-maroon-800 hover:bg-gold-50/70 transition"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3 py-2 text-sm font-medium tracking-wide transition rounded-md flex items-center gap-1.5 ${
                    isActive(link.path)
                      ? 'text-maroon-800 font-semibold bg-cream-100/80'
                      : 'text-darkbrown-800 hover:text-maroon-700 hover:bg-cream-100/50'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-full ${
                      link.badge === 'Sale' 
                        ? 'bg-maroon-100 text-maroon-800' 
                        : 'bg-gold-200 text-gold-800'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </Link>
              )
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Desktop Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-300/60 bg-cream-50/80 text-darkbrown-700 hover:border-gold-500 hover:bg-white transition text-xs"
              aria-label="Search collection"
            >
              <Search className="w-3.5 h-3.5 text-gold-600" />
              <span className="text-gray-500 font-normal">Search boutique...</span>
              <kbd className="text-[10px] bg-cream-200/70 text-gray-500 px-1.5 py-0.5 rounded">⌘K</kbd>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 text-darkbrown-800 hover:text-maroon-700 hover:bg-cream-100/60 rounded-full transition"
              aria-label={`Wishlist (${totalWishlistItems} items)`}
            >
              <Heart className="w-5 h-5 md:w-6 md:h-6 stroke-[1.75]" />
              {totalWishlistItems > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-maroon-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#FAF7F2] animate-in zoom-in">
                  {totalWishlistItems}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-darkbrown-800 hover:text-maroon-700 hover:bg-cream-100/60 rounded-full transition"
              aria-label={`Cart (${totalItems} items)`}
            >
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 stroke-[1.75]" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-gold-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#FAF7F2] animate-in zoom-in">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-darkbrown-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FAF7F2] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-10 border-r border-gold-300">
            <div>
              {/* Top Row with Logo & Close */}
              <div className="flex items-center justify-between pb-4 border-b border-gold-200">
                <div>
                  <span className="font-serif text-xl font-bold text-maroon-800 tracking-wider">
                    ROOP VASTRA
                  </span>
                  <p className="text-[9px] uppercase tracking-widest text-gold-600 font-medium">
                    Sathyamangalam, Tamil Nadu
                  </p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full text-darkbrown-700 hover:bg-cream-200"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="py-4 space-y-1">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-semibold text-darkbrown-800 hover:bg-cream-100 rounded"
                >
                  Home
                </Link>

                {/* Women category with expandable list */}
                <div className="py-1">
                  <div className="flex items-center justify-between px-3 py-2 text-sm font-semibold text-darkbrown-800 bg-cream-100/60 rounded">
                    <Link to="/women" onClick={() => setMobileMenuOpen(false)}>Women Studio</Link>
                  </div>
                  <div className="pl-4 pr-2 pt-1 space-y-1 border-l-2 border-gold-300 ml-4 mt-1">
                    <Link
                      to="/women/sarees"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-2 py-1 text-xs text-darkbrown-700 hover:text-maroon-700"
                    >
                      • Sarees (Kanchipuram &amp; Silk)
                    </Link>
                    <Link
                      to="/women/kurtis"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-2 py-1 text-xs text-darkbrown-700 hover:text-maroon-700"
                    >
                      • Kurtis &amp; Tunics
                    </Link>
                    <Link
                      to="/women/anarkali"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-2 py-1 text-xs text-darkbrown-700 hover:text-maroon-700"
                    >
                      • Anarkali Gowns &amp; Sets
                    </Link>
                    <Link
                      to="/women/ethnic-sets"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-2 py-1 text-xs text-darkbrown-700 hover:text-maroon-700"
                    >
                      • Ethnic Sets &amp; Shararas
                    </Link>
                    <Link
                      to="/women/western"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-2 py-1 text-xs text-darkbrown-700 hover:text-maroon-700"
                    >
                      • Western Dresses &amp; Blazers
                    </Link>
                  </div>
                </div>

                {/* Men category with subcategory list */}
                <div className="py-1">
                  <div className="flex items-center justify-between px-3 py-2 text-sm font-semibold text-darkbrown-800 bg-cream-100/60 rounded">
                    <Link to="/men" onClick={() => setMobileMenuOpen(false)}>Men Collection</Link>
                  </div>
                  <div className="pl-4 pr-2 pt-1 space-y-1 border-l-2 border-gold-300 ml-4 mt-1">
                    <Link
                      to="/men/ethnic"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-2 py-1 text-xs text-darkbrown-700 hover:text-maroon-700"
                    >
                      • Men's Ethnic (Silks &amp; Veshtis)
                    </Link>
                    <Link
                      to="/men/western"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-2 py-1 text-xs text-darkbrown-700 hover:text-maroon-700"
                    >
                      • Men's Western (Linen &amp; Suits)
                    </Link>
                  </div>
                </div>

                {/* Kids category with subcategory list */}
                <div className="py-1">
                  <div className="flex items-center justify-between px-3 py-2 text-sm font-semibold text-darkbrown-800 bg-cream-100/60 rounded">
                    <Link to="/kids" onClick={() => setMobileMenuOpen(false)}>Kids Heritage</Link>
                  </div>
                  <div className="pl-4 pr-2 pt-1 space-y-1 border-l-2 border-gold-300 ml-4 mt-1">
                    <Link
                      to="/kids/boys-ethnic"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-2 py-1 text-xs text-darkbrown-700 hover:text-maroon-700"
                    >
                      • Boys Ethnic (Pattu Veshtis)
                    </Link>
                    <Link
                      to="/kids/boys-western"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-2 py-1 text-xs text-darkbrown-700 hover:text-maroon-700"
                    >
                      • Boys Western (Suits &amp; Blazers)
                    </Link>
                    <Link
                      to="/kids/girls-ethnic"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-2 py-1 text-xs text-darkbrown-700 hover:text-maroon-700"
                    >
                      • Girls Ethnic (Pattu Pavadais)
                    </Link>
                    <Link
                      to="/kids/girls-western"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-2 py-1 text-xs text-darkbrown-700 hover:text-maroon-700"
                    >
                      • Girls Western (Party Frocks)
                    </Link>
                  </div>
                </div>

                {/* Accessories category with subcategory list */}
                <div className="py-1">
                  <div className="flex items-center justify-between px-3 py-2 text-sm font-semibold text-darkbrown-800 bg-cream-100/60 rounded">
                    <Link to="/accessories" onClick={() => setMobileMenuOpen(false)}>Accessories &amp; Finery</Link>
                  </div>
                  <div className="pl-4 pr-2 pt-1 space-y-1 border-l-2 border-gold-300 ml-4 mt-1">
                    <Link
                      to="/accessories/earrings"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-2 py-1 text-xs text-darkbrown-700 hover:text-maroon-700"
                    >
                      • Earrings &amp; Jhumkas
                    </Link>
                    <Link
                      to="/accessories/bangles"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-2 py-1 text-xs text-darkbrown-700 hover:text-maroon-700"
                    >
                      • Bangles &amp; Kadas
                    </Link>
                    <Link
                      to="/accessories/necklaces"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-2 py-1 text-xs text-darkbrown-700 hover:text-maroon-700"
                    >
                      • Necklaces &amp; Chokers
                    </Link>
                    <Link
                      to="/accessories/aram-sets"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-2 py-1 text-xs text-darkbrown-700 hover:text-maroon-700"
                    >
                      • Aram Sets &amp; Harams
                    </Link>
                    <Link
                      to="/accessories/hair-accessories"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-2 py-1 text-xs text-darkbrown-700 hover:text-maroon-700"
                    >
                      • Hair Accessories &amp; Jada
                    </Link>
                    <Link
                      to="/accessories/purses-clutches"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-2 py-1 text-xs text-darkbrown-700 hover:text-maroon-700"
                    >
                      • Purses &amp; Clutches
                    </Link>
                    <Link
                      to="/accessories/rings"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-2 py-1 text-xs text-darkbrown-700 hover:text-maroon-700"
                    >
                      • Rings &amp; Bands (Year-Round)
                    </Link>
                  </div>
                </div>
                <Link
                  to="/new-arrivals"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-semibold text-maroon-700 hover:bg-cream-100 rounded"
                >
                  ✨ New Arrivals
                </Link>
                <Link
                  to="/offers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-semibold text-gold-700 hover:bg-cream-100 rounded"
                >
                  🏷️ Festive Offers
                </Link>
              </div>
            </div>

            {/* Mobile Footer Info */}
            <div className="pt-4 border-t border-gold-200 text-xs text-darkbrown-700 space-y-2">
              <p className="font-serif italic text-maroon-800">
                "Tradition Woven with Elegance"
              </p>
              <p className="text-[11px] text-gray-600">
                Sathyamangalam, Erode District, Tamil Nadu
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
