import { SplitText } from "@/components/animations/SplitText";
import { Reveal } from "@/components/animations/Reveal";

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
}

/** Shared editorial section header: index rule, oversized title, side note. */
export function SectionHeading({
  index,
  label,
  title,
  description,
  className = "",
  titleClassName = "display-l",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        <span className="label shrink-0">{index}</span>
        <span className="hairline flex-1" />
        <span className="label shrink-0 text-right">{label}</span>
      </div>

      <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-12 lg:items-end lg:gap-8">
        <h2 className={`${titleClassName} lg:col-span-8`}>
          <SplitText text={title} />
        </h2>
        {description ? (
          <Reveal delay={0.1} className="lg:col-span-4 lg:justify-self-end">
            <p className="body-lg max-w-sm lg:text-right">{description}</p>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
