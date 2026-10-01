import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Check, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  ArrowLeft, 
  Share2, 
  MapPin, 
  Ruler 
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = PRODUCTS.find((p) => p.id === id);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [addedRecently, setAddedRecently] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'Standard');
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="font-serif text-2xl font-bold text-maroon-900 mb-2">
          Piece Not Found
        </h2>
        <p className="text-xs text-gray-600 mb-6">
          The requested handcrafted garment could not be found in our boutique collection.
        </p>
        <Link
          to="/women"
          className="px-6 py-2.5 bg-maroon-800 text-white rounded text-xs font-semibold uppercase tracking-wider"
        >
          Return to Women's Studio
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    setAddedRecently(true);
    setTimeout(() => setAddedRecently(false), 2500);
  };

  // Related products from same subcategory or category (excluding current)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && p.subcategory === product.subcategory
  ).concat(
    PRODUCTS.filter(
      (p) => p.id !== product.id && p.subcategory !== product.subcategory
    )
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation / Back & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-gold-300/40">
          <nav className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
            <Link to="/" className="hover:text-maroon-800">Home</Link>
            <span>/</span>
            <Link to={`/${product.category.toLowerCase()}`} className="hover:text-maroon-800">
              {product.category}
            </Link>
            <span>/</span>
            <Link 
              to={`/${product.category.toLowerCase()}/${product.subcategory.toLowerCase().replace(/\s+/g, '-')}`} 
              className="hover:text-maroon-800"
            >
              {product.subcategory}
            </Link>
            <span>/</span>
            <span className="text-maroon-900 font-semibold truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs text-darkbrown-700 hover:text-maroon-800 font-medium self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>

        {/* Main Product Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Left Column: Authentic Images */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border-2 border-gold-300 shadow-luxury bg-cream-100">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-darkbrown-900 text-gold-300 text-xs tracking-wider uppercase font-semibold px-3 py-1 rounded shadow-md border border-gold-400/40">
                    New Season Release
                  </span>
                )}
                {product.isSale && product.discount && (
                  <span className="bg-maroon-700 text-white text-xs tracking-wider uppercase font-semibold px-3 py-1 rounded shadow-md">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              {/* Wishlist Toggle Overlay */}
              <button
                onClick={() => toggleWishlist(product)}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all shadow-md ${
                  isWishlisted
                    ? 'bg-maroon-700 text-white'
                    : 'bg-white/80 hover:bg-white text-darkbrown-900'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Gallery (if multiple) */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-24 rounded-lg overflow-hidden border-2 transition ${
                      activeImageIndex === idx
                        ? 'border-maroon-800 shadow-md'
                        : 'border-gold-300/60 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover object-top" />
                  </button>
                ))}
              </div>
            )}

            {/* Location & Authenticity Note */}
            <div className="p-4 rounded-xl bg-cream-100/70 border border-gold-300/50 flex items-center justify-between text-xs text-darkbrown-800">
              <span className="flex items-center gap-2 font-medium">
                <MapPin className="w-4 h-4 text-maroon-800" />
                Handcrafted &amp; Shipped from Sathyamangalam, Tamil Nadu
              </span>
              <span className="text-gold-700 font-bold uppercase text-[10px]">
                Silk Mark Quality
              </span>
            </div>
          </div>

          {/* Right Column: Specifications & Purchasing */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
                  {product.category} • {product.subcategory} • {product.productType}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Product link copied to clipboard!');
                  }}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-maroon-800"
                  aria-label="Share product"
                >
                  <Share2 className="w-3.5 h-3.5" /> Share
                </button>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-darkbrown-900 tracking-tight leading-snug">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-3 text-xs text-gold-600">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-gold-500 text-gold-500'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-darkbrown-900 text-sm">
                  {product.rating.toFixed(1)} / 5.0
                </span>
                <span className="text-gray-400">• Verified Boutique Customer Reviews</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-xl bg-white border border-gold-300/70 shadow-sm space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl font-bold text-maroon-800">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discount && (
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    {product.discount}% OFF (Save ₹{(product.originalPrice! - product.price).toLocaleString('en-IN')})
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-500">
                Inclusive of all taxes. Free insured express shipping across India on this item.
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-maroon-900">
                Artisanal Narrative &amp; Craftsmanship
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Fabric & Specifications Table */}
            <div className="rounded-xl border border-gold-300/60 overflow-hidden text-xs">
              <div className="grid grid-cols-2 bg-cream-100/80 p-3 border-b border-gold-200">
                <span className="text-gray-500 uppercase text-[10px] font-semibold">
                  {product.category === 'Accessories' ? 'Base Craft' : 'Fabric'}
                </span>
                <span className="font-semibold text-darkbrown-900">
                  {product.category === 'Accessories' ? product.material : product.fabric}
                </span>
              </div>
              <div className="grid grid-cols-2 p-3 border-b border-gold-200/50 bg-white">
                <span className="text-gray-500 uppercase text-[10px] font-semibold">
                  {product.category === 'Accessories' ? 'Finish / Detailing' : 'Material Detail'}
                </span>
                <span className="font-medium text-darkbrown-900">{product.material}</span>
              </div>
              <div className="grid grid-cols-2 bg-cream-100/80 p-3 border-b border-gold-200">
                <span className="text-gray-500 uppercase text-[10px] font-semibold">Primary Colour</span>
                <span className="font-semibold text-darkbrown-900">{product.colour}</span>
              </div>
              <div className="grid grid-cols-2 p-3 border-b border-gold-200/50 bg-white">
                <span className="text-gray-500 uppercase text-[10px] font-semibold">Recommended Occasion</span>
                <span className="font-medium text-darkbrown-900">{product.occasion}</span>
              </div>
              <div className="grid grid-cols-2 bg-cream-100/80 p-3">
                <span className="text-gray-500 uppercase text-[10px] font-semibold">Boutique Inventory</span>
                <span className="font-semibold text-emerald-800">Only {product.stock} units remaining</span>
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold uppercase tracking-wider text-darkbrown-900">
                  {product.category === 'Accessories' ? 'Size / Dimensions:' : 'Select Size:'}{' '}
                  <span className="text-maroon-800 font-bold">{selectedSize}</span>
                </span>
                {product.category !== 'Accessories' ? (
                  <span className="text-gold-700 flex items-center gap-1 cursor-pointer hover:underline text-[11px]">
                    <Ruler className="w-3.5 h-3.5" /> South Indian Standard Sizing
                  </span>
                ) : (
                  <span className="text-gold-700 flex items-center gap-1 text-[11px]">
                    <Sparkles className="w-3.5 h-3.5" /> Standard Boutique Sizing
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider border transition ${
                      selectedSize === sz
                        ? 'border-maroon-800 bg-maroon-800 text-white shadow-md'
                        : 'border-gold-300 bg-white text-darkbrown-800 hover:border-gold-500'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-4 pt-4 border-t border-gold-300/40">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {/* Quantity */}
                <div className="flex items-center border border-gold-300 rounded-md bg-white px-2 py-1.5 self-start">
                  <span className="text-xs text-gray-500 mr-3">Qty:</span>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center text-darkbrown-800 hover:bg-cream-100 rounded text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-darkbrown-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-7 h-7 flex items-center justify-center text-darkbrown-800 hover:bg-cream-100 rounded text-sm font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-6 rounded-md text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition active:scale-[0.98] ${
                    addedRecently
                      ? 'bg-emerald-700 text-white'
                      : 'bg-maroon-800 hover:bg-maroon-900 text-white'
                  }`}
                >
                  {addedRecently ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Shopping Bag
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-gold-300" /> Add to Shopping Bag
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3.5 rounded-md border transition flex items-center justify-center ${
                    isWishlisted
                      ? 'border-maroon-700 bg-maroon-50 text-maroon-800'
                      : 'border-gold-300 bg-white text-darkbrown-800 hover:border-gold-500'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Trust Badges Row */}
              <div className="grid grid-cols-2 gap-3 pt-3 text-xs text-darkbrown-800">
                <div className="flex items-center gap-2 p-2.5 rounded bg-cream-100/60 border border-gold-300/40">
                  <ShieldCheck className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>100% Sathyamangalam Pure Silk Guarantee</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded bg-cream-100/60 border border-gold-300/40">
                  <Truck className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>Insured Express Shipping in Tamper-Proof Box</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Related Handcrafted Ensembles */}
        {relatedProducts.length > 0 && (
          <div className="pt-12 border-t border-gold-300/50">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold-700 block mb-1">
                  Complete The Aesthetic
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-darkbrown-900">
                  Related Boutique Ensembles
                </h2>
              </div>
              <Link
                to="/women"
                className="text-xs font-semibold uppercase tracking-wider text-maroon-800 hover:underline"
              >
                View Full Studio &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
