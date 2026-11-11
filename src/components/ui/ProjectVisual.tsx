import { Play } from "lucide-react";
import type { ReactNode } from "react";
import type { ProjectVariant } from "@/types";
import { withAlpha } from "@/lib/color";

interface ProjectVisualProps {
  variant: ProjectVariant;
  tint: string;
  caption?: string;
  index?: string;
  name?: string;
  stack?: string[];
  /** 1: interface mock, 2: layout blueprint, 3: type specimen. */
  frame?: 1 | 2 | 3;
  className?: string;
}

const PANEL = "rounded-[3px] border border-white/10 bg-white/[0.035]";

function Canvas({
  children,
  tint,
  caption,
  meta,
  className = "",
}: {
  children: ReactNode;
  tint: string;
  caption?: string;
  meta?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative h-full w-full overflow-hidden bg-[#0b0b0b] ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `radial-gradient(95% 75% at 78% 6%, ${withAlpha(tint, 0.17)}, transparent 62%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "25% 25%",
        }}
      />
      <div className="absolute inset-0 flex flex-col p-[4.5%]">
        <div className="flex shrink-0 items-center justify-between gap-3">
          <span className="mono-meta text-[9px] text-white/30">{caption}</span>
          <span className="mono-meta text-[9px] text-white/20">{meta}</span>
        </div>
        <div className="mt-[3.5%] min-h-0 flex-1">{children}</div>
      </div>
    </div>
  );
}

