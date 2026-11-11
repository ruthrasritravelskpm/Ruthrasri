export interface HeroCar {
  id: string;
  name: string;
  heading: string;
  category: string;
  seatingCapacity: number;
  description: string;
  image: string;
  alt: string;
  ctaLabel: string;
  imageCredit?: {
    artist: string;
    license: string;
    source: string;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  icon: 'PlaneTakeoff' | 'MapPinned' | 'CarFront' | 'Building2' | 'Sparkles';
}

export interface BusinessInfo {
  phone: string;
  whatsapp: string;
  email: string;
  location: string;
  googleMapsUrl: string;
}

export interface NavItem {
  id: string;
  label: string;
}
