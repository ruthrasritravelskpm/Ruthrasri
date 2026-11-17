import type { ServiceItem } from '../types';

export const services: ServiceItem[] = [
  {
    id: 'airport-pickup',
    title: 'Airport Pickup and Drop',
    description:
      'Airport pickup and drop for arrivals and departures, including Chennai airport transfers from Kanchipuram. Book at least 12 hours ahead to qualify for the airport commitments.',
    image: '/images/services/ruthrasri-travel-service-airport.png',
    alt: 'Illustration of an airport transfer sedan by Ruthrasri Travels',
    icon: 'PlaneTakeoff',
  },
  {
    id: 'outstation',
    title: 'Outstation Travel',
    description:
      'Outstation travel from Kanchipuram for longer journeys and group trips. Vehicles under three years old are arranged for outstation journeys, subject to availability.',
    image: '/images/services/ruthrasri-travel-service-outstation.png',
    alt: 'Ruthrasri Travels SUV on a highway for outstation journeys',
    icon: 'MapPinned',
  },
  {
    id: 'local-city',
    title: 'Local City Travel',
    description:
      'Local car rental and city rides in Kanchipuram, with comfortable transportation for everyday travel and family trips.',
    image: '/images/services/ruthrasri-travel-service-city.png',
    alt: 'Illustration of local city transport near a South Indian temple',
    icon: 'CarFront',
  },
  {
    id: 'corporate',
    title: 'Corporate Transportation',
    description:
      'Corporate transportation for business meetings, staff movement and executive transfers in Kanchipuram and serviceable areas.',
    image: '/images/services/ruthrasri-travel-service-corporate.png',
    alt: 'Corporate passengers and executive vehicles for Ruthrasri Travels',
    icon: 'Building2',
  },
  {
    id: 'weddings',
    title: 'Wedding and Special Events',
    description:
      'Wedding car rental and special-event transportation in Kanchipuram, coordinated around celebratory travel.',
    image: '/images/services/ruthrasri-travel-service-event.png',
    alt: 'Wedding event transportation arranged by Ruthrasri Travels',
    icon: 'Sparkles',
  },
];
