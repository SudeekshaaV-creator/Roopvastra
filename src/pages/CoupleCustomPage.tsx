import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Heart, 
  Phone, 
  MessageSquare, 
  MapPin,
  ExternalLink,
  CheckCircle2, 
  ArrowRight, 
  Scissors, 
  UploadCloud, 
  X, 
  Eye, 
  Layers, 
  Users, 
  Compass, 
  Palette 
} from 'lucide-react';

const GOOGLE_MAPS_URL = 
  import.meta.env.VITE_GOOGLE_MAPS_URL || 
  'https://www.google.com/maps/search/?api=1&query=Roop+Vastra+Sathyamangalam+Tamil+Nadu';


interface OutfitItem {
  id: string;
  name: string;
  category: 'couple' | 'family';
  image: string;
  description: string;
  stylingNotes: string;
  fabrics: string;
}

interface MaterialItem {
  id: string;
  name: string;
  image: string;
  description: string;
  recommendedFor: string;
}

const coupleItems: OutfitItem[] = [
  {
    id: 'c-blue',
    name: 'Blue Couple',
    category: 'couple',
    image: '/images/Couple/blue-couple3.webp',
    description: 'Harmonious royal indigo silk ensemble featuring a coordinated handwoven Kanchipuram drape for her and an embroidered tussar kurta set with zari borders for him.',
    stylingNotes: 'Woven with complementary jewel-toned indigo silks and fine golden zardozi threadwork, tailored for reception galas and milestone celebrations.',
    fabrics: 'Pure Kanchipuram Silk & Tussar Raw Silk'
  },
  {
    id: 'c-red',
    name: 'Red Couple',
    category: 'couple',
    image: '/images/Couple/red-couple2.webp',
    description: 'Regal crimson and vermillion ceremonial couple attire showcasing intricate temple zari work, matching brocade accents, and handcrafted wedding heritage.',
    stylingNotes: 'Classic South Indian auspicious red motifs styled with contrast gold pallu and coordinated brocade groom sherwani/kurta.',
    fabrics: 'Handloom Brocade Silk & Chanderi Zari'
  },
  {
    id: 'c-green',
    name: 'Green Couple',
    category: 'couple',
    image: '/images/Couple/green-couple1.png',
    description: 'Lush emerald and sage festive pairing crafted with golden botanical bootis, zari borders, and a balanced contemporary South Indian silhouette.',
    stylingNotes: 'Rich festive emerald green with subtle antique brass gold weaves, ideal for engagement soirees and family muhurthams.',
    fabrics: 'Pure Mulberry Silk & Banarasi Georgette'
  }
];

const familyItems: OutfitItem[] = [
  {
    id: 'f-blue',
    name: 'Blue Family',
    category: 'family',
    image: '/images/family/blue-family2.jfif',
    description: 'Coordinated ocean blue family collection designed with matching zari border motifs and festive silhouettes tailored for parents and little ones.',
    stylingNotes: 'Bespoke unity in shade and motif: silk veshti-kurta for father & son, paired with matching bridal drape and pattu pavadai for mother & daughter.',
    fabrics: 'Pure South Indian Handloom Silk'
  },
  {
    id: 'f-pink',
    name: 'Pink Family',
    category: 'family',
    image: '/images/family/pink-family3.webp',
    description: 'Graceful rani and blush pink family wardrobe woven with radiant gold zari borders, delicate floral buttas, and celebratory festive elegance.',
    stylingNotes: 'Soft pastel pink undertones harmonized across ages with comfortable pure silk weaves and heritage temple border detailing.',
    fabrics: 'Pure Kanchipuram & Organza Silk'
  },
  {
    id: 'f-purple',
    name: 'Purple Family',
    category: 'family',
    image: '/images/family/purple-family1.webp',
    description: 'Majestic royal aubergine and purple family ensemble featuring contrast gold zari checks, opulent yoke embroidery, and festive flair.',
    stylingNotes: 'Grand traditional palette bringing together regal deep purple weaves with shimmering gold pattu accents for festive portraits.',
    fabrics: 'Banarasi Jacquard & Raw Silk'
  }
];

