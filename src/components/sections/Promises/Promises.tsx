import { CarFront, LocateFixed, PlaneTakeoff } from 'lucide-react';
import './promises.css';

const promises = [
  {
    title: '100% Airport Pickup Commitment',
    description:
      'If our driver fails to arrive within the confirmed airport pickup time window due to our service failure, we will refund your booking amount.',
    highlight: 'Delay caused by us? Get your booking amount back!',
    icon: PlaneTakeoff,
    featured: true,
  },
  {
    title: '24/7 GPS Live Vehicle Tracking',
    description:
      'Know where your vehicle is throughout your journey with GPS-enabled live tracking and 24/7 tracking support.',
    highlight: 'Your vehicle. Your visibility. 24/7.',
    icon: LocateFixed,
  },
  {
    title: 'Outstation Trips with Vehicles Under 3 Years Old',
    description:
      'We arrange well-maintained vehicles that are no more than 3 years old for outstation journeys, subject to availability.',
    highlight: 'Comfortable journeys with newer vehicles.',
    icon: CarFront,
  },
];

export function Promises() {
  return (
    <section id="promises" data-reveal aria-labelledby="promises-title">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <header className="promises-heading mx-auto max-w-3xl text-center">
          <p className="promises-eyebrow">Our Promises to You</p>
          <h2 id="promises-title" className="font-['Playfair_Display']">
            Your Journey. Our Responsibility.
          </h2>
          <p className="promises-subtitle">
            We believe great travel service is built on trust, punctuality and comfort. Here are the promises we make
            to every customer.
          </p>
        </header>

        <div className="promises-grid mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {promises.map(({ title, description, highlight, icon: Icon, featured }) => (
            <article
              key={title}
              className={`promise-card ${featured ? 'promise-card-featured' : ''}`}
            >
              <div className="promise-icon" aria-hidden="true">
                <Icon className="h-7 w-7" strokeWidth={1.8} />
              </div>
              {featured ? <p className="promise-priority">Our strongest assurance</p> : null}
              <h3>{title}</h3>
              <p className="promise-description">{description}</p>
              <p className="promise-highlight">{highlight}</p>
            </article>
          ))}
        </div>

        <p className="promises-trust">
          We don’t just take you places. We take responsibility for your journey.
        </p>
      </div>
    </section>
  );
}
