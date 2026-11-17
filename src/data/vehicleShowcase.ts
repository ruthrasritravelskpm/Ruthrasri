import { growingFleet } from './roadmap';
import { heroCars } from './heroCars';

export type VehicleChapterKey = 'exterior' | 'interior' | 'dashboard' | 'performance' | 'journey';

export interface VehiclePhoto {
  key: string;
  label: string;
  expectedPath: string;
  image?: string;
}

export interface VehicleChapter {
  key: VehicleChapterKey;
  label: string;
  title: string;
  description: string;
  photos: VehiclePhoto[];
}

export interface VehicleShowcaseItem {
  id: string;
  name: string;
  category: string;
  description: string;
  seatingCapacity: number;
  chapters: VehicleChapter[];
}

const vehiclePhotos: Record<string, { folder: string; exteriorFront: string; onRoad?: string }> = {
  '01': {
    folder: 'ertiga-2025',
    exteriorFront: '/images/cars/ruthrasri-travel-ertiga-1.jpg',
  },
  '02': {
    folder: 'innova-crysta',
    exteriorFront: '/images/cars/ruthrasri-travel-innova-crysta.jpg',
  },
  '03': {
    folder: 'dzire-2026',
    exteriorFront: '/images/cars/ruthrasri-travel-dzire-2026.jpg',
    onRoad: '/images/cars/ruthrasri-travel-dzire-3.jpg',
  },
  '04': {
    folder: 'force-traveller',
    exteriorFront: '/images/cars/ruthrasri-travel-force-traveller.jpg',
  },
  '05': {
    folder: 'dzire-2024',
    exteriorFront: '/images/cars/ruthrasri-travel-dzire-1.jpg',
  },
};

const photoDefinitions = [
  { key: 'exterior-front', label: 'Exterior · front view', chapter: 'exterior' },
  { key: 'exterior-side', label: 'Exterior · side view', chapter: 'exterior' },
  { key: 'exterior-rear', label: 'Exterior · rear view', chapter: 'exterior' },
  { key: 'interior-front-seats', label: 'Interior · front seats', chapter: 'interior' },
  { key: 'rear-passenger-seating', label: 'Interior · rear passenger seating', chapter: 'interior' },
  { key: 'dashboard-steering-wheel', label: 'Dashboard · steering wheel', chapter: 'dashboard' },
  { key: 'engine-compartment', label: 'Engine · compartment', chapter: 'performance' },
  { key: 'vehicle-on-road', label: 'Journey · vehicle on the road', chapter: 'journey' },
] as const;

const chapterCopy: Record<VehicleChapterKey, { label: string; title: string; description: (description: string) => string }> = {
  exterior: {
    label: 'Exterior',
    title: 'A closer look at the exterior',
    description: () => 'A clear front three-quarter view introduces this vehicle. Matching side and rear photos will complete the exterior story.',
  },
  interior: {
    label: 'Interior',
    title: 'Comfort, from the inside',
    description: () => 'A comfortable journey begins with the details inside. Add genuine front-seat and rear-passenger photos to show this vehicle’s actual cabin.',
  },
  dashboard: {
    label: 'Dashboard',
    title: 'A considered driving space',
    description: () => 'A dashboard and steering-wheel photo is needed to show this vehicle’s actual driving position and controls.',
  },
  performance: {
    label: 'Performance',
    title: 'Engine & performance',
    description: () => 'Engine specifications are not listed for this vehicle. We only feature technical details that have been verified.',
  },
  journey: {
    label: 'Journey',
    title: 'Ready for the miles ahead',
    description: (description) => description,
  },
};

const chapterPhotoKeys: Record<VehicleChapterKey, string[]> = {
  exterior: ['exterior-front', 'exterior-side', 'exterior-rear'],
  interior: ['interior-front-seats', 'rear-passenger-seating'],
  dashboard: ['dashboard-steering-wheel'],
  performance: ['engine-compartment'],
  journey: ['vehicle-on-road'],
};

export const vehicleShowcaseData: VehicleShowcaseItem[] = growingFleet.map((vehicle) => {
  const photoSet = vehiclePhotos[vehicle.id];
  const heroCar = heroCars.find(({ id }) => id === vehicle.id);

  if (!photoSet || !heroCar) {
    throw new Error(`Missing verified vehicle showcase data for fleet vehicle "${vehicle.id}".`);
  }

  const photos: VehiclePhoto[] = photoDefinitions.map(({ key, label }) => {
    const image = key === 'exterior-front'
      ? photoSet.exteriorFront
      : key === 'vehicle-on-road'
        ? photoSet.onRoad
        : undefined;

    return {
      key,
      label,
      expectedPath: `/images/fleet/${photoSet.folder}/${key}.webp`,
      ...(image ? { image } : {}),
    };
  });

  const chapters = (Object.keys(chapterCopy) as VehicleChapterKey[]).map((key) => {
    const copy = chapterCopy[key];
    return {
      key,
      label: copy.label,
      title: copy.title,
      description: copy.description(heroCar.description),
      photos: chapterPhotoKeys[key].map((photoKey) => {
        const photo = photos.find(({ key: currentKey }) => currentKey === photoKey);
        if (!photo) {
          throw new Error(`Missing "${photoKey}" photo slot for fleet vehicle "${vehicle.id}".`);
        }
        return photo;
      }),
    };
  });

  return {
    id: vehicle.id,
    name: vehicle.name,
    category: vehicle.category,
    description: heroCar.description,
    seatingCapacity: heroCar.seatingCapacity,
    chapters,
  };
});
