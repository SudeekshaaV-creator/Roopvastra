import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Product } from '../types/product';

export const WishlistDrawer: React.FC = () => {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, totalWishlistItems } = useWishlist();
  const { addToCart } = useCart();

  if (!isWishlistOpen) return null;

  const handleMoveToBag = (product: Product) => {
    addToCart(product, product.sizes[0]);
    toggleWishlist(product);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-darkbrown-950/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-gold-300 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="px-6 py-5 bg-white border-b border-gold-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-maroon-800 fill-maroon-800" />
              <h3 className="font-serif text-lg font-bold text-darkbrown-900">
                Your Wishlist
              </h3>
              <span className="text-xs bg-maroon-100 text-maroon-800 font-bold px-2 py-0.5 rounded-full">
                {totalWishlistItems}
              </span>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 rounded-full text-gray-500 hover:bg-cream-100 hover:text-darkbrown-900 transition"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-gold-200/60">
            {wishlist.length > 0 ? (
              <div className="space-y-4">
                {wishlist.map((product) => (
                  <div key={product.id} className="pt-4 first:pt-0 flex gap-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-20 h-24 object-cover object-top rounded border border-gold-200 shrink-0"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-sm font-semibold text-darkbrown-900 line-clamp-1">
                            {product.name}
                          </h4>
                          <button
                            onClick={() => toggleWishlist(product)}
                            className="text-gray-400 hover:text-maroon-700 ml-2"
                            aria-label="Remove from wishlist"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-gold-700 font-semibold uppercase tracking-wider mt-0.5">
                          {product.category} • {product.subcategory}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Fabric: <span className="font-medium text-darkbrown-800">{product.fabric}</span>
                        </p>
                        <div className="mt-1 font-bold text-sm text-maroon-800">
                          ₹{product.price.toLocaleString('en-IN')}
                        </div>
                      </div>

                      {/* Move to bag button */}
                      <button
                        onClick={() => handleMoveToBag(product)}
                        className="mt-2 py-1.5 px-3 bg-darkbrown-900 hover:bg-maroon-800 text-white text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-gold-300" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-cream-200 border border-gold-300 flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-gold-600" />
                </div>
                <h4 className="font-serif text-lg font-semibold text-darkbrown-900 mb-1">
                  Your wishlist is empty
                </h4>
                <p className="text-xs text-gray-500 max-w-xs mb-6">
                  Save pieces that touch your soul as you explore our heritage South Indian boutique collections.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-6 py-2.5 bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-semibold uppercase tracking-wider rounded transition"
                >
                  Explore Collection
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
