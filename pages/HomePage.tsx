import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  ArrowRight,
  ShoppingBag,
  ArrowRightCircle,
  MapPin,
  CheckCircle,
  Package,
  Truck
} from 'lucide-react';

const NGO_DETAILS: Record<string, any> = {
  goonj: {
    emoji: '🤝',
    title: 'Goonj',
    tagline: 'Transforming urban surplus into rural development',
    banner: 'linear-gradient(135deg, #2D6A4F, #40916C)',
    mission: "Founded in 1999 by Ramon Magsaysay awardee Anshu Gupta, Goonj addresses clothing as a basic but overlooked human need. Goonj mobilizes urban surplus materials and converts them into tools for rural development through innovative programs like 'Cloth for Work' — where communities undertake infrastructure projects in exchange for material resources, ensuring dignity, not charity.",
    impact: [
      { num: '1999', label: 'Established' },
      { num: '23+', label: 'States Covered' },
      { num: '6M+ kg', label: 'Materials/Year' },
    ],
    recognition: [
      'Ramon Magsaysay Award (2015)',
      'Harvard Business School Case Study',
      'Featured by TIME Magazine',
    ],
    website: 'https://goonj.org',
    color: 'var(--green)',
    bgColor: 'var(--green-bg)'
  },
  feedingindia: {
    emoji: '🍽️',
    title: 'Feeding India',
    tagline: 'A Zomato initiative fighting hunger across India',
    banner: 'linear-gradient(135deg, #FF6B35, #F4A261)',
    mission: "Founded in 2014 by Ankit Kawatra and Srishti Jain, Feeding India (now part of Zomato) works to eliminate hunger and malnutrition. They rescue surplus food from restaurants, events, and corporates, and redistribute it to communities in need while also running daily feeding programs for children and families.",
    impact: [
      { num: '2014', label: 'Founded' },
      { num: '200K+', label: 'Meals Daily' },
      { num: '80+', label: 'Cities' },
    ],
    recognition: [
      "Queen's Young Leader Award",
      'Acquired by Zomato (2019)',
      '21,500+ Volunteer Network',
    ],
    website: 'https://www.feedingindia.org',
    color: 'var(--orange)',
    bgColor: '#FFF3E0'
  },
  helpage: {
    emoji: '🧓',
    title: 'HelpAge India',
    tagline: "Dignified care for India's elderly",
    banner: 'linear-gradient(135deg, #7B1FA2, #AB47BC)',
    mission: "Established in 1978, HelpAge India is dedicated to supporting disadvantaged elderly persons. They provide mobile healthcare, cataract surgeries, clothing distribution, disaster relief, and livelihood support — ensuring seniors live with dignity, health, and security in their later years.",
    impact: [
      { num: '1978', label: 'Established' },
      { num: '26', label: 'States' },
      { num: '170+', label: 'Mobile Units' },
    ],
    recognition: [
      'UN Population Award 2020 (First Indian NGO)',
      'Padma Shri to Founder (2006)',
      '46+ Years of Service',
    ],
    website: 'https://www.helpageindia.org',
    color: '#7B1FA2',
    bgColor: '#F3E5F5'
  },
  giveindia: {
    emoji: '💚',
    title: 'GiveIndia',
    tagline: "India's most trusted donation platform",
    banner: 'linear-gradient(135deg, #1E88E5, #42A5F5)',
    mission: "Established in 2000, GiveIndia is India's largest and most trusted giving platform. They connect donors with verified NGOs across causes — education, healthcare, clothing, disaster relief — ensuring 100% transparency through rigorous due diligence and impact reporting.",
    impact: [
      { num: '2000', label: 'Founded' },
      { num: '2.6M+', label: 'Donors' },
      { num: '2,800+', label: 'Verified NGOs' },
    ],
    recognition: [
      'Credibility Alliance Accredited',
      'GuideStar India Transparency Certified',
      '15M+ Lives Impacted',
    ],
    website: 'https://www.giveindia.org',
    color: '#1E88E5',
    bgColor: '#E3F2FD'
  }
};

