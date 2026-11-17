import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { customerReviews, organizationsServed } from '../../../data/reviewHighlights';

const reviewsPerPage = 3;
const pageCount = Math.ceil(customerReviews.length / reviewsPerPage);

function OrganizationCards({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul className="organizations-marquee-group" aria-hidden={duplicate || undefined}>
      {organizationsServed.map(({ name, logo, logoBackground }) => (
        <li
          key={name}
          className="group flex h-[128px] w-[188px] shrink-0 flex-col items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-4 py-4 text-center shadow-[0_8px_26px_rgba(23,55,70,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D9A441] hover:shadow-[0_16px_34px_rgba(23,55,70,0.12)]"
        >
          <div
            className="flex h-[58px] w-full items-center justify-center rounded-lg px-3"
            style={{ backgroundColor: logoBackground }}
          >
            <img
              src={logo}
              alt={`${name} logo`}
              width="150"
              height="58"
              loading="lazy"
              decoding="async"
              className="h-full max-h-12 w-full max-w-[150px] object-contain transition-transform duration-300 group-hover:scale-[1.04]"
            />
          </div>
          <span className="text-xs font-semibold text-[#173746]">{name}</span>
        </li>
      ))}
    </ul>
  );
}

export function Testimonials() {
  const [page, setPage] = useState(0);
  const firstReviewIndex = page * reviewsPerPage;
  const visibleReviews = Array.from({ length: reviewsPerPage }, (_, index) => (
    customerReviews[(firstReviewIndex + index) % customerReviews.length]
  ));

  return (
    <section className="bg-[#121212] py-24 text-white md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.32em] text-[#D4AF66]">
            Customer Reviews
          </p>
          <h2 className="font-['Playfair_Display'] text-4xl leading-tight text-white md:text-5xl">
            What passengers say
          </h2>
          <p className="mt-5 text-base leading-7 text-[#A5A5A5] md:text-lg">
            Trusted by 1000+ customers and 25+ companies for comfortable journeys, punctual pickups and professional service.
          </p>
        </header>

        <div className="mt-12 grid gap-5 md:grid-cols-3" aria-live="polite">
          {visibleReviews.map((item) => (
            <article
              key={item.id}
              className="flex min-h-56 flex-col rounded-[24px] border border-[#D4AF66]/20 bg-[#171717] p-6 sm:p-8"
            >
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.16em] text-[#D4AF66]">
                {item.label}
              </p>
              <p className="flex-1 text-sm leading-7 text-[#D9D9D9] sm:text-base">
                “{item.review}”
              </p>
              {item.rating ? (
                <div
                  className="mt-6 flex items-center gap-1 text-[#F0D69A]"
                  role="img"
                  aria-label={`${item.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${
                        item.rating !== undefined && index < item.rating ? 'fill-current' : 'text-white/30'
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => setPage((current) => (current - 1 + pageCount) % pageCount)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF66]/60 text-[#F0D69A] transition-colors hover:bg-[#D4AF66]/20"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <p className="min-w-24 text-center text-sm text-[#A5A5A5]" aria-label={`Review page ${page + 1} of ${pageCount}`}>
            {page + 1} / {pageCount}
          </p>
          <button
            type="button"
            onClick={() => setPage((current) => (current + 1) % pageCount)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF66]/60 text-[#F0D69A] transition-colors hover:bg-[#D4AF66]/20"
            aria-label="Next reviews"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-16 text-center">
          <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.24em] text-[#A5A5A5]">
            Organizations served
          </h3>
          <div className="organizations-marquee" role="region" aria-label="Organizations served">
            <div className="organizations-marquee-track">
              <OrganizationCards />
              <OrganizationCards duplicate />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
