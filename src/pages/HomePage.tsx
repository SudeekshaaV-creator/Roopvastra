import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  ChevronRight, 
  Star,
  MapPin,
  Clock,
  Compass
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { Product } from '../types/product';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export const HomePage: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Subsets for home page previews balanced across departments
  const featuredProducts = [
    PRODUCTS.find((p) => p.id === 'rv-sar-001') || PRODUCTS[0],
    PRODUCTS.find((p) => p.id === 'rv-men-eth-001') || PRODUCTS[15],
    PRODUCTS.find((p) => p.id === 'rv-kid-ge-001') || PRODUCTS[27],
    PRODUCTS.find((p) => p.id === 'rv-acc-nec-001') || PRODUCTS[39],
  ];

  const newArrivals = [
    PRODUCTS.find((p) => p.id === 'rv-ana-001') || PRODUCTS[6],
    PRODUCTS.find((p) => p.id === 'rv-men-wes-002') || PRODUCTS[19],
    PRODUCTS.find((p) => p.id === 'rv-kid-bw-001') || PRODUCTS[24],
    PRODUCTS.find((p) => p.id === 'rv-acc-arm-001') || PRODUCTS[42],
  ];

  const offerProducts = [
    PRODUCTS.find((p) => p.id === 'rv-set-001') || PRODUCTS[9],
    PRODUCTS.find((p) => p.id === 'rv-men-eth-003') || PRODUCTS[17],
    PRODUCTS.find((p) => p.id === 'rv-kid-be-001') || PRODUCTS[21],
    PRODUCTS.find((p) => p.id === 'rv-acc-ear-001') || PRODUCTS[33],
  ];

  // Women subcategory cards using authentic first images
  const womenSubcategories = [
    {
      name: 'Kanchipuram & Silk Sarees',
      slug: 'sarees',
      image: '/images/women/Sarees/saree1.jpg',
      count: '3 Master Weaves',
      startingPrice: '₹8,990',
      tag: 'Heritage Pure Silk',
    },
    {
      name: 'Designer Kurtis & Tunics',
      slug: 'kurtis',
      image: '/images/women/Kurtis/kurti1.webp',
      count: '3 Boutique Styles',
      startingPrice: '₹2,450',
      tag: 'Chanderi & Georgette',
    },
    {
      name: 'Grand Anarkali Gowns',
      slug: 'anarkali',
      image: '/images/women/Anarkali/anarkali1.jpg',
      count: '3 Regal Ensembles',
      startingPrice: '₹6,990',
      tag: 'Mirror & Banarasi',
    },
    {
      name: 'Ethnic & Sharara Sets',
      slug: 'ethnic-sets',
      image: '/images/women/Ethnic Sets/set1.webp',
      count: '3 Celebratory Sets',
      startingPrice: '₹4,999',
      tag: 'Organza & Silk',
    },
    {
      name: 'Contemporary Western Wear',
      slug: 'western',
      image: '/images/women/Western/westerndress1.webp',
      count: '3 Modern Silhouettes',
      startingPrice: '₹2,999',
      tag: 'Satin & Suiting Crepe',
    },
  ];

  return (
    <div className="w-full">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F6EFE6] to-[#FAF7F2] border-b border-gold-300/40 py-12 md:py-20">
        {/* Subtle decorative gold motif circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-gold-400/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-maroon-600/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Sathyamangalam Heritage Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-100 border border-gold-400/60 shadow-gold-sm">
                <MapPin className="w-3.5 h-3.5 text-maroon-700" />
                <span className="text-xs font-semibold uppercase tracking-wider text-maroon-900">
                  Sathyamangalam, Tamil Nadu
                </span>
                <span className="text-gold-400">•</span>
                <span className="text-xs text-darkbrown-700 font-medium">Boutique Collection</span>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-2">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#540D22] tracking-tight leading-[1.15]">
                  Tradition Woven <br />
                  <span className="italic font-normal text-gold-600">with Elegance</span>
                </h1>
                <p className="text-sm sm:text-base text-darkbrown-800/80 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed pt-2">
                  Immerse yourself in handpicked Kanchipuram pure silks, regal embroidered Anarkalis, and handcrafted festive silhouettes born in the heart of Tamil Nadu’s storied weaving sanctuaries.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/women/sarees"
                  className="w-full sm:w-auto px-8 py-3.5 bg-maroon-800 hover:bg-maroon-900 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-md shadow-lg shadow-maroon-950/20 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>Explore Pure Silks</span>
                  <ArrowRight className="w-4 h-4 text-gold-300" />
                </Link>
                <Link
                  to="/women"
                  className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-cream-100 text-darkbrown-900 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-md border border-gold-400/80 shadow-sm transition-all duration-200 flex items-center justify-center"
                >
                  Women's Boutique
                </Link>
                <Link
                  to="/offers"
                  className="w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-maroon-800 hover:text-maroon-900 flex items-center justify-center gap-1.5"
                >
                  <span>Festive Sale</span>
                  <span className="bg-gold-200 text-gold-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Up to 29% Off
                  </span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-gold-300/40 grid grid-cols-3 gap-4 text-center lg:text-left max-w-lg mx-auto lg:mx-0">
                <div>
                  <span className="font-serif text-lg sm:text-xl font-bold text-maroon-900 block">100% Pure</span>
                  <span className="text-[11px] text-gray-500 uppercase tracking-wider">Silks &amp; Chanderi</span>
                </div>
                <div>
                  <span className="font-serif text-lg sm:text-xl font-bold text-maroon-900 block">15 Exclusive</span>
                  <span className="text-[11px] text-gray-500 uppercase tracking-wider">Handcrafted Pieces</span>
                </div>
                <div>
                  <span className="font-serif text-lg sm:text-xl font-bold text-maroon-900 block">Tamil Nadu</span>
                  <span className="text-[11px] text-gray-500 uppercase tracking-wider">Weaver Heritage</span>
                </div>
              </div>
            </div>

            {/* Right Hero Showcase (2 Authentic Masterpiece Previews) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                {/* Primary Card */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-gold-400/70 aspect-[3/4] min-h-[460px] sm:min-h-[520px] bg-cream-100 group">
                  <img
                    src="/images/women/Sarees/saree1.jpg"
                    alt="Royal Kanchipuram Brocade Silk Saree"
                    loading="eager"
                    decoding="async"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.tried) {
                        target.dataset.tried = 'true';
                        target.src = '/images/women/sarees/saree1.jpg';
                      }
                    }}
                    className="absolute inset-0 w-full h-full object-cover object-[55%_top] transition-transform duration-700 ease-out group-hover:scale-105 z-0"
                  />
                  {/* Subtle dark gradient overlay at bottom for text legibility without obscuring the saree */}
                  <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      background: 'linear-gradient(to top, rgba(23, 14, 9, 0.92) 0%, rgba(23, 14, 9, 0.4) 30%, transparent 65%)'
                    }}
                  />
                  
                  {/* Floating Overlay Badge: BOUTIQUE SIGNATURE */}
                  <div className="absolute top-4 left-4 z-20 bg-maroon-800/95 backdrop-blur-md text-gold-300 text-[11px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-gold-400/40 shadow">
                    Boutique Signature
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
                    <span className="text-[10px] uppercase font-semibold tracking-widest text-gold-300 block mb-1">
                      Kanchipuram Silk • Handwoven
                    </span>
                    <h3 className="font-serif text-xl font-bold tracking-wide">
                      Royal Brocade Silk Saree
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-gold-300">₹14,999</span>
                        <span className="text-xs text-gray-300 line-through">₹18,999</span>
                      </div>
                      <Link
                        to="/product/rv-sar-001"
                        className="text-xs font-semibold text-white bg-gold-600 hover:bg-gold-500 px-3.5 py-1.5 rounded-full transition shadow"
                      >
                        View Drape &rarr;
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Secondary Accent Thumbnail Floating */}
                <div className="hidden sm:block absolute -bottom-6 -left-8 w-44 rounded-xl overflow-hidden shadow-2xl border-2 border-gold-300 bg-white p-1.5 animate-in slide-in-from-bottom duration-500 z-30">
                  <img
                    src="/images/women/Anarkali/anarkali3.webp"
                    alt="Banarasi Jacquard Gown"
                    className="w-full h-24 object-cover object-top rounded-lg"
                  />
                  <div className="p-1.5">
                    <span className="text-[9px] uppercase font-bold text-maroon-800 block truncate">
                      Banarasi Jacquard
                    </span>
                    <span className="text-xs font-bold text-darkbrown-900">₹9,850</span>
                  </div>
                </div>

                {/* Golden Heritage Stamp (100% PURE SILK badge) */}
                <div className="flex absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-gold-300 via-gold-400 to-gold-600 p-0.5 shadow-xl items-center justify-center text-center z-30 pointer-events-none">
                  <div className="w-full h-full rounded-full bg-[#540D22] flex flex-col items-center justify-center p-1 text-[#FAF6EE]">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-300" />
                    <span className="text-[7px] sm:text-[8px] uppercase tracking-widest font-bold">100%</span>
                    <span className="text-[6px] sm:text-[7px] text-cream-200 uppercase">Pure Silk</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SHOP WOMEN SECTION */}
      <section className="py-16 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-700 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                <span>Premier Collection</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-maroon-950">
                Shop Women's Studio
              </h2>
              <p className="text-xs md:text-sm text-gray-600 mt-1 max-w-xl">
                Explore hand-selected bridal drapes, breezy Chanderi kurtis, celebratory Anarkalis, sharara sets, and chic western eveningwear.
              </p>
            </div>
            <Link
              to="/women"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-maroon-800 hover:text-maroon-950 pb-1 border-b border-maroon-800/40"
            >
              <span>Explore All 15 Pieces</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 5 Subcategories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {womenSubcategories.map((sub) => (
              <Link
                key={sub.slug}
                to={`/women/${sub.slug}`}
                className="group relative bg-white rounded-xl overflow-hidden border border-gold-300/60 hover:border-gold-500 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-cream-100">
                  <img
                    src={sub.image}
                    alt={sub.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-darkbrown-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  {/* Tag on image */}
                  <span className="absolute top-2.5 left-2.5 bg-darkbrown-900/80 backdrop-blur-sm text-gold-300 text-[10px] font-semibold uppercase px-2 py-0.5 rounded">
                    {sub.tag}
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-serif text-base font-bold tracking-wide">
                      {sub.name}
                    </h3>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="p-3 bg-[#FAF7F2] border-t border-gold-200/50 flex items-center justify-between text-xs">
                  <span className="text-gray-500 text-[11px] font-medium">{sub.count}</span>
                  <span className="text-maroon-800 font-bold">Starts {sub.startingPrice}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SHOP MEN SECTION */}
      <section className="py-16 bg-[#F5EEDB]/40 border-y border-gold-300/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-700 block mb-1">
                Heritage Sartorial &amp; Tailoring
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-maroon-950">
                Shop Men's Collection
              </h2>
              <p className="text-xs md:text-sm text-gray-700 mt-1 max-w-xl">
                Handcrafted South Indian pure silk kurtas, traditional gold zari veshtis, and sharp French linen tailoring crafted for celebratory milestones.
              </p>
            </div>
            <Link
              to="/men"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-maroon-800 hover:text-maroon-950 pb-1 border-b border-maroon-800/40"
            >
              <span>Explore Men's Studio (6 Pieces)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 2 Separate Men's Categories: Ethnic & Western */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Men's Ethnic */}
            <Link
              to="/men/ethnic"
              className="group relative bg-white rounded-2xl overflow-hidden border-2 border-gold-300/60 hover:border-gold-500 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-cream-100">
                <img
                  src="/images/men/ethnic/men-ethnic-1.webp"
                  alt="Men's Ethnic Wear"
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-darkbrown-950/80 via-darkbrown-950/20 to-transparent" />
                <span className="absolute top-3 left-3 bg-maroon-800/90 backdrop-blur-sm text-gold-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-gold-400/40">
                  Pure Silk &amp; Handloom
                </span>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-serif text-2xl font-bold tracking-wide text-[#FAF6EE]">
                    Men's Ethnic Wear
                  </h3>
                  <p className="text-xs text-cream-200 mt-1 font-sans">
                    Handwoven pure silk kurtas, gold zari veshtis &amp; ceremonial angavastrams
                  </p>
                </div>
              </div>
              <div className="p-4 bg-[#FAF7F2] border-t border-gold-200/60 flex items-center justify-between text-xs">
                <span className="text-gray-600 font-medium">3 Handcrafted Masterpieces</span>
                <span className="text-maroon-800 font-bold uppercase tracking-wider flex items-center gap-1">
                  Explore Ethnic &rarr;
                </span>
              </div>
            </Link>

            {/* Men's Western */}
            <Link
              to="/men/western"
              className="group relative bg-white rounded-2xl overflow-hidden border-2 border-gold-300/60 hover:border-gold-500 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-cream-100">
                <img
                  src="/images/men/western/men-western-2.webp"
                  alt="Men's Western & Tailoring"
                  loading="lazy"
                  className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-darkbrown-950/80 via-darkbrown-950/20 to-transparent" />
                <span className="absolute top-3 left-3 bg-darkbrown-900/90 backdrop-blur-sm text-gold-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-gold-400/40">
                  Contemporary Classic
                </span>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-serif text-2xl font-bold tracking-wide text-[#FAF6EE]">
                    Men's Western &amp; Tailoring
                  </h3>
                  <p className="text-xs text-cream-200 mt-1 font-sans">
                    Organic French linen shirts, structured bandhgalas &amp; evening suits
                  </p>
                </div>
              </div>
              <div className="p-4 bg-[#FAF7F2] border-t border-gold-200/60 flex items-center justify-between text-xs">
                <span className="text-gray-600 font-medium">3 Tailored Masterpieces</span>
                <span className="text-maroon-800 font-bold uppercase tracking-wider flex items-center gap-1">
                  Explore Western &rarr;
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. SHOP KIDS SECTION */}
      <section className="py-16 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-700 block mb-1">
                Festive Joy &amp; Heritage
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-maroon-950">
                Shop Kids' Studio
              </h2>
              <p className="text-xs md:text-sm text-gray-600 mt-1 max-w-xl">
                Cherished childhood celebrations adorned with pure pattu pavadais, comfortable silk dhotis, and playful party westerns.
              </p>
            </div>
            <Link
              to="/kids"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-maroon-800 hover:text-maroon-950"
            >
              <span>Explore Kids' Categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 4 Kids Subcategories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              to="/kids/boys-ethnic"
              className="group bg-white rounded-xl overflow-hidden border border-gold-300/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 overflow-hidden bg-cream-100">
                  <img
                    src="/images/kids/boys-ethnic/boy-ethnic1.jfif"
                    alt="Boys Ethnic Wear - Pure Silk Veshti"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-darkbrown-950/60 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-darkbrown-900/80 backdrop-blur-sm text-gold-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-gold-400/30">
                    Traditional Veshti
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-medium text-cream-200 uppercase tracking-wider">3 Silk Ensembles</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-lg font-bold text-darkbrown-900 group-hover:text-maroon-800 transition mb-1">
                    Boys Ethnic Wear
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Traditional South Indian pure silk veshti sets, angavastrams, and zardozi embroidered kurtas.
                  </p>
                </div>
              </div>
              <div className="px-4 pb-4 pt-1 flex items-center justify-between text-xs font-semibold text-maroon-800 uppercase tracking-wider">
                <span>Shop Boys Ethnic</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </Link>

            <Link
              to="/kids/boys-western"
              className="group bg-white rounded-xl overflow-hidden border border-gold-300/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 overflow-hidden bg-cream-100">
                  <img
                    src="/images/kids/boys-western/boy-western1.jfif"
                    alt="Boys Western Celebration Suit"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-darkbrown-950/60 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-darkbrown-900/80 backdrop-blur-sm text-gold-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-gold-400/30">
                    Smart Celebrations
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-medium text-cream-200 uppercase tracking-wider">3 Modern Styles</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-lg font-bold text-darkbrown-900 group-hover:text-maroon-800 transition mb-1">
                    Boys Western
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Tailored waistcoats, organic cotton formal shirts, bow-tie party sets, and trousers.
                  </p>
                </div>
              </div>
              <div className="px-4 pb-4 pt-1 flex items-center justify-between text-xs font-semibold text-maroon-800 uppercase tracking-wider">
                <span>Shop Boys Western</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </Link>

            <Link
              to="/kids/girls-ethnic"
              className="group bg-white rounded-xl overflow-hidden border border-gold-300/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 overflow-hidden bg-cream-100">
                  <img
                    src="/images/kids/girls-ethnic/girl-ethnic1.jfif"
                    alt="Girls Ethnic - Kanchipuram Pattu Pavadai"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-darkbrown-950/60 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-darkbrown-900/80 backdrop-blur-sm text-gold-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-gold-400/30">
                    Pattu Pavadais
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-medium text-cream-200 uppercase tracking-wider">3 Heritage Sets</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-lg font-bold text-darkbrown-900 group-hover:text-maroon-800 transition mb-1">
                    Girls Ethnic
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Authentic Kanchipuram pure silk pattu pavadais, Banarasi brocade lehengas, and drapes.
                  </p>
                </div>
              </div>
              <div className="px-4 pb-4 pt-1 flex items-center justify-between text-xs font-semibold text-maroon-800 uppercase tracking-wider">
                <span>Shop Girls Ethnic</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </Link>

            <Link
              to="/kids/girls-western"
              className="group bg-white rounded-xl overflow-hidden border border-gold-300/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 overflow-hidden bg-cream-100">
                  <img
                    src="/images/kids/girls-western/girl-western1.jfif"
                    alt="Girls Western - Party Frocks"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-darkbrown-950/60 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-darkbrown-900/80 backdrop-blur-sm text-gold-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-gold-400/30">
                    Partywear Frocks
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-medium text-cream-200 uppercase tracking-wider">3 Party Frocks</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-lg font-bold text-darkbrown-900 group-hover:text-maroon-800 transition mb-1">
                    Girls Western
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Flared organza tulle frocks, delicate satin gowns, and celebratory ruffle party dresses.
                  </p>
                </div>
              </div>
              <div className="px-4 pb-4 pt-1 flex items-center justify-between text-xs font-semibold text-maroon-800 uppercase tracking-wider">
                <span>Shop Girls Western</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. ACCESSORIES SECTION */}
      <section className="py-16 bg-[#24160F] text-[#FAF6EE] border-y border-gold-400/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block mb-1">
                South Indian Ornaments &amp; Finery
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#FAF6EE]">
                Royal Boutique Accessories
              </h2>
              <p className="text-xs md:text-sm text-cream-200/80 mt-1 max-w-xl">
                Completing your traditional attire with handcrafted temple jewelry, antique matte gold aram sets, kemp earrings, and embroidered raw silk clutches.
              </p>
            </div>
            <Link
              to="/accessories"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-400 hover:text-gold-300"
            >
              <span>View All 7 Categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Accessories 7 Category Visual Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
            {[
              {
                name: 'Earrings',
                desc: 'Jhumkas & Kemp',
                img: '/images/accessories/earrings/earrings1.png',
                link: '/accessories/earrings',
                count: '3 Designs',
              },
              {
                name: 'Bangles',
                desc: 'Antique Kada',
                img: '/images/accessories/bangles/bangles1.jfif',
                link: '/accessories/bangles',
                count: '3 Sets',
              },
              {
                name: 'Necklaces',
                desc: 'Chokers & Haars',
                img: '/images/accessories/necklaces/necklace1.webp',
                link: '/accessories/necklaces',
                count: '3 Pieces',
              },
              {
                name: 'Aram Sets',
                desc: 'Temple Haram',
                img: '/images/accessories/aram sets/aram-sets1.webp',
                link: '/accessories/aram-sets',
                count: '3 Grand Sets',
              },
              {
                name: 'Hair Finery',
                desc: 'Jada & Billai',
                img: '/images/accessories/hair-accessories/hair-accessories1.jpg',
                link: '/accessories/hair-accessories',
                count: '3 Ornaments',
              },
              {
                name: 'Purses & Clutches',
                desc: 'Silk Clutches & Potlis',
                img: '/images/accessories/clutches-purses/purse1.webp',
                link: '/accessories/clutches-purses',
                count: '3 Clutches',
              },
              {
                name: 'Rings',
                desc: 'Cocktail & Jadau',
                img: '/images/accessories/rings/couples-ring1.jpg',
                link: '/accessories/rings',
                count: '3 Pairs',
              },
            ].map((acc) => (
              <Link
                key={acc.name}
                to={acc.link}
                className="group bg-[#2D1B13] rounded-xl overflow-hidden border border-gold-500/30 hover:border-gold-400 hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="relative h-28 sm:h-32 overflow-hidden bg-darkbrown-950">
                  <img
                    src={acc.img}
                    alt={`${acc.name} - Roop Vastra`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-darkbrown-950/80 via-transparent to-transparent" />
                  <span className="absolute bottom-1 right-1.5 text-[9px] text-gold-300 font-medium px-1 bg-darkbrown-900/70 rounded">
                    {acc.count}
                  </span>
                </div>
                <div className="p-2.5 text-center flex-grow flex flex-col justify-center">
                  <h4 className="font-serif text-xs font-semibold text-[#FAF6EE] group-hover:text-gold-300 transition">
                    {acc.name}
                  </h4>
                  <p className="text-[10px] text-cream-200/70 mt-0.5 line-clamp-1">
                    {acc.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FEATURED COLLECTIONS */}
      <section className="py-16 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-700 block mb-1">
                Connoisseur's Choice
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-maroon-950">
                Featured Boutique Collections
              </h2>
              <p className="text-xs md:text-sm text-gray-600 mt-1 max-w-xl">
                Masterpieces that showcase the pinnacle of Sathyamangalam weaving traditions and hand-embroidery.
              </p>
            </div>
            <Link
              to="/women"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-maroon-800 hover:text-maroon-950"
            >
              <span>View All Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. NEW ARRIVALS PREVIEW */}
      <section className="py-16 bg-[#F7F2E8]/60 border-t border-gold-300/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-maroon-800 mb-1">
                <span className="w-2 h-2 rounded-full bg-maroon-700 animate-ping mr-1" />
                Fresh Off The Looms
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-maroon-950">
                New Arrivals Preview
              </h2>
              <p className="text-xs md:text-sm text-gray-600 mt-1 max-w-xl">
                The latest seasonal creations introduced to the ROOP VASTRA gallery this week.
              </p>
            </div>
            <Link
              to="/new-arrivals"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-maroon-800 hover:text-maroon-950"
            >
              <span>View All New Arrivals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 8. OFFERS PREVIEW */}
      <section className="py-16 bg-gradient-to-r from-maroon-950 via-[#40091A] to-maroon-900 text-[#FAF6EE] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block mb-1">
                Special Celebrations
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#FAF6EE]">
                Festive Offers &amp; Discounts
              </h2>
              <p className="text-xs md:text-sm text-cream-200/80 mt-1 max-w-xl">
                Exceptional savings on pure handloom sarees, anarkalis, and festive sets. Up to 29% off for a limited time.
              </p>
            </div>
            <Link
              to="/offers"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-darkbrown-950 rounded text-xs font-bold uppercase tracking-wider transition"
            >
              <span>Browse All Festive Offers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offerProducts.map((prod) => (
              <div key={prod.id} className="bg-[#FAF7F2] rounded-lg overflow-hidden text-darkbrown-900">
                <ProductCard
                  product={prod}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. INSTAGRAM SECTION */}
      <section className="py-16 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-maroon-800 mb-2">
              <InstagramIcon className="w-4 h-4 text-maroon-700" />
              <span>@roopvastra.sathy</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-darkbrown-900">
              #RoopVastraMoments
            </h2>
            <p className="text-xs md:text-sm text-gray-600 mt-2">
              Follow our aesthetic journey through Tamil Nadu's weaving hubs, styling tips, and bridal client portraits.
            </p>
          </div>

          {/* 6-Grid of Authentic Local Images */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { img: '/images/women/Sarees/saree1.jpg', title: 'Royal Silk Drape' },
              { img: '/images/men/ethnic/men-ethnic-1.webp', title: 'Silk Kurta Veshti' },
              { img: '/images/kids/girls-ethnic/girl-ethnic1.jfif', title: 'Kanchipuram Pavadai' },
              { img: '/images/accessories/aram sets/aram-sets1.webp', title: 'Temple Haram Set' },
              { img: '/images/women/Anarkali/anarkali1.jpg', title: 'Embroidered Anarkali' },
              { img: '/images/accessories/earrings/earrings1.png', title: 'Antique Kemp Jhumkas' },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative aspect-square rounded-lg overflow-hidden border border-gold-300/60 shadow-sm"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-maroon-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center text-white">
                  <InstagramIcon className="w-5 h-5 text-gold-400 mb-1" />
                  <span className="text-[10px] font-semibold tracking-wide">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Instagram CTA */}
          <div className="text-center mt-8">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gold-400 bg-white hover:bg-cream-100 text-xs font-semibold uppercase tracking-wider text-maroon-900 transition"
            >
              <InstagramIcon className="w-4 h-4 text-maroon-700" />
              <span>Join 25k+ Patrons on Instagram</span>
            </a>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

    </div>
  );
};
