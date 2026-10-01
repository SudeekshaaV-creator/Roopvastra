import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, ShoppingBag, Heart, Shield, Check } from 'lucide-react';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-darkbrown-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen px-4 flex items-center justify-center py-10">
        <div
          className="relative bg-[#FAF7F2] border border-gold-400/80 rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-darkbrown-800 shadow transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image side */}
            <div className="relative bg-cream-100 aspect-[3/4] md:aspect-auto md:h-full">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />
              {product.discount && (
                <span className="absolute top-4 left-4 bg-maroon-700 text-white text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded shadow-md">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            {/* Details side */}
            <div className="p-6 md:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-gold-700">
                  {product.category} • {product.subcategory}
                </span>

                <h2 className="font-serif text-xl md:text-2xl font-bold text-darkbrown-900 mt-1 mb-2">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4 text-xs text-gold-600">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-gold-500 text-gold-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-darkbrown-800">
                    {product.rating.toFixed(1)} / 5.0
                  </span>
                  <span className="text-gray-400">• In Stock ({product.stock} available)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-gold-200">
                  <span className="text-2xl font-bold text-maroon-800">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {product.discount && (
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Save ₹{(product.originalPrice! - product.price).toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  {product.description}
                </p>

                {/* Product Specifications Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-cream-100/70 p-3 rounded-lg border border-gold-200/80 mb-4">
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase">
                      {product.category === 'Accessories' ? 'Craft' : 'Fabric'}
                    </span>
                    <span className="font-medium text-darkbrown-900">
                      {product.category === 'Accessories' ? product.material : product.fabric}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase">
                      {product.category === 'Accessories' ? 'Detailing' : 'Material'}
                    </span>
                    <span className="font-medium text-darkbrown-900">{product.material}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase">Colour</span>
                    <span className="font-medium text-darkbrown-900">{product.colour}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase">Occasion</span>
                    <span className="font-medium text-darkbrown-900">{product.occasion}</span>
                  </div>
                </div>

                {/* Size Selector */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="font-semibold text-darkbrown-800">
                      {product.category === 'Accessories' ? 'Size / Dimensions' : 'Select Size'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`text-xs px-3 py-1.5 rounded border transition font-medium ${
                          selectedSize === sz
                            ? 'border-maroon-700 bg-maroon-700 text-white shadow-sm'
                            : 'border-gray-300 bg-white text-darkbrown-800 hover:border-gold-500'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex gap-3">
                  <button
                    onClick={handleAdd}
                    className={`flex-1 py-3 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition ${
                      added
                        ? 'bg-emerald-700 text-white'
                        : 'bg-maroon-800 hover:bg-maroon-900 text-white'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" /> Added to Bag
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-gold-300" /> Add to Bag
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3 rounded-lg border transition ${
                      isWishlisted
                        ? 'border-maroon-700 bg-maroon-50 text-maroon-800'
                        : 'border-gold-300 bg-white text-darkbrown-800 hover:border-gold-500'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs pt-2">
                  <Link
                    to={`/product/${product.id}`}
                    onClick={onClose}
                    className="font-semibold text-maroon-800 hover:text-maroon-900 underline underline-offset-4"
                  >
                    View Complete Details &amp; Styling Guide &rarr;
                  </Link>

                  <span className="flex items-center gap-1 text-[11px] text-gray-500">
                    <Shield className="w-3.5 h-3.5 text-gold-600" /> Authentic Sathyamangalam
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