function StreamMock({ tint }: { tint: string }) {
  return (
    <div className="flex h-full flex-col gap-[3%]">
      <div
        className="relative flex-[1.9] overflow-hidden rounded-[3px] border border-white/10"
        style={{
          background: `linear-gradient(120deg, ${withAlpha(tint, 0.24)}, rgba(255,255,255,0.02) 58%, rgba(255,255,255,0.06))`,
        }}
      >
        <div className="absolute left-[5%] top-[14%] h-[9px] w-[42%] rounded-full bg-white/25" />
        <div className="absolute left-[5%] top-[27%] h-[7px] w-[24%] rounded-full bg-white/15" />
        <div
          className="absolute bottom-[13%] left-[5%] grid h-8 w-8 place-items-center rounded-full"
          style={{ backgroundColor: tint }}
        >
          <Play className="h-3 w-3 translate-x-[1px] fill-[#090909] text-[#090909]" />
        </div>
        <div className="absolute right-[5%] top-[14%] h-[7px] w-[12%] rounded-full bg-white/15" />
      </div>
      <div className="grid flex-1 grid-cols-4 gap-[2.5%]">
        {[0, 1, 2, 3].map((item) => (
          <div
            key={item}
            className={`${PANEL} relative`}
            style={{ marginTop: item % 2 === 0 ? 0 : "5%" }}
          >
            <div className="absolute inset-x-[12%] bottom-[12%] space-y-1.5">
              <div className="h-[4px] w-full rounded-full bg-white/15" />
              <div className="h-[4px] w-2/3 rounded-full bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommerceMock({ tint }: { tint: string }) {
  return (
    <div className="grid h-full grid-cols-5 gap-[3%]">
      <div
        className="relative col-span-3 overflow-hidden rounded-[3px] border border-white/10"
        style={{
          background: `radial-gradient(80% 80% at 50% 32%, ${withAlpha(tint, 0.24)}, rgba(255,255,255,0.02))`,
        }}
      >
        <div className="flex h-full flex-col justify-end p-[6%]">
          <div className="h-[8px] w-1/2 rounded-full bg-white/25" />
          <div className="mt-2 h-[6px] w-1/3 rounded-full bg-white/15" />
          <div className="mt-4 flex gap-1.5">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor:
                    dot === 0 ? tint : "rgba(255,255,255,0.18)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-2 grid grid-rows-2 gap-[5%]">
        {[0, 1].map((tile) => (
          <div key={tile} className={`${PANEL} relative`}>
            <span
              className="absolute right-[9%] top-[10%] h-[5px] w-[24%] rounded-full"
              style={{ backgroundColor: withAlpha(tint, 0.7) }}
            />
            <div className="absolute inset-x-[10%] bottom-[14%] h-[5px] rounded-full bg-white/12" />
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardMock({ tint }: { tint: string }) {
  return (
    <div className="flex h-full flex-col gap-[3%]">
      <div className="grid shrink-0 grid-cols-3 gap-[2.5%]">
        {[0, 1, 2].map((kpi) => (
          <div key={kpi} className={`${PANEL} p-[7%]`}>
            <div className="h-[5px] w-2/3 rounded-full bg-white/10" />
            <div
              className="mt-2 h-[9px] w-1/2 rounded-full"
              style={{ backgroundColor: withAlpha(tint, kpi === 0 ? 0.85 : 0.3) }}
            />
          </div>
        ))}
      </div>
      <div className={`${PANEL} relative min-h-0 flex-1 p-[5%]`}>
        <div className="flex h-full items-end gap-[3%]">
          {[38, 62, 45, 78, 55, 92, 70, 48, 66, 58].map((height, barIndex) => (
            <div
              key={barIndex}
              className="flex-1 rounded-t-[2px]"
              style={{
                height: `${height}%`,
                backgroundColor:
                  barIndex === 5
                    ? withAlpha(tint, 0.85)
                    : "rgba(255,255,255,0.10)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function KioskMock({ tint }: { tint: string }) {
  return (
    <div className="flex h-full flex-col justify-between gap-[4%]">
      <div className={`${PANEL} p-[6%]`}>
        <span className="mono-meta text-[9px] text-white/30">Ticket</span>
        <div className="mt-2 flex items-baseline gap-2">
          <span
            className="font-display text-[clamp(1.6rem,5.4vw,3.6rem)] leading-none tracking-[-0.03em]"
            style={{ color: tint }}
          >
            A—072
          </span>
        </div>
      </div>
      <ul className="space-y-[3%]">
        {["A—069", "A—070", "A—071"].map((ticket, rowIndex) => (
          <li
            key={ticket}
            className="flex items-center justify-between rounded-[2px] border border-white/10 bg-white/[0.025] px-[4%] py-[3.2%]"
          >
            <span className="mono-meta text-[9px] text-white/45">{ticket}</span>
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor:
                  rowIndex === 0 ? tint : "rgba(255,255,255,0.2)",
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function PharmacyMock({ tint }: { tint: string }) {
  return (
    <div className="grid h-full grid-cols-3 gap-[3%]">
      <div className={`col-span-2 ${PANEL} flex flex-col justify-between p-[4%]`}>
        {[0, 1, 2, 3, 4].map((row) => (
          <div
            key={row}
            className="flex items-center gap-[3%] border-b border-white/5 pb-[2.5%] last:border-0 last:pb-0"
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{
                backgroundColor:
                  row % 2 === 0 ? withAlpha(tint, 0.8) : "rgba(255,255,255,0.2)",
              }}
            />
            <span className="h-[4px] flex-1 rounded-full bg-white/12" />
            <span className="h-[4px] w-[16%] rounded-full bg-white/10" />
          </div>
        ))}
      </div>
      <div className="col-span-1 flex flex-col gap-[6%]">
        {[0, 1, 2].map((shelf) => (
          <div
            key={shelf}
            className="flex-1 rounded-[3px] border border-white/10"
            style={{ backgroundColor: withAlpha(tint, 0.09 + shelf * 0.05) }}
          />
        ))}
      </div>
    </div>
  );
}

function HealthMock({ tint }: { tint: string }) {
  const marked = [3, 9, 10, 17, 24];
  return (
    <div className="flex h-full flex-col gap-[3%]">
      <div className="grid shrink-0 grid-cols-7 gap-[2.5%]">
        {Array.from({ length: 28 }).map((_, cell) => (
          <span
            key={cell}
            className="aspect-square rounded-[2px]"
            style={{
              backgroundColor: marked.includes(cell)
                ? withAlpha(tint, 0.75)
                : "rgba(255,255,255,0.07)",
            }}
          />
        ))}
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-end gap-[3%]">
        {[0, 1].map((record) => (
          <div
            key={record}
            className="flex items-center gap-[3%] rounded-[2px] border border-white/10 bg-white/[0.03] px-[3%] py-[3.5%]"
          >
            <span
              className="h-5 w-5 shrink-0 rounded-full"
              style={{ backgroundColor: withAlpha(tint, 0.25) }}
            />
            <span className="h-[5px] w-[40%] rounded-full bg-white/15" />
            <span className="ml-auto h-[5px] w-[12%] rounded-full bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

function HotelMock({ tint }: { tint: string }) {
  return (
    <div className="flex h-full flex-col gap-[3%]">
      <div className="flex shrink-0 items-center gap-[3%] rounded-[3px] border border-white/10 bg-white/[0.04] px-[4%] py-[3.5%]">
        {[0, 1, 2].map((field) => (
          <div key={field} className="flex-1 space-y-1.5">
            <div className="h-[3px] w-1/2 rounded-full bg-white/15" />
            <div className="h-[6px] w-2/3 rounded-full bg-white/25" />
          </div>
        ))}
        <span
          className="h-7 w-7 shrink-0 rounded-full"
          style={{ backgroundColor: tint }}
        />
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-3 gap-[2.5%]">
        {[0, 1, 2].map((room) => (
          <div
            key={room}
            className="relative overflow-hidden rounded-[3px] border border-white/10"
            style={{
              background: `linear-gradient(180deg, rgba(255,255,255,0.07), ${withAlpha(tint, 0.07 + room * 0.05)})`,
            }}
          >
            <div className="absolute inset-x-[10%] bottom-[10%] h-[5px] rounded-full bg-white/20" />
          </div>
        ))}
      </div>
    </div>
  );
}

function EstateMock({ tint }: { tint: string }) {
  const highlighted = [5, 6];
  return (
    <div className="relative h-full">
      <div className="grid h-full grid-cols-4 grid-rows-3 gap-[2.5%]">
        {Array.from({ length: 12 }).map((_, plot) => (
          <div
            key={plot}
            className="rounded-[2px] border"
            style={{
              borderColor: highlighted.includes(plot)
                ? withAlpha(tint, 0.55)
                : "rgba(255,255,255,0.08)",
              backgroundColor: highlighted.includes(plot)
                ? withAlpha(tint, 0.15)
                : "rgba(255,255,255,0.02)",
            }}
          />
        ))}
      </div>
      <div className="absolute bottom-[6%] right-[4%] w-[44%] rounded-[3px] border border-white/15 bg-[#141414]/95 p-[4%]">
        <div className="h-[6px] w-2/3 rounded-full bg-white/25" />
        <div className="mt-2 h-[5px] w-1/2 rounded-full bg-white/15" />
        <div className="mt-3 flex items-center justify-between">
          <span
            className="h-[5px] w-[30%] rounded-full"
            style={{ backgroundColor: withAlpha(tint, 0.8) }}
          />
          <span className="h-3 w-3 rounded-full border border-white/20" />
        </div>
      </div>
    </div>
  );
}

function MockBody({ variant, tint }: { variant: ProjectVariant; tint: string }) {
  switch (variant) {
    case "stream":
      return <StreamMock tint={tint} />;
    case "commerce":
      return <CommerceMock tint={tint} />;
    case "dashboard":
      return <DashboardMock tint={tint} />;
    case "kiosk":
      return <KioskMock tint={tint} />;
    case "pharmacy":
      return <PharmacyMock tint={tint} />;
    case "health":
      return <HealthMock tint={tint} />;
    case "hotel":
      return <HotelMock tint={tint} />;
    case "estate":
      return <EstateMock tint={tint} />;
    default:
      return null;
  }
}

function BlueprintBody({ tint, name }: { tint: string; name?: string }) {
  return (
    <div className="relative h-full">
      <div className="absolute inset-0 border border-dashed border-white/15" />
      <div className="absolute inset-x-0 top-[38%] border-t border-dashed border-white/12" />
      <div className="absolute inset-y-0 left-[62%] border-l border-dashed border-white/12" />
      <div
        className="absolute left-0 top-0 h-[38%] w-[62%] rounded-[2px]"
        style={{ backgroundColor: withAlpha(tint, 0.14) }}
      />
      <div className="absolute bottom-[8%] left-[4%] h-[6px] w-[26%] rounded-full bg-white/20" />
      <div className="absolute bottom-[8%] right-[4%] h-[6px] w-[12%] rounded-full bg-white/10" />
      <span
        className="absolute right-[4%] top-[6%] font-display text-[clamp(1.2rem,3.4vw,2.4rem)] leading-none"
        style={{ color: withAlpha(tint, 0.9) }}
      >
        {name?.charAt(0) ?? ""}
      </span>
    </div>
  );
}

function SpecimenBody({
  tint,
  name,
  stack,
}: {
  tint: string;
  name?: string;
  stack?: string[];
}) {
  return (
    <div className="flex h-full flex-col justify-between">
      <span
        className="font-display text-[clamp(1.5rem,6.4vw,4rem)] uppercase leading-[0.86] tracking-[-0.04em] text-ink"
      >
        {name}
      </span>
      <div className="space-y-2">
        <div className="h-px w-full" style={{ backgroundColor: withAlpha(tint, 0.6) }} />
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {(stack ?? []).map((item) => (
            <span key={item} className="mono-meta text-[9px] text-white/40">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Generated project previews.
 *
 * No screenshots were supplied, so rather than using unrelated stock imagery,
 * each project gets a deterministic interface study drawn with CSS — tinted by
 * the project's own accent and rendered in three honest variants: an interface
 * mock, a layout blueprint and a type specimen.
 */
export function ProjectVisual({
  variant,
  tint,
  caption,
  index,
  name,
  stack,
  frame = 1,
  className = "",
}: ProjectVisualProps) {
  return (
    <Canvas
      tint={tint}
      caption={caption}
      meta={index ? `ND / ${index}` : "ND"}
      className={className}
    >
      {frame === 1 ? <MockBody variant={variant} tint={tint} /> : null}
      {frame === 2 ? <BlueprintBody tint={tint} name={name} /> : null}
      {frame === 3 ? <SpecimenBody tint={tint} name={name} stack={stack} /> : null}
    </Canvas>
  );
}
