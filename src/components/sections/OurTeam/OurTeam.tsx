import { Building2, Clock3 } from 'lucide-react';
import { founder } from '../../../data/teamMembers';

function FounderProfile() {
  return (
    <article
      aria-label="Founder and owner"
      className="mt-10 grid overflow-hidden rounded-[28px] border border-[#E2E8F0] bg-white shadow-[0_8px_26px_rgba(23,55,70,0.06)] md:grid-cols-[0.9fr_1.1fr]"
    >
      <div className="group relative aspect-[4/3] overflow-hidden bg-[#E2E8F0] md:aspect-auto md:min-h-[360px]">
        <img
          src={founder.image}
          alt={founder.imageAlt}
          width="720"
          height="960"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#475569]">
          Sample photo
        </span>
      </div>

      <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B86B08]">Meet Our Founder</p>
        <h3 className="mt-2 font-['Playfair_Display'] text-3xl leading-tight text-[#173746] sm:text-4xl">
          {founder.name}
        </h3>
        <p className="mt-2 text-sm font-medium text-[#64748B]">{founder.designation}</p>

        <div className="mt-5 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF4E4] px-4 py-2 text-sm font-semibold text-[#9A5B0A]">
            <Clock3 className="h-4 w-4" aria-hidden="true" />
            {founder.experience} in travel
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] px-4 py-2 text-sm font-medium text-[#475569]">
            <Building2 className="h-4 w-4" aria-hidden="true" />
            Founded in {founder.foundedYear}
          </span>
        </div>

        <p className="mt-5 text-sm leading-7 text-[#475569]">{founder.introduction}</p>
      </div>
    </article>
  );
}

export function OurTeam() {
  return (
    <section id="team" data-reveal className="bg-[#F8FAFC] px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#B86B08]">Founder</p>
          <h2 className="font-['Playfair_Display'] text-3xl leading-tight text-[#173746] sm:text-4xl md:text-5xl">
            Meet Our Founder
          </h2>
        </header>

        <FounderProfile />
      </div>
    </section>
  );
}
