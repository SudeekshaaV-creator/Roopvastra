import React, { useState, useMemo } from 'react';
import { Product, SortOption } from '../types/product';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  availableSubcategories?: string[];
  activeSubcategory?: string;
  onSelectSubcategory?: (sub: string | null) => void;
  onQuickView?: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  title,
  subtitle,
  availableSubcategories,
  activeSubcategory,
  onSelectSubcategory,
  onQuickView,
}) => {
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [selectedFabric, setSelectedFabric] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(20000);

  // Extract unique fabrics from products
  const uniqueFabrics = useMemo(() => {
    const fabrics = products.map((p) => p.fabric);
    return Array.from(new Set(fabrics));
  }, [products]);

  // Filter & Sort
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by activeSubcategory (if not handled by parent)
    if (activeSubcategory) {
      result = result.filter(
        (p) => p.subcategory.toLowerCase() === activeSubcategory.toLowerCase()
      );
    }

    // Filter by fabric
    if (selectedFabric) {
      result = result.filter((p) => p.fabric === selectedFabric);
    }

    // Filter by price
    result = result.filter((p) => p.price <= maxPrice);

    // Sort
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'discount':
        result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default:
        break;
    }

    return result;
  }, [products, activeSubcategory, selectedFabric, maxPrice, sortOption]);

  const hasActiveFilters = Boolean(selectedFabric || maxPrice < 20000 || activeSubcategory);

  const resetFilters = () => {
    setSelectedFabric(null);
    setMaxPrice(20000);
    if (onSelectSubcategory) onSelectSubcategory(null);
  };

  return (
    <section className="w-full">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gold-300/40 gap-4">
        <div>
          {title && (
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-maroon-900 tracking-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-xs md:text-sm text-gray-600 mt-1 max-w-xl font-normal">
              {subtitle}
            </p>
          )}
          <span className="inline-block text-xs font-semibold text-gold-700 tracking-wider uppercase mt-2">
            Showing {filteredAndSortedProducts.length} handcrafted pieces
          </span>
        </div>

        {/* Sort & Filter Controls */}
        <div className="flex flex-wrap items-center gap-3 self-start md:self-end">
          {/* Subcategory quick pills (if provided) */}
          {availableSubcategories && availableSubcategories.length > 0 && onSelectSubcategory && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => onSelectSubcategory(null)}
                className={`text-xs px-3 py-1.5 rounded-full border transition font-medium ${
                  !activeSubcategory
                    ? 'bg-maroon-800 text-white border-maroon-800 shadow-sm'
                    : 'bg-white/80 text-darkbrown-800 border-gold-300 hover:border-gold-500'
                }`}
              >
                All
              </button>
              {availableSubcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => onSelectSubcategory(sub)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition font-medium ${
                    activeSubcategory?.toLowerCase() === sub.toLowerCase()
                      ? 'bg-maroon-800 text-white border-maroon-800 shadow-sm'
                      : 'bg-white/80 text-darkbrown-800 border-gold-300 hover:border-gold-500'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}

          {/* Sort dropdown */}
          <div className="flex items-center gap-1.5 bg-white border border-gold-300/80 rounded-md px-3 py-1.5 text-xs text-darkbrown-800 shadow-sm">
            <ArrowUpDown className="w-3.5 h-3.5 text-gold-600" />
            <span className="text-gray-500 font-normal">Sort:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="bg-transparent font-medium text-darkbrown-900 focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="discount">Special Discount</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter drawer / strip */}
      {uniqueFabrics.length > 1 && (
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-thin text-xs">
          <span className="flex items-center gap-1 text-gray-500 font-medium whitespace-nowrap">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gold-600" />{' '}
            {products.length > 0 && products.every((p) => p.category === 'Accessories')
              ? 'Material:'
              : 'Fabric:'}
          </span>
          <button
            onClick={() => setSelectedFabric(null)}
            className={`px-2.5 py-1 rounded border text-xs whitespace-nowrap transition ${
              !selectedFabric
                ? 'border-maroon-800 bg-maroon-50 text-maroon-800 font-semibold'
                : 'border-gray-200 text-gray-600 hover:border-gold-400'
            }`}
          >
            {products.length > 0 && products.every((p) => p.category === 'Accessories')
              ? 'All Materials'
              : 'All Fabrics'}
          </button>
          {uniqueFabrics.map((fab) => (
            <button
              key={fab}
              onClick={() => setSelectedFabric(fab === selectedFabric ? null : fab)}
              className={`px-2.5 py-1 rounded border text-xs whitespace-nowrap transition ${
                selectedFabric === fab
                  ? 'border-maroon-800 bg-maroon-50 text-maroon-800 font-semibold'
                  : 'border-gray-200 text-gray-600 hover:border-gold-400'
              }`}
            >
              {fab}
            </button>
          ))}

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="ml-auto flex items-center gap-1 text-maroon-700 hover:text-maroon-900 font-medium text-xs whitespace-nowrap"
            >
              <X className="w-3.5 h-3.5" /> Clear Filters
            </button>
          )}
        </div>
      )}

      {/* Product Cards Grid */}
      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white/60 border border-gold-200 rounded-xl max-w-xl mx-auto p-8 shadow-sm">
          <h3 className="font-serif text-xl font-semibold text-maroon-900 mb-2">
            No Handcrafted Pieces Found
          </h3>
          <p className="text-xs text-gray-600 mb-6">
            We couldn't find any products matching your specific filter criteria.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 bg-maroon-800 hover:bg-maroon-900 text-white rounded text-xs font-semibold uppercase tracking-wider transition"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </section>
  );
};
