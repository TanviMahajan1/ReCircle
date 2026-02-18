
import React from 'react';
// Fix: Added Link to imports
import { Link } from 'react-router-dom';
// Fix: Consolidated and added User icon
import { 
  Package, 
  Truck, 
  History, 
  Ticket, 
  Settings, 
  ExternalLink,
  ChevronRight,
  Clock,
  Heart,
  User
} from 'lucide-react';

export default function DashboardPage() {
  const history = [
    { id: '#REC-99281', date: 'Oct 12, 2023', status: 'Delivered', type: 'NGO Donation', impact: '12 items' },
    { id: '#REC-81722', date: 'Sep 28, 2023', status: 'Sorted', type: 'Brand Exchange', impact: '5 items' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 text-center">
            <div className="w-20 h-20 bg-stone-100 rounded-full mx-auto mb-4 border-4 border-stone-50 flex items-center justify-center text-stone-400">
              <User size={40} />
            </div>
            <h3 className="font-bold text-stone-800">Siddharth Sharma</h3>
            <p className="text-stone-400 text-xs font-bold uppercase tracking-wider mb-6">Eco-Hero Level 4</p>
            <div className="flex justify-between text-xs font-bold text-stone-500 pt-4 border-t border-stone-50">
              <span>Impact Score</span>
              <span className="text-emerald-600">840 pts</span>
            </div>
          </div>

          <nav className="bg-white p-4 rounded-3xl shadow-sm border border-stone-100">
            <ul className="space-y-1">
              {[
                { icon: Package, label: 'Pickups', active: true },
                { icon: Ticket, label: 'My Vouchers', active: false },
                { icon: History, label: 'History', active: false },
                { icon: Heart, label: 'Tax Receipts', active: false },
                { icon: Settings, label: 'Settings', active: false },
              ].map((item, idx) => (
                <li key={idx}>
                  <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${item.active ? 'bg-emerald-50 text-emerald-700' : 'text-stone-500 hover:bg-stone-50 hover:text-stone-800'}`}>
                    <item.icon size={20} />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-8">
          {/* Active Status */}
          <div className="bg-emerald-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row justify-between md:items-center gap-6">
              <div className="space-y-2">
                <span className="bg-emerald-800 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md">In Progress</span>
                <h2 className="text-2xl font-bold">Active Pickup #REC-10293</h2>
                <p className="text-emerald-100 text-sm">Scheduled for Tomorrow, 3 PM - 6 PM</p>
              </div>
              <div className="flex gap-4">
                <button className="bg-white text-emerald-900 px-6 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-colors">Track Rider</button>
                <button className="bg-emerald-800 border border-emerald-700 px-6 py-3 rounded-xl font-bold">Edit Booking</button>
              </div>
            </div>
            <div className="mt-8 relative h-2 bg-emerald-800 rounded-full overflow-hidden">
              <div className="absolute h-full w-1/3 bg-emerald-400"></div>
            </div>
            <div className="flex justify-between mt-3 text-[10px] font-bold text-emerald-300 uppercase tracking-widest">
              <span>Booked</span>
              <span>Pickup Scheduled</span>
              <span>Sorted</span>
              <span>Delivered</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vouchers */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-stone-100 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-stone-800">My Vouchers</h3>
                <Link to="/exchange" className="text-emerald-600 font-bold text-sm">See All</Link>
              </div>
              <div className="space-y-4">
                <div className="bg-stone-50 border-2 border-dashed border-stone-200 p-4 rounded-2xl flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm font-black text-stone-300">Z</div>
                    <div>
                      <p className="font-bold text-stone-800">Zara - 20% Off</p>
                      <p className="text-xs text-stone-400">Valid till Dec 30</p>
                    </div>
                  </div>
                  <button className="bg-stone-800 text-white p-2 rounded-lg"><ExternalLink size={16}/></button>
                </div>
              </div>
            </div>

            {/* Recent History */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-stone-100 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-stone-800">History</h3>
                <button className="text-stone-400 font-bold text-sm">Download All</button>
              </div>
              <div className="space-y-4">
                {history.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center group cursor-pointer">
                    <div className="flex gap-4 items-center">
                      <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
                        <History size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-stone-800 text-sm">{item.type}</p>
                        <p className="text-[10px] text-stone-400 font-bold">{item.date} • {item.impact}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-stone-300 group-hover:text-stone-800 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
