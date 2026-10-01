import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Sparkles, 
  Truck, 
  RefreshCw, 
  Send 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#24160F] text-[#FAF6EE] pt-16 pb-8 border-t border-gold-400/30">
      {/* Value Proposition Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-gold-500/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-400/40 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <h4 className="font-serif text-base font-semibold text-gold-300">Pure Handcrafted Silks</h4>
              <p className="text-xs text-cream-200/70 mt-0.5">Authentic South Indian weaves direct from master artisans</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-400/40 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <h4 className="font-serif text-base font-semibold text-gold-300">Pan-India Express</h4>
              <p className="text-xs text-cream-200/70 mt-0.5">Insured &amp; tamper-proof luxury packaging to your doorstep</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-400/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <h4 className="font-serif text-base font-semibold text-gold-300">Boutique Quality Check</h4>
              <p className="text-xs text-cream-200/70 mt-0.5">Every weave undergoes rigorous yarn &amp; zari verification</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-400/40 flex items-center justify-center shrink-0">
              <RefreshCw className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <h4 className="font-serif text-base font-semibold text-gold-300">Personalized Support</h4>
              <p className="text-xs text-cream-200/70 mt-0.5">Dedicated style consultation from Sathyamangalam stylists</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-3xl font-bold tracking-widest text-[#FAF6EE]">
                ROOP VASTRA
              </span>
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold-400 font-medium">
                Tradition Woven with Elegance
              </p>
            </Link>
            <p className="text-xs text-cream-200/80 leading-relaxed max-w-sm">
              Rooted in the timeless textile heritage of Sathyamangalam, Tamil Nadu, ROOP VASTRA celebrates handcrafted weaves, regal silk sarees, and contemporary festive apparel curated for the discerning connoisseur.
            </p>
            <div className="pt-2 text-xs text-cream-200/90 space-y-1.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>Boutique Pavilion, Main Bazaar Road, Sathyamangalam - 638401, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a href="tel:9345527013" className="hover:text-gold-300 transition">9345527013</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a href="mailto:sudeekshaav2004@gmail.com" className="hover:text-gold-300 transition">sudeekshaav2004@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Women Collections */}
          <div>
            <h4 className="font-serif text-base font-semibold text-gold-300 mb-4 tracking-wider uppercase text-xs">
              Women's Studio
            </h4>
            <ul className="space-y-2 text-xs text-cream-200/80">
              <li>
                <Link to="/women/sarees" className="hover:text-gold-400 transition">Kanchipuram &amp; Silk Sarees</Link>
              </li>
              <li>
                <Link to="/women/kurtis" className="hover:text-gold-400 transition">Designer Kurtis &amp; Tunics</Link>
              </li>
              <li>
                <Link to="/women/anarkali" className="hover:text-gold-400 transition">Grand Anarkali Gowns</Link>
              </li>
              <li>
                <Link to="/women/ethnic-sets" className="hover:text-gold-400 transition">Sharara &amp; Ethnic Sets</Link>
              </li>
              <li>
                <Link to="/women/western" className="hover:text-gold-400 transition">Contemporary Western Wear</Link>
              </li>
              <li>
                <Link to="/women" className="hover:text-gold-400 transition font-semibold text-gold-300">View All Women &rarr;</Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-base font-semibold text-gold-300 mb-4 tracking-wider uppercase text-xs">
              Boutique Curation
            </h4>
            <ul className="space-y-2 text-xs text-cream-200/80">
              <li>
                <Link to="/men" className="hover:text-gold-400 transition">Men's Ethnic &amp; Western</Link>
              </li>
              <li>
                <Link to="/kids" className="hover:text-gold-400 transition">Kids Heritage Wear</Link>
              </li>
              <li>
                <Link to="/accessories" className="hover:text-gold-400 transition">Temple Jewelry &amp; Clutches</Link>
              </li>
              <li>
                <Link to="/custom" className="hover:text-gold-400 transition">Couple &amp; Custom Studio</Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="hover:text-gold-400 transition">New Season Arrivals</Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-gold-400 transition">Festive Offers &amp; Sales</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Royal Club */}
          <div>
            <h4 className="font-serif text-base font-semibold text-gold-300 mb-4 tracking-wider uppercase text-xs">
              Boutique Dispatch
            </h4>
            <p className="text-xs text-cream-200/80 leading-relaxed mb-4">
              Subscribe for private previews, muhurtham collection announcements, and weaver stories.
            </p>
            {subscribed ? (
              <div className="bg-maroon-900/60 border border-gold-400/50 p-3 rounded text-xs text-gold-300">
                ✨ Vanakkam! You are now subscribed to ROOP VASTRA private previews.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#170E09] border border-gold-500/40 rounded px-3 py-2 text-xs text-[#FAF6EE] placeholder-cream-200/40 focus:outline-none focus:border-gold-400"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 p-1 text-gold-400 hover:text-gold-300 transition"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-cream-200/60 block">
                  Strictly spam-free. Only royal textile narratives.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-gold-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-200/60">
          <p>© {new Date().getFullYear()} ROOP VASTRA. All rights reserved. Sathyamangalam, Tamil Nadu, India.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-gold-400 cursor-pointer">Heritage Handloom Certified</span>
            <span>•</span>
            <span className="hover:text-gold-400 cursor-pointer">Silk Mark Inspired</span>
            <span>•</span>
            <span className="hover:text-gold-400 cursor-pointer">Made with Pride in Tamil Nadu</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
