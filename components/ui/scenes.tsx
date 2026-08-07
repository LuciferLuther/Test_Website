"use client";

import { useId } from "react";

export function HakodateHarbourScene({ className = "" }: { className?: string }) {
  const sceneId = useId().replace(/:/g, "");
  const skyId = `hakodate-sky-${sceneId}`;
  const waterId = `hakodate-water-${sceneId}`;
  const glowId = `hakodate-glow-${sceneId}`;

  return (
    <svg className={`scene scene--hakodate ${className}`} viewBox="0 0 800 620" role="img" aria-label="Illustration of Hakodate harbour at Christmas">
      <defs>
        <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#201927" />
          <stop offset="0.62" stopColor="#5c3440" />
          <stop offset="1" stopColor="#c58d68" />
        </linearGradient>
        <linearGradient id={waterId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#252b38" />
          <stop offset="1" stopColor="#10151d" />
        </linearGradient>
        <filter id={glowId}><feGaussianBlur stdDeviation="7" /></filter>
      </defs>
      <rect width="800" height="620" fill={`url(#${skyId})`} />
      <circle cx="625" cy="112" r="54" fill="#f7ddb3" opacity=".82" />
      <path d="M0 350 110 260l65 65 118-132 96 98 90-76 119 116 89-104 113 128v70H0Z" fill="#171723" opacity=".9" />
      <path d="M0 420h800v200H0Z" fill={`url(#${waterId})`} />
      <g fill="#8e463d" stroke="#e5b46d" strokeWidth="4">
        <path d="M85 410v-92l86-52 86 52v92Z" />
        <path d="M254 410v-74l72-43 72 43v74Z" />
        <path d="M553 410v-98l88-52 88 52v98Z" />
      </g>
      <g fill="#ffd98b">
        {Array.from({ length: 12 }, (_, i) => <rect key={i} x={108 + (i % 4) * 34} y={332 + Math.floor(i / 4) * 28} width="15" height="11" rx="2" />)}
        {Array.from({ length: 8 }, (_, i) => <rect key={i} x={578 + (i % 4) * 35} y={328 + Math.floor(i / 4) * 30} width="15" height="11" rx="2" />)}
      </g>
      <g className="scene__tree">
        <path d="M470 168 392 362h156Z" fill="#274d3d" />
        <path d="M470 218 374 390h192Z" fill="#315f49" />
        <path d="M470 272 356 420h228Z" fill="#3e7559" />
        <rect x="459" y="400" width="22" height="36" fill="#5d3828" />
        <path d="m470 139 8 18 20 2-15 13 5 20-18-10-18 10 5-20-15-13 20-2Z" fill="#f3c66f" />
        {Array.from({ length: 28 }, (_, i) => {
          const x = 385 + ((i * 41) % 172);
          const y = 226 + ((i * 53) % 174);
          return <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 4 : 2.6} fill={i % 2 ? "#fff1b8" : "#cf5366"} />;
        })}
      </g>
      <g className="scene__firework" fill="none" stroke="#f3cf84" strokeWidth="3" opacity=".9">
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (Math.PI * 2 * i) / 12;
          return <path key={i} d={`M218 118 L${218 + Math.cos(angle) * 70} ${118 + Math.sin(angle) * 70}`} />;
        })}
      </g>
      <g opacity=".42" filter={`url(#${glowId})`} fill="#e7a768">
        <ellipse cx="470" cy="480" rx="115" ry="22" />
        <ellipse cx="168" cy="470" rx="84" ry="16" />
        <ellipse cx="640" cy="474" rx="96" ry="18" />
      </g>
      <g stroke="#d8b47b" opacity=".46">
        <path d="M350 470c80 14 154 14 238 0M70 492c102 16 186 14 274 0M440 530c110 15 205 14 310-2" />
      </g>
    </svg>
  );
}

