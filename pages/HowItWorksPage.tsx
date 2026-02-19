import React from 'react';
import { Truck, Package, ShieldCheck, Heart, BarChart3, Smartphone } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      title: "Book Online",
      desc: "Schedule a pickup on our app or website. Choose your path: Donate to NGO or Brand Exchange. Price varies by location.",
      icon: Smartphone,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Pay Logistics Fee",
      desc: "A small fee of ₹100-200 covers our fuel, rider wages, and sorting operations. No hidden costs.",
      icon: ShieldCheck,
      color: "bg-amber-100 text-amber-600"
    },
    {
      title: "Doorstep Pickup",
      desc: "Our friendly rider collects your clothes at your chosen time slot. You get an instant confirmation.",
      icon: Truck,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Quality Sorting",
      desc: "Items are taken to our facility where we sort by quality, material, and category.",
      icon: Package,
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      title: "Final Delivery",
      desc: "Clothes go to verified NGOs or Brand recycling centers based on your choice.",
      icon: Heart,
      color: "bg-rose-100 text-rose-600"
    },
    {
      title: "Get Impact Report",
      desc: "Track the journey. Get a report on families helped or receive your brand voucher.",
      icon: BarChart3,
      color: "bg-indigo-100 text-indigo-600"
    }
  ];

  return (
    <div className="bg-stone-50 min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-stone-900">How ReCircle Works</h1>
          <p className="text-stone-500 max-w-2xl mx-auto text-lg">From your closet to the right hands in 6 simple steps.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[2.5rem] border border-stone-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-8xl font-black text-stone-50 group-hover:text-stone-100 transition-colors pointer-events-none">
                {idx + 1}
              </div>
              <div className={`${step.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 relative z-10`}>
                <step.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-4 relative z-10">{step.title}</h3>
              <p className="text-stone-500 leading-relaxed relative z-10">{step.desc}</p>
            </div>
          ))}
        </div>

        <section className="bg-emerald-900 rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold">Why the ₹100-200 Fee?</h2>
            <p className="text-emerald-100 leading-relaxed text-lg">
              We are committed to fair labor practices. The ₹100-200 fee ensures our riders are paid fairly, fuel costs are covered, and our sorting facilities maintain high hygiene standards. This transparency is what makes ReCircle sustainable and reliable.
            </p>
          </div>
          <div className="flex-shrink-0 bg-white/10 p-8 rounded-[2rem] border border-white/10 backdrop-blur-sm text-center">
            <div className="text-5xl font-black mb-2">₹100+</div>
            <div className="text-sm font-bold text-emerald-300 tracking-widest uppercase">Per Pickup</div>
          </div>
        </section>
      </div>
    </div>
  );
}