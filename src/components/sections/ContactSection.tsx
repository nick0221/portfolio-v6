import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { SplitText } from "@/components/animations/SplitText";
import { Reveal } from "@/components/animations/Reveal";
import { SITE, SOCIALS } from "@/data/site";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard is unavailable (insecure context / denied permission).
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-20 overflow-hidden border-t border-line py-20 md:py-28 lg:py-36"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-[22vw] bottom-[-14vw] h-[46vw] w-[46vw] rounded-full border border-line/60" />
      </div>

      <div className="shell">
        <div className="flex items-center gap-4">
          <span className="label shrink-0">05</span>
          <span className="hairline flex-1" />
          <span className="label shrink-0">Contact</span>
        </div>

        <h2
          id="contact-heading"
          className="mt-8 text-[clamp(2.3rem,8.2vw,7.4rem)] uppercase leading-[0.9] tracking-[-0.05em]"
        >
          <SplitText
            text={"Have an idea?\nLet's build\nsomething meaningful."}
            stagger={0.035}
          />
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal distance={18}>
              <p className="body-lg max-w-md">
                Have a project in mind, need a developer, or simply want to
                collaborate? Let&rsquo;s talk.
              </p>
            </Reveal>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton
                href={`mailto:${SITE.email}`}
                variant="accent"
                icon={false}
              >
                Start a conversation
              </MagneticButton>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-dim transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                {copied ? (
                  <Check aria-hidden="true" className="h-3.5 w-3.5" />
                ) : (
                  <Copy aria-hidden="true" className="h-3.5 w-3.5" />
                )}
                {copied ? "Copied" : "Copy email"}
              </button>
            </div>

            <p aria-live="polite" className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
              {copied ? "Email address copied to clipboard" : "\u00A0"}
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <a
              href={`mailto:${SITE.email}`}
              className="group flex flex-wrap items-baseline justify-between gap-4 border-t border-line py-6"
            >
              <span className="font-display text-[clamp(1.3rem,3vw,2.4rem)] tracking-[-0.03em] transition-colors duration-300 group-hover:text-accent">
                {SITE.email}
              </span>
              <span className="mono-meta text-faint">Email</span>
            </a>

            {SOCIALS.length > 0 ? (
              <ul>
                {SOCIALS.map((social) => (
                  <li key={social.label} className="border-t border-line">
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex flex-wrap items-baseline justify-between gap-4 py-5"
                    >
                      <span className="font-display text-[clamp(1.2rem,2.4vw,1.8rem)] tracking-[-0.02em] transition-colors duration-300 group-hover:text-accent">
                        {social.label}
                      </span>
                      <span className="mono-meta text-faint">
                        {social.handle ?? "Profile"}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line py-5">
              <span className="label">Based in {SITE.location}</span>
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {SITE.availability}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
