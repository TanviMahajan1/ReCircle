
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Wind, 
  Droplets, 
  Trash2, 
  TrendingUp,
  Globe
} from 'lucide-react';

const impactData = [
  { name: 'Jan', count: 400 },
  { name: 'Feb', count: 700 },
  { name: 'Mar', count: 1200 },
  { name: 'Apr', count: 900 },
  { name: 'May', count: 1500 },
  { name: 'Jun', count: 1800 },
];

const distributionData = [
  { name: 'NGO Donations', value: 75, color: '#059669' },
  { name: 'Recycled', value: 25, color: '#fbbf24' },
];

export default function ImpactDashboard() {
  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 space-y-10">
        <header className="text-center space-y-2">
          <h1 className="text-3xl md:text-5xl font-extrabold text-stone-900 heading-font">Global Impact</h1>
          <p className="text-stone-500 max-w-xl mx-auto text-sm font-medium">Tracking every gram of fabric to ensure a cleaner planet.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'CO2 Diverted', value: '185 Tons', icon: Wind, color: 'text-emerald-600', bg: 'bg-emerald-100' },
            { label: 'Water Saved', value: '4.2M L', icon: Droplets, color: 'text-blue-600', bg: 'bg-blue-100' },
            { label: 'Landfill Diverted', value: '12.5 Tons', icon: Trash2, color: 'text-amber-600', bg: 'bg-amber-100' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm flex items-center gap-4 border border-stone-100">
              <div className={`${stat.bg} ${stat.color} p-4 rounded-xl`}>
                <stat.icon size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-stone-900 heading-font">{stat.value}</h3>
                <p className="text-stone-400 font-bold text-[10px] uppercase tracking-widest">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-[2rem] border border-stone-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-stone-800 heading-font">Growth Trend</h3>
              <div className="flex items-center gap-1 text-emerald-600 text-[10px] font-extrabold uppercase tracking-widest">
                <TrendingUp size={12} /> +24% Month
              </div>
            </div>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={impactData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <YAxis hide />
                  <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '12px', border: 'none', fontSize: '12px'}} />
                  <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-stone-100 flex flex-col items-center">
            <h3 className="text-lg font-bold text-stone-800 self-start mb-6 heading-font">Distribution</h3>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <section className="bg-emerald-900 rounded-[2.5rem] p-10 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 opacity-10 -translate-y-1/4 translate-x-1/4">
            <Globe size={300} />
          </div>
          <div className="relative z-10 max-w-lg space-y-4">
            <h2 className="text-3xl font-bold heading-font">Connecting Communities</h2>
            <p className="text-emerald-100 text-sm leading-relaxed">
              Our real-time distribution tracks every pickup. From Mumbai to rural Rajasthan, your clothes make a real difference.
            </p>
            <div className="flex gap-3 pt-2">
              <button className="bg-white text-emerald-900 px-6 py-2 rounded-full font-bold text-xs hover:bg-emerald-50">
                Impact Map
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
