import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types/product';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // If not open, parent controls it
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredProducts = query.trim() === '' 
    ? [] 
    : PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.colour.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
        );
      });

  const handleSelectProduct = (product: Product) => {
    onClose();
    navigate(`/product/${product.id}`);
  };

  const popularTags = ['Silk', 'Kanchipuram', 'Chanderi', 'Anarkali', 'Maroon', 'Western', 'Sharara'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-darkbrown-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen px-4 flex items-start justify-center pt-16 sm:pt-24 pb-12">
        <div 
          className="relative bg-[#FAF7F2] border border-gold-300 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-gold-200 bg-white">
            <Search className="w-5 h-5 text-gold-600 mr-3 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by silk, anarkali, saree, kurti, colour or fabric..."
              className="w-full bg-transparent text-sm md:text-base text-darkbrown-900 placeholder-gray-400 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-gray-400 hover:text-darkbrown-700 mr-2"
                aria-label="Clear query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="px-2.5 py-1 text-xs font-semibold uppercase text-maroon-800 hover:bg-cream-100 rounded border border-gold-300/60"
            >
              ESC
            </button>
          </div>

          {/* Quick Suggestions / Popular Tags */}
          {query.trim() === '' && (
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                <Tag className="w-3.5 h-3.5 text-gold-600" />
                <span>Popular Searches in Sathyamangalam Boutique</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs px-3 py-1.5 rounded-full bg-cream-100 border border-gold-300/50 text-darkbrown-800 hover:bg-gold-100/60 transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gold-200/60">
                <span className="text-xs font-semibold uppercase tracking-wider text-gold-700 block mb-3">
                  Featured Collections
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <button 
                    onClick={() => { onClose(); navigate('/women/sarees'); }}
                    className="p-3 bg-white rounded-lg border border-gold-200 text-left hover:border-gold-500 transition"
                  >
                    <p className="font-serif font-bold text-darkbrown-900">Kanchipuram Sarees</p>
                    <p className="text-[11px] text-gray-500">Pure silk brocades</p>
                  </button>
                  <button 
                    onClick={() => { onClose(); navigate('/women/anarkali'); }}
                    className="p-3 bg-white rounded-lg border border-gold-200 text-left hover:border-gold-500 transition"
                  >
                    <p className="font-serif font-bold text-darkbrown-900">Anarkali Gowns</p>
                    <p className="text-[11px] text-gray-500">Mirror &amp; threadwork</p>
                  </button>
                  <button 
                    onClick={() => { onClose(); navigate('/offers'); }}
                    className="p-3 bg-white rounded-lg border border-gold-200 text-left hover:border-gold-500 transition"
                  >
                    <p className="font-serif font-bold text-maroon-800">Festive Offers</p>
                    <p className="text-[11px] text-gray-500">Up to 29% off</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Results List */}
          {query.trim() !== '' && (
            <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-gold-200/50">
              {filteredProducts.length > 0 ? (
                <div>
                  <div className="text-xs font-semibold uppercase text-gold-700 tracking-wider mb-2 px-2">
                    Found {filteredProducts.length} authentic handcrafted items
                  </div>
                  {filteredProducts.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelectProduct(item)}
                      className="flex items-center gap-4 p-2 rounded-lg hover:bg-cream-100 cursor-pointer transition"
                    >
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-14 h-18 object-cover rounded border border-gold-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase font-bold text-gold-700 tracking-wider">
                          {item.category} • {item.subcategory}
                        </span>
                        <h4 className="font-serif text-sm font-semibold text-darkbrown-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500 truncate">
                          {item.fabric} • {item.colour}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-bold text-maroon-800 text-sm">
                          ₹{item.price.toLocaleString('en-IN')}
                        </span>
                        <ArrowRight className="w-4 h-4 text-gold-600 ml-auto mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="font-serif text-base font-semibold text-darkbrown-800">
                    No results for "{query}"
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Try searching for "silk", "saree", "kurti", "anarkali", or "maroon"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
