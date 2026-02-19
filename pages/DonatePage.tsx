import React, { useState } from 'react';
import { 
  Check, 
  ShoppingBag,
  Heart,
  ArrowRight,
  MapPin
} from 'lucide-react';
import { supabase } from '../supabaseClient.ts';

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

      if (firstDigit === 1 || firstDigit === 2) {
        fee = 100;
        zone = 'A';
      } else if (firstDigit >= 3 && firstDigit <= 6) {
        fee = 150;
        zone = 'B';
      } else {
        fee = 200;
        zone = 'C';
      }

      setPickupFee(fee);
      setZoneName(zone);
      setShowZone(true);
    } else {
      setShowZone(false);
      setPickupFee(150);
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
      const { error } = await supabase
        .from('pickups')
        .insert([{
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
        }]);

      if (error) throw error;

      setOrderId(generatedId);
      setSubmitted(true);
      showToast("🎉 Pickup booked successfully!");
    } catch (err: any) {
      console.error(err.message);
      alert('Failed to book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FEFAE0] flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl max-w-sm w-full text-center space-y-6">
          <div className="w-20 h-20 bg-[#D8F3DC] text-[#2D6A4F] rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
            <Check size={40} strokeWidth={3} />
          </div>
          <h2 className="text-3xl font-black text-[#1B2A22]">Booked!</h2>
          <div className="bg-[#FEFAE0] p-5 rounded-2xl text-left space-y-2">
            <p className="text-xs font-bold text-stone-400 uppercase">Order ID: {orderId}</p>
            <p className="text-xs font-bold text-stone-400 uppercase">Paid: ₹{total}</p>
          </div>
          <button onClick={() => window.location.href = '/'} className="w-full bg-[#1B2A22] text-white py-4 rounded-full font-bold">Done</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2D6A4F] py-20 px-6">
      <div className="max-w-2xl mx-auto space-y-10">
        <div className="text-center text-white space-y-2">
          <h1 className="text-4xl font-black">Schedule Your Pickup</h1>
          <p className="opacity-60 text-sm">Takes 2 minutes. Starting ₹100*</p>
        </div>

        {/* Pricing Info Section */}
        <div className="max-w-[650px] mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 text-white">
          <h4 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
            <MapPin size={16} className="text-[#E9C46A]" /> Location-Based Pricing
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-xl font-black text-[#E9C46A]">₹100</div>
              <div className="text-[10px] text-white/50 uppercase font-bold mt-1">Zone A</div>
            </div>
            <div className="text-center border-x border-white/10">
              <div className="text-xl font-black text-[#E9C46A]">₹150</div>
              <div className="text-[10px] text-white/50 uppercase font-bold mt-1">Zone B</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-black text-[#E9C46A]">₹200</div>
              <div className="text-[10px] text-white/50 uppercase font-bold mt-1">Zone C</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl space-y-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" required placeholder="Name" className="bg-stone-50 border border-stone-100 p-4 rounded-xl text-sm" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} />
              <input type="tel" required placeholder="Phone" className="bg-stone-50 border border-stone-100 p-4 rounded-xl text-sm" value={formData.phone} onChange={(e)=>setFormData({...formData, phone:e.target.value})} />
            </div>
            <textarea required placeholder="Address" className="w-full bg-stone-50 border border-stone-100 p-4 rounded-xl text-sm" rows={2} value={formData.address} onChange={(e)=>setFormData({...formData, address:e.target.value})} />
            
            <div className="form-group">
              <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Pin Code</label>
              <input type="text" maxLength={6} required placeholder="6-digit PIN" className="w-full bg-stone-50 border border-stone-100 p-4 rounded-xl text-sm font-black" value={formData.pincode} onChange={handlePincodeChange} />
              {showZone && <p className="text-xs font-bold text-emerald-600 mt-2">📍 Zone {zoneName} — Pickup fee: ₹{pickupFee}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input type="date" required className="bg-stone-50 border border-stone-100 p-4 rounded-xl text-sm" value={formData.date} onChange={(e)=>setFormData({...formData, date:e.target.value})} />
              <select className="bg-stone-50 border border-stone-100 p-4 rounded-xl text-sm" value={formData.bags} onChange={(e)=>setFormData({...formData, bags: parseInt(e.target.value)})}>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} {n===1?'Bag':'Bags'}</option>)}
              </select>
            </div>

            <div className="space-y-4">
              <div className="bg-[#FEFAE0] rounded-2xl p-6 space-y-3">
                 <div className="flex justify-between text-xs font-bold text-stone-400 uppercase tracking-widest">
                   <span>Pickup Fee</span>
                   <span id="pickupFeeVal">₹{pickupFee}</span>
                 </div>
                 <div className="flex justify-between text-xs font-bold text-stone-400 uppercase tracking-widest">
                   <span>Optional Donation</span>
                   <span>₹{formData.donation}</span>
                 </div>
                 <div className="h-px bg-stone-200"></div>
                 <div className="flex justify-between text-xl font-black text-[#1B2A22]">
                   <span>Total</span>
                   <span id="totalVal">₹{total}</span>
                 </div>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-[#1B2A22] text-white py-5 rounded-full font-black text-lg flex items-center justify-center gap-2 group">
                 {loading ? 'Processing...' : `Pay ₹${total} & Book`} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}