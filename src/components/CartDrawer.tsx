import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    totalItems,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-darkbrown-950/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-gold-300 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="px-6 py-5 bg-white border-b border-gold-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-maroon-800" />
              <h3 className="font-serif text-lg font-bold text-darkbrown-900">
                Your Shopping Bag
              </h3>
              <span className="text-xs bg-gold-100 text-gold-800 font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-gray-500 hover:bg-cream-100 hover:text-darkbrown-900 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Free Shipping Bar */}
          <div className="bg-maroon-50 px-6 py-2 border-b border-maroon-100 text-xs text-maroon-900 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              Complimentary Handloom Gift Packaging
            </span>
            <span className="font-bold text-maroon-800">FREE</span>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-gold-200/60">
            {cart.length > 0 ? (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="pt-4 first:pt-0 flex gap-4"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover object-top rounded border border-gold-200 shrink-0"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-sm font-semibold text-darkbrown-900 line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                            className="text-gray-400 hover:text-maroon-700 ml-2"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Size: <span className="font-medium text-darkbrown-800">{item.selectedSize}</span>
                        </p>
                        <p className="text-xs text-gray-500">
                          Fabric: <span className="font-medium text-darkbrown-800">{item.product.fabric}</span>
                        </p>
                      </div>

                      {/* Quantity & Price Row */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-gold-300 rounded bg-white">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                            className="p-1 text-gray-600 hover:bg-cream-100"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold text-darkbrown-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                            className="p-1 text-gray-600 hover:bg-cream-100"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-bold text-sm text-maroon-800">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-cream-200 border border-gold-300 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-gold-600" />
                </div>
                <h4 className="font-serif text-lg font-semibold text-darkbrown-900 mb-1">
                  Your bag is empty
                </h4>
                <p className="text-xs text-gray-500 max-w-xs mb-6">
                  Explore our authentic silk sarees, designer kurtis, and royal ensembles woven with South Indian grace.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-semibold uppercase tracking-wider rounded transition"
                >
                  Explore Collection
                </button>
              </div>
            )}
          </div>

          {/* Footer Summary */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-gold-200 space-y-4">
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-darkbrown-900">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Sathyamangalam Handloom Packaging</span>
                  <span className="text-emerald-700 font-semibold">Complimentary</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Express Shipping</span>
                  <span className="text-emerald-700 font-semibold">FREE</span>
                </div>
                <div className="border-t border-gold-200 pt-2 flex justify-between text-sm font-bold text-darkbrown-900">
                  <span>Total Payable</span>
                  <span className="text-base text-maroon-800">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/checkout');
                }}
                className="w-full py-3 px-4 bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-semibold uppercase tracking-wider rounded shadow-md flex items-center justify-center gap-2 transition active:scale-[0.98] cursor-pointer"
              >
                <span>Proceed to Boutique Checkout</span>
                <ArrowRight className="w-4 h-4 text-gold-300" />
              </button>

              <p className="text-[10px] text-center text-gray-400">
                🔒 Safe &amp; Insured pan-India dispatch from Sathyamangalam, Tamil Nadu.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