const materialItems: MaterialItem[] = [
  {
    id: 'm-blue-blouse',
    name: 'Blue Blouse Material',
    image: '/images/materials/blue%20blouse%20material1.jpg',
    description: 'Intricately embroidered deep sapphire silk fabric with ornate gold zari necklines, floral vine sleeve motifs, and lustrous sheen.',
    recommendedFor: 'Bridal Blouses, Kanchipuram Contrast Pairings'
  },
  {
    id: 'm-red-blouse',
    name: 'Red Blouse Material',
    image: '/images/materials/red%20blouse%20material2.jpg',
    description: 'Auspicious crimson red pure raw silk adorned with dense traditional zardozi work, metallic bead clusters, and handcrafted border trims.',
    recommendedFor: 'Wedding Blouses, Festive Cholis'
  },
  {
    id: 'm-pink-kurti',
    name: 'Pink Kurti Material',
    image: '/images/materials/pink%20kurti%20material.jpeg',
    description: 'Lightweight, breathable pastel rose-pink Chanderi silk with delicate self-weave buttis, breathable drape, and subtle golden shimmer.',
    recommendedFor: 'Custom A-line Kurtis, Straight Suits & Tunics'
  },
  {
    id: 'm-plain-blouse',
    name: 'Plain Blouse Material',
    image: '/images/materials/plain%20blouse%20material4.webp',
    description: 'Versatile premium raw silk base fabric in an elegant classic solid weave, ideal for custom tailoring, contrast piping, or boutique embroidery.',
    recommendedFor: 'Minimalist Blouses, Bespoke Designer Reworks'
  }
];

