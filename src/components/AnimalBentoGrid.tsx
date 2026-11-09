import React from 'react';
import { Flame, Globe2, Utensils, Zap } from 'lucide-react';
import { AnimalProfileData } from '../types/wildlife';
import { AnimalRangeMap } from './AnimalRangeMap';

interface AnimalBentoGridProps {
  profile: AnimalProfileData;
}

export const AnimalBentoGrid: React.FC<AnimalBentoGridProps> = ({ profile }) => {
  const { commonName, diet, habitat, secretSuperpowers } = profile;

  return (
    <section
      aria-label={`${commonName} Field Journal Bento Grid`}
      className="grid grid-cols-1 lg:grid-cols-12 gap-6"
    >
      {/* Card 1: What's on the Menu? */}
      <div
        data-testid="bento-diet-card"
        className="lg:col-span-5 tactile-card rounded-3xl p-6 bg-[#FFFDF7] flex flex-col justify-between space-y-4"
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-[#D97706]">
            <span className="flex items-center gap-1.5">
              <Utensils className="w-4 h-4" />
              <span>What&apos;s on the Menu?</span>
            </span>
            <span className="text-[#1E2F23]">{diet.dietType}</span>
          </div>

          <h3 className="text-xl font-extrabold text-[#1E2F23]">
            {commonName}&apos;s Favorite Snacks
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {diet.favoriteFoods.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#FAF6EC] border-2 border-[#1E2F23]"
              >
                <span className="text-2xl shrink-0" role="img" aria-label={item.name}>
                  {item.emoji}
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#1E2F23] leading-tight">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Fun Comparison Callout */}
        <div className="bg-[#FEF3C7] border-2 border-[#1E2F23] rounded-2xl p-4 space-y-1">
          <div className="text-xs font-extrabold uppercase tracking-wider text-[#B45309] flex items-center gap-1">
            <Flame className="w-3.5 h-3.5" />
            <span>Wild Appetite Scale</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-[#1E2F23] leading-relaxed">
            {diet.funComparison}
          </p>
        </div>
      </div>

      {/* Card 2: Where I Hang Out + Shaded Habitat Range Map */}
      <div
        data-testid="bento-habitat-card"
        className="lg:col-span-7 tactile-card rounded-3xl p-6 bg-[#FFFDF7] flex flex-col justify-between space-y-4"
      >
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0284C7]">
            <span className="flex items-center gap-1.5">
              <Globe2 className="w-4 h-4" />
              <span>Where I Hang Out</span>
            </span>
            <span className="text-[#38513E]">
              {habitat.regions.join(' · ')}
            </span>
          </div>

          <h3 className="text-xl font-extrabold text-[#1E2F23]">
            Home Sweet Habitat &amp; World Range Map
          </h3>

          <p className="text-sm sm:text-base text-[#1E2F23] font-medium leading-relaxed bg-[#E0F2FE] border-2 border-[#1E2F23] rounded-2xl p-4">
            {habitat.description}
          </p>

          {/* Interactive World Range Map Shading Areas Where the Animal Appears */}
          <AnimalRangeMap profile={profile} />
        </div>

        <div className="space-y-2 pt-2 border-t-2 border-[#1E2F23]/10">
          <div className="text-xs font-extrabold uppercase tracking-wider text-[#38513E]">
            Climate &amp; Biome Features
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-extrabold text-[#1E2F23]">
            {habitat.climateTags.map((tag, idx) => (
              <React.Fragment key={tag}>
                {idx > 0 && <span aria-hidden="true" className="text-[#2D6A4F]">·</span>}
                <span className="underline decoration-2 decoration-[#52B788] underline-offset-4">
                  {tag}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Card 3: 3 Secret Superpowers (Full Width Bottom Bento Strip) */}
      <div
        data-testid="bento-superpowers-card"
        className="lg:col-span-12 tactile-card rounded-3xl p-6 sm:p-8 bg-[#FFFDF7] space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#2D6A4F]">
              <Zap className="w-4 h-4 fill-[#FFE066]" />
              <span>Biological Field Notes</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#1E2F23] mt-0.5">
              3 Secret Superpowers of the {commonName}
            </h3>
          </div>
          <span className="text-xs font-bold text-[#38513E]">
            Real nature superpowers verified by wildlife biologists
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {secretSuperpowers.map((power, index) => (
            <div
              key={index}
              className="rounded-2xl p-5 bg-[#FAF6EC] border-2 border-[#1E2F23] flex flex-col justify-between space-y-2"
            >
              <div className="space-y-2">
                <div className="text-xs font-extrabold text-[#2D6A4F] tabular-nums">
                  0{index + 1}. Nature Superpower
                </div>
                <h4 className="text-base sm:text-lg font-extrabold text-[#1E2F23]">
                  {power.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#38513E] font-medium leading-relaxed">
                  {power.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
