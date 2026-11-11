import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BIO, EDUCATION, ROLES, YEARS_OF_EXPERIENCE } from "@/data/experience";
import { SITE } from "@/data/site";

const KEYWORDS = [
  "PHP",
  "Laravel",
  "React",
  "TypeScript",
  "database",
  "interface",
  "internal systems",
];

const pattern = new RegExp(
  `(${KEYWORDS.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
  "gi",
);

/** Renders a paragraph with highlighted technical keywords. */
function Highlighted({ text }: { text: string }) {
  return (
    <>
      {text.split(pattern).map((part, index) =>
        KEYWORDS.some((word) => word.toLowerCase() === part.toLowerCase()) ? (
          <mark
            key={`${part}-${index}`}
            className="bg-transparent text-ink underline decoration-accent/50 decoration-1 underline-offset-[6px]"
          >
            {part}
          </mark>
        ) : (
          <span key={`text-${index}`}>{part}</span>
        ),
      )}
    </>
  );
}

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative scroll-mt-20 border-t border-line bg-surface/30 py-20 md:py-28 lg:py-36"
    >
      <div className="shell">
        <SectionHeading
          id="about-heading"
          index="03"
          label="About — Background"
          title={"BUILDING SYSTEMS\nTHAT GET USED"}
          description="Eight-plus years of professional development, most of it close to real operations."
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-end gap-4 border-b border-line pb-6">
                <span className="display text-[clamp(4.5rem,11vw,9rem)] leading-[0.76] tracking-[-0.05em]">
                  {YEARS_OF_EXPERIENCE.replace("+", "")}
                  <span className="text-accent">+</span>
                </span>
                <span className="label mb-2 leading-relaxed">
                  Years of
                  <br />
                  experience
                </span>
              </div>

              <dl className="mt-6 space-y-4">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="label">Based in</dt>
                  <dd className="text-sm text-dim">{SITE.location}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="label">Focus</dt>
                  <dd className="text-sm text-dim">Full stack web</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="label">Core</dt>
                  <dd className="text-sm text-dim">PHP · Laravel · React</dd>
                </div>
              </dl>

              <div className="mt-8 border-t border-line pt-6">
                <p className="label">Education</p>
                <p className="mt-2 font-display text-lg leading-snug text-ink">
                  {EDUCATION.degree}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="space-y-6">
              {BIO.map((paragraph) => (
                <Reveal key={paragraph} distance={18}>
                  <p className="text-[clamp(1.05rem,1.5vw,1.35rem)] leading-[1.65] text-dim">
                    <Highlighted text={paragraph} />
                  </p>
                </Reveal>
              ))}
            </div>

            <ol className="mt-14 space-y-12">
              {ROLES.map((role, index) => (
                <li key={role.id} className="border-t border-line pt-6">
                  <div className="grid gap-4 md:grid-cols-12">
                    <div className="md:col-span-4">
                      <span className="label">0{index + 1}</span>
                      <p className="mt-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-faint">
                        {role.period}
                      </p>
                    </div>
                    <div className="md:col-span-8">
                      <h3 className="display text-[clamp(1.35rem,2.4vw,1.9rem)]">
                        {role.company}
                      </h3>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                        {role.position}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-dim">
                        {role.summary}
                      </p>
                      <ul className="mt-5 space-y-2.5">
                        {role.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex gap-3 text-sm leading-relaxed text-dim/90"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[0.6rem] h-px w-4 shrink-0 bg-line"
                            />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
