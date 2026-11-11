import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MARQUEE_SKILLS, SKILL_GROUPS } from "@/data/skills";
import { EASE_EXPO } from "@/components/animations/Reveal";

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_EXPO },
  },
};

export function ExpertiseSection() {
  const [activeId, setActiveId] = useState(SKILL_GROUPS[0].id);
  const reducedMotion = useReducedMotion();
  const activeGroup = SKILL_GROUPS.find((group) => group.id === activeId) ?? SKILL_GROUPS[0];

  return (
    <section
      id="expertise"
      aria-labelledby="expertise-heading"
      className="relative scroll-mt-20 border-t border-line py-20 md:py-28 lg:py-36"
    >
      <div className="shell">
        <SectionHeading
          id="expertise-heading"
          index="04"
          label="Expertise — Stack"
          title={"TOOLS OF\nTHE TRADE"}
          description="A working stack rather than a checklist — chosen for shipping, maintaining and staying boring where it counts."
        />
      </div>

      {/* Decorative repetition of the stack below; hidden so the same
          technology names are not announced twice. */}
      <div
        aria-hidden="true"
        className="relative mt-14 overflow-hidden border-y border-line py-4 md:mt-16"
      >
        <div className="marquee-track flex w-max items-center gap-8">
          {[...MARQUEE_SKILLS, ...MARQUEE_SKILLS].map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className="flex items-center gap-8 whitespace-nowrap font-display text-[clamp(1rem,1.8vw,1.5rem)] uppercase tracking-[-0.02em] text-dim/80"
            >
              {skill}
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent/70" />
            </span>
          ))}
        </div>
      </div>

      <div className="shell mt-14 md:mt-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="label">Categories</p>
            <ul className="mt-5 border-t border-line">
              {SKILL_GROUPS.map((group, index) => {
                const isActive = group.id === activeGroup.id;
                return (
                  <li key={group.id} className="border-b border-line">
                    <button
                      type="button"
                      onClick={() => setActiveId(group.id)}
                      aria-pressed={isActive}
                      className="group flex w-full items-center justify-between gap-4 py-4 text-left"
                    >
                      <span className="flex items-baseline gap-4">
                        <span
                          className={`mono-meta transition-colors duration-300 ${
                            isActive ? "text-accent" : "text-faint"
                          }`}
                        >
                          0{index + 1}
                        </span>
                        <span
                          className={`font-display text-[clamp(1.05rem,1.7vw,1.3rem)] tracking-[-0.02em] transition-colors duration-300 ${
                            isActive ? "text-ink" : "text-dim group-hover:text-ink"
                          }`}
                        >
                          {group.title}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={`h-px transition-all duration-500 ease-expo ${
                          isActive ? "w-8 bg-accent" : "w-4 bg-line group-hover:w-6"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
              <p className="body-lg max-w-sm">{activeGroup.caption}</p>
              <span className="mono-meta shrink-0 text-faint">
                {activeGroup.items.length} items
              </span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.ul
                key={activeGroup.id}
                variants={reducedMotion ? undefined : listVariants}
                initial={reducedMotion ? undefined : "hidden"}
                animate={reducedMotion ? undefined : "show"}
                exit={reducedMotion ? undefined : "hidden"}
                className="divide-y divide-line"
              >
                {activeGroup.items.map((item, index) => (
                  <motion.li
                    key={item.name}
                    variants={reducedMotion ? undefined : itemVariants}
                    className="group flex items-baseline justify-between gap-4 py-4"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="mono-meta w-6 shrink-0 text-faint">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="display text-[clamp(1.25rem,2.4vw,1.9rem)] transition-transform duration-500 ease-expo group-hover:translate-x-1 group-hover:text-accent">
                        {item.name}
                      </span>
                    </span>
                    {item.note ? (
                      <span className="label hidden shrink-0 sm:block">{item.note}</span>
                    ) : null}
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
