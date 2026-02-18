import { BrandPartner, NGOPartner } from './types';

export const BRANDS: BrandPartner[] = [
  {
    id: 'hm',
    name: 'H&M',
    logo: 'https://picsum.photos/seed/hm/200/200',
    offer: '15% Discount Voucher',
    description: 'Committed to circular fashion through garment collecting.'
  },
  {
    id: 'zara',
    name: 'Zara',
    logo: 'https://picsum.photos/seed/zara/200/200',
    offer: '20% Off New Collection',
    description: 'Closing the loop by giving garments a second life.'
  },
  {
    id: 'unq',
    name: 'Uniqlo',
    logo: 'https://picsum.photos/seed/unq/200/200',
    offer: 'Exchange Voucher',
    description: 'Innovation meets sustainability in every thread.'
  },
  {
    id: 'levis',
    name: 'Levi\'s',
    logo: 'https://picsum.photos/seed/levis/200/200',
    offer: '₹500 Discount on Denim',
    description: 'Support sustainable water use in denim production.'
  }
];

export const NGOS: NGOPartner[] = [
  {
    id: 'goonj',
    name: 'Goonj',
    logo: 'https://picsum.photos/seed/goonj/200/200',
    description: "India's largest clothing redistribution NGO — turns urban surplus into rural dignity.",
    impact: 'Helped 5M+ families across India.'
  },
  {
    id: 'feedingindia',
    name: 'Feeding India',
    logo: 'https://picsum.photos/seed/feedingindia/200/200',
    description: "Fighting hunger and clothing poverty for underprivileged communities across urban India.",
    impact: 'Reaching hungry souls across Pan India.'
  },
  {
    id: 'helpage',
    name: 'HelpAge India',
    logo: 'https://picsum.photos/seed/helpage/200/200',
    description: "Supporting elderly citizens with clothing, healthcare, and dignity programs nationwide.",
    impact: 'Supporting senior citizens across Pan India.'
  },
  {
    id: 'giveindia',
    name: 'GiveIndia',
    logo: 'https://picsum.photos/seed/giveindia/200/200',
    description: "India's largest donation platform connecting verified NGOs with donors for maximum impact.",
    impact: 'Connecting donors for maximum impact across Pan India.'
  }
];