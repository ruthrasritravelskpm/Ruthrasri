const tanglishReviews = [
  'The service was excellent. The driver arrived on time and was courteous throughout the journey.',
  'We travelled as a family and appreciated the clean vehicle and comfortable ride. We would recommend this service.',
  'Our experienced driver knew Chennai well and took us directly to our destination.',
  'The airport pickup was punctual and professionally arranged around our flight schedule.',
  'We booked a cab for an office trip and appreciated the smooth coordination and vehicle condition.',
  'The comfortable seating and smooth driving made our long-distance journey relaxing.',
  'The team responded promptly to our last-minute booking and provided helpful support.',
  'Our driver was courteous, drove safely and arrived on time. We would book again.',
  'We regularly use this dependable company transportation service and have had a positive experience.',
  'The vehicle was clean and well maintained, and the journey was smooth from start to finish.',
];

const internationalReviews = [
  'Excellent transportation service in Chennai. The driver was punctual, professional and very helpful throughout our journey.',
  'We had a wonderful experience. The vehicle was clean, comfortable and perfectly suited for our family trip.',
  'Very reliable airport transfer service. The driver arrived on time and made our arrival in Chennai stress-free.',
  'Professional service from booking to drop-off. Communication was clear and the entire journey was comfortable.',
  'As international visitors, we appreciated the friendly service and the driver’s excellent knowledge of local routes.',
  'The vehicle was in excellent condition, and the driver followed all safety practices. Highly recommended.',
  'Great experience during our business visit to Chennai. Timely pickups and excellent coordination.',
  'Comfortable long-distance journey with a courteous driver. Everything was arranged exactly as requested.',
  'A dependable travel partner for visitors. Booking was easy, and the service exceeded our expectations.',
  'We used their transportation for multiple days and received consistent, high-quality service every day.',
  'Excellent service and very respectful drivers. Our family felt comfortable and safe throughout the trip.',
  'Very punctual and professional. The airport pickup was smooth, and the driver was waiting when we arrived.',
  'A very comfortable travel experience. The vehicle was clean, spacious and well maintained.',
  'We really appreciated the hospitality and excellent customer support. Everything went according to plan.',
  'Reliable transportation with excellent time management. We would happily choose this service again.',
  'The driver was polite, experienced and careful on the road. A very pleasant journey for our family.',
  'Excellent coordination for our business travel. The team was responsive and handled our requirements professionally.',
  'We had a smooth journey with a professional driver. The entire service was organised very well.',
  'Great transportation service in Chennai. On-time arrival, clean vehicle and friendly customer support.',
  'One of the most comfortable travel experiences during our visit to India. Highly appreciated!',
];

const indianEnglishReviews = [
  'Excellent service with well-maintained vehicles and experienced drivers. A reliable choice for corporate transportation.',
  'Very professional team. The booking process was simple, and the vehicle arrived exactly on schedule.',
  'We have had a great travel experience. The driver was courteous, punctual and knowledgeable about the routes.',
  'Good quality service at every stage. The vehicle was clean, comfortable and suitable for long journeys.',
  'Highly dependable service for business meetings and airport transfers. Their coordination is excellent.',
  'The team handled our transportation requirements very efficiently. We appreciate their commitment to punctuality.',
  'Safe driving, polite staff and comfortable vehicles. Overall, a very satisfying experience.',
  'We booked their service for an outstation trip. Everything was well organised, and the journey was smooth.',
  'Excellent customer support and quick responses. They understand customer requirements and deliver accordingly.',
  'A trustworthy travel service with professional drivers and good vehicle maintenance.',
  'Our corporate travel experience was excellent. Timely pickups and consistent service made everything convenient.',
  'Very comfortable ride and excellent driver behaviour. I would definitely recommend their service.',
  'A great travel partner for both personal and professional transportation needs. Looking forward to using their service again.',
];

export const customerReviews = (() => {
  const verifiedRatings: Record<number, number> = { 1: 5, 2: 5, 3: 4 };
  const reviews: { id: number; review: string; label: string; rating?: number }[] = [];
  const groups = [
    { entries: tanglishReviews, label: 'Customer from Tamil Nadu' },
    { entries: internationalReviews, label: 'International visitor' },
    { entries: indianEnglishReviews, label: 'Indian traveler' },
  ];
  const reviewCount = Math.max(...groups.map(({ entries }) => entries.length));

  for (let index = 0; index < reviewCount; index += 1) {
    for (const [groupIndex, group] of groups.entries()) {
      const review = group.entries[index];
      if (!review) continue;

      const id = index + [1, 11, 31][groupIndex];
      reviews.push({ id, review, label: group.label, rating: verifiedRatings[id] });
    }
  }

  return reviews;
})();

export const organizationsServed = [
  'Applus+ IDIADA',
  'GRT Hotels',
  'MM Hotels',
  'Amara Raja',
  'Caterpillar',
  'L&T Datacenter',
];
