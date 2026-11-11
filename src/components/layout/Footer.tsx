import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SITE, SOCIALS } from "@/data/site";
import { BackToTop } from "@/components/ui/BackToTop";
import { Reveal } from "@/components/animations/Reveal";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg">
      <div className="shell pb-10 pt-16 md:pt-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-4">
            <p className="label">Let&rsquo;s build</p>
            <p className="font-display text-xl leading-snug text-ink">
              Available for freelance projects, product work and long-term
              collaborations.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="link-underline inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-dim hover:text-accent"
            >
              {SITE.email}
              <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
            </a>
          </div>

          <div className="flex flex-col gap-6 md:items-end">
            <BackToTop />
            {SOCIALS.length > 0 ? (
              <ul className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
                {SOCIALS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-underline font-mono text-[11px] uppercase tracking-[0.14em] text-dim hover:text-accent"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <Reveal className="mt-16" distance={20}>
          <Link to="/" aria-label="NickDevs — back to home" className="block">
            <span className="display block whitespace-nowrap text-[clamp(3.4rem,15.5vw,13rem)] leading-[0.8] tracking-[-0.06em] text-ink/90 transition-colors duration-500 hover:text-ink">
              NICKDEVS
            </span>
          </Link>
        </Reveal>

        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <p className="mono-meta text-faint">
            &copy; {year} NickDevs. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="mono-meta text-faint">{SITE.location}</span>
            <span className="mono-meta text-faint">Full Stack Web Developer</span>
            <span className="mono-meta text-faint">
              Designed &amp; built with intent
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
