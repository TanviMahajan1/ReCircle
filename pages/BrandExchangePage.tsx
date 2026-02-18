
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Ticket, 
  ArrowRight, 
  ShoppingBag, 
  CheckCircle2, 
  Sparkles,
  Zap,
  Tag
} from 'lucide-react';
import { BRANDS } from '../constants';

export default function BrandExchangePage() {
  return (
    <div className="bg-[#FDFBF7] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        <header className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-1 rounded-full text-sm font-black uppercase tracking-widest">
            <Sparkles size={16} /> Brand Partners
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-stone-900 leading-tight">
            Exchange Your Quality Wear for <span className="text-emerald-600">Premium Vouchers</span>.
          </h1>
          <p className="text-lg text-stone-600">
            We partner with major fashion brands to promote circularity. Send us your gently used branded wear, and get instant discounts on your next purchase.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BRANDS.map((brand) => (
            <div key={brand.id} className="bg-white rounded-[2.5rem] border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <img src={brand.logo} alt={brand.name} className="w-16 h-16 rounded-2xl object-cover shadow-md" />
                  <div className="bg-emerald-100 text-emerald-700 p-2 rounded-xl">
                    <Tag size={20} />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-stone-900 mb-1">{brand.name}</h3>
                  <p className="text-emerald-600 font-bold text-lg">{brand.offer}</p>
                </div>

                <p className="text-stone-500 text-sm leading-relaxed">
                  {brand.description}
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-widest">
                    <CheckCircle2 size={14} className="text-emerald-500" /> Accept Good Condition
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-widest">
                    <CheckCircle2 size={14} className="text-emerald-500" /> Minimum 3 Items
                  </div>
                </div>

                <Link 
                  to={`/donate?path=brand&brand=${brand.id}`} 
                  className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 group-hover:bg-emerald-700 transition-colors"
                >
                  Exchange Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* How it works for Brands */}
        <section className="bg-white p-12 rounded-[3rem] border border-stone-100 shadow-sm">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-stone-900">How Exchange Works</h2>
              <div className="space-y-6">
                {[
                  { step: 1, text: 'Select "Brand Exchange" path when booking.' },
                  { step: 2, text: 'Our rider collects items for a ₹50 fee.' },
                  { step: 3, text: 'We quality-check and deliver to partner brands.' },
                  { step: 4, text: 'Receive your unique voucher code via SMS/Email.' },
                ].map(item => (
                  <div key={item.step} className="flex gap-4 items-start">
                    <div className="bg-stone-100 text-stone-800 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <p className="text-stone-700 font-medium">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#F4F1EA] p-10 rounded-[2.5rem] relative">
              <div className="bg-white p-6 rounded-3xl shadow-xl space-y-4">
                <div className="flex items-center gap-3">
                  <Zap className="text-amber-500 fill-amber-500" size={24} />
                  <span className="font-bold text-stone-800">Instant Voucher</span>
                </div>
                <div className="bg-stone-50 border-2 border-dashed border-stone-200 p-4 rounded-2xl flex justify-between items-center">
                  <span className="font-mono font-bold text-xl tracking-widest text-emerald-600">REC-XCH-ZARA-20</span>
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-bold">COPY</button>
                </div>
                <p className="text-xs text-stone-400 text-center">Use this at checkout on zara.com or in-stores.</p>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 bg-emerald-500 text-white p-4 rounded-2xl shadow-lg -rotate-12 font-bold">
                Save ₹500
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
