import type { ServiceItem } from '../types';

export const services: ServiceItem[] = [
  {
    id: 'airport-pickup',
    title: 'Airport Pickup and Drop',
    description: 'Punctual, relaxed, and polished airport transfers for arriving and departing passengers.',
    image: '/images/services/ruthrasri-travel-service-airport.png',
    alt: 'Illustration of an airport transfer sedan by Ruthrasri Travels',
    icon: 'PlaneTakeoff',
  },
  {
    id: 'outstation',
    title: 'Outstation Travel',
    description: 'Comfort-first road journeys built for longer destinations and uninterrupted travel flow.',
    image: '/images/services/ruthrasri-travel-service-outstation.png',
    alt: 'Ruthrasri Travels SUV on a highway for outstation journeys',
    icon: 'MapPinned',
  },
  {
    id: 'local-city',
    title: 'Local City Travel',
    description: 'Reliable movement around the city with comfortable, well-managed transportation for daily needs.',
    image: '/images/services/ruthrasri-travel-service-city.png',
    alt: 'Illustration of local city transport near a South Indian temple',
    icon: 'CarFront',
  },
  {
    id: 'corporate',
    title: 'Corporate Transportation',
    description: 'Professional travel support for business meetings, staff movement and executive transfers.',
    image: '/images/services/ruthrasri-travel-service-corporate.png',
    alt: 'Corporate passengers and executive vehicles for Ruthrasri Travels',
    icon: 'Building2',
  },
  {
    id: 'weddings',
    title: 'Wedding and Special Events',
    description: 'Beautifully coordinated celebratory travel that keeps every moment smooth and memorable.',
    image: '/images/services/ruthrasri-travel-service-event.png',
    alt: 'Wedding event transportation arranged by Ruthrasri Travels',
    icon: 'Sparkles',
  },
];
