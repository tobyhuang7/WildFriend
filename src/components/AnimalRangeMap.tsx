import React, { useEffect, useMemo, useState } from 'react';
import { Compass, MapPin, Sparkles } from 'lucide-react';
import { AnimalProfileData } from '../types/wildlife';
import {
  resolveAnimalRangeRegions,
  WORLD_MAP_REGIONS,
  WorldMapRegion,
} from '../utils/habitatMapUtils';

interface AnimalRangeMapProps {
  profile: AnimalProfileData;
}

export const AnimalRangeMap: React.FC<AnimalRangeMapProps> = ({ profile }) => {
  const activeRegions = useMemo(
    () => resolveAnimalRangeRegions(profile),
    [profile]
  );

  const activeRegionIds = useMemo(
    () => new Set(activeRegions.map((r) => r.id)),
    [activeRegions]
  );

  const [selectedRegion, setSelectedRegion] = useState<WorldMapRegion | null>(
    activeRegions[0] || null
  );

  useEffect(() => {
    setSelectedRegion(activeRegions[0] || null);
  }, [activeRegions]);

  return (
    <div
      data-testid="animal-range-map"
      className="rounded-2xl border-2 border-[#1E2F23] bg-[#E0F2FE] overflow-hidden flex flex-col"
    >
      {/* Top Map Header & Legend Bar */}
      <div className="bg-[#FFFDF7] border-b-2 border-[#1E2F23] px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#2D6A4F] shrink-0" />
          <span className="text-xs sm:text-sm font-extrabold text-[#1E2F23]">
            Wild Range Map: Where {profile.commonName} Appears
          </span>
        </div>

        {/* Map Key / Legend */}
        <div className="flex items-center gap-3 text-[11px] sm:text-xs font-extrabold text-[#1E2F23]">
          <span className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="w-3.5 h-3.5 rounded-sm bg-[#2D6A4F] border-2 border-[#1E2F23] inline-block"
            />
            <span>Shaded Habitat Range ({activeRegions.length})</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-[#38513E]">
            <span
              aria-hidden="true"
              className="w-3.5 h-3.5 rounded-sm bg-[#EDE6D6] border border-[#1E2F23]/50 inline-block"
            />
            <span>Other Land</span>
          </span>
        </div>
      </div>

      {/* Interactive SVG World Atlas with Shaded Animal Range Zones */}
      <div className="relative w-full aspect-[1000/500] bg-gradient-to-b from-[#BAE6FD] via-[#CFEFFD] to-[#BAE6FD]">
        <svg
          viewBox="0 0 1000 520"
          role="img"
          aria-label={`World map shading the habitat range where ${profile.commonName} appears: ${activeRegions
            .map((r) => r.name)
            .join(', ')}`}
          className="w-full h-full block select-none"
        >
          <defs>
            {/* Diagonal hatch pattern for shaded wildlife habitat range */}
            <pattern
              id="habitat-range-hatch"
              width="12"
              height="12"
              patternTransform="rotate(35 0 0)"
              patternUnits="userSpaceOnUse"
            >
              <rect width="12" height="12" fill="#2D6A4F" fillOpacity="0.52" />
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="12"
                stroke="#FFE066"
                strokeWidth="2.5"
                strokeOpacity="0.65"
              />
            </pattern>

            <pattern
              id="habitat-range-hatch-selected"
              width="12"
              height="12"
              patternTransform="rotate(35 0 0)"
              patternUnits="userSpaceOnUse"
            >
              <rect width="12" height="12" fill="#1B4332" fillOpacity="0.72" />
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="12"
                stroke="#FFE066"
                strokeWidth="3.5"
                strokeOpacity="0.9"
              />
            </pattern>
          </defs>

          {/* Subtle Atlas Graticule Lines (Equator, Tropics, Meridians) */}
          <g stroke="#0284C7" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="4 4">
            {/* Latitude lines */}
            <line x1="0" y1="90" x2="1000" y2="90" />
            <line x1="0" y1="185" x2="1000" y2="185" />
            {/* Equator */}
            <line
              x1="0"
              y1="275"
              x2="1000"
              y2="275"
              strokeOpacity="0.32"
              strokeWidth="1.5"
              strokeDasharray="6 4"
            />
            <line x1="0" y1="365" x2="1000" y2="365" />
            <line x1="0" y1="450" x2="1000" y2="450" />
            {/* Longitude lines */}
            <line x1="200" y1="0" x2="200" y2="520" />
            <line x1="380" y1="0" x2="380" y2="520" />
            <line x1="520" y1="0" x2="520" y2="520" />
            <line x1="680" y1="0" x2="680" y2="520" />
            <line x1="840" y1="0" x2="840" y2="520" />
          </g>

          {/* Base World Continent Silhouettes (Warm Field-Atlas Parchment Landmasses) */}
          <g
            fill="#EDE6D6"
            stroke="#5C6B5E"
            strokeWidth="1.8"
            strokeLinejoin="round"
          >
            {/* North America & Central America */}
            <path d="M 62,82 L 95,62 L 165,58 L 235,64 L 285,88 L 265,120 L 312,138 L 295,172 L 265,205 L 252,222 L 232,208 L 218,228 L 245,256 L 262,265 L 238,268 L 198,242 L 168,212 L 138,186 L 122,148 L 108,115 L 65,105 Z" />
            {/* Greenland & Canadian Arctic Islands */}
            <path d="M 295,34 L 368,28 L 395,46 L 372,82 L 322,86 L 292,62 Z" />
            {/* Caribbean Islands */}
            <path d="M 252,228 L 282,232 L 288,242 L 255,238 Z" />
            {/* South America */}
            <path d="M 262,262 L 315,258 L 368,285 L 372,328 L 342,378 L 318,432 L 298,468 L 278,456 L 275,392 L 265,335 L 252,292 Z" />
            {/* UK & Ireland */}
            <path d="M 442,108 L 462,102 L 468,128 L 445,132 Z" />
            {/* Continental Europe & Scandinavia */}
            <path d="M 472,82 L 518,68 L 555,78 L 575,112 L 592,155 L 572,188 L 535,195 L 508,182 L 485,192 L 458,185 L 462,155 L 482,135 L 472,108 Z" />
            {/* Africa */}
            <path d="M 442,198 L 515,192 L 572,205 L 615,245 L 605,295 L 585,355 L 555,412 L 518,412 L 498,358 L 478,308 L 438,275 L 432,232 Z" />
            {/* Madagascar */}
            <path d="M 608,348 L 625,345 L 630,388 L 612,395 Z" />
            {/* Mainland Eurasia / Asia / Arabia / India / SE Asia */}
            <path d="M 565,78 L 685,65 L 825,72 L 885,95 L 862,132 L 835,162 L 825,205 L 795,242 L 775,285 L 748,272 L 728,238 L 692,278 L 668,235 L 635,248 L 595,232 L 578,195 L 585,152 L 562,112 Z" />
            {/* Japan */}
            <path d="M 842,165 L 858,158 L 865,195 L 845,205 Z" />
            {/* Indonesian & Philippine Islands */}
            <path d="M 755,288 L 818,282 L 858,302 L 842,324 L 765,318 Z" />
            {/* Australia & Tasmania */}
            <path d="M 772,348 L 835,342 L 885,365 L 892,412 L 852,438 L 782,428 L 765,388 Z" />
            {/* New Zealand */}
            <path d="M 902,422 L 922,415 L 928,448 L 908,452 Z" />
            {/* Antarctica */}
            <path d="M 215,476 L 420,466 L 640,468 L 815,478 L 805,506 L 225,506 Z" />
          </g>

          {/* Unshaded Region Outlines (subtle guide for non-active zones) */}
          {WORLD_MAP_REGIONS.map((region) => {
            if (activeRegionIds.has(region.id) || region.id === 'global_oceans') {
              return null;
            }
            return (
              <path
                key={`inactive-${region.id}`}
                d={region.rangePath}
                fill="transparent"
                stroke="#1E2F23"
                strokeOpacity="0.08"
                strokeWidth="1"
              />
            );
          })}

          {/* SHADED HABITAT RANGE REGIONS (Where the animal appears!) */}
          {activeRegions.map((region) => {
            const isSelected = selectedRegion?.id === region.id;
            return (
              <g
                key={`active-range-${region.id}`}
                data-testid={`shaded-region-${region.id}`}
                onClick={() => setSelectedRegion(region)}
                className="cursor-pointer group"
              >
                {/* Soft outer ecological glow */}
                <path
                  d={region.rangePath}
                  fill="#52B788"
                  fillOpacity={isSelected ? 0.45 : 0.28}
                  stroke="#2D6A4F"
                  strokeWidth={isSelected ? 6 : 3}
                  strokeOpacity="0.35"
                />
                {/* Shaded & hatched primary range area */}
                <path
                  d={region.rangePath}
                  fill={
                    isSelected
                      ? 'url(#habitat-range-hatch-selected)'
                      : 'url(#habitat-range-hatch)'
                  }
                  stroke="#1E2F23"
                  strokeWidth={isSelected ? 3 : 2.2}
                  strokeDasharray={isSelected ? 'none' : '6 3'}
                />
              </g>
            );
          })}

          {/* Ocean & Continent Watermark Labels */}
          <g
            fill="#0369A1"
            fillOpacity="0.55"
            fontSize="11"
            fontWeight="800"
            letterSpacing="1.5"
            className="pointer-events-none uppercase"
          >
            <text x="68" y="270">
              Pacific Ocean
            </text>
            <text x="355" y="245">
              Atlantic Ocean
            </text>
            <text x="648" y="348">
              Indian Ocean
            </text>
            <text x="455" y="38">
              Arctic Ocean
            </text>
          </g>

          {/* Interactive Pin Markers & Labels on Shaded Regions */}
          {activeRegions.map((region) => {
            const isSelected = selectedRegion?.id === region.id;
            const { x, y } = region.center;
            const labelWidth = Math.max(region.shortLabel.length * 6.5 + 18, 96);

            return (
              <g
                key={`pin-${region.id}`}
                transform={`translate(${x}, ${y})`}
                onClick={() => setSelectedRegion(region)}
                className="cursor-pointer"
              >
                {/* Pulsing radar ring */}
                <circle
                  r={isSelected ? 18 : 13}
                  fill="#FFE066"
                  fillOpacity={isSelected ? 0.55 : 0.35}
                />
                {/* Pin center dot */}
                <circle
                  r={isSelected ? 8 : 6.5}
                  fill={isSelected ? '#FFE066' : '#2D6A4F'}
                  stroke="#1E2F23"
                  strokeWidth="2.5"
                />
                {/* Pin Label Pill on Map */}
                <g transform="translate(0, -24)">
                  <rect
                    x={-labelWidth / 2}
                    y={-12}
                    width={labelWidth}
                    height={20}
                    rx={6}
                    fill={isSelected ? '#FFE066' : '#FFFDF7'}
                    stroke="#1E2F23"
                    strokeWidth="2"
                  />
                  <text
                    x="0"
                    y="2"
                    textAnchor="middle"
                    fill="#1E2F23"
                    fontSize="10.5"
                    fontWeight="800"
                  >
                    {region.shortLabel}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bottom Interactive Region Selector & Field Note Callout */}
      <div className="bg-[#FFFDF7] border-t-2 border-[#1E2F23] p-3.5 sm:p-4 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-extrabold text-[#2D6A4F] flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>Shaded Regions ({activeRegions.length}):</span>
          </span>
          {activeRegions.map((region) => {
            const isSelected = selectedRegion?.id === region.id;
            return (
              <button
                key={region.id}
                type="button"
                onClick={() => setSelectedRegion(region)}
                className={`px-2.5 py-1 rounded-xl border-2 border-[#1E2F23] text-xs font-extrabold transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#FFE066] text-[#1E2F23]'
                    : 'bg-[#D8F3DC] hover:bg-[#FFE066]/60 text-[#1B4332]'
                }`}
              >
                {region.name}
              </button>
            );
          })}
        </div>

        {selectedRegion && (
          <div
            data-testid="selected-range-region-info"
            className="rounded-xl bg-[#FAF6EC] border-2 border-[#1E2F23] px-3.5 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
          >
            <div className="space-y-0.5">
              <div className="font-extrabold text-[#1E2F23] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                <span>
                  {selectedRegion.name} ({selectedRegion.continent})
                </span>
              </div>
              <p className="text-[#38513E] font-semibold">
                {selectedRegion.biomeSummary}
              </p>
            </div>
            <span className="text-[11px] font-extrabold text-[#2D6A4F] tabular-nums shrink-0">
              {Math.abs(selectedRegion.coords.lat).toFixed(0)}°
              {selectedRegion.coords.lat >= 0 ? 'N' : 'S'},{' '}
              {Math.abs(selectedRegion.coords.lng).toFixed(0)}°
              {selectedRegion.coords.lng >= 0 ? 'E' : 'W'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
