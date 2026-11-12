import { CarFront, LocateFixed, PlaneTakeoff } from 'lucide-react';
import './promises.css';

const otherPromises = [
  {
    title: '24/7 GPS Live Vehicle Tracking',
    tagline: 'Your Vehicle. Your Visibility. 24/7.',
    description:
      'Our GPS-enabled vehicles offer live tracking, so you can stay informed about your vehicle’s location and journey progress, with 24/7 tracking support.',
    highlight: 'Track your journey. Travel with confidence.',
    icon: LocateFixed,
  },
  {
    title: 'Outstation Trips – Vehicles Under 3 Years Old',
    tagline: 'Travel Comfortably. Travel Confidently.',
    description:
      'For outstation journeys, we arrange well-maintained vehicles that are no more than 3 years old, subject to availability.',
    highlight: 'Newer vehicles for a more comfortable journey.',
    icon: CarFront,
  },
];

export function Promises() {
  return (
    <section id="promises" data-reveal aria-labelledby="promises-title">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <header className="promises-heading mx-auto max-w-3xl text-center">
          <p className="promises-eyebrow">Our Promises. Your Peace of Mind.</p>
          <h2 id="promises-title" className="font-['Playfair_Display']">
            We Value Your Time. We Take Responsibility.
          </h2>
          <p className="promises-subtitle">
            At Ruthrasri Travels, we don’t just provide transportation. We take responsibility for making your
            journey comfortable, punctual and reliable.
          </p>
        </header>

        <article className="promise-card promise-card-airport mt-12">
          <div className="promise-airport-heading">
            <div className="promise-icon promise-icon-airport" aria-hidden="true">
              <PlaneTakeoff className="h-8 w-8" strokeWidth={1.8} />
            </div>
            <div>
              <p className="promise-priority">Our strongest customer commitment</p>
              <h3>Airport Pickup &amp; Drop – On-Time Guarantee</h3>
            </div>
            <p className="promise-booking-badge">24-hour advance booking required</p>
          </div>

          <p className="promise-eligibility">
            Airport pickup and drop bookings must be confirmed at least 24 hours before the scheduled journey to
            qualify for these commitments.
          </p>

          <div className="promise-airport-details">
            <div className="promise-commitments">
              <div className="promise-commitment">
                <span className="promise-commitment-number" aria-hidden="true">01</span>
                <p>
                  If our driver fails to arrive within the confirmed pickup time window due to our service failure,
                  we will refund your booking amount.
                </p>
              </div>
              <div className="promise-commitment">
                <span className="promise-commitment-number" aria-hidden="true">02</span>
                <p>
                  If a delay directly caused by Ruthrasri Travels results in a missed flight, we will cover your
                  flight ticket amount.
                </p>
              </div>
            </div>

            <p className="promise-flight-highlight">
              If our delay makes you miss your flight, we will pay your flight ticket amount.
            </p>
          </div>
        </article>

        <div className="promises-grid mt-5 grid gap-5 md:grid-cols-2">
          {otherPromises.map(({ title, tagline, description, highlight, icon: Icon }) => (
            <article key={title} className="promise-card promise-card-standard">
              <div className="promise-icon" aria-hidden="true">
                <Icon className="h-7 w-7" strokeWidth={1.8} />
              </div>
              <h3>{title}</h3>
              <p className="promise-tagline">{tagline}</p>
              <p className="promise-description">{description}</p>
              <p className="promise-highlight">{highlight}</p>
            </article>
          ))}
        </div>

        <footer className="promises-trust">
          <p className="promises-trust-title">Your Time Is Valuable. Your Journey Is Our Responsibility.</p>
          <p className="promises-trust-copy">
            Choose Ruthrasri Travels for dependable airport transfers, GPS-enabled journeys and comfortable
            outstation travel.
          </p>
        </footer>
      </div>
    </section>
  );
}