const CountUp = ({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return <span ref={nodeRef}>{count.toLocaleString()}{suffix}</span>;
};

const Hero = () => (
  <section className="relative overflow-hidden bg-[#FEFAE0] py-16 md:py-24">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold text-[#1B2A22] leading-[1.1] heading-font">
          Your old clothes deserve a <em className="text-[#2D6A4F] not-italic relative inline-block">second life<span className="absolute bottom-1 left-0 w-full h-2 bg-[#E9C46A]/30 -z-10"></span></em>
        </h1>
        <p className="text-lg text-[#1B2A22]/70 max-w-lg leading-relaxed font-medium">
          Give away your used clothes and earn cash, coupons, or points in return. We handle pickup, sorting, and delivery — you just pack a bag. Pickup fee: ₹100-200 based on your location.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <Link to="/donate" className="bg-[#2D6A4F] text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl hover:bg-[#1B2A22] transition-all flex items-center justify-center gap-2 group btn-shadow">
            Schedule Pickup — Starting ₹100 <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/how-it-works" className="bg-white text-[#1B2A22] border-2 border-[#1B2A22]/10 px-8 py-4 rounded-full text-lg font-bold shadow-sm hover:border-[#2D6A4F] transition-all flex items-center justify-center">
            How It Works
          </Link>
        </div>
      </div>
      <div className="relative flex justify-center">
        <div className="bg-white rounded-[24px] shadow-2xl p-6 w-full max-w-[310px] border border-[#B7E4C7]/20 float-anim overflow-hidden">
           <h4 className="font-bold text-xs uppercase tracking-widest text-[#2D6A4F] mb-4">Live Impact</h4>
           <div className="space-y-4">
             <div className="flex justify-between items-center border-b border-stone-100 pb-2">
               <span className="text-xs font-semibold opacity-60">Clothes Collected</span>
               <span className="font-black text-lg text-[#1B2A22]"><CountUp end={1240} /></span>
             </div>
             <div className="flex justify-between items-center border-b border-stone-100 pb-2">
               <span className="text-xs font-semibold opacity-60">Water Saved</span>
               <span className="font-black text-lg text-[#2D6A4F]"><CountUp end={4200} suffix="L" /></span>
             </div>
             <div className="flex justify-between items-center">
               <span className="text-xs font-semibold opacity-60">Families Helped</span>
               <span className="font-black text-lg text-[#F4A261]"><CountUp end={85} /></span>
             </div>
           </div>
        </div>
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center space-y-3 mb-16">
        <h2 className="text-3xl md:text-5xl font-bold heading-font text-[#1B2A22]">How ReCircle Works</h2>
        <p className="text-[#1B2A22]/50 max-w-lg mx-auto font-medium text-sm">From your doorstep to impact — we handle everything in between.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="step-card bg-[#FEFAE0] p-8 rounded-[2rem] border border-transparent hover:border-[#B7E4C7] transition-all group">
          <div className="text-[#40916C] font-extrabold text-[3.5rem] leading-none mb-6">01</div>
          <h3 className="text-2xl font-bold mb-4">Book Your Pickup</h3>
          <p className="text-sm text-[#1B2A22]/60 leading-relaxed font-medium">
            Schedule a convenient time slot in under 2 minutes. Pack your used clothes in any bag at home. Final price shown after entering your pin code.
          </p>
          <div className="mt-4 bg-[#2D6A4F] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block">
            ₹100-200 based on location
          </div>
        </div>
        <div className="step-card bg-[#FEFAE0] p-8 rounded-[2rem] border border-transparent hover:border-[#B7E4C7] transition-all">
          <div className="text-[#40916C] font-extrabold text-[3.5rem] leading-none mb-6">02</div>
          <h3 className="text-2xl font-bold mb-4">Pickup & Delivery</h3>
          <p className="text-sm text-[#1B2A22]/60 leading-relaxed font-medium">
            Our driver arrives at your doorstep within 48 hours, collects your bag and delivers directly to our partners.
          </p>
        </div>
        <div className="step-card bg-[#FEFAE0] p-8 rounded-[2rem] border border-transparent hover:border-[#B7E4C7] transition-all">
          <div className="text-[#40916C] font-extrabold text-[3.5rem] leading-none mb-6">03</div>
          <h3 className="text-2xl font-bold mb-4">Earn After Delivery</h3>
          <p className="text-sm text-[#1B2A22]/60 leading-relaxed font-medium">
            Once clothes are successfully delivered and quality-checked, you earn vouchers or impact points instantly.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const CalculatorUI = () => {
  const [bags, setBags] = useState(2);
  const [activePath, setActivePath] = useState<'brand' | 'ngo'>('brand');

  const itemsCount = bags * 12;
  const brandCoupon = bags * 150;
  const avgFee = 150;
  const brandNet = brandCoupon - avgFee;

  const ngoCredits = bags * 200;
  const ngoTaxBenefit = bags * 100;
  const ngoCreditValue = ngoCredits / 10;

  return (
    <div className="bg-[#1B2A22] text-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl border border-white/5 space-y-10">
      <div className="calc-toggle">
        <button onClick={() => setActivePath('brand')} className={`toggle-btn ${activePath === 'brand' ? 'active-brand' : ''}`}>🛍️ Brand Exchange</button>
        <button onClick={() => setActivePath('ngo')} className={`toggle-btn ${activePath === 'ngo' ? 'active-ngo' : ''}`}>🤝 NGO Donation</button>
      </div>

      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="flex justify-between items-end">
          <span className="text-lg font-bold opacity-80">Donation Bags</span>
          <div className="text-right">
            <span className="text-5xl font-extrabold text-[#F4A261]">{bags}</span>
            <p className="text-[0.85rem] font-medium opacity-60 mt-1">~{itemsCount} clothes</p>
          </div>
        </div>
        <input type="range" min="1" max="10" step="1" value={bags} onChange={(e) => setBags(parseInt(e.target.value))} className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#F4A261]" />
      </div>

      <div className="relative min-h-[340px]">
        {activePath === 'brand' ? (
          <div className="bg-[rgba(244,162,97,0.08)] border border-[rgba(244,162,97,0.2)] rounded-[20px] p-8 animate-in fade-in zoom-in-95">
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-xl">
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Coupon Value</p>
                  <p className="text-2xl font-black text-[#F4A261]">₹{brandCoupon}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl">
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Pickup Fee</p>
                  <p className="text-2xl font-black text-white/40">−₹100-200*</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl col-span-2 text-center">
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Net Value (Avg)</p>
                  <p className="text-4xl font-black text-[#6FCF97]">₹{brandNet}*</p>
                </div>
             </div>
          </div>
        ) : (
          <div className="bg-[rgba(45,106,79,0.08)] border border-[rgba(45,106,79,0.3)] rounded-[20px] p-8 animate-in fade-in zoom-in-95">
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-xl">
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Impact Credits</p>
                  <p className="text-2xl font-black text-[#B7E4C7]">{ngoCredits}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl">
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Tax Benefit (80G)</p>
                  <p className="text-2xl font-black text-[#E9C46A]">₹{ngoTaxBenefit}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl col-span-2 text-center">
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Credit Cash Value</p>
                  <p className="text-4xl font-black text-[#6FCF97]">₹{ngoCreditValue}*</p>
                </div>
             </div>
          </div>
        )}
      </div>
      <p className="text-center text-[0.7rem] opacity-30 italic mt-4">*Exact fee depends on your location. See price at checkout.</p>
    </div>
  );
};

const PartnerSection = ({ showToast }: { showToast: (m: string) => void }) => {
  const [partnerType, setPartnerType] = useState<'brand' | 'ngo'>('brand');

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const type = partnerType.toUpperCase();
    showToast(`✅ ${type} application submitted! We'll reach out soon.`);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section className="py-24 bg-white" id="partner">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 mb-12">
          <div className="bg-[#D8F3DC] text-[#2D6A4F] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[3px] w-fit mx-auto">Join ReCircle</div>
          <h2 className="text-3xl md:text-5xl font-bold heading-font text-[#1B2A22]">Partner With Us</h2>
          <p className="text-[#1B2A22]/50 font-medium text-sm max-w-xl mx-auto">Whether you're a brand committed to sustainability or an NGO serving communities — let's collaborate.</p>
        </div>

        <div className="flex bg-[#FEFAE0] rounded-full p-1.5 w-fit mx-auto mb-12 gap-1 shadow-inner border border-stone-200">
           <button onClick={() => setPartnerType('brand')} className={`partner-tab ${partnerType === 'brand' ? 'active' : ''}`}>🛍️ I'm a Brand</button>
           <button onClick={() => setPartnerType('ngo')} className={`partner-tab ${partnerType === 'ngo' ? 'active' : ''}`}>🤝 I'm an NGO</button>
        </div>

        <div className="max-w-[700px] mx-auto bg-[#FEFAE0] rounded-[2.5rem] p-10 md:p-12 border border-black/5">
          {partnerType === 'brand' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-xl font-bold text-[#1B2A22] mb-1">Brand Partnership Application</h3>
              <p className="text-xs text-stone-500 mb-8">Join brands like H&M, Zara, and Levi's in the circular fashion movement.</p>
              <form className="space-y-4" onSubmit={handlePartnerSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Brand Name *</label>
                    <input type="text" required className="form-input" placeholder="Your brand name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Industry *</label>
                    <select className="form-select" required>
                      <option value="">Select industry</option>
                      <option>Fashion & Apparel</option>
                      <option>Footwear</option>
                      <option>Accessories</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Contact Person *</label>
                    <input type="text" required className="form-input" placeholder="Full name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input type="email" required className="form-input" placeholder="contact@brand.com" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Stores in India</label>
                  <select className="form-select">
                    <option>1-5 stores</option>
                    <option>6-20 stores</option>
                    <option>21-50 stores</option>
                    <option>50+ stores</option>
                  </select>
                </div>
                <button type="submit" className="form-submit">🛍️ Submit Brand Application</button>
              </form>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-xl font-bold text-[#1B2A22] mb-1">NGO Partnership Application</h3>
              <p className="text-xs text-stone-500 mb-8">Join NGOs in receiving quality clothing donations directly from ReCircle donors.</p>
              <form className="space-y-4" onSubmit={handlePartnerSubmit}>
                <div className="form-group">
                  <label className="form-label">NGO Name *</label>
                  <input type="text" required className="form-input" placeholder="Your organization name" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Reg Number *</label>
                    <input type="text" required className="form-input" placeholder="12A / 80G" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Year Est *</label>
                    <input type="number" required className="form-input" placeholder="2015" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Contact Email *</label>
                  <input type="email" required className="form-input" placeholder="contact@ngo.org" />
                </div>
                <button type="submit" className="form-submit" style={{backgroundColor: 'var(--green)'}}>🤝 Submit NGO Application</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default function HomePage({ showToast }: { showToast: (m: string) => void }) {
  const [selectedNGOId, setSelectedNGOId] = useState<string | null>(null);
  const selectedNGO = selectedNGOId ? NGO_DETAILS[selectedNGOId] : null;

  return (
    <div className="space-y-0">
      <Hero />
      <HowItWorks />
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl md:text-5xl font-bold heading-font text-[#1B2A22]">Our Partners</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['goonj', 'feedingindia', 'helpage', 'giveindia'].map((id) => {
              const ngo = NGO_DETAILS[id];
              return (
                <div key={id} onClick={() => setSelectedNGOId(id)} className="ngo-card bg-[#FEFAE0] p-6 rounded-[1.5rem] border border-[#B7E4C7]/20 flex flex-col items-center text-center">
                  <span className="text-4xl mb-3">{ngo.emoji}</span>
                  <h4 className="font-bold text-lg">{ngo.title}</h4>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1">View Details</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#FEFAE0]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-center text-3xl font-bold mb-12">Earnings Calculator</h2>
          <CalculatorUI />
        </div>
      </section>

      <PartnerSection showToast={showToast} />

      {/* NGO Modal */}
      <div className={`ngo-modal-overlay ${selectedNGO ? 'open' : ''}`} onClick={(e) => e.target === e.currentTarget && setSelectedNGOId(null)}>
        {selectedNGO && (
          <div className="ngo-modal">
             <button className="close-modal" onClick={() => setSelectedNGOId(null)}>✕</button>
             <div className="h-40 flex flex-col items-center justify-center" style={{background: selectedNGO.banner}}>
               <span className="text-5xl">{selectedNGO.emoji}</span>
               <h2 className="text-white text-3xl font-black mt-2">{selectedNGO.title}</h2>
             </div>
             <div className="p-8 space-y-6">
               <p className="text-sm font-medium leading-relaxed">{selectedNGO.mission}</p>
               <div className="grid grid-cols-3 gap-3">
                 {selectedNGO.impact.map((i: any, idx: number) => (
                   <div key={idx} className="bg-stone-50 p-3 rounded-xl text-center">
                     <p className="font-black text-emerald-600 text-lg">{i.num}</p>
                     <p className="text-[8px] text-stone-400 font-bold uppercase">{i.label}</p>
                   </div>
                 ))}
               </div>
               <a href={selectedNGO.website} target="_blank" rel="noopener noreferrer" className="block w-full bg-[#2D6A4F] text-white py-4 rounded-full text-center font-bold">Visit Official Website</a>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}