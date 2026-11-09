import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  Compass,
  History,
  Search,
  Sparkles,
  ArrowRight,
  MapPin,
  Eye,
  Camera,
} from 'lucide-react';
import { AdaptiveBannerInfo, QueryType, SpeciesComparisonCard } from '../types/wildlife';

interface SpeciesComparisonCardItemProps {
  spec: SpeciesComparisonCard;
  onSelectAnimal: (animalQuery: string) => void;
}

const SpeciesComparisonCardItem: React.FC<SpeciesComparisonCardItemProps> = ({
  spec,
  onSelectAnimal,
}) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(spec.imageUrl || null);
  const [loadingPhoto, setLoadingPhoto] = useState<boolean>(!spec.imageUrl);

  useEffect(() => {
    let isMounted = true;
    if (spec.imageUrl) {
      setPhotoUrl(spec.imageUrl);
      setLoadingPhoto(false);
      return;
    }

    async function fetchCardPhoto() {
      const candidates = [
        spec.wikipediaQueryName,
        spec.commonName.replace(/\s*\(.*?\)\s*/g, '').trim().replace(/\s+/g, '_'),
        spec.scientificName.replace(/\s+/g, '_'),
      ].filter(Boolean) as string[];

      for (const title of candidates) {
        try {
          const res = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
          );
          if (!res.ok) continue;
          const data = (await res.json()) as {
            thumbnail?: { source?: string };
            originalimage?: { source?: string };
          };
          const url = data.thumbnail?.source || data.originalimage?.source || null;
          if (isMounted && url) {
            setPhotoUrl(url);
            setLoadingPhoto(false);
            return;
          }
        } catch {
          // try next candidate
        }
      }
      if (isMounted) {
        setLoadingPhoto(false);
      }
    }

    fetchCardPhoto();
    return () => {
      isMounted = false;
    };
  }, [spec.commonName, spec.scientificName, spec.wikipediaQueryName, spec.imageUrl]);

  return (
    <button
      type="button"
      data-testid={`comparison-card-${spec.commonName.toLowerCase().replace(/\s+/g, '-')}`}
      onClick={() => onSelectAnimal(spec.commonName)}
      className="text-left bg-[#FFFDF7] hover:bg-[#FFE066]/30 border-2.5 border-[#1E2F23] rounded-2xl p-3.5 flex flex-col justify-between gap-3 transition-transform hover:-translate-y-0.5 cursor-pointer group"
    >
      <div className="space-y-2.5">
        {/* 1. Picture First at the Top of Every Selection Card */}
        <div
          data-testid={`comparison-card-photo-${spec.commonName.toLowerCase().replace(/\s+/g, '-')}`}
          className="w-full h-40 rounded-xl overflow-hidden border-2 border-[#1E2F23] bg-[#E0F2FE] relative"
        >
          {loadingPhoto ? (
            <div className="w-full h-full bg-[#D8F3DC] animate-pulse flex items-center justify-center">
              <Camera className="w-6 h-6 text-[#2D6A4F]/50" />
            </div>
          ) : photoUrl ? (
            <img
              src={photoUrl}
              alt={spec.commonName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              onError={() => setPhotoUrl(null)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-gradient-to-br from-[#D8F3DC] to-[#BAE6FD]">
              <Camera className="w-7 h-7 text-[#1E2F23] mb-1" />
              <span className="text-xs font-extrabold text-[#1E2F23]">{spec.commonName}</span>
            </div>
          )}
        </div>

        {/* 2. Species Name */}
        <div>
          <div className="text-base font-extrabold text-[#1E2F23] leading-snug">
            {spec.commonName}
          </div>
          <div className="text-[11px] italic font-serif text-[#38513E]">
            {spec.scientificName}
          </div>
        </div>

        {/* 3. Short, Kid-Sized Clues */}
        <div className="space-y-1.5 text-xs text-[#1E2F23]">
          <div className="bg-[#E0F2FE]/60 rounded-xl px-2.5 py-2 border border-[#1E2F23]/20">
            <span className="font-extrabold uppercase tracking-wider text-[10px] text-[#0369A1] flex items-center gap-1">
              <MapPin className="w-3 h-3 shrink-0" />
              <span>Home</span>
            </span>
            <p className="font-semibold leading-snug mt-0.5">{spec.whereTheyLive}</p>
          </div>

          <div className="bg-[#FAF6EC] rounded-xl px-2.5 py-2 border border-[#1E2F23]/20">
            <span className="font-extrabold uppercase tracking-wider text-[10px] text-[#2D6A4F] flex items-center gap-1">
              <Eye className="w-3 h-3 shrink-0" />
              <span>Spot-It Clue</span>
            </span>
            <p className="font-medium leading-snug mt-0.5">{spec.howTheyDiffer}</p>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-[#1E2F23]/15 flex items-center justify-between text-xs font-extrabold text-[#0284C7]">
        <span>Pick {spec.commonName}</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </button>
  );
};

interface AdaptiveQueryBannerProps {
  query: string;
  queryType: QueryType;
  bannerInfo?: AdaptiveBannerInfo;
  onSelectAnimal: (animalQuery: string) => void;
}

export const AdaptiveQueryBanner: React.FC<AdaptiveQueryBannerProps> = ({
  query,
  queryType,
  bannerInfo,
  onSelectAnimal,
}) => {
  if (queryType === QueryType.EXACT_SPECIES || !bannerInfo) {
    return null;
  }

  const getBannerTheme = () => {
    switch (queryType) {
      case QueryType.UMBRELLA_OR_COLLOQUIAL:
        return {
          bg: 'bg-[#E0F2FE]',
          accentBg: 'bg-[#0284C7]',
          badgeLabel: 'Nature Detective Note!',
          Icon: Search,
        };
      case QueryType.FICTIONAL_OR_MYTHICAL:
        return {
          bg: 'bg-[#FEF3C7]',
          accentBg: 'bg-[#D97706]',
          badgeLabel: 'Storybook to Real World Bridge',
          Icon: BookOpen,
        };
      case QueryType.EXTINCT:
        return {
          bg: 'bg-[#F3E8FF]',
          accentBg: 'bg-[#7C3AED]',
          badgeLabel: "Time Traveler's Log",
          Icon: History,
        };
      case QueryType.INVALID_OR_NON_ANIMAL:
      default:
        return {
          bg: 'bg-[#DCFCE7]',
          accentBg: 'bg-[#15803D]',
          badgeLabel: 'Ranger Compass Redirect',
          Icon: Compass,
        };
    }
  };

  const theme = getBannerTheme();
  const Icon = theme.Icon;

  return (
    <section
      data-testid={`adaptive-banner-${queryType}`}
      aria-label={bannerInfo.title}
      className={`tactile-card rounded-3xl p-5 sm:p-6 ${theme.bg} space-y-4`}
    >
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#1E2F23]">
            <span className={`${theme.accentBg} text-white p-1.5 rounded-lg border-2 border-[#1E2F23]`}>
              <Icon className="w-4 h-4" />
            </span>
            <span>{theme.badgeLabel}</span>
            <span aria-hidden="true">·</span>
            <span>You searched: &ldquo;{query}&rdquo;</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E2F23] tracking-tight">
            {bannerInfo.title}
          </h2>

          <p className="text-sm sm:text-base text-[#1E2F23] leading-snug font-semibold">
            {bannerInfo.explanation}
          </p>

          {bannerInfo.storyOrFact && (
            <p className="text-xs sm:text-sm text-[#1E2F23] bg-[#FFFDF7] border-2 border-[#1E2F23] rounded-2xl px-3.5 py-2 font-bold">
              <Sparkles className="w-4 h-4 inline-block mr-1.5 text-[#D97706]" />
              {bannerInfo.storyOrFact}
            </p>
          )}
        </div>

        {/* Living Relative Spotlight Card for EXTINCT species */}
        {queryType === QueryType.EXTINCT && bannerInfo.livingRelative && (
          <div className="bg-[#FFFDF7] border-3 border-[#1E2F23] rounded-2xl p-4 md:w-80 shrink-0 space-y-2.5">
            <div className="text-xs font-extrabold uppercase tracking-wider text-[#7C3AED]">
              Living Ecological Cousin
            </div>
            <div className="text-lg font-extrabold text-[#1E2F23]">
              {bannerInfo.livingRelative.commonName}
            </div>
            <div className="text-xs italic text-[#38513E]">
              {bannerInfo.livingRelative.scientificName}
            </div>
            <p className="text-xs text-[#1E2F23] leading-relaxed">
              {bannerInfo.livingRelative.connectionNote}
            </p>
            <button
              type="button"
              onClick={() => onSelectAnimal(bannerInfo.livingRelative!.commonName)}
              className="tactile-button w-full bg-[#FFE066] text-[#1E2F23] font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Meet {bannerInfo.livingRelative.commonName}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Picture-First Interactive Species Specificity Guide */}
      {queryType === QueryType.UMBRELLA_OR_COLLOQUIAL &&
        bannerInfo.speciesComparisons &&
        bannerInfo.speciesComparisons.length > 0 && (
          <div
            data-testid="species-specificity-guide"
            className="pt-3 border-t-2 border-[#1E2F23]/15 space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h3 className="text-base sm:text-lg font-extrabold text-[#1E2F23]">
                Nature Detective Specificity Guide: Which Specific Species Did You Mean?
              </h3>
              <span className="text-xs font-bold text-[#0369A1]">
                Tap any picture to explore!
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {bannerInfo.speciesComparisons.map((spec) => (
                <SpeciesComparisonCardItem
                  key={spec.commonName}
                  spec={spec}
                  onSelectAnimal={onSelectAnimal}
                />
              ))}
            </div>
          </div>
        )}

      {/* Suggested Related Species Filter Buttons */}
      {bannerInfo.suggestedAnimals && bannerInfo.suggestedAnimals.length > 0 && (
        <div className="pt-2 border-t-2 border-[#1E2F23]/15 flex flex-wrap items-center gap-2">
          <span className="text-xs font-extrabold text-[#1E2F23] mr-1">
            More to Explore:
          </span>
          {bannerInfo.suggestedAnimals.map((animalName) => (
            <button
              key={animalName}
              type="button"
              onClick={() => onSelectAnimal(animalName)}
              className="tactile-button bg-[#FFFDF7] hover:bg-[#FFE066] text-[#1E2F23] text-xs font-bold px-3.5 py-1.5 rounded-xl whitespace-nowrap shrink-0 cursor-pointer"
            >
              {animalName} →
            </button>
          ))}
        </div>
      )}
    </section>
  );
};
