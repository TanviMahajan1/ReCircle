import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Ticket, 
  Leaf, 
  CheckCircle, 
  ArrowRight,
  TrendingUp,
  Wind,
  Droplets,
  Package,
  Truck,
  ShoppingBag,
  Users,
  BarChart3,
  Zap,
  Globe,
  Trash2,
  ArrowRightCircle,
  Sparkles,
  Tag,
  Star,
  X
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

const LiveImpactCounter = () => (
  <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[310px] border border-[#B7E4C7]/20 float-anim overflow-hidden relative">
    <div className="bg-[#1B2A22] text-white px-5 py-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-emerald-500 rounded-full pulse-dot"></div>
        <span className="font-bold text-[11px] uppercase tracking-wider">Live Impact</span>
      </div>
      <span className="text-[10px] opacity-60">Updated 1h ago</span>
    </div>

    <div className="p-5 space-y-4">
      <div>
        <h4 className="text-[0.7rem] letter-spacing-[2px] text-gray-400 font-bold uppercase mb-2">Today</h4>
        <div className="flex items-center gap-3 py-2 border-b border-black/5 font-extrabold text-lg text-[#1B2A22]">
          <span>🧺</span> <CountUp end={47} /> clothes donated
        </div>
        <div className="flex items-center gap-3 py-2 border-b border-black/5 font-extrabold text-lg text-[#1B2A22]">
          <span>🚚</span> <CountUp end={12} /> pickups completed
        </div>
      </div>

      <div>
        <h4 className="text-[0.7rem] letter-spacing-[2px] text-gray-400 font-bold uppercase mb-2">This Week</h4>
        <div className="flex items-center gap-3 py-2 border-b border-black/5 font-extrabold text-lg text-[#1B2A22]">
          <span>👕</span> <CountUp end={312} /> collected
        </div>
        <div className="flex items-center gap-3 py-2 border-b border-black/5 font-extrabold text-lg text-[#2D6A4F]">
          <span>🤝</span> <CountUp end={189} /> → NGOs
        </div>
        <div className="flex items-center gap-3 py-2 border-b border-black/5 font-extrabold text-lg text-[#F4A261]">
          <span>🛍️</span> <CountUp end={123} /> → Brands
        </div>
      </div>
    </div>

    <Link to="/donate" className="bg-[#D8F3DC] text-[#2D6A4F] px-5 py-3 block font-bold text-[0.82rem] hover:bg-[#B7E4C7] transition-colors flex items-center justify-between">
      <span>Join 1,200+ donors today</span>
      <ArrowRight size={14} />
    </Link>
  </div>
);

const Hero = () => (
  <section className="relative overflow-hidden bg-[#FEFAE0] py-16 md:py-24">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold text-[#1B2A22] leading-[1.1] heading-font">
          Your old clothes deserve a <em className="text-[#2D6A4F] not-italic relative inline-block">second life<span className="absolute bottom-1 left-0 w-full h-2 bg-[#E9C46A]/30 -z-10"></span></em>
        </h1>
        <p className="text-lg text-[#1B2A22]/70 max-w-lg leading-relaxed font-medium">
          Give away your used clothes and earn cash, coupons, or points in return. We handle pickup, sorting, and delivery — you just pack a bag.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <Link to="/donate" className="bg-[#2D6A4F] text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl hover:bg-[#1B2A22] transition-all flex items-center justify-center gap-2 group btn-shadow">
            Schedule Pickup — ₹50 <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/how-it-works" className="bg-white text-[#1B2A22] border-2 border-[#1B2A22]/10 px-8 py-4 rounded-full text-lg font-bold shadow-sm hover:border-[#2D6A4F] transition-all flex items-center justify-center">
            How It Works
          </Link>
        </div>
      </div>

      <div className="relative flex justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-emerald-100/30 rounded-full blur-3xl -z-10"></div>
        <LiveImpactCounter />
      </div>
    </div>
  </section>
);

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold heading-font text-[#1B2A22]">How ReCircle Works</h2>
          <p className="text-[#1B2A22]/50 max-w-lg mx-auto font-medium text-sm">From your doorstep to impact — we handle everything in between.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 items-stretch">
          <div className="step-card bg-[#FEFAE0] p-8 rounded-[2rem] card-hover transition-all relative group flex flex-col h-full border border-transparent hover:border-[#B7E4C7]">
            <div className="text-[#40916C] font-extrabold text-[3.5rem] leading-none mb-6 heading-font">01</div>
            <div className="flex-1 space-y-4">
              <h3 className="text-2xl font-bold heading-font text-[#1B2A22]">Book Your Pickup</h3>
              <p className="text-sm text-[#1B2A22]/60 leading-relaxed font-medium">
                Schedule a convenient time slot in under 2 minutes. Pack your used clothes in any bag at home. Pay ₹50 flat pickup fee online.
              </p>
              <div className="pt-2">
                <span className="bg-[#2D6A4F] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">₹50 flat fee</span>
                <p className="text-[10px] text-[#1B2A22]/40 font-bold mt-2 uppercase tracking-tighter">UPI · Cards · Net Banking accepted</p>
              </div>
            </div>
          </div>

          <div className="step-card bg-[#FEFAE0] p-8 rounded-[2rem] card-hover transition-all relative group flex flex-col h-full border border-transparent hover:border-[#B7E4C7]">
            <div className="text-[#40916C] font-extrabold text-[3.5rem] leading-none mb-6 heading-font">02</div>
            <div className="flex-1 space-y-4">
              <h3 className="text-2xl font-bold heading-font text-[#1B2A22]">Pickup & Delivery</h3>
              <p className="text-sm text-[#1B2A22]/60 leading-relaxed font-medium">
                Our driver arrives at your doorstep within 48 hours, collects your bag and delivers directly — to our brand partners or NGO partners based on your choice.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                   <span className="bg-[#2D6A4F] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Within 48 hrs</span>
                   <p className="text-[10px] text-[#1B2A22]/40 font-bold uppercase tracking-tighter">Real-time tracking via SMS</p>
                </div>
              </div>
            </div>
          </div>

          <div className="step-card bg-[#FEFAE0] p-8 rounded-[2rem] card-hover transition-all relative group flex flex-col h-full border border-transparent hover:border-[#B7E4C7]">
            <div className="text-[#40916C] font-extrabold text-[3.5rem] leading-none mb-6 heading-font">03</div>
            <div className="flex-1 space-y-4">
              <h3 className="text-2xl font-bold heading-font text-[#1B2A22]">Earn After Delivery</h3>
              <p className="text-sm text-[#1B2A22]/60 leading-relaxed font-medium">
                Once clothes are successfully delivered and quality-checked, you earn instantly. No delays, no hidden deductions.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                   <span className="bg-[#2D6A4F] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Within 3 days</span>
                   <p className="text-[10px] text-[#1B2A22]/40 font-bold uppercase tracking-tighter">Quality check ensures fair earnings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const EnhancedKPIs = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center space-y-3 mb-16">
        <h2 className="text-3xl md:text-5xl font-bold heading-font text-[#1B2A22]">ReCircle by the Numbers</h2>
        <p className="text-[#1B2A22]/50 max-w-lg mx-auto font-medium text-sm">Every pickup creates a ripple — for people, for the planet, and for your wallet.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-6 mb-8">
        <div className="bg-white p-8 rounded-[20px] shadow-sm border-l-4 border-l-[#2D6A4F] hover:-translate-y-1 transition-transform h-full">
          <div className="text-[2.2rem] font-extrabold text-[#2D6A4F] heading-font mb-2">🧺 <CountUp end={12400} suffix="+" /></div>
          <h4 className="font-bold text-lg text-[#1B2A22] mb-1">Clothes Collected</h4>
          <p className="text-xs text-stone-400 font-medium">Total bags picked up from homes</p>
        </div>
        
        <div className="hidden md:block text-2xl text-stone-300 opacity-40 font-bold">→</div>

        <div className="bg-[#D8F3DC] p-8 rounded-[20px] shadow-sm border-l-4 border-l-[#2D6A4F] hover:-translate-y-1 transition-transform h-full relative">
          <span className="absolute top-4 right-4 bg-[#2D6A4F] text-white px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest">58% of total</span>
          <div className="text-[2.2rem] font-extrabold text-[#2D6A4F] heading-font mb-2">🤝 <CountUp end={7600} suffix="+" /></div>
          <h4 className="font-bold text-lg text-[#1B2A22] mb-1">Delivered to NGOs</h4>
          <p className="text-xs text-[#2D6A4F]/60 font-medium">Goonj, Feeding India & partners</p>
        </div>

        <div className="hidden md:block text-2xl text-stone-300 opacity-40 font-bold">→</div>

        <div className="bg-[#FFF3E0] p-8 rounded-[20px] shadow-sm border-l-4 border-l-[#F4A261] hover:-translate-y-1 transition-transform h-full relative">
          <span className="absolute top-4 right-4 bg-[#F4A261] text-white px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest">42% of total</span>
          <div className="text-[2.2rem] font-extrabold text-[#F4A261] heading-font mb-2">🛍️ <CountUp end={4800} suffix="+" /></div>
          <h4 className="font-bold text-lg text-[#1B2A22] mb-1">Delivered to Brands</h4>
          <p className="text-xs text-[#F4A261]/60 font-medium">H&M, Zara, Uniqlo, Levi's</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-6">
        <div className="bg-white p-7 rounded-[20px] shadow-sm hover:-translate-y-1 transition-transform border border-black/5">
          <div className="text-2xl font-extrabold text-[#2D6A4F] heading-font mb-1">🚚 <CountUp end={890} suffix="+" /></div>
          <h4 className="font-bold text-sm text-[#1B2A22]">Total Pickups Completed</h4>
          <p className="text-[10px] text-stone-400 font-bold uppercase tracking-tight">Across 3 cities</p>
        </div>

        <div className="bg-[#1B2A22] p-7 rounded-[20px] shadow-sm hover:-translate-y-1 transition-transform text-white">
          <div className="text-2xl font-extrabold text-white heading-font mb-1">🌱 <CountUp end={6} suffix="" /> months</div>
          <h4 className="font-bold text-sm">Since Launch</h4>
          <p className="text-[10px] opacity-40 font-bold uppercase tracking-tight">Growing 40% MoM</p>
        </div>

        <div className="bg-white p-7 rounded-[20px] shadow-sm hover:-translate-y-1 transition-transform border border-black/5">
          <div className="text-2xl font-extrabold text-[#2D6A4F] heading-font mb-1">💰 ₹<CountUp end={420000} suffix="+" /></div>
          <h4 className="font-bold text-sm text-[#1B2A22]">Paid to Donors</h4>
          <p className="text-[10px] text-stone-400 font-bold uppercase tracking-tight">Directly via UPI transfers</p>
        </div>

        <div className="bg-white p-7 rounded-[20px] shadow-sm hover:-translate-y-1 transition-transform border border-black/5 relative">
          <span className="absolute top-4 right-4 bg-emerald-100 text-[#2D6A4F] px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest">Eco Impact</span>
          <div className="text-2xl font-extrabold text-[#2D6A4F] heading-font mb-1">🌍 <CountUp end={2.1} suffix="T" /></div>
          <h4 className="font-bold text-sm text-[#1B2A22]">CO₂ Emissions Avoided</h4>
          <p className="text-[10px] text-stone-400 font-bold uppercase tracking-tight">Eq. to planting 340 trees</p>
        </div>
      </div>
    </div>
  </section>
);

const CalculatorUI = () => {
  const [bags, setBags] = useState(2);
  const [activePath, setActivePath] = useState<'brand' | 'ngo'>('brand');

  // Updated formulas: 1 bag = approx 5 clothes
  const itemsCount = bags * 5;
  const brandCoupon = bags * 150;
  const brandNet = brandCoupon - 50;

  const ngoCredits = bags * 200;
  const ngoTaxBenefit = bags * 100;
  const ngoFamilies = bags * 2;
  const ngoCreditCashValue = Math.round(ngoCredits / 10);

  return (
    <div className="bg-[#1B2A22] text-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl border border-white/5 space-y-10">
      <div className="calc-toggle">
        <button 
          onClick={() => setActivePath('brand')}
          className={`toggle-btn ${activePath === 'brand' ? 'active-brand' : ''}`}
        >
          🛍️ Brand Exchange
        </button>
        <button 
          onClick={() => setActivePath('ngo')}
          className={`toggle-btn ${activePath === 'ngo' ? 'active-ngo' : ''}`}
        >
          🤝 NGO Donation
        </button>
      </div>

      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="flex justify-between items-end">
          <span className="text-lg font-bold heading-font opacity-80">How many bags are you donating?</span>
          <div className="text-right">
            <span className="text-5xl font-extrabold text-[#F4A261] heading-font">{bags}</span>
            <p className="text-[0.85rem] font-medium opacity-60 mt-1">{bags} bags ≈ approx {itemsCount} clothes</p>
          </div>
        </div>
        <input 
          type="range" min="1" max="10" step="1" 
          value={bags} 
          onChange={(e) => setBags(parseInt(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#F4A261]"
        />
      </div>

      <div className="relative min-h-[340px] md:min-h-[300px]">
        {/* Brand Results Panel */}
        <div className={`calc-results-panel ${activePath === 'brand' ? 'visible' : 'hidden'}`}>
          <div className="bg-[rgba(244,162,97,0.08)] border border-[rgba(244,162,97,0.2)] rounded-[20px] p-8">
            <div className="flex items-center gap-2 mb-6">
              <ShoppingBag className="text-[#F4A261]" size={20} />
              <div>
                <h3 className="font-bold text-base">Brand Exchange Results</h3>
                <p className="text-[0.82rem] opacity-50">for {bags} bags</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-[14px] p-5 text-center">
                <div className="text-[1.2rem] mb-2">🎟️</div>
                <div className="text-[1.4rem] font-extrabold text-[#E9C46A]">₹{brandCoupon}</div>
                <div className="text-[0.78rem] opacity-50 mt-1">Coupon Value</div>
              </div>
              <div className="bg-white/5 rounded-[14px] p-5 text-center">
                <div className="text-[1.2rem] mb-2">📦</div>
                <div className="text-[1.4rem] font-extrabold text-[#E9C46A]">~{itemsCount}</div>
                <div className="text-[0.78rem] opacity-50 mt-1">Clothes items</div>
              </div>
              <div className="bg-white/5 rounded-[14px] p-5 text-center">
                <div className="text-[1.2rem] mb-2">💸</div>
                <div className="text-[1.4rem] font-extrabold opacity-50">−₹50</div>
                <div className="text-[0.78rem] opacity-50 mt-1">Pickup fee</div>
              </div>
              <div className="bg-white/5 rounded-[14px] p-5 text-center">
                <div className="text-[1.2rem] mb-2">🎉</div>
                <div className="text-[1.4rem] font-extrabold text-[#6FCF97]">₹{brandNet}</div>
                <div className="text-[0.78rem] opacity-50 mt-1">Net value</div>
              </div>
            </div>
            
            <p className="text-center text-[0.78rem] opacity-40 mt-6">
              Coupon delivered via SMS within 7 days • Valid at H&M · Zara · Uniqlo · Levi's
            </p>
          </div>
        </div>

        {/* NGO Results Panel */}
        <div className={`calc-results-panel ${activePath === 'ngo' ? 'visible' : 'hidden'}`}>
          <div className="bg-[rgba(45,106,79,0.08)] border border-[rgba(45,106,79,0.3)] rounded-[20px] p-8">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="text-[#B7E4C7]" size={20} />
              <div>
                <h3 className="font-bold text-base">NGO Donation Results</h3>
                <p className="text-[0.82rem] opacity-50">for {bags} bags</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-[14px] p-5 text-center">
                <div className="text-[1.2rem] mb-2">⭐</div>
                <div className="text-[1.4rem] font-extrabold text-[#B7E4C7]">{ngoCredits} pts</div>
                <div className="text-[0.78rem] opacity-50 mt-1">Credits earned</div>
              </div>
              <div className="bg-white/5 rounded-[14px] p-5 text-center">
                <div className="text-[1.2rem] mb-2">🧾</div>
                <div className="text-[1.4rem] font-extrabold text-[#E9C46A]">~₹{ngoTaxBenefit}</div>
                <div className="text-[0.78rem] opacity-50 mt-1">Tax benefit (est. 80G)</div>
              </div>
              <div className="bg-white/5 rounded-[14px] p-5 text-center">
                <div className="text-[1.2rem] mb-2">👨‍👩‍👧</div>
                <div className="text-[1.4rem] font-extrabold text-[#B7E4C7]">~{ngoFamilies}</div>
                <div className="text-[0.78rem] opacity-50 mt-1">Families helped</div>
              </div>
              <div className="bg-white/5 rounded-[14px] p-5 text-center">
                <div className="text-[1.2rem] mb-2">💰</div>
                <div className="text-[1.4rem] font-extrabold text-[#6FCF97]">₹{ngoCreditCashValue}</div>
                <div className="text-[0.78rem] opacity-50 mt-1">Credit cash value</div>
              </div>
            </div>

            <p className="text-center text-[0.78rem] opacity-40 mt-6 italic">
              Credits redeemable for cash or pickup • Tax benefit is estimated, consult CA
            </p>
          </div>
        </div>
      </div>

      <p className="text-center text-[0.75rem] opacity-30 mt-8 italic">
        * Estimates based on average clothing quality. 
        Actual earnings may vary after quality check. 
        Tax benefit is indicative — consult your CA.
      </p>

      <div className="pt-8 flex justify-center">
        <Link 
          to="/donate" 
          className="bg-[#2D6A4F] hover:bg-emerald-600 px-12 py-5 rounded-full font-bold text-lg shadow-2xl transition-all active:scale-95 flex items-center gap-3"
        >
          Book Your {activePath === 'brand' ? 'Exchange' : 'Donation'} Now <ArrowRightCircle size={24} />
        </Link>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [selectedNGOId, setSelectedNGOId] = useState<string | null>(null);

  const brandPartners = [
    { emoji: "🛍️", name: "H&M", offer: "15% Discount Coupon" },
    { emoji: "👗", name: "Zara", offer: "Store Credits" },
    { emoji: "👕", name: "Uniqlo", offer: "Exchange Voucher" },
    { emoji: "👖", name: "Levi's", offer: "Discount on Denim" }
  ];

  const ngoPartners = [
    { id: 'goonj', emoji: '🤝', name: 'Goonj', location: 'Pan India', desc: "India's largest clothing redistribution NGO — turns urban surplus into rural dignity." },
    { id: 'feedingindia', emoji: '🍽️', name: 'Feeding India', location: 'Pan India', desc: "Fighting hunger and clothing poverty for underprivileged communities across urban India." },
    { id: 'helpage', emoji: '🧓', name: 'HelpAge India', location: 'Pan India', desc: "Supporting elderly citizens with clothing, healthcare, and dignity programs nationwide." },
    { id: 'giveindia', emoji: '💚', name: 'GiveIndia', location: 'Pan India', desc: "India's largest donation platform connecting verified NGOs with donors for maximum impact." },
  ];

  const selectedNGO = selectedNGOId ? NGO_DETAILS[selectedNGOId] : null;

  return (
    <div className="space-y-0">
      <Hero />
      <HowItWorks />
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl md:text-5xl font-bold heading-font text-[#1B2A22]">Trusted Network</h2>
            <p className="text-[#1B2A22]/50 max-w-lg mx-auto font-medium text-sm">Join the ecosystem making fashion circular.</p>
          </div>
          
          <div className="space-y-16">
            <div className="space-y-6">
              <h3 className="text-center font-bold text-stone-500 text-[0.8rem] uppercase tracking-[2px] mb-8">BRAND PARTNERS</h3>
              <div className="flex flex-wrap justify-center gap-6">
                {brandPartners.map((brand, idx) => (
                  <div key={idx} className="bg-white border border-[#B7E4C7] rounded-[16px] p-4 flex flex-col items-center min-w-[180px] shadow-sm hover:-translate-y-1 hover:border-[#2D6A4F] transition-all cursor-default">
                    <span className="text-2xl mb-2">{brand.emoji}</span>
                    <span className="font-bold text-[#1B2A22] text-sm mb-1">{brand.name}</span>
                    <span className="text-[#2D6A4F] font-bold text-[10px] uppercase tracking-wider">{brand.offer}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-[1px] bg-[#2D6A4F] opacity-20 w-full max-w-4xl mx-auto my-8"></div>

            <div className="space-y-6">
              <h3 className="text-center font-bold text-stone-500 text-[0.8rem] uppercase tracking-[2px] mb-8">NGO PARTNERS</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {ngoPartners.map(ngo => (
                  <div 
                    key={ngo.id} 
                    onClick={() => setSelectedNGOId(ngo.id)}
                    className="ngo-card bg-[#FEFAE0] p-6 rounded-[1.5rem] text-left border border-[#B7E4C7]/20 relative h-full flex flex-col"
                  >
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                    
                    <h4 className="font-extrabold heading-font text-lg text-[#1B2A22] mb-1">{ngo.emoji} {ngo.name}</h4>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#2D6A4F] mb-1">{ngo.location}</p>
                    <p className="text-xs text-[#1B2A22]/60 leading-tight flex-grow">{ngo.desc}</p>
                    <div className="flex justify-end mt-4 items-center gap-1 text-[#2D6A4F] text-[0.75rem] font-semibold">
                      Learn More →
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <EnhancedKPIs />
      
      <section className="py-24 bg-[#FEFAE0]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-bold heading-font text-[#1B2A22]">Calculate Your Earnings</h2>
            <p className="text-[#1B2A22]/50 font-medium text-sm">Toggle between paths to see exactly what you'll earn.</p>
          </div>
          <CalculatorUI />
        </div>
      </section>

      {/* NGO Detail Modal */}
      <div className={`ngo-modal-overlay ${selectedNGO ? 'open' : ''}`} onClick={(e) => { if(e.target === e.currentTarget) setSelectedNGOId(null); }}>
        {selectedNGO && (
          <div className="ngo-modal relative">
            <button className="close-modal" onClick={() => setSelectedNGOId(null)}>✕</button>
            
            <div className="h-[140px] w-full flex flex-col items-center justify-center" style={{ background: selectedNGO.banner }}>
              <div className="text-[2.5rem] mb-1">{selectedNGO.emoji}</div>
              <h2 className="text-white text-[1.8rem] font-[800] leading-none mb-1">{selectedNGO.title}</h2>
              <p className="text-white/80 text-[0.9rem] font-medium">{selectedNGO.tagline}</p>
            </div>

            <div className="p-8 md:p-10">
              <div className="space-y-8">
                <section>
                  <h3 className="text-[0.8rem] tracking-[2px] font-[700] uppercase mb-3 flex items-center gap-2" style={{ color: selectedNGO.color }}>🎯 THE MISSION</h3>
                  <p className="text-[0.92rem] leading-[1.8] text-[#1B2A22]">{selectedNGO.mission}</p>
                </section>

                <section>
                  <h3 className="text-[0.8rem] tracking-[2px] font-[700] uppercase mb-3 flex items-center gap-2" style={{ color: selectedNGO.color }}>📊 VERIFIED IMPACT</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {selectedNGO.impact.map((stat: any, i: number) => (
                      <div key={i} className="rounded-[12px] p-4 text-center" style={{ background: selectedNGO.bgColor }}>
                        <div className="text-[1.4rem] font-[800]" style={{ color: selectedNGO.color }}>{stat.num}</div>
                        <div className="text-[0.75rem] text-[#6B7280] mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-[0.8rem] tracking-[2px] font-[700] uppercase mb-3 flex items-center gap-2" style={{ color: selectedNGO.color }}>🏆 RECOGNITION</h3>
                  <ul className="space-y-2">
                    {selectedNGO.recognition.map((rec: string, i: number) => (
                      <li key={i} className="text-[0.88rem] text-[#1B2A22] flex items-start gap-2">
                        <span style={{ color: selectedNGO.color }}>✓</span> {rec}
                      </li>
                    ))}
                  </ul>
                </section>

                <a 
                  href={selectedNGO.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full text-center text-white py-4 rounded-full font-[700] text-lg transition-all hover:opacity-90 shadow-lg"
                  style={{ background: selectedNGO.color }}
                >
                  Visit {selectedNGO.title} Official Website →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}