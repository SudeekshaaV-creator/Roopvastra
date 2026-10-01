import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [isAddedRecently, setIsAddedRecently] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 2000);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group relative bg-white rounded-lg border border-gold-300/40 hover:border-gold-500/80 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-cream-100">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Badges: Top Left */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="bg-darkbrown-900 text-gold-300 text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded shadow-sm border border-gold-400/40">
              New
            </span>
          )}
          {product.isSale && product.discount && (
            <span className="bg-maroon-700 text-white text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded shadow-sm">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button: Top Right */}
        <button
          onClick={handleToggleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 ${
            isWishlisted
              ? 'bg-maroon-700 text-white shadow-md'
              : 'bg-white/80 hover:bg-white text-darkbrown-800 hover:text-maroon-700 shadow-sm'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Hover Button */}
        {onQuickView && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/95 hover:bg-[#FAF7F2] text-darkbrown-900 text-xs font-semibold px-4 py-2 rounded-full shadow-lg border border-gold-400/50 whitespace-nowrap z-10"
          >
            Quick View
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Subcategory & Rating */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="uppercase tracking-widest text-[10px] font-semibold text-gold-700">
              {product.category} • {product.subcategory}
            </span>
            <div className="flex items-center gap-1 text-gold-600">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-medium text-darkbrown-800 text-xs">{product.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Product Name */}
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-serif text-base font-semibold text-darkbrown-900 hover:text-maroon-800 transition line-clamp-1 mb-1" title={product.name}>
              {product.name}
            </h3>
          </Link>

          {/* Fabric / Material preview */}
          <p className="text-xs text-gray-600 line-clamp-1 mb-2 font-normal">
            {product.category === 'Accessories' ? 'Material' : 'Fabric'}:{' '}
            <span className="text-darkbrown-800 font-medium">
              {product.category === 'Accessories' ? product.material : product.fabric}
            </span>
          </p>

          {/* Price Row */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base font-bold text-maroon-800">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {product.discount && (
              <span className="text-[11px] font-semibold text-emerald-700">
                Save ₹{(product.originalPrice! - product.price).toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Sizes preview if more than 1 size */}
          {product.sizes.length > 1 && (
            <div className="flex items-center gap-1.5 mb-3 flex-wrap">
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">Size:</span>
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedSize(sz);
                  }}
                  className={`text-[10px] font-medium px-2 py-0.5 rounded border transition ${
                    selectedSize === sz
                      ? 'border-maroon-700 bg-maroon-50 text-maroon-800 font-semibold'
                      : 'border-gray-200 text-gray-600 hover:border-gold-400'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Add to Bag Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAddedRecently}
          className={`w-full py-2.5 px-3 rounded-md text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 ${
            isAddedRecently
              ? 'bg-emerald-700 text-white'
              : 'bg-darkbrown-900 hover:bg-maroon-800 text-white active:scale-[0.98]'
          }`}
        >
          {isAddedRecently ? (
            <>
              <Check className="w-3.5 h-3.5" /> Added to Bag
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5 text-gold-400" /> Add to Bag
            </>
          )}
        </button>
      </div>
    </div>
  );
};
