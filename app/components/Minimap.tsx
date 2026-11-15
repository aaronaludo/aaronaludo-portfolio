"use client";

import { useEffect, useId, useState } from "react";

// MOBA minimap nav. The page is the mid lane: every section is a mid tower, the hero
// walks from your base (bottom-left) to the enemy base as you scroll, and fog of war
// hides what the hero can't see. Clicking a tower pings it and jumps to that section.

type Section = { id: string; label: string };

const S = 200; // viewBox size
const BASE = { x: 28, y: 172 };
const ENEMY = { x: 172, y: 28 };
const mid = (t: number) => ({
  x: BASE.x + (ENEMY.x - BASE.x) * t,
  y: BASE.y + (ENEMY.y - BASE.y) * t
});

// decorative side-lane towers: [x, y, ally?]
const SIDE_TOWERS: [number, number, boolean][] = [
  [28, 128, true], [28, 84, true], [72, 172, true], [116, 172, true],
  [84, 28, false], [128, 28, false], [172, 72, false], [172, 116, false]
];
const CAMPS = [[96, 52], [56, 110], [144, 148], [150, 92], [118, 64], [80, 138]];

const C = {
  ground: "#121212",
  jungle: "#18211a",
  trees: "#26342a",
  river: "#1a2530",
  riverHi: "#2c3d4c",
  laneEdge: "#2a2a2a",
  lane: "#454545",
  base: "#1a1a1a",
  ally: "#f5f5f5",
  enemy: "#6b6b6b",
  camp: "#5a5a5a"
};

