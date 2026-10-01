import React, { useState } from 'react';
import { Sparkles, MapPin } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductGrid } from '../components/ProductGrid';
import { QuickViewModal } from '../components/QuickViewModal';
import { Product } from '../types/product';

export const NewArrivalsPage: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const newProducts = PRODUCTS.filter((p) => p.isNew);

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-[#24160F] via-[#381220] to-[#540D22] text-[#FAF6EE] p-8 md:p-12 mb-10 border border-gold-400/50 shadow-luxury">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-400 text-gold-300 text-[11px] font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Latest Weaving Drops
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-[#FAF6EE]">
              New Season Arrivals
            </h1>
            <p className="text-xs md:text-sm text-cream-200/90 leading-relaxed">
              Fresh drapes, contemporary silhouettes, and newly woven silk ensembles just brought in from the looms of Sathyamangalam.
            </p>
            <div className="pt-2 text-xs text-gold-300 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-gold-400" />
              <span>Direct loom dispatch • Verified Silk Purity</span>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={newProducts}
          title="Fresh Off The Looms"
          subtitle="Be the first to drape these newly arrived artisanal masterpieces."
          onQuickView={(p) => setQuickViewProduct(p)}
        />

      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
