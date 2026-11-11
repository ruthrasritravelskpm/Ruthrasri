export interface TeamProfile {
  id: string;
  name: string;
  designation: 'Founder & Owner' | 'Senior Driver' | 'Junior Driver';
  experience: string;
  phone: string;
  completedTrips: string;
  introduction: string;
  image: string;
  imageAlt: string;
}

interface OwnerProfile extends TeamProfile {
  designation: 'Founder & Owner';
  foundedYear: number;
}

export type DriverProfile = Pick<TeamProfile, 'id' | 'name' | 'experience' | 'image' | 'imageAlt'> & {
  designation: 'Senior Driver' | 'Junior Driver';
  description: string;
  skills: string[];
};

function createDriver(
  id: string,
  name: string,
  designation: DriverProfile['designation'],
  experience: string,
  description: string,
  skills: string[],
  image: string,
): DriverProfile {
  return {
    id,
    name,
    designation,
    experience,
    description,
    skills,
    image,
    imageAlt: `Sample placeholder portrait for ${name}; replace with the driver's actual photo`,
  };
}

export const teamData: {
  owner: OwnerProfile;
  seniorDrivers: DriverProfile[];
  juniorDrivers: DriverProfile[];
} = {
  owner: {
    id: 'owner',
    name: 'Jayabalan S',
    designation: 'Founder & Owner',
    experience: '15+ Years',
    foundedYear: 2015,
    phone: '',
    completedTrips: '',
    introduction: 'With over 15 years of experience in the travel industry, Jayabalam S, Founder of Ruthrasri Travels, has extensive travel experience across India. He can understand and communicate in English, ensuring smooth communication with customers from different regions. Since establishing Ruthrasri Travels in 2015, he has been committed to providing reliable, comfortable, and professional travel services.',
    image: '/images/team/ruthrasri-team-owner-placeholder.jpg',
    imageAlt: "Temporary stock portrait placeholder for Jayabalam S; replace with the founder's actual photo",
  },
  seniorDrivers: [
    createDriver(
      'senior-driver-1',
      'Hariharan',
      'Senior Driver',
      '8+ Years',
      'Knows Chennai and nearby areas exceptionally well, with 1,500+ completed trips.',
      ['Chennai City Expert', '1,500+ Trips', 'Local Navigation'],
      '/images/team/ruthrasri-team-senior-driver-1-placeholder.jpg',
    ),
    createDriver(
      'senior-driver-2',
      'Ram M.',
      'Senior Driver',
      '8+ Years',
      'BE graduate skilled in multiple vehicle types and adaptable to different travel needs.',
      ['BE Graduate', 'Multi-Vehicle Driving', 'Adaptable Driver'],
      '/images/team/ruthrasri-team-senior-driver-2-placeholder.jpg',
    ),
    createDriver(
      'senior-driver-3',
      'Pandiyan R',
      'Senior Driver',
      '8+ Years',
      'Combines driving skills with practical vehicle maintenance knowledge for outstation trips.',
      ['Driving & Mechanics', 'Vehicle Maintenance', 'Outstation Specialist'],
      '/images/team/ruthrasri-team-senior-driver-3-placeholder.jpg',
    ),
  ],
  juniorDrivers: [
    createDriver(
      'junior-driver-1',
      'Kumaran',
      'Junior Driver',
      '3+ Years',
      'Experienced in corporate transport, with a responsible focus on vehicle cleanliness and passenger comfort.',
      ['Corporate Duty Experience', 'Vehicle Cleanliness', 'Professional Service'],
      '/images/team/ruthrasri-team-junior-driver-1-placeholder.jpg',
    ),
    createDriver(
      'junior-driver-2',
      'Tamilarasan M',
      'Junior Driver',
      '3+ Years',
      'BE graduate with IT experience and clear communication for Indian and international customers.',
      ['BE Graduate', 'IT Background', 'Client Communication'],
      '/images/team/ruthrasri-team-junior-driver-2-placeholder.jpg',
    ),
  ],
};

export const teamMembers = [
  teamData.owner,
  ...teamData.seniorDrivers,
  ...teamData.juniorDrivers,
];
