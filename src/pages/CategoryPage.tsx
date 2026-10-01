import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Sparkles, MapPin, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductGrid } from '../components/ProductGrid';
import { QuickViewModal } from '../components/QuickViewModal';
import { Product } from '../types/product';

interface CategoryPageProps {
  forcedCategory?: 'Women' | 'Men' | 'Kids' | 'Accessories';
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ forcedCategory }) => {
  const { subcategory } = useParams<{ subcategory?: string }>();
  const location = useLocation();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Determine current active category based on URL or prop
  let currentCategory = forcedCategory;
  if (!currentCategory) {
    if (location.pathname.startsWith('/women')) currentCategory = 'Women';
    else if (location.pathname.startsWith('/men')) currentCategory = 'Men';
    else if (location.pathname.startsWith('/kids')) currentCategory = 'Kids';
    else if (location.pathname.startsWith('/accessories')) currentCategory = 'Accessories';
    else currentCategory = 'Women';
  }

  const categoryMeta = CATEGORIES.find(
    (c) => c.name.toLowerCase() === currentCategory?.toLowerCase()
  );

  // Filter products by category
  const categoryProducts = PRODUCTS.filter(
    (p) => p.category.toLowerCase() === currentCategory?.toLowerCase()
  );

  // Map URL slug parameter to subcategory display name (e.g. 'ethnic-sets' -> 'Ethnic Sets')
  const slugToSubcategoryName: { [key: string]: string } = {
    'sarees': 'Sarees',
    'kurtis': 'Kurtis',
    'anarkali': 'Anarkali',
    'ethnic-sets': 'Ethnic Sets',
    'western': 'Western',
    'ethnic': 'Ethnic',
    'boys-ethnic': 'Boys Ethnic',
    'boys-western': 'Boys Western',
    'girls-ethnic': 'Girls Ethnic',
    'girls-western': 'Girls Western',
    'earrings': 'Earrings',
    'bangles': 'Bangles',
    'necklaces': 'Necklaces',
    'aram-sets': 'Aram Sets',
    'hair-accessories': 'Hair Accessories',
    'purses-clutches': 'Purses & Clutches',
    'clutches-purses': 'Purses & Clutches',
    'purses': 'Purses & Clutches',
    'clutches': 'Purses & Clutches',
    'rings': 'Rings',
  };

  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(
    subcategory ? slugToSubcategoryName[subcategory.toLowerCase()] || subcategory : null
  );

  useEffect(() => {
    if (subcategory) {
      setActiveSubcategory(slugToSubcategoryName[subcategory.toLowerCase()] || subcategory);
    } else {
      setActiveSubcategory(null);
    }
  }, [subcategory]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link to="/" className="hover:text-maroon-800 transition">Home</Link>
          <span>/</span>
          <Link 
            to={`/${currentCategory.toLowerCase()}`}
            className={`transition ${!activeSubcategory ? 'text-maroon-900 font-semibold' : 'hover:text-maroon-800'}`}
          >
            {currentCategory}
          </Link>
          {activeSubcategory && (
            <>
              <span>/</span>
              <span className="text-maroon-900 font-semibold">{activeSubcategory}</span>
            </>
          )}
        </nav>

        {/* Category Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#3D0A19] via-[#540D22] to-[#24160F] text-[#FAF6EE] p-8 md:p-12 mb-10 shadow-lg border border-gold-400/40">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-400 text-gold-300 text-[11px] font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Sathyamangalam Boutique Edition
            </div>
            
            <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-[#FAF6EE]">
              {activeSubcategory
                ? (activeSubcategory === 'Purses' ? 'Purses & Clutches' : activeSubcategory)
                : `${currentCategory} Collection`}
            </h1>

            <p className="text-xs md:text-sm text-cream-200/90 leading-relaxed font-normal">
              {categoryMeta?.description || 'Curated with authentic South Indian textile mastery and timeless elegance.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-gold-300">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gold-400" /> Sathyamangalam, Tamil Nadu
              </span>
              <span>•</span>
              <span>
                {categoryProducts.length > 0 
                  ? `${categoryProducts.length} Handcrafted Masterpieces` 
                  : 'Looms in Production'}
              </span>
            </div>
          </div>
        </div>

        {/* If Category has products */}
        {categoryProducts.length > 0 ? (
          <ProductGrid
            products={categoryProducts}
            title={
              activeSubcategory
                ? (activeSubcategory === 'Purses' ? 'Purses & Clutches' : activeSubcategory)
                : (currentCategory === 'Accessories' ? 'All Accessories' : `All ${currentCategory} Ensembles`)
            }
            subtitle={`Explore authentic ${activeSubcategory === 'Purses' ? 'Purses & Clutches' : (activeSubcategory || currentCategory)} handcrafted with pride.`}
            availableSubcategories={categoryMeta?.subcategories}
            activeSubcategory={activeSubcategory || undefined}
            onSelectSubcategory={(sub) => setActiveSubcategory(sub)}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        ) : (
          /* Empty / Coming Soon Boutique State (Men, Kids, Accessories) with zero broken images */
          <div className="py-16 px-6 text-center max-w-3xl mx-auto bg-white/80 rounded-2xl border-2 border-gold-300 shadow-luxury my-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-gold-100 to-cream-200 border border-gold-400 flex items-center justify-center mx-auto mb-6 shadow-gold-sm">
              <Sparkles className="w-10 h-10 text-gold-600 animate-pulse" />
            </div>

            <span className="text-xs uppercase font-bold tracking-widest text-maroon-800 block mb-2">
              Sathyamangalam Master Looms In Motion
            </span>

            <h2 className="font-serif text-2xl md:text-3xl font-bold text-darkbrown-900 mb-3">
              The {currentCategory} Boutique Collection is Arriving Soon
            </h2>

            <p className="text-xs md:text-sm text-gray-600 max-w-lg mx-auto leading-relaxed mb-8">
              Our master weavers and artisans near Sathyamangalam are currently preparing the finest pure silk fabrics, zari borders, and festive designs for this category. We never use stock or artificial imagery—only authentic pieces crafted with care.
            </p>

            {/* Subcategories preview */}
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase text-gold-700 tracking-wider block mb-3">
                Upcoming Subcategories In This Edition:
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                {categoryMeta?.subcategories.map((sub) => (
                  <span
                    key={sub}
                    className="text-xs px-3.5 py-1.5 rounded-full bg-cream-100 border border-gold-300 text-darkbrown-800 font-medium"
                  >
                    ✨ {sub}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/women"
                className="w-full sm:w-auto px-6 py-3 bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-semibold uppercase tracking-wider rounded-md shadow transition"
              >
                Browse Available Women's Silks (15 Pieces)
              </Link>
              <Link
                to="/"
                className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-cream-100 border border-gold-400 text-darkbrown-800 text-xs font-semibold uppercase tracking-wider rounded-md transition"
              >
                Return to Home
              </Link>
            </div>
          </div>
        )}

      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
