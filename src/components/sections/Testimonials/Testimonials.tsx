import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { customerReviews, organizationsServed } from '../../../data/reviewHighlights';

const reviewsPerPage = 3;
const pageCount = Math.ceil(customerReviews.length / reviewsPerPage);

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
            Trusted by 300+ customers and 25+ companies for comfortable journeys, punctual pickups and professional service.
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
          <ul className="flex flex-wrap justify-center gap-3">
            {organizationsServed.map((organization) => (
              <li
                key={organization}
                className="rounded-full border border-[#D4AF66]/20 bg-[#171717] px-5 py-3 text-sm font-medium text-[#D9D9D9]"
              >
                {organization}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
