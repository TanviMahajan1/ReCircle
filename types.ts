
export interface BrandPartner {
  id: string;
  name: string;
  logo: string;
  offer: string;
  description: string;
}

export interface NGOPartner {
  id: string;
  name: string;
  logo: string;
  description: string;
  impact: string;
}

export interface PickupBooking {
  id: string;
  date: string;
  timeSlot: string;
  address: string;
  type: 'NGO' | 'BRAND';
  status: 'scheduled' | 'picked-up' | 'sorted' | 'delivered';
  fee: number;
  donation: number;
  itemsCount?: number;
}

export interface AnalysisResult {
  category: string;
  condition: string;
  material: string;
  suggestedPath: 'Donate' | 'Exchange';
  estimatedValue?: string;
}
