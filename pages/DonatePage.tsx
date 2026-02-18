
import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Calendar, 
  Clock, 
  Check, 
  ChevronRight, 
  AlertCircle,
  ShoppingBag,
  Heart,
  Zap,
  Package,
  ArrowRight
} from 'lucide-react';

export default function DonatePage({ showToast }: { showToast: (m: string) => void }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    date: '',
    bags: 1,
    path: 'brand' as 'brand' | 'ngo',
    donation: 0
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const total = 50 + formData.donation;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Please fill in your name, phone, and address.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      showToast("🎉 Pickup booked! We'll WhatsApp you to confirm within 2 hours.");
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FEFAE0] py-16 px-6 flex items-center justify-center">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-emerald-100 max-w-sm w-full text-center space-y-6 animate-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-[#D8F3DC] text-[#2D6A4F] rounded-full flex items-center justify-center mx-auto mb-4 scale-110 shadow-lg border-4 border-white">
            <Check size={40} strokeWidth={3} />
          </div>
          <h2 className="text-3xl font-extrabold heading-font text-[#1B2A22]">Thank You!</h2>
          <p className="text-[#1B2A22]/50 font-medium text-sm">
            Your pickup is scheduled. Our driver will be at your doorstep on <strong>{formData.date}</strong>.
          </p>
          <div className="bg-[#FEFAE0] p-5 rounded-2xl text-left space-y-2">
            <div className="flex justify-between items-center text-[10px]">
              <span className="font-bold text-[#1B2A22]/40 uppercase tracking-widest">Order ID</span>
              <span className="font-extrabold text-[#1B2A22]">#REC-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            <div className="flex justify-between items-center text-[10px]">
              <span className="font-bold text-[#1B2A22]/40 uppercase tracking-widest">Total Paid</span>
              <span className="font-extrabold text-[#2D6A4F]">₹{total}</span>
            </div>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full bg-[#1B2A22] text-white py-4 rounded-full font-bold text-base shadow-xl"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="booking-form" className="min-h-screen bg-[#2D6A4F] py-20 px-6">
      <div className="max-w-2xl mx-auto space-y-10">
        <div className="text-center text-white space-y-2">
          <h1 className="text-3xl md:text-5xl font-extrabold heading-font leading-tight">Schedule Your Pickup</h1>
          <p className="text-emerald-100 font-medium max-w-xs mx-auto text-sm">Takes 2 minutes. Our team will be at your doorstep within 48 hours.</p>
        </div>

        <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-2xl border border-white/10 space-y-8">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1B2A22]/60 ml-1">Full Name</label>
                  <input 
                    type="text" required 
                    placeholder="E.g. Siddharth Sharma"
                    className="w-full bg-[#FEFAE0]/50 border border-[#B7E4C7]/40 rounded-xl px-4 py-3 focus:bg-white focus:ring-4 focus:ring-[#D8F3DC] focus:outline-none transition-all font-semibold text-sm"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1B2A22]/60 ml-1">Phone Number</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1B2A22]/30 font-bold text-xs">+91</span>
                    <input 
                      type="tel" required 
                      placeholder="98765 43210"
                      className="w-full bg-[#FEFAE0]/50 border border-[#B7E4C7]/40 rounded-xl pl-12 pr-4 py-3 focus:bg-white focus:ring-4 focus:ring-[#D8F3DC] focus:outline-none transition-all font-semibold text-sm"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1B2A22]/60 ml-1">Pickup Address</label>
                <textarea 
                  required rows={2}
                  placeholder="Apartment, Street, Area..."
                  className="w-full bg-[#FEFAE0]/50 border border-[#B7E4C7]/40 rounded-xl px-4 py-3 focus:bg-white focus:ring-4 focus:ring-[#D8F3DC] focus:outline-none transition-all font-semibold text-sm"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                ></textarea>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1B2A22]/60 ml-1">Pickup Date</label>
                <input 
                  type="date" required 
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-[#FEFAE0]/50 border border-[#B7E4C7]/40 rounded-xl px-4 py-3 focus:bg-white focus:ring-4 focus:ring-[#D8F3DC] focus:outline-none transition-all font-semibold text-sm"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1B2A22]/60 ml-1">Estimated Bags</label>
                <select 
                  className="w-full bg-[#FEFAE0]/50 border border-[#B7E4C7]/40 rounded-xl px-4 py-3 focus:bg-white focus:ring-4 focus:ring-[#D8F3DC] focus:outline-none transition-all appearance-none font-semibold text-sm"
                  value={formData.bags}
                  onChange={(e) => setFormData({...formData, bags: parseInt(e.target.value)})}
                >
                  {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Bag' : 'Bags'}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-[#1B2A22]/60 ml-1">Exchange Path</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'brand', label: 'Brand Exchange', icon: ShoppingBag, color: 'text-orange-500' },
                  { id: 'ngo', label: 'NGO Donation', icon: Heart, color: 'text-rose-500' },
                ].map((p) => (
                  <label 
                    key={p.id} 
                    className={`relative cursor-pointer p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 text-center ${
                      formData.path === p.id ? 'border-[#2D6A4F] bg-[#D8F3DC]/30' : 'border-[#1B2A22]/5 bg-white'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="path" 
                      className="absolute opacity-0" 
                      checked={formData.path === p.id}
                      onChange={() => setFormData({...formData, path: p.id as any})}
                    />
                    <p.icon className={p.color} size={24} />
                    <span className="text-xs font-extrabold heading-font">{p.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-[#1B2A22]/60 ml-1">Optional Donation</label>
              <div className="flex flex-wrap gap-2">
                {[0, 50, 100].map(amt => (
                  <button 
                    type="button"
                    key={amt}
                    onClick={() => setFormData({...formData, donation: amt})}
                    className={`px-6 py-3 rounded-xl font-extrabold text-xs transition-all border-2 ${
                      formData.donation === amt ? 'bg-[#2D6A4F] text-white border-[#2D6A4F]' : 'bg-[#FEFAE0] text-[#1B2A22]/40 border-[#1B2A22]/5'
                    }`}
                  >
                    {amt === 0 ? 'None' : `+₹${amt}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#1B2A22] text-white p-8 rounded-[2rem] flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Grand Total</p>
                <h2 className="text-4xl font-extrabold heading-font">₹{total}</h2>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full md:w-auto bg-[#2D6A4F] hover:bg-emerald-600 px-8 py-4 rounded-full font-bold text-base shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                {loading ? 'Processing...' : `Confirm Pickup`} <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
