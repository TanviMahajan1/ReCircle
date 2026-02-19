import React, { useState, useEffect } from 'react';
import { 
  Check, 
  ShoppingBag,
  Heart,
  ArrowRight,
  ArrowRightCircle,
  MapPin
} from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function DonatePage({ showToast }: { showToast: (m: string) => void }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '',
    date: '',
    bags: 1,
    path: 'brand' as 'brand' | 'ngo',
    donation: 0
  });

  const [pickupFee, setPickupFee] = useState(150);
  const [zoneName, setZoneName] = useState('B');
  const [showZone, setShowZone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');

  const total = pickupFee + formData.donation;

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pin = e.target.value.replace(/\D/g, '').substring(0, 6);
    setFormData({ ...formData, pincode: pin });

    if (pin.length === 6) {
      const firstDigit = parseInt(pin.charAt(0));
      let fee = 150;
      let zone = 'B';

      // Zone A: Pin codes starting with 1,2 (Delhi/NCR) - ₹100
      if (firstDigit === 1 || firstDigit === 2) {
        fee = 100;
        zone = 'A';
      }
      // Zone B: Pin codes starting with 3,4,5,6 (Major cities) - ₹150
      else if (firstDigit >= 3 && firstDigit <= 6) {
        fee = 150;
        zone = 'B';
      }
      // Zone C: Pin codes starting with 7,8,9 (Remote areas) - ₹200
      else {
        fee = 200;
        zone = 'C';
      }

      setPickupFee(fee);
      setZoneName(zone);
      setShowZone(true);
    } else {
      setShowZone(false);
      setPickupFee(150); // Default
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address || formData.pincode.length !== 6) {
      alert("Please fill in all required fields including a 6-digit pin code.");
      return;
    }
    setLoading(true);
    
    try {
      const generatedId = `REC-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const { data, error } = await supabase
        .from('pickups')
        .insert([
          {
            order_id: generatedId,
            name: formData.name,
            phone: formData.phone,
            address: formData.address + ' (PIN: ' + formData.pincode + ')',
            pickup_date: formData.date,
            bags: formData.bags,
            path: formData.path,
            donation_amt: formData.donation,
            total_paid: total,
            status: 'scheduled'
          }
        ]);

      if (error) throw error;

      setOrderId(generatedId);
      setLoading(false);
      setSubmitted(true);
      showToast("🎉 Pickup booked! We'll WhatsApp you to confirm within 2 hours.");
    } catch (err: any) {
      console.error('Error booking pickup:', err.message);
      alert('Failed to book pickup. Please try again.');
      setLoading(false);
    }
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
              <span className="font-extrabold text-[#1B2A22]">{orderId}</span>
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

        {/* Pricing Info Section */}
        <div className="bg-white/5 border border-white/10 rounded-[1.5rem] p-6 text-white max-w-[650px] mx-auto">
          <h4 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
            <MapPin size={16} className="text-[#E9C46A]" /> Location-Based Pricing
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center space-y-1">
              <div className="text-xl font-black text-[#E9C46A]">₹100</div>
              <div className="text-[10px] font-bold text-white/50 uppercase tracking-tighter">Zone A</div>
              <div className="text-[8px] opacity-40 uppercase tracking-tighter">0-5 km</div>
            </div>
            <div className="text-center space-y-1 border-x border-white/10">
              <div className="text-xl font-black text-[#E9C46A]">₹150</div>
              <div className="text-[10px] font-bold text-white/50 uppercase tracking-tighter">Zone B</div>
              <div className="text-[8px] opacity-40 uppercase tracking-tighter">5-10 km</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-xl font-black text-[#E9C46A]">₹200</div>
              <div className="text-[10px] font-bold text-white/50 uppercase tracking-tighter">Zone C</div>
              <div className="text-[8px] opacity-40 uppercase tracking-tighter">10-15 km</div>
            </div>
          </div>
          <p className="text-[9px] text-center text-white/30 mt-4 italic uppercase tracking-widest font-bold">
            Enter your pin code below to see your exact pickup fee
          </p>
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

              <div className="form-group space-y-1.5">
                <label className="text-xs font-semibold text-[#1B2A22]/60 ml-1">Pin Code</label>
                <input 
                  type="text" required 
                  placeholder="Enter 6-digit pin code"
                  className="w-full bg-[#FEFAE0]/50 border border-[#B7E4C7]/40 rounded-xl px-4 py-3 focus:bg-white focus:ring-4 focus:ring-[#D8F3DC] focus:outline-none transition-all font-semibold text-sm"
                  value={formData.pincode}
                  onChange={handlePincodeChange}
                  maxLength={6}
                />
                {showZone && (
                  <div className="animate-in fade-in slide-in-from-top-1 text-[0.82rem] text-[#2D6A4F] mt-2 font-bold flex items-center gap-1">
                    📍 Zone {zoneName} — Pickup fee: ₹{pickupFee}
                  </div>
                )}
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

            {/* Price Summary */}
            <div className="bg-[#FEFAE0] rounded-[2rem] p-6 space-y-3 border border-stone-100">
              <div className="flex justify-between items-center text-sm font-bold text-[#1B2A22]/60">
                <span>Pickup Service Fee</span>
                <span>₹{pickupFee}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-[#1B2A22]/60">
                <span>Optional Donation</span>
                <span>₹{formData.donation}</span>
              </div>
              <div className="h-px bg-stone-200 my-2"></div>
              <div className="flex justify-between items-center text-lg font-black text-[#1B2A22]">
                <span>Total to Pay</span>
                <span>₹{total}</span>
              </div>
            </div>

            <div className="bg-[#1B2A22] text-white p-8 rounded-[2rem] flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Payable Total</p>
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