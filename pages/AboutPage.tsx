
import React from 'react';
import { Leaf, Target, Heart, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight heading-font">Cleaning the Planet, <br/><span className="text-emerald-600">Clothe by Clothe.</span></h1>
            <p className="text-lg text-stone-600 leading-relaxed font-medium">
              ReCircle was founded with a simple belief: Clothing should never end up in a landfill when it could be warming a soul.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-8">
            <div className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm">
              <div className="bg-emerald-100 text-emerald-700 w-10 h-10 rounded-xl flex items-center justify-center mb-6">
                <Target size={20} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3 heading-font">Our Mission</h3>
              <p className="text-stone-500 leading-relaxed text-sm">
                To create a seamless, technology-driven bridge between conscious consumers and those in need.
              </p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm">
              <div className="bg-amber-100 text-amber-700 w-10 h-10 rounded-xl flex items-center justify-center mb-6">
                <Heart size={20} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3 heading-font">Our Vision</h3>
              <p className="text-stone-500 leading-relaxed text-sm">
                A world where every garment is treated as a valuable resource with a lifecycle that benefits society.
              </p>
            </div>
          </div>

          <div className="space-y-6 pt-10">
            <h2 className="text-2xl font-bold text-stone-900 text-center heading-font">Our Commitment</h2>
            <div className="bg-white p-10 rounded-[2.5rem] border border-stone-50 shadow-sm">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center space-y-2">
                  <Leaf className="text-emerald-600 mx-auto" size={28} />
                  <h4 className="font-bold text-sm heading-font">Zero Waste</h4>
                  <p className="text-xs text-stone-500 leading-tight">100% of collected items are donated or recycled.</p>
                </div>
                <div className="text-center space-y-2">
                  <ShieldCheck className="text-emerald-600 mx-auto" size={28} />
                  <h4 className="font-bold text-sm heading-font">Fair Wages</h4>
                  <p className="text-xs text-stone-500 leading-tight">Our riders are paid living wages for their service.</p>
                </div>
                <div className="text-center space-y-2">
                  <Heart className="text-emerald-600 mx-auto" size={28} />
                  <h4 className="font-bold text-sm heading-font">Impact First</h4>
                  <p className="text-xs text-stone-500 leading-tight">Grassroots NGO partnerships across India.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
