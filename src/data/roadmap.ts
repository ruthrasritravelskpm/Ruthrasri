import { heroCars } from './heroCars';

export interface JourneyMilestone {
  period: string;
  title: string;
  description: string;
}

interface GrowingFleetVehicle {
  id: string;
  name: string;
  category: string;
  image: string;
  alt: string;
}

export const journeyMilestones: JourneyMilestone[] = [
  {
    period: '2015',
    title: 'The first mile',
    description:
      'Founded by Jayabalan S, Ruthrasri Travels began with a commitment to dependable, comfortable journeys.',
  },
  {
    period: 'Every journey',
    title: 'Travel for every need',
    description:
      'From airport pickups and city rides to outstation, corporate, and special-event travel, we help customers get where they need to go.',
  },
  {
    period: 'Today',
    title: 'Built on customer trust',
    description:
      '15+ vehicles, 300+ customers served, and 25+ companies served—continuing our focus on reliable, comfortable travel.',
  },
];

export const journeyStats = [
  { value: 15, prefix: '', suffix: '+', label: 'Vehicles' },
  { value: 300, prefix: '', suffix: '+', label: 'Customers Served' },
  { value: 25, prefix: '', suffix: '+', label: 'Companies Served' },
  { value: 2015, prefix: 'Since ', suffix: '', label: 'Ruthrasri Travels' },
];

export const growingFleet: GrowingFleetVehicle[] = heroCars.map(({ id, name, category, image, alt }) => ({
  id,
  name,
  category,
  image,
  alt,
}));
