import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CategoryCardProps {
  name: string;
  slug: string;
  tagline?: string;
  description: string;
  image?: string;
  itemCount: number;
  subcategories: string[];
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  slug,
  tagline,
  description,
  image,
  itemCount,
  subcategories,
}) => {
  return (
    <div className="group relative bg-[#FDFBF7] rounded-xl border border-gold-300/50 hover:border-gold-500 overflow-hidden shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between">
      {/* Visual Header */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-200">
        {image ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-cream-100 via-[#FAF6EE] to-cream-200 border-b border-gold-200">
            <div className="w-16 h-16 rounded-full bg-cream-100 border border-gold-400 flex items-center justify-center mb-3 shadow-gold-sm">
              <Sparkles className="w-7 h-7 text-gold-600 animate-pulse" />
            </div>
            <span className="font-serif text-lg font-bold text-maroon-900 tracking-wide">
              {name} Collection
            </span>
            <span className="text-[11px] uppercase tracking-widest text-gold-700 mt-1 font-semibold">
              Curated by Sathyamangalam Artisans
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-darkbrown-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Floating title on image */}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold tracking-wide text-[#FAF6EE] drop-shadow-sm">
              {name}
            </h3>
            <span className="text-[11px] font-medium bg-gold-500/90 text-darkbrown-950 px-2 py-0.5 rounded-full font-sans tracking-wide">
              {itemCount > 0 ? `${itemCount} Pieces` : 'Collection Arriving'}
            </span>
          </div>
          {tagline && (
            <p className="text-xs text-cream-200 font-sans tracking-wide mt-0.5 line-clamp-1">
              {tagline}
            </p>
          )}
        </div>
      </div>

      {/* Body details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Subcategories tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {subcategories.slice(0, 4).map((sub) => (
              <span
                key={sub}
                className="text-[11px] bg-cream-100/90 text-darkbrown-800 border border-gold-300/40 px-2 py-0.5 rounded"
              >
                {sub}
              </span>
            ))}
            {subcategories.length > 4 && (
              <span className="text-[11px] text-gray-500 px-1 py-0.5">
                +{subcategories.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* CTA link */}
        <Link
          to={`/${slug}`}
          className="inline-flex items-center justify-between w-full pt-3 border-t border-gold-200/60 text-xs font-semibold uppercase tracking-wider text-maroon-800 hover:text-maroon-900 group/link"
        >
          <span>Explore {name}</span>
          <ArrowRight className="w-4 h-4 text-gold-600 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
