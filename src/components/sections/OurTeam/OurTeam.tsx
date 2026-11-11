import { Building2, Clock3, Users } from 'lucide-react';
import { teamData } from '../../../data/teamMembers';
import type { DriverProfile } from '../../../data/teamMembers';

const teamStats = [
  { label: 'Professional Drivers', value: '16+', icon: Users },
  { label: 'Primary Drivers', value: '5', icon: Users },
  { label: 'Senior Drivers', value: '3', icon: Users },
  { label: 'Junior Drivers', value: '2', icon: Users },
  { label: 'Senior Experience', value: '8+ Years', icon: Clock3 },
  { label: 'Junior Experience', value: '3+ Years', icon: Clock3 },
];

function FounderProfile() {
  const founder = teamData.owner;

  return (
    <article
      aria-label="Founder and owner"
      className="mt-12 grid overflow-hidden rounded-[28px] border border-[#E2E8F0] bg-white shadow-[0_8px_26px_rgba(23,55,70,0.06)] md:grid-cols-[0.9fr_1.1fr]"
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

function DriverCard({ member }: { member: DriverProfile }) {
  return (
    <article className="group overflow-hidden rounded-[24px] border border-[#E2E8F0] bg-white shadow-[0_8px_26px_rgba(23,55,70,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(23,55,70,0.1)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#E2E8F0]">
        <img
          src={member.image}
          alt={member.imageAlt}
          width="720"
          height="960"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#475569]">
          Sample photo
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B86B08]">
              {member.designation}
            </p>
            <h4 className="mt-2 font-['Playfair_Display'] text-2xl text-[#173746]">{member.name}</h4>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#FFF4E4] px-3 py-2 text-xs font-semibold text-[#9A5B0A]">
            <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
            {member.experience}
          </span>
        </div>

        <p className="mt-4 min-h-14 text-sm leading-6 text-[#475569]">{member.description}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {member.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1.5 text-xs font-medium text-[#475569]"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function DriverGroup({
  title,
  experience,
  drivers,
  columns,
}: {
  title: string;
  experience: string;
  drivers: DriverProfile[];
  columns: 'senior' | 'junior';
}) {
  return (
    <section aria-label={title} className="mt-14 first:mt-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-['Playfair_Display'] text-2xl text-[#173746] sm:text-3xl">{title}</h3>
        <span className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-medium text-[#9A5B0A]">
          <Clock3 className="h-4 w-4" aria-hidden="true" />
          {experience} Experience
        </span>
      </div>

      <div className={`grid grid-cols-1 gap-5 md:grid-cols-2 ${columns === 'senior' ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}`}>
        {drivers.map((driver) => (
          <DriverCard key={driver.id} member={driver} />
        ))}
      </div>
    </section>
  );
}

export function OurTeam() {
  return (
    <section id="team" data-reveal className="bg-[#F8FAFC] px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#B86B08]">Our Team</p>
          <h2 className="font-['Playfair_Display'] text-3xl leading-tight text-[#173746] sm:text-4xl md:text-5xl">
            Meet Our Professional Team
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#475569] sm:text-base">
            Behind every comfortable journey is a dedicated team of experienced drivers. Meet the people who make every
            Ruthrasri Travels journey safe, reliable and memorable.
          </p>
        </header>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3" aria-label="Team experience statistics">
          {teamStats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-2xl border border-[#E2E8F0] bg-white px-4 py-5 text-center shadow-[0_8px_26px_rgba(23,55,70,0.05)] sm:px-5 sm:py-6"
            >
              <Icon className="mx-auto h-5 w-5 text-[#B86B08]" aria-hidden="true" />
              <p className="mt-2 font-['Playfair_Display'] text-2xl text-[#173746] sm:text-3xl">{value}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#64748B] sm:text-xs sm:tracking-[0.16em]">
                {label}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-4 text-center text-sm leading-6 text-[#64748B]">
          The five primary drivers featured below are supported by 11 additional professional drivers across our team.
        </p>

        <FounderProfile />

        <DriverGroup
          title="Experienced Senior Drivers"
          experience="8+ Years"
          drivers={teamData.seniorDrivers}
          columns="senior"
        />
        <DriverGroup
          title="Professional Junior Drivers"
          experience="3+ Years"
          drivers={teamData.juniorDrivers}
          columns="junior"
        />
      </div>
    </section>
  );
}
