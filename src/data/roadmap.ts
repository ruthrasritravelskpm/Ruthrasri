import { heroCars } from './heroCars';

export interface JourneyMilestone {
  year: string;
  title: string;
  description: string;
  suggested?: boolean;
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
    year: '2015',
    title: 'The Beginning',
    description: 'Ruthrasri Travels started its journey.',
  },
  {
    year: '2017',
    title: 'First Fleet Expansion',
    description: 'Expanded our vehicle fleet.',
    suggested: true,
  },
  {
    year: '2019',
    title: 'Continued Growth',
    description: 'Invested in additional vehicles.',
    suggested: true,
  },
  {
    year: '2021',
    title: 'Moving Forward',
    description: 'Continued expanding our transportation services.',
    suggested: true,
  },
  {
    year: '2023',
    title: 'Growing Stronger',
    description: 'Further fleet expansion and improved services.',
    suggested: true,
  },
  {
    year: '2025–2026',
    title: 'Our Growth Today',
    description: 'A fleet of 15+ vehicles serving more than 300 customers and 25+ companies.',
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