export const CoupleCustomPage: React.FC = () => {
  const [selectedOutfit, setSelectedOutfit] = useState<OutfitItem | null>(null);
  
  // Customization Form State
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [outfitType, setOutfitType] = useState('Couple Outfit');
  const [selectedMaterial, setSelectedMaterial] = useState('Blue Blouse Material');
  const [preferredColour, setPreferredColour] = useState('');
  const [customizationRequirement, setCustomizationRequirement] = useState('Embroidery');
  const [referenceFileName, setReferenceFileName] = useState('');
  const [referenceFileData, setReferenceFileData] = useState<string | null>(null);
  const [designRequirements, setDesignRequirements] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = (preselectOutfit?: string, preselectMaterial?: string) => {
    if (preselectOutfit) setOutfitType(preselectOutfit);
    if (preselectMaterial) setSelectedMaterial(preselectMaterial);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleMaterialSelect = (matName: string) => {
    setSelectedMaterial(matName);
    scrollToForm(undefined, matName);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setReferenceFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setReferenceFileData(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!fullName.trim() || !mobileNumber.trim() || !emailAddress.trim() || !designRequirements.trim()) {
      setSubmitError('Please fill in your name, mobile number, email, and design requirements.');
      return;
    }

    const requestPayload = {
      id: 'REQ-' + Date.now(),
      fullName: fullName.trim(),
      mobileNumber: mobileNumber.trim(),
      emailAddress: emailAddress.trim(),
      outfitType,
      selectedMaterial,
      preferredColour: preferredColour.trim() || 'As per material',
      customizationRequirement,
      referenceFileName: referenceFileName || 'None uploaded',
      referenceFileData: referenceFileData || null,
      designRequirements: designRequirements.trim(),
      submittedAt: new Date().toISOString()
    };

    // Store in frontend state & localStorage fallback so request is never lost
    try {
      const existing = JSON.parse(localStorage.getItem('roopvastra_custom_requests') || '[]');
      existing.push(requestPayload);
      localStorage.setItem('roopvastra_custom_requests', JSON.stringify(existing));
    } catch (err) {
      console.warn('LocalStorage save failed:', err);
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/custom-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestPayload)
      });

      const resData = await response.json().catch(() => ({}));

      if (!response.ok || !resData.success) {
        throw new Error(resData.error || 'Failed to send customization request email.');
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Customization request transmission error:', err);
      setSubmitError(
        'Unable to send your request email right now. Your details have been saved locally. Please reach out directly to our concierge via Call or WhatsApp at 9345527013.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFullName('');
    setMobileNumber('');
    setEmailAddress('');
    setOutfitType('Couple Outfit');
    setSelectedMaterial('Blue Blouse Material');
    setPreferredColour('');
    setCustomizationRequirement('Embroidery');
    setReferenceFileName('');
    setReferenceFileData(null);
    setDesignRequirements('');
    setIsSubmitting(false);
    setIsSubmitted(false);
    setSubmitError('');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#24160F]">
      {/* 1. HERO HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F6EFE6] to-[#FAF7F2] border-b border-gold-300/40 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-100 border border-gold-400/60 shadow-gold-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-maroon-700" />
            <span className="text-xs font-semibold uppercase tracking-wider text-maroon-900">
              Bespoke Boutique Studio
            </span>
            <span className="text-gold-400">•</span>
            <span className="text-xs text-darkbrown-700 font-medium">Sathyamangalam Atelier</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#540D22] tracking-tight leading-[1.15]">
            Couple &amp; Bespoke <br />
            <span className="italic font-normal text-gold-600">Custom Studio</span>
          </h1>

          <p className="text-sm sm:text-base text-darkbrown-800/80 max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
            Celebrate life’s most cherished milestones in perfectly coordinated elegance. From matching couple ensembles and multigenerational family wardrobes to custom designer blouse embroidery, our Sathyamangalam master artisans tailor every stitch to your vision.
          </p>

          {/* Quick Jump Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-6 text-xs font-medium">
            <button
              onClick={() => document.getElementById('couple-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-4 py-2 bg-white hover:bg-cream-100 text-maroon-900 rounded-full border border-gold-400/50 shadow-sm transition"
            >
              Couple Looks (3)
            </button>
            <button
              onClick={() => document.getElementById('family-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-4 py-2 bg-white hover:bg-cream-100 text-maroon-900 rounded-full border border-gold-400/50 shadow-sm transition"
            >
              Family Ensembles (3)
            </button>
            <button
              onClick={() => document.getElementById('materials-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-4 py-2 bg-white hover:bg-cream-100 text-maroon-900 rounded-full border border-gold-400/50 shadow-sm transition"
            >
              Materials &amp; Fabrics (4)
            </button>
            <button
              onClick={() => scrollToForm()}
              className="px-4 py-2 bg-maroon-800 hover:bg-maroon-900 text-white rounded-full shadow-sm transition flex items-center gap-1.5 font-semibold"
            >
              <span>Customization Form</span>
              <Scissors className="w-3.5 h-3.5 text-gold-300" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. COUPLE COLLECTION SECTION */}
      <section id="couple-section" className="py-16 bg-[#FAF7F2] border-b border-gold-300/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-700 mb-1">
                <Heart className="w-3.5 h-3.5 text-maroon-600 fill-current" />
                <span>Synchronized Harmony</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-950">
                Designed to Match, Made to Remember
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
                Impeccably coordinated South Indian silk attires woven in identical dye baths and paired motif borders for weddings, receptions, and engagements.
              </p>
            </div>

            {/* Small CTA: Couple */}
            <div className="bg-[#FAF6EE] p-4 rounded-xl border border-gold-400/60 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:max-w-md">
              <div>
                <span className="font-serif text-sm font-bold text-[#540D22] block">
                  Want a Matching Couple Look?
                </span>
                <span className="text-[11px] text-gray-600">
                  Custom-tailored to your color theme &amp; measurements.
                </span>
              </div>
              <button
                onClick={() => scrollToForm('Couple Outfit')}
                className="shrink-0 px-4 py-2 bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-semibold uppercase tracking-wider rounded-md shadow transition flex items-center gap-1.5"
              >
                <span>Customize Your Couple Look</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold-300" />
              </button>
            </div>
          </div>

          {/* 3 Couple Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coupleItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-2xl overflow-hidden border border-gold-300/60 hover:border-gold-500 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-cream-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="eager"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle bottom gradient for readability */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to top, rgba(23, 14, 9, 0.85) 0%, rgba(23, 14, 9, 0.2) 25%, transparent 60%)'
                    }}
                  />
                  
                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 bg-maroon-800/90 backdrop-blur-sm text-gold-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-gold-400/40">
                    Couple Ensemble
                  </div>

                  {/* Bottom Title on Image */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="font-serif text-2xl font-bold tracking-wide text-[#FAF6EE]">
                      {item.name}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col flex-grow justify-between bg-[#FAF7F2]">
                  <div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-3 pt-3 border-t border-gold-200/60 flex items-center gap-1.5 text-[11px] text-maroon-900 font-medium">
                      <Layers className="w-3.5 h-3.5 text-gold-600" />
                      <span>{item.fabrics}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => setSelectedOutfit(item)}
                      className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-maroon-900 bg-white hover:bg-cream-100 rounded-md border border-gold-400/70 transition flex items-center justify-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </button>
                    <button
                      onClick={() => scrollToForm('Couple Outfit', 'Blue Blouse Material')}
                      className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-gold-600 hover:bg-gold-500 rounded-md shadow transition flex items-center justify-center gap-1"
                    >
                      <Scissors className="w-3.5 h-3.5" />
                      <span>Customize</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FAMILY COLLECTION SECTION */}
      <section id="family-section" className="py-16 bg-[#F5EEDB]/30 border-b border-gold-300/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-700 mb-1">
                <Users className="w-3.5 h-3.5 text-maroon-700" />
                <span>Multigenerational Radiance</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-950">
                Matching Moments for the Whole Family
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
                Bespoke family sets tailored across generations with harmonious color stories, soft child-friendly silk linings, and authentic South Indian craftsmanship.
              </p>
            </div>

            {/* Small CTA: Family */}
            <div className="bg-[#FAF6EE] p-4 rounded-xl border border-gold-400/60 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:max-w-md">
              <div>
                <span className="font-serif text-sm font-bold text-[#540D22] block">
                  Create Your Family Look
                </span>
                <span className="text-[11px] text-gray-600">
                  Coordinated outfits for adults, teens, and children.
                </span>
              </div>
              <button
                onClick={() => scrollToForm('Family Outfit')}
                className="shrink-0 px-4 py-2 bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-semibold uppercase tracking-wider rounded-md shadow transition flex items-center gap-1.5"
              >
                <span>Customize Your Family Look</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold-300" />
              </button>
            </div>
          </div>

          {/* 3 Family Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {familyItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-2xl overflow-hidden border border-gold-300/60 hover:border-gold-500 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-cream-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="eager"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle bottom gradient */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to top, rgba(23, 14, 9, 0.85) 0%, rgba(23, 14, 9, 0.2) 25%, transparent 60%)'
                    }}
                  />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 bg-maroon-800/90 backdrop-blur-sm text-gold-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-gold-400/40">
                    Family Curation
                  </div>

                  {/* Bottom Title on Image */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="font-serif text-2xl font-bold tracking-wide text-[#FAF6EE]">
                      {item.name}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col flex-grow justify-between bg-[#FAF7F2]">
                  <div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-3 pt-3 border-t border-gold-200/60 flex items-center gap-1.5 text-[11px] text-maroon-900 font-medium">
                      <Layers className="w-3.5 h-3.5 text-gold-600" />
                      <span>{item.fabrics}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => setSelectedOutfit(item)}
                      className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-maroon-900 bg-white hover:bg-cream-100 rounded-md border border-gold-400/70 transition flex items-center justify-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </button>
                    <button
                      onClick={() => scrollToForm('Family Outfit')}
                      className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-gold-600 hover:bg-gold-500 rounded-md shadow transition flex items-center justify-center gap-1"
                    >
                      <Scissors className="w-3.5 h-3.5" />
                      <span>Customize</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MATERIALS SECTION */}
      <section id="materials-section" className="py-16 bg-[#FAF7F2] border-b border-gold-300/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold-700 mb-1">
              <Palette className="w-3.5 h-3.5 text-gold-600" />
              <span>Authentic Fabric Swatches</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-950">
              Choose Your Material
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Select an authentic local fabric piece to kickstart your bespoke tailoring. Click “Select Material” on any swatch to automatically link it to the customization form below.
            </p>
          </div>

          {/* 4 Material Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {materialItems.map((mat) => {
              const isSelected = selectedMaterial === mat.name;
              return (
                <div
                  key={mat.id}
                  className={`relative bg-white rounded-2xl overflow-hidden border-2 transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'border-maroon-800 shadow-luxury ring-2 ring-maroon-800/30'
                      : 'border-gold-300/60 hover:border-gold-500 shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Swatch Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-100">
                    <img
                      src={mat.image}
                      alt={mat.name}
                      loading="eager"
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                    />
                    {isSelected && (
                      <div className="absolute top-2.5 right-2.5 bg-maroon-800 text-gold-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 border border-gold-400/50">
                        <CheckCircle2 className="w-3 h-3 text-gold-300" />
                        <span>Selected</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-grow justify-between bg-[#FAF7F2]">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-maroon-950 tracking-wide">
                        {mat.name}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                        {mat.description}
                      </p>
                      <div className="mt-3 pt-2.5 border-t border-gold-200/50 text-[10px] uppercase font-semibold text-darkbrown-700">
                        <span className="text-gold-700 font-bold">Best For: </span>
                        {mat.recommendedFor}
                      </div>
                    </div>

                    {/* Select Material Button */}
                    <button
                      onClick={() => handleMaterialSelect(mat.name)}
                      className={`mt-4 w-full py-2.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition flex items-center justify-center gap-1.5 shadow-sm ${
                        isSelected
                          ? 'bg-maroon-900 text-gold-200 border border-gold-400/60'
                          : 'bg-white hover:bg-cream-100 text-maroon-900 border border-gold-400/70'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold-300" />
                          <span>Material Selected</span>
                        </>
                      ) : (
                        <>
                          <Scissors className="w-3.5 h-3.5 text-gold-600" />
                          <span>Select Material</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CUSTOMIZATION FORM (Directly under Materials) */}
      <section ref={formRef} className="py-16 bg-[#F7F2E8]/60 border-b border-gold-300/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-gold-400/60 shadow-xl relative overflow-hidden">
            {/* Decorative Corner Flairs */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-maroon-700/5 rounded-full blur-2xl pointer-events-none" />

            <div className="text-center max-w-xl mx-auto mb-8">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-maroon-800 mb-1">
                <Scissors className="w-3.5 h-3.5 text-gold-600" />
                <span>Bespoke Atelier Order</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-950">
                Customize Your Outfit
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">
                Share your personalized design vision, measurements, or rework requirements. Our master artisans in Sathyamangalam will review your request and get in touch with you.
              </p>
            </div>

            {/* Submission Confirmation Alert */}
            {isSubmitted ? (
              <div className="bg-[#FAF6EE] border-2 border-gold-400/80 rounded-2xl p-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-400">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 border border-emerald-300">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-maroon-950">
                  Customization Request Submitted!
                </h3>
                <p className="text-sm text-darkbrown-800 max-w-md mx-auto leading-relaxed">
                  Thank you! Your customization request has been received. Roop Vastra will contact you soon.
                </p>
                <div className="p-3 bg-cream-100 rounded-lg text-xs text-gray-600 max-w-sm mx-auto border border-gold-200">
                  Your request details have been securely logged in this browser session.
                </div>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="mt-4 px-6 py-2.5 bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-semibold uppercase tracking-wider rounded-md shadow transition"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitError && (
                  <div className="p-3 bg-rose-50 border border-rose-300 rounded-lg text-xs text-rose-800 font-medium">
                    {submitError}
                  </div>
                )}

                {/* Row 1: Personal Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-maroon-950 mb-1.5">
                      Full Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sudeekshaa Ramesh"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-cream-50/50 border border-gold-300/80 rounded-lg text-xs text-darkbrown-900 focus:outline-none focus:ring-2 focus:ring-maroon-800/40 focus:border-maroon-800 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-maroon-950 mb-1.5">
                      Mobile Number <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9345527013"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-cream-50/50 border border-gold-300/80 rounded-lg text-xs text-darkbrown-900 focus:outline-none focus:ring-2 focus:ring-maroon-800/40 focus:border-maroon-800 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-maroon-950 mb-1.5">
                      Email Address <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sudeekshaa@example.com"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-cream-50/50 border border-gold-300/80 rounded-lg text-xs text-darkbrown-900 focus:outline-none focus:ring-2 focus:ring-maroon-800/40 focus:border-maroon-800 transition"
                    />
                  </div>
                </div>

                {/* Row 2: Outfit Type & Selected Material */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-maroon-950 mb-1.5">
                      Outfit Type <span className="text-rose-600">*</span>
                    </label>
                    <select
                      value={outfitType}
                      onChange={(e) => setOutfitType(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-cream-50/50 border border-gold-300/80 rounded-lg text-xs text-darkbrown-900 focus:outline-none focus:ring-2 focus:ring-maroon-800/40 focus:border-maroon-800 transition"
                    >
                      <option value="Saree">Saree</option>
                      <option value="Blouse">Blouse</option>
                      <option value="Kurti">Kurti</option>
                      <option value="Churidar">Churidar</option>
                      <option value="Anarkali">Anarkali</option>
                      <option value="Men's Outfit">Men's Outfit</option>
                      <option value="Couple Outfit">Couple Outfit</option>
                      <option value="Family Outfit">Family Outfit</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-maroon-950 mb-1.5">
                      Selected Material <span className="text-rose-600">*</span>
                    </label>
                    <select
                      value={selectedMaterial}
                      onChange={(e) => setSelectedMaterial(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-cream-50/50 border border-gold-300/80 rounded-lg text-xs text-darkbrown-900 focus:outline-none focus:ring-2 focus:ring-maroon-800/40 focus:border-maroon-800 transition"
                    >
                      <option value="Blue Blouse Material">Blue Blouse Material</option>
                      <option value="Red Blouse Material">Red Blouse Material</option>
                      <option value="Pink Kurti Material">Pink Kurti Material</option>
                      <option value="Plain Blouse Material">Plain Blouse Material</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Preferred Colour & Customization/Rework Requirement */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-maroon-950 mb-1.5">
                      Preferred Colour
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Royal Navy &amp; Antique Gold, Wine Red"
                      value={preferredColour}
                      onChange={(e) => setPreferredColour(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-cream-50/50 border border-gold-300/80 rounded-lg text-xs text-darkbrown-900 focus:outline-none focus:ring-2 focus:ring-maroon-800/40 focus:border-maroon-800 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-maroon-950 mb-1.5">
                      Customization / Rework Requirement <span className="text-rose-600">*</span>
                    </label>
                    <select
                      value={customizationRequirement}
                      onChange={(e) => setCustomizationRequirement(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-cream-50/50 border border-gold-300/80 rounded-lg text-xs text-darkbrown-900 focus:outline-none focus:ring-2 focus:ring-maroon-800/40 focus:border-maroon-800 transition"
                    >
                      <option value="Rework Design">Rework Design</option>
                      <option value="Neck Design">Neck Design</option>
                      <option value="Sleeve Design">Sleeve Design</option>
                      <option value="Embroidery">Embroidery</option>
                      <option value="Border Work">Border Work</option>
                      <option value="Colour Change">Colour Change</option>
                      <option value="Size / Measurement">Size / Measurement</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Row 4: Optional Reference Image */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-maroon-950 mb-1.5">
                    Optional Reference Image
                  </label>
                  <div className="border-2 border-dashed border-gold-300/80 hover:border-gold-500 rounded-xl p-4 text-center bg-cream-50/30 transition cursor-pointer relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center justify-center gap-1.5">
                      <UploadCloud className="w-6 h-6 text-gold-600" />
                      <span className="text-xs font-medium text-darkbrown-800">
                        {referenceFileName ? (
                          <span className="text-maroon-800 font-bold">Selected: {referenceFileName}</span>
                        ) : (
                          'Upload photo sketch, saree reference, or blouse design inspiration'
                        )}
                      </span>
                      <span className="text-[10px] text-gray-500">Supports PNG, JPG, WEBP up to 10MB</span>
                    </div>
                  </div>
                </div>

                {/* Row 5: Design Requirements (large textarea) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-maroon-950 mb-1.5">
                    Design Requirements <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your design specifications, neckline preferences, sleeve length, occasion date, or specific rework instructions in detail..."
                    value={designRequirements}
                    onChange={(e) => setDesignRequirements(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-cream-50/50 border border-gold-300/80 rounded-lg text-xs text-darkbrown-900 focus:outline-none focus:ring-2 focus:ring-maroon-800/40 focus:border-maroon-800 transition"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-maroon-800 hover:bg-maroon-900 disabled:bg-maroon-800/70 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl shadow-lg shadow-maroon-950/20 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gold-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Dispatching Request to Concierge...</span>
                      </span>
                    ) : (
                      <>
                        <span>Submit Customization Request</span>
                        <ArrowRight className="w-4 h-4 text-gold-300" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-gray-500 mt-2">
                    Our Sathyamangalam boutique concierge will review your requirements and reach out via Phone / WhatsApp.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 6. CONTACT CTA SECTION (Bottom of Page) */}
      <section className="py-16 bg-[#24160F] text-[#FAF6EE] border-t-2 border-gold-400/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold-400 mb-2">
            <Compass className="w-3.5 h-3.5 text-gold-400" />
            <span>Direct Boutique Concierge</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF6EE]">
            Talk to Roop Vastra
          </h2>

          <p className="text-xs sm:text-sm text-cream-200/80 max-w-xl mx-auto mt-2 leading-relaxed">
            Have a custom design query or planning a festive family function? Connect directly with our Sathyamangalam designers via Call, WhatsApp, or Instagram.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 max-w-5xl mx-auto">
            {/* Call Us */}
            <a
              href="tel:9345527013"
              className="group p-5 bg-[#332118] hover:bg-[#4A3328] rounded-2xl border border-gold-400/40 transition shadow-sm flex flex-col items-center justify-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-maroon-800/60 flex items-center justify-center mb-3 group-hover:scale-110 transition border border-gold-400/50">
                <Phone className="w-5 h-5 text-gold-300" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold-300">
                Call Us
              </span>
              <span className="text-sm font-semibold text-white mt-1">
                9345527013
              </span>
              <span className="text-[10px] text-cream-200/60 mt-0.5">
                Mon - Sat, 10 AM - 8 PM
              </span>
            </a>

            {/* WhatsApp Us */}
            <a
              href="https://wa.me/9345527013"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 bg-[#332118] hover:bg-[#4A3328] rounded-2xl border border-gold-400/40 transition shadow-sm flex flex-col items-center justify-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-900/60 flex items-center justify-center mb-3 group-hover:scale-110 transition border border-emerald-400/50">
                <MessageSquare className="w-5 h-5 text-emerald-300" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold-300">
                WhatsApp Us
              </span>
              <span className="text-sm font-semibold text-white mt-1">
                9345527013
              </span>
              <span className="text-[10px] text-cream-200/60 mt-0.5">
                Instant Chat &amp; Style Consult
              </span>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/roopvastra_designer"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 bg-[#332118] hover:bg-[#4A3328] rounded-2xl border border-gold-400/40 transition shadow-sm flex flex-col items-center justify-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-pink-900/60 flex items-center justify-center mb-3 group-hover:scale-110 transition border border-pink-400/50">
                <svg className="w-5 h-5 text-pink-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold-300">
                Instagram
              </span>
              <span className="text-sm font-semibold text-white mt-1">
                @roopvastra_designer
              </span>
              <span className="text-[10px] text-cream-200/60 mt-0.5">
                Follow Drapes &amp; Behind The Scenes
              </span>
            </a>

            {/* Visit Roop Vastra */}
            <div className="group p-5 bg-[#332118] hover:bg-[#4A3328] rounded-2xl border border-gold-400/40 transition shadow-sm flex flex-col items-center justify-between text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gold-900/60 flex items-center justify-center mb-3 group-hover:scale-110 transition border border-gold-400/50">
                  <MapPin className="w-5 h-5 text-gold-300" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-300">
                  Visit Roop Vastra
                </span>
                <span className="text-sm font-semibold text-white mt-1">
                  Sathyamangalam, Tamil Nadu
                </span>
                <span className="text-[10px] text-cream-200/60 mt-0.5">
                  Boutique Pavilion, Main Bazaar Road
                </span>
              </div>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-maroon-950 text-xs font-bold uppercase tracking-wider transition shadow"
              >
                <span>View Location</span>
                <ExternalLink className="w-3.5 h-3.5 text-maroon-950" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VIEW DETAILS MODAL */}
      {selectedOutfit && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border-2 border-gold-400/80 relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedOutfit(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-darkbrown-900 flex items-center justify-center shadow transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2">
              {/* Modal Image */}
              <div className="relative aspect-[3/4] bg-cream-100 sm:aspect-auto">
                <img
                  src={selectedOutfit.image}
                  alt={selectedOutfit.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Modal Details */}
              <div className="p-6 flex flex-col justify-between bg-[#FAF7F2]">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold-700 block mb-1">
                    {selectedOutfit.category === 'couple' ? 'Couple Ensemble' : 'Family Collection'}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-maroon-950">
                    {selectedOutfit.name}
                  </h3>
                  <p className="text-xs text-gray-700 mt-3 leading-relaxed">
                    {selectedOutfit.description}
                  </p>

                  <div className="mt-4 space-y-2 pt-3 border-t border-gold-200/70 text-xs">
                    <div>
                      <span className="font-bold text-maroon-900 block">Styling Notes:</span>
                      <span className="text-gray-600 text-[11px]">{selectedOutfit.stylingNotes}</span>
                    </div>
                    <div>
                      <span className="font-bold text-maroon-900 block">Weave &amp; Fabric:</span>
                      <span className="text-gray-600 text-[11px]">{selectedOutfit.fabrics}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gold-300/40">
                  <button
                    onClick={() => {
                      const outfitCat = selectedOutfit.category === 'couple' ? 'Couple Outfit' : 'Family Outfit';
                      setSelectedOutfit(null);
                      scrollToForm(outfitCat);
                    }}
                    className="w-full py-3 bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow transition flex items-center justify-center gap-1.5"
                  >
                    <Scissors className="w-3.5 h-3.5 text-gold-300" />
                    <span>Customize This Look</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CoupleCustomPage;
