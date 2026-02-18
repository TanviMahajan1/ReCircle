
import React from 'react';
import { NGOS, BRANDS } from '../constants';
import { Heart, Building2, Globe } from 'lucide-react';

export default function PartnersPage() {
  return (
    <div className="bg-[#FDFBF7] min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 space-y-16">
        <header className="text-center space-y-2 max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold text-stone-900 heading-font">Our Network</h1>
          <p className="text-stone-600 text-sm font-medium">Connecting urban households to sustainable brands and communities.</p>
        </header>

        <section className="space-y-10">
          <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
            <Heart className="text-rose-500" size={24} />
            <h2 className="text-2xl font-bold text-stone-800 heading-font">NGO Partners</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NGOS.map((ngo) => (
              <div key={ngo.id} className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-md transition-all">
                <img src={ngo.logo} alt={ngo.name} className="w-12 h-12 rounded-xl mb-4" />
                <h3 className="text-xl font-bold text-stone-900 mb-2 heading-font">{ngo.name}</h3>
                <p className="text-stone-500 text-xs mb-4 leading-relaxed">{ngo.description}</p>
                <div className="bg-emerald-50 text-emerald-700 p-3 rounded-xl">
                  <p className="text-xs font-bold">{ngo.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-10">
          <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
            <Building2 className="text-blue-500" size={24} />
            <h2 className="text-2xl font-bold text-stone-800 heading-font">Brand Partners</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BRANDS.map((brand) => (
              <div key={brand.id} className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-md transition-all">
                <img src={brand.logo} alt={brand.name} className="w-12 h-12 rounded-xl mb-4" />
                <h3 className="text-xl font-bold text-stone-900 mb-2 heading-font">{brand.name}</h3>
                <p className="text-stone-500 text-xs mb-4 leading-relaxed">{brand.description}</p>
                <div className="bg-blue-50 text-blue-700 p-3 rounded-xl">
                  <p className="text-xs font-bold">{brand.offer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-emerald-900 rounded-[2.5rem] p-10 text-white text-center space-y-6">
          <div className="max-w-lg mx-auto space-y-4">
            <h2 className="text-3xl font-bold heading-font">Collaborate with us</h2>
            <p className="text-emerald-100 text-sm">Join our mission to create a truly circular fashion ecosystem.</p>
            <div className="flex justify-center gap-3 pt-2">
              <button className="bg-white text-emerald-900 px-8 py-2.5 rounded-full font-bold text-xs hover:bg-emerald-50">
                Become a Partner
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