export default function Minimap({ sections }: { sections: Section[] }) {
  const uid = useId().replace(/:/g, "");
  const [progress, setProgress] = useState(0);
  const [heroT, setHeroT] = useState(0);
  const [active, setActive] = useState(-1);
  const [ping, setPing] = useState<{ x: number; y: number; k: number } | null>(null);

  // towers are evenly spaced on the lane even though sections aren't evenly sized
  const towerT = sections.map((_, i) => 0.12 + (0.76 * i) / Math.max(1, sections.length - 1));

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const line = window.innerHeight * 0.4; // a section is "reached" when its top crosses this
      const pos = window.scrollY + line;
      const end = max + line;
      const tops = sections.map((s) => (document.getElementById(s.id)?.getBoundingClientRect().top ?? 0) + window.scrollY);

      let current = -1; // -1 = still in base, before the first section
      tops.forEach((top, i) => {
        if (pos >= top) current = i;
      });
      // the last section can never scroll up past the line, so the page end claims it
      if (max > 0 && window.scrollY >= max - 2) current = sections.length - 1;

      // walk the hero between towers in proportion to progress through the current section
      let t: number;
      if (pos < tops[0]) {
        t = towerT[0] * Math.max(0, pos / tops[0]);
      } else {
        const from = tops[current];
        const to = tops[current + 1] ?? end;
        const frac = to > from ? Math.min(1, Math.max(0, (pos - from) / (to - from))) : 1;
        t = towerT[current] + frac * ((towerT[current + 1] ?? 1) - towerT[current]);
      }

      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      setActive(current);
      setHeroT(t);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- towerT derives from sections
  }, [sections]);

  const towers = sections.map((s, i) => ({ ...s, ...mid(towerT[i]) }));
  const hero = mid(heroT);

  const go = (t: (typeof towers)[number]) => {
    setPing((p) => ({ x: t.x, y: t.y, k: (p?.k ?? 0) + 1 }));
    document.getElementById(t.id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="space-y-2">
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted">minimap</p>
      <div className="rounded-md border border-line bg-black p-1">
        <svg viewBox={`0 0 ${S} ${S}`} className="block h-44 w-44" role="navigation" aria-label="Section minimap">
          <defs>
            <pattern id={`trees-${uid}`} width="9" height="9" patternUnits="userSpaceOnUse">
              <circle cx="2.5" cy="2.5" r="2.2" fill={C.trees} />
              <circle cx="7" cy="6.5" r="1.8" fill={C.trees} />
            </pattern>
            <radialGradient id={`vision-${uid}`}>
              <stop offset="55%" stopColor="black" />
              <stop offset="100%" stopColor="white" />
            </radialGradient>
            <mask id={`fog-${uid}`}>
              <rect width={S} height={S} fill="white" />
              <circle cx={hero.x} cy={hero.y} r="46" fill={`url(#vision-${uid})`} />
              <circle cx={BASE.x} cy={BASE.y} r="34" fill="black" />
            </mask>
          </defs>

          {/* ground + jungle */}
          <rect width={S} height={S} fill={C.ground} />
          {[
            "M36 36 H160 L36 160 Z",
            "M164 164 H40 L164 40 Z"
          ].map((d) => (
            <g key={d}>
              <path d={d} fill={C.jungle} stroke={C.jungle} strokeWidth="10" strokeLinejoin="round" />
              <path d={d} fill={`url(#trees-${uid})`} />
            </g>
          ))}

          {/* river */}
          <path d="M18 18 C60 40 58 82 100 100 S142 160 182 182" fill="none" stroke={C.river} strokeWidth="16" strokeLinecap="round" />
          <path d="M18 18 C60 40 58 82 100 100 S142 160 182 182" fill="none" stroke={C.riverHi} strokeWidth="5" strokeLinecap="round" strokeDasharray="1 6" />

          {/* lanes */}
          {[
            `M${BASE.x} ${BASE.y} V28 H${ENEMY.x}`,
            `M${BASE.x} ${BASE.y} H172 V${ENEMY.y}`,
            `M${BASE.x} ${BASE.y} L${ENEMY.x} ${ENEMY.y}`
          ].map((d) => (
            <g key={d}>
              <path d={d} fill="none" stroke={C.laneEdge} strokeWidth="11" strokeLinejoin="round" strokeLinecap="round" />
              <path d={d} fill="none" stroke={C.lane} strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" />
            </g>
          ))}

          {/* objectives in the river */}
          {[[66, 58], [134, 142]].map(([x, y]) => (
            <g key={`${x}`}>
              <circle cx={x} cy={y} r="6" fill={C.base} stroke={C.camp} strokeWidth="1.2" />
              <circle cx={x} cy={y} r="2" fill={C.camp} />
            </g>
          ))}
          {CAMPS.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="2.4" fill={C.camp} stroke={C.ground} strokeWidth="0.8" />
          ))}

          {/* bases */}
          <path d="M6 194 V140 Q6 134 12 134 Q58 140 66 188 Q66 194 60 194 Z" fill={C.base} stroke={C.laneEdge} strokeWidth="1.5" />
          <path d="M194 6 H140 Q134 6 134 12 Q140 58 188 66 Q194 66 194 60 Z" fill={C.base} stroke={C.laneEdge} strokeWidth="1.5" />
          <rect x={BASE.x - 6} y={BASE.y - 6} width="12" height="12" transform={`rotate(45 ${BASE.x} ${BASE.y})`} fill={C.ally} />
          <rect x={ENEMY.x - 6} y={ENEMY.y - 6} width="12" height="12" transform={`rotate(45 ${ENEMY.x} ${ENEMY.y})`} fill={C.enemy} />

          {SIDE_TOWERS.map(([x, y, ally]) => (
            <rect key={`${x}-${y}`} x={x - 3} y={y - 3} width="6" height="6" rx="1" fill={ally ? C.ally : C.enemy} stroke={C.ground} strokeWidth="1" />
          ))}

          {/* fog of war */}
          <rect width={S} height={S} fill="black" opacity="0.4" mask={`url(#fog-${uid})`} pointerEvents="none" />

          {/* mid towers = sections */}
          {towers.map((t, i) => {
            const taken = i <= active;
            return (
              <g key={t.id} className="cursor-pointer" onClick={() => go(t)}>
                <title>{t.label}</title>
                <circle cx={t.x} cy={t.y} r="11" fill="transparent" />
                {i === active ? (
                  <circle cx={t.x} cy={t.y} r="8.5" fill="none" stroke={C.ally} strokeWidth="1" strokeDasharray="2 2" />
                ) : null}
                <rect x={t.x - 4.5} y={t.y - 4.5} width="9" height="9" rx="1.5" fill={taken ? C.ally : "#1a1a1a"} stroke={taken ? C.ally : C.enemy} strokeWidth="1.4" />
                <rect x={t.x - 1.5} y={t.y - 1.5} width="3" height="3" fill={taken ? "#0a0a0a" : C.enemy} />
              </g>
            );
          })}

          {ping ? (
            <circle key={ping.k} className="mm-anim" cx={ping.x} cy={ping.y} r="4" fill="none" stroke={C.ally} strokeWidth="1.5" pointerEvents="none">
              <animate attributeName="r" from="4" to="18" dur="0.7s" fill="freeze" />
              <animate attributeName="opacity" from="1" to="0" dur="0.7s" fill="freeze" />
            </circle>
          ) : null}

          {/* hero */}
          <circle className="mm-anim" cx={hero.x} cy={hero.y} r="6" fill="none" stroke={C.ally} strokeWidth="1" pointerEvents="none">
            <animate attributeName="r" values="6;12" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <circle cx={hero.x} cy={hero.y} r="5.5" fill={C.ally} stroke="#000" strokeWidth="1.5" pointerEvents="none" />
        </svg>
      </div>
      <p className="font-mono text-[10px] text-muted">
        lane: <span className="text-fg">{sections[active]?.label ?? "Base"}</span> · {Math.round(progress * 100)}%
      </p>
    </div>
  );
}
