
import React from 'react';
import { Mail, Phone, MessageCircle, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-[#FDFBF7] min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold text-stone-900">Get in Touch</h1>
              <p className="text-xl text-stone-600 max-w-lg">Have questions about donations, partnerships, or your pickup status? We're here to help.</p>
            </div>

            <div className="space-y-8">
              {[
                { icon: Mail, label: "Email Us", val: "support@recircle.org", color: "bg-emerald-100 text-emerald-700" },
                { icon: Phone, label: "Call Us", val: "+91 800-RECIRCLE", color: "bg-blue-100 text-blue-700" },
                { icon: MessageCircle, label: "WhatsApp", val: "+91 98765-43210", color: "bg-green-100 text-green-700" },
                { icon: MapPin, label: "Headquarters", val: "Green Park, New Delhi, India", color: "bg-rose-100 text-rose-700" }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 items-center">
                  <div className={`${item.color} p-4 rounded-2xl`}>
                    <item.icon size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-stone-400 uppercase tracking-widest">{item.label}</p>
                    <p className="text-xl font-bold text-stone-800">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-10 md:p-12 rounded-[3rem] border border-stone-200 shadow-xl">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700">Full Name</label>
                  <input type="text" className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all" placeholder="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700">Email Address</label>
                  <input type="email" className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all" placeholder="jane@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700">Subject</label>
                <select className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all">
                  <option>General Inquiry</option>
                  <option>Pickup Support</option>
                  <option>Brand Partnership</option>
                  <option>NGO Collaboration</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700">Message</label>
                <textarea rows={5} className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all" placeholder="How can we help you today?"></textarea>
              </div>
              <button className="w-full bg-emerald-700 text-white py-5 rounded-2xl font-bold text-lg hover:bg-emerald-800 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-emerald-200">
                Send Message <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