export function OnsenSnowScene({ className = "" }: { className?: string }) {
  const sceneId = useId().replace(/:/g, "");
  const skyId = `onsen-sky-${sceneId}`;
  const waterId = `onsen-water-${sceneId}`;

  return (
    <svg className={`scene scene--onsen ${className}`} viewBox="0 0 800 620" role="img" aria-label="Illustration of a snowy Japanese onsen">
      <defs>
        <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dce6df" />
          <stop offset="1" stopColor="#f5ece0" />
        </linearGradient>
        <linearGradient id={waterId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#708e83" />
          <stop offset="1" stopColor="#344b49" />
        </linearGradient>
      </defs>
      <rect width="800" height="620" fill={`url(#${skyId})`} />
      <circle cx="625" cy="115" r="64" fill="#fff8e8" opacity=".8" />
      <path d="M0 348 122 215l89 78 111-151 119 152 92-92 113 111 81-76 73 83v150H0Z" fill="#97a69b" />
      <path d="M0 384 130 276l79 72 112-134 116 142 102-85 116 105 75-68 70 61v120H0Z" fill="#c4d0c6" />
      <path d="M0 430c132-48 229-28 330 12 120 48 272 14 470-34v212H0Z" fill="#f7f3eb" />
      <path d="M64 500c125-62 217-53 325-2 107 50 218 47 347-5v127H64Z" fill={`url(#${waterId})`} />
      <g className="scene__ryokan">
        <path d="M146 402h268v116H146Z" fill="#735044" />
        <path d="m115 405 165-92 165 92Z" fill="#46352f" />
        <path d="M188 425h47v62h-47Zm69 0h47v62h-47Zm69 0h47v62h-47Z" fill="#e7bd75" />
        <path d="M118 407h323" stroke="#fbf6e9" strokeWidth="12" />
      </g>
      <g fill="none" stroke="#fff" strokeWidth="12" strokeLinecap="round" opacity=".82">
        <path d="M103 402c28-18 54-25 84-23M292 337c36-14 78-7 114 16M523 360c45-13 85-8 119 16" />
      </g>
      <g fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" opacity=".55">
        <path d="M480 472c-35-35 24-45-3-82M550 454c-28-31 23-44-2-78M618 470c-31-38 21-48-5-91" />
      </g>
      {Array.from({ length: 36 }, (_, i) => (
        <circle key={i} cx={(i * 83) % 800} cy={40 + ((i * 67) % 370)} r={2 + (i % 4)} fill="#fff" opacity=".8" />
      ))}
    </svg>
  );
}

export function OtaruCanalScene({ className = "" }: { className?: string }) {
  const sceneId = useId().replace(/:/g, "");
  const skyId = `otaru-sky-${sceneId}`;
  const canalId = `otaru-canal-${sceneId}`;
  const lampGlowId = `otaru-lamp-glow-${sceneId}`;

  return (
    <svg className={`scene scene--otaru ${className}`} viewBox="0 0 800 620" role="img" aria-label="Illustration of Otaru canal on a snowy winter evening">
      <defs>
        <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#243044" />
          <stop offset="0.68" stopColor="#697582" />
          <stop offset="1" stopColor="#c9c1b4" />
        </linearGradient>
        <linearGradient id={canalId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#405663" />
          <stop offset="1" stopColor="#152a35" />
        </linearGradient>
        <filter id={lampGlowId} x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      <rect width="800" height="620" fill={`url(#${skyId})`} />
      <circle cx="648" cy="108" r="50" fill="#f6e7c4" opacity=".72" />
      <path d="M0 358 122 286 220 326 314 246 415 327 512 272 617 322 720 248 800 306v148H0Z" fill="#374654" opacity=".72" />
      <path d="M0 432c160-29 286-21 410 20 114 38 244 35 390-6v174H0Z" fill={`url(#${canalId})`} />
      <g fill="#6a5146" stroke="#d8b98a" strokeWidth="4">
        <path d="M35 322h122v139H35Z" />
        <path d="M164 295h132v166H164Z" />
        <path d="M304 334h119v127H304Z" />
      </g>
      <g fill="#e9c27f">
        {Array.from({ length: 13 }, (_, index) => (
          <rect key={index} x={59 + (index % 3) * 31 + Math.floor(index / 9) * 125} y={350 + Math.floor((index % 9) / 3) * 33} width="15" height="18" rx="2" />
        ))}
      </g>
      <path d="M0 451c117-17 222-12 328 12" fill="none" stroke="#f7f3eb" strokeWidth="28" strokeLinecap="round" />
      <path d="M474 450c93 21 203 19 326-12" fill="none" stroke="#f7f3eb" strokeWidth="25" strokeLinecap="round" />
      <path d="M327 459c63-40 107-40 153-2" fill="none" stroke="#7b6658" strokeWidth="16" strokeLinecap="round" />
      <path d="M326 452c63-40 109-40 156-2" fill="none" stroke="#f5eee4" strokeWidth="8" strokeLinecap="round" />
      {[118, 266, 531, 678].map((x, index) => (
        <g key={x}>
          <circle cx={x} cy={390 + (index % 2) * 12} r="28" fill="#f1c875" opacity=".28" filter={`url(#${lampGlowId})`} />
          <path d={`M${x} 458V${384 + (index % 2) * 12}`} stroke="#302b2a" strokeWidth="7" />
          <path d={`M${x - 12} ${390 + (index % 2) * 12}h24l-5-24h-14Z`} fill="#332c2a" />
          <circle cx={x} cy={386 + (index % 2) * 12} r="7" fill="#ffd98a" />
        </g>
      ))}
      <g opacity=".42" stroke="#d9b46f" strokeWidth="5">
        <path d="M80 506c108 19 211 17 306-2M436 526c99 16 197 13 294-7M176 557c101 14 190 12 276-3" />
      </g>
      {Array.from({ length: 46 }, (_, index) => (
        <circle key={index} cx={(index * 97) % 800} cy={24 + ((index * 61) % 390)} r={1.8 + (index % 4)} fill="#fff" opacity={0.48 + (index % 3) * 0.14} />
      ))}
    </svg>
  );
}

export function TraditionalStreetScene({ className = "" }: { className?: string }) {
  const sceneId = useId().replace(/:/g, "");
  const skyId = `street-sky-${sceneId}`;
  const roadId = `street-road-${sceneId}`;
  const lanternGlowId = `street-lantern-${sceneId}`;

  return (
    <svg
      className={`scene scene--street ${className}`}
      viewBox="0 0 800 620"
      role="img"
      aria-label="Illustration of a quiet traditional Japanese street in winter"
    >
      <defs>
        <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c7d1d0" />
          <stop offset="0.64" stopColor="#e5dfd5" />
          <stop offset="1" stopColor="#f1e7da" />
        </linearGradient>
        <linearGradient id={roadId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8b827a" />
          <stop offset="1" stopColor="#4a4544" />
        </linearGradient>
        <filter id={lanternGlowId} x="-90%" y="-90%" width="280%" height="280%">
          <feGaussianBlur stdDeviation="11" />
        </filter>
      </defs>
      <rect width="800" height="620" fill={`url(#${skyId})`} />
      <circle cx="650" cy="92" r="48" fill="#fff7e2" opacity=".72" />
      <path d="M0 260 116 194l86 54 112-92 104 85 92-76 103 88 95-64 92 71v154H0Z" fill="#aeb9b3" />
      <path d="M0 324 128 250l89 61 108-86 110 93 96-76 105 87 79-55 85 63v93H0Z" fill="#d7d8cf" />
      <path d="M314 620 376 329h48l71 291Z" fill={`url(#${roadId})`} />
      <path d="M346 620 391 333h18l50 287Z" fill="#b8aaa0" opacity=".42" />

      <g className="scene__machiya scene__machiya--left">
        <path d="M0 284h304v252H0Z" fill="#5b4037" />
        <path d="M0 267h318l-37-64H42Z" fill="#332b2a" />
        <path d="M0 272h305" stroke="#f4eee4" strokeWidth="16" />
        <path d="M32 318h95v173H32Zm127 0h111v173H159Z" fill="#7b5948" />
        <g stroke="#322826" strokeWidth="7">
          <path d="M50 326v153M75 326v153M100 326v153M176 326v153M202 326v153M228 326v153M254 326v153" />
          <path d="M35 375h89M35 431h89M162 375h105M162 431h105" />
        </g>
      </g>

      <g className="scene__machiya scene__machiya--right">
        <path d="M496 279h304v257H496Z" fill="#6b493c" />
        <path d="M480 266h320v-5l-46-66H523Z" fill="#332b2a" />
        <path d="M495 272h305" stroke="#f4eee4" strokeWidth="16" />
        <path d="M529 317h111v174H529Zm143 0h95v174h-95Z" fill="#8a624d" />
        <g stroke="#342926" strokeWidth="7">
          <path d="M546 326v153M572 326v153M598 326v153M624 326v153M690 326v153M716 326v153M742 326v153" />
          <path d="M532 375h105M532 431h105M675 375h89M675 431h89" />
        </g>
      </g>

      <g fill="#f2c275">
        <rect x="179" y="331" width="69" height="91" opacity=".78" />
        <rect x="551" y="331" width="69" height="91" opacity=".76" />
      </g>
      <g>
        {[145, 655].map((x) => (
          <g key={x}>
            <circle cx={x} cy="365" r="36" fill="#f2c46e" opacity=".3" filter={`url(#${lanternGlowId})`} />
            <path d={`M${x - 13} 344h26l-4 40h-18Z`} fill="#a63d42" />
            <path d={`M${x} 326v18M${x - 9} 354h18M${x - 8} 372h16`} stroke="#442624" strokeWidth="4" />
          </g>
        ))}
      </g>
      <g fill="#fff" opacity=".86">
        {Array.from({ length: 44 }, (_, index) => (
          <circle
            key={index}
            cx={(index * 109) % 800}
            cy={22 + ((index * 71) % 365)}
            r={1.5 + (index % 4)}
          />
        ))}
      </g>
      <g fill="none" stroke="#f7f2e9" strokeLinecap="round">
        <path d="M8 515c88-25 180-25 279-2" strokeWidth="22" />
        <path d="M515 515c100-24 188-22 277 2" strokeWidth="22" />
        <path d="M66 250c55-16 111-15 165 2M556 244c59-14 116-12 169 5" strokeWidth="10" />
      </g>
    </svg>
  );
}

export function ToriiPathScene({ className = "" }: { className?: string }) {
  const sceneId = useId().replace(/:/g, "");
  const skyId = `torii-sky-${sceneId}`;
  const pathId = `torii-path-${sceneId}`;
  const hazeId = `torii-haze-${sceneId}`;

  const gates = [
    { x: 92, y: 78, width: 616, height: 472, stroke: 28 },
    { x: 154, y: 131, width: 492, height: 377, stroke: 23 },
    { x: 208, y: 177, width: 384, height: 294, stroke: 19 },
    { x: 255, y: 217, width: 290, height: 222, stroke: 15 },
    { x: 294, y: 250, width: 212, height: 163, stroke: 12 },
  ];

  return (
    <svg
      className={`scene scene--torii ${className}`}
      viewBox="0 0 800 620"
      role="img"
      aria-label="Illustration of a path through red torii gates in Kyoto"
    >
      <defs>
        <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#26362f" />
          <stop offset="0.56" stopColor="#617466" />
          <stop offset="1" stopColor="#b5a991" />
        </linearGradient>
        <linearGradient id={pathId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cdbb9d" />
          <stop offset="1" stopColor="#554b42" />
        </linearGradient>
        <radialGradient id={hazeId} cx="50%" cy="56%" r="48%">
          <stop offset="0" stopColor="#ffe7b5" stopOpacity=".72" />
          <stop offset="1" stopColor="#ffe7b5" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="620" fill={`url(#${skyId})`} />
      <path d="M0 620V121c84 23 147 70 188 142 32 58 51 131 62 219L194 620Z" fill="#1e3327" />
      <path d="M800 620V104c-89 24-156 74-198 149-34 60-53 137-63 229L603 620Z" fill="#1d3126" />
      <g fill="#39553e" opacity=".9">
        {Array.from({ length: 20 }, (_, index) => (
          <circle
            key={`left-${index}`}
            cx={20 + ((index * 79) % 230)}
            cy={90 + ((index * 63) % 410)}
            r={28 + (index % 4) * 9}
          />
        ))}
        {Array.from({ length: 20 }, (_, index) => (
          <circle
            key={`right-${index}`}
            cx={550 + ((index * 83) % 235)}
            cy={70 + ((index * 67) % 430)}
            r={27 + (index % 5) * 8}
          />
        ))}
      </g>
      <path d="M280 620 363 346h74l94 274Z" fill={`url(#${pathId})`} />
      <ellipse cx="400" cy="340" rx="245" ry="225" fill={`url(#${hazeId})`} />
      <g fill="none" stroke="#bd3b30" strokeLinecap="square" strokeLinejoin="miter">
        {gates.map((gate, index) => {
          const right = gate.x + gate.width;
          const bottom = gate.y + gate.height;
          const cap = gate.stroke * 1.9;
          return (
            <g key={gate.width} opacity={1 - index * 0.08}>
              <path d={`M${gate.x + gate.stroke} ${gate.y + gate.stroke}V${bottom}`} strokeWidth={gate.stroke} />
              <path d={`M${right - gate.stroke} ${gate.y + gate.stroke}V${bottom}`} strokeWidth={gate.stroke} />
              <path d={`M${gate.x - cap} ${gate.y + gate.stroke * 0.2}H${right + cap}`} strokeWidth={gate.stroke * 0.9} />
              <path d={`M${gate.x} ${gate.y + gate.stroke * 1.55}H${right}`} strokeWidth={gate.stroke * 0.68} />
            </g>
          );
        })}
      </g>
      <g fill="#342723" opacity=".72">
        {gates.map((gate) => (
          <g key={`shadow-${gate.width}`}>
            <rect x={gate.x + gate.stroke * 0.73} y={gate.y + gate.stroke} width={gate.stroke * 0.28} height={gate.height} />
            <rect x={gate.x + gate.width - gate.stroke * 1.02} y={gate.y + gate.stroke} width={gate.stroke * 0.28} height={gate.height} />
          </g>
        ))}
      </g>
      <g fill="#eef2ec" opacity=".82">
        {Array.from({ length: 30 }, (_, index) => (
          <circle
            key={index}
            cx={(index * 127) % 800}
            cy={30 + ((index * 79) % 390)}
            r={1.5 + (index % 3)}
          />
        ))}
      </g>
      <path d="M194 580c61-25 118-31 170-18M433 559c63-12 119-5 173 19" fill="none" stroke="#efe9df" strokeWidth="13" strokeLinecap="round" opacity=".72" />
    </svg>
  );
}
