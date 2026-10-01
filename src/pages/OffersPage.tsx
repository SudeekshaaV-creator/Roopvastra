import React, { useState } from 'react';
import { Tag, Sparkles, MapPin } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductGrid } from '../components/ProductGrid';
import { QuickViewModal } from '../components/QuickViewModal';
import { Product } from '../types/product';

export const OffersPage: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const saleProducts = PRODUCTS.filter((p) => p.isSale && (p.discount || 0) > 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Festive Offers Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-[#540D22] via-[#681029] to-[#2D0512] text-[#FAF6EE] p-8 md:p-12 mb-10 border border-gold-400/50 shadow-luxury">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-400 text-gold-300 text-[11px] font-semibold uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5" />
              Festive Celebrations Collection
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-[#FAF6EE]">
              Exclusive Festive Offers
            </h1>
            <p className="text-xs md:text-sm text-cream-200/90 leading-relaxed">
              Celebrate timeless South Indian tradition with celebratory savings of up to 29% off on handloom pure silks, anarkalis, and boutique ethnic sets.
            </p>
            <div className="pt-2 text-xs text-gold-300 flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" /> Authentic Savings
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gold-400" /> Sathyamangalam Flagship Discounts
              </span>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={saleProducts}
          title="Curated Festive Markdowns"
          subtitle="Handcrafted pure fabrics at special celebratory pricing."
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
