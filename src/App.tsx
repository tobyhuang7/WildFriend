import React, { useMemo, useState } from 'react';
import {
  Compass,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Shuffle,
  Wand2,
} from 'lucide-react';
import { AnimalProfileData } from './types/wildlife';
import {
  buildFallbackAnimalProfile,
  buildWikipediaGroundedFallbackProfile,
  CURATED_PROFILES,
  getSpellingSuggestions,
  normalizeQueryKey,
  resolveSpellingCorrection,
  STARTER_CHIPS,
} from './utils/wildlifeResolver';
import { AdaptiveQueryBanner } from './components/AdaptiveQueryBanner';
import { HabitatStage3D } from './components/HabitatStage3D';
import { ConservationFriendCard } from './components/ConservationFriendCard';
import { AnimalBentoGrid } from './components/AnimalBentoGrid';
import { NearMeWildlifeTab } from './components/NearMeWildlifeTab';

export default function App() {
  const [activeTab, setActiveTab] = useState<'explore' | 'near-me'>('explore');
  const [searchInput, setSearchInput] = useState<string>('Grizzly Bear');
  const [currentProfile, setCurrentProfile] = useState<AnimalProfileData>(
    CURATED_PROFILES['grizzly bear']
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [checkedByAnimal, setCheckedByAnimal] = useState<Record<string, boolean[]>>({});

  const animalKey = normalizeQueryKey(currentProfile.commonName);
  const currentChecked = checkedByAnimal[animalKey] || [false, false, false];

  // Live "Did you mean?" suggestions while typing
  const liveDidYouMeanSuggestions = useMemo(() => {
    return getSpellingSuggestions(searchInput, 4);
  }, [searchInput]);

  const handleToggleFriendAction = (index: number) => {
    setCheckedByAnimal((prev) => {
      const existing = prev[animalKey] || [false, false, false];
      const updated = [...existing];
      updated[index] = !updated[index];
      return {
        ...prev,
        [animalKey]: updated,
      };
    });
  };

  const resolveAnimalQuery = async (rawQuery: string) => {
    const trimmed = rawQuery.trim();
    if (!trimmed) return;

    setSearchInput(trimmed);
    setActiveTab('explore');

    const { resolvedQuery, wasAutocorrected, originalQuery } =
      resolveSpellingCorrection(trimmed);
    const normalized = normalizeQueryKey(resolvedQuery);

    // Check if we have an instant curated match (either direct or via spellcheck)
    if (CURATED_PROFILES[normalized]) {
      const curated = CURATED_PROFILES[normalized];
      setCurrentProfile({
        ...curated,
        query: originalQuery,
        originalQuery,
        wasAutocorrected,
        correctedQuery: wasAutocorrected ? curated.commonName : undefined,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/wildlife/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: trimmed }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
      const data = (await response.json()) as AnimalProfileData;
      setCurrentProfile(data);
    } catch {
      const fallback =
        (await buildWikipediaGroundedFallbackProfile(trimmed)) ||
        buildFallbackAnimalProfile(trimmed);
      setCurrentProfile(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resolveAnimalQuery(searchInput);
  };

  const handleSurpriseMe = () => {
    const options = STARTER_CHIPS.map((c) => c.query).filter(
      (q) => normalizeQueryKey(q) !== normalizeQueryKey(currentProfile.query)
    );
    const pick = options[Math.floor(Math.random() * options.length)] || 'Panda';
    resolveAnimalQuery(pick);
  };

  const getStatusAccentColor = (code: AnimalProfileData['conservationStatus']['code']) => {
    switch (code) {
      case 'LC':
        return 'bg-[#D8F3DC] text-[#1B4332]';
      case 'NT':
      case 'VU':
        return 'bg-[#FEF3C7] text-[#92400E]';
      case 'EN':
      case 'CR':
      case 'EW':
        return 'bg-[#FEE2E2] text-[#991B1B]';
      case 'EX':
      default:
        return 'bg-[#F3E8FF] text-[#5B21B6]';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EC] text-[#1E2F23] field-grid-bg">
      {/* 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-[#FFFDF7] border-b-3 border-[#1E2F23] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('explore');
          }}
          className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#1E2F23] whitespace-nowrap shrink-0"
        >
          WildFriend
        </a>

        {/* Zone 2: Primary Navigation Tabs */}
        <nav aria-label="Main Navigation" className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => setActiveTab('explore')}
            data-testid="nav-explore-animals"
            className={`text-sm sm:text-base font-extrabold pb-1 border-b-3 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'explore'
                ? 'border-[#2D6A4F] text-[#1E2F23]'
                : 'border-transparent text-[#38513E] hover:text-[#1E2F23]'
            }`}
          >
            <Compass className="w-4 h-4 text-[#2D6A4F]" />
            <span>Explore Animals</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('near-me')}
            data-testid="nav-near-me"
            className={`text-sm sm:text-base font-extrabold pb-1 border-b-3 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'near-me'
                ? 'border-[#2D6A4F] text-[#1E2F23]'
                : 'border-transparent text-[#38513E] hover:text-[#1E2F23]'
            }`}
          >
            <MapPin className="w-4 h-4 text-[#2D6A4F]" />
            <span>Near Me</span>
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="tactile-button bg-[#FFE066] text-[#1E2F23] text-xs sm:text-sm font-extrabold px-4 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Shuffle className="w-4 h-4" />
            <span>Surprise Animal</span>
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-8">
        {activeTab === 'explore' ? (
          <>
            {/* Search & Intelligent Entity Resolution Bar */}
            <section
              aria-label="Wildlife Search Engine"
              className="tactile-card rounded-3xl p-5 sm:p-7 bg-[#FFFDF7] space-y-4"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E2F23] tracking-tight">
                    Kids&apos; Wildlife Conservation Explorer
                  </h1>
                  <p className="text-xs sm:text-sm font-medium text-[#38513E] mt-0.5">
                    Type any wild animal, dinosaur, or even a storybook character—Ranger Scout will connect you to real nature!
                  </p>
                </div>

                <div className="w-full md:w-auto md:min-w-[420px] space-y-2">
                  <form
                    onSubmit={handleSearchSubmit}
                    className="flex items-center gap-2 w-full"
                  >
                    <label htmlFor="wildlife-search-input" className="sr-only">
                      Search any animal or creature
                    </label>
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-[#38513E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="wildlife-search-input"
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Try 'Panda', 'Dove', 'Winnie the Pooh', 'Dodo'..."
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#FAF6EC] border-2.5 border-[#1E2F23] text-sm font-bold text-[#1E2F23] placeholder:text-[#38513E]/60 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="tactile-button bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-extrabold text-sm px-5 py-3 rounded-2xl whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {isLoading ? 'Exploring...' : 'Explore!'}
                    </button>
                  </form>

                  {/* Live "Did you mean?" Fuzzy Suggestions Bar */}
                  {liveDidYouMeanSuggestions.length > 0 && (
                    <div
                      data-testid="live-did-you-mean-suggestions"
                      className="flex flex-wrap items-center gap-1.5 px-1"
                    >
                      <span className="text-xs font-extrabold text-[#2D6A4F] flex items-center gap-1">
                        <Wand2 className="w-3.5 h-3.5" />
                        <span>Did you mean:</span>
                      </span>
                      {liveDidYouMeanSuggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => resolveAnimalQuery(suggestion)}
                          className="px-2.5 py-1 rounded-xl bg-[#D8F3DC] hover:bg-[#FFE066] border-2 border-[#1E2F23] text-xs font-extrabold text-[#1E2F23] transition-colors cursor-pointer"
                        >
                          {suggestion}?
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Starter Chips for Resolution Modes */}
              <div className="pt-3 border-t-2 border-[#1E2F23]/10 flex flex-wrap items-center gap-2">
                <span className="text-xs font-extrabold text-[#38513E] flex items-center gap-1 mr-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Try Starter Quests:</span>
                </span>
                {STARTER_CHIPS.map((chip) => {
                  const isActive =
                    normalizeQueryKey(currentProfile.query) === normalizeQueryKey(chip.query);
                  return (
                    <button
                      key={chip.label}
                      type="button"
                      onClick={() => resolveAnimalQuery(chip.query)}
                      className={`tactile-button px-3.5 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-[#FFE066] text-[#1E2F23]'
                          : 'bg-[#FAF6EC] hover:bg-[#E9F5EC] text-[#1E2F23]'
                      }`}
                    >
                      {chip.label}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Ranger Spellcheck Ribbon when a kid's typo was automatically resolved */}
            {currentProfile.wasAutocorrected && (
              <div
                role="status"
                data-testid="ranger-spellcheck-ribbon"
                className="tactile-card rounded-2xl px-5 py-3.5 bg-[#D8F3DC] flex flex-wrap items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5 text-sm font-extrabold text-[#1B4332]">
                  <span className="bg-[#2D6A4F] text-white px-2.5 py-1 rounded-lg border-2 border-[#1E2F23] text-xs uppercase tracking-wider flex items-center gap-1">
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>Ranger Spellcheck</span>
                  </span>
                  <span>
                    You typed &ldquo;{currentProfile.originalQuery || currentProfile.query}&rdquo; — showing results for{' '}
                    <span className="underline decoration-2">{currentProfile.commonName}</span>!
                  </span>
                </div>
              </div>
            )}

            {/* Adaptive Banner for Umbrella, Fictional, Extinct, or Non-Animal Queries */}
            <AdaptiveQueryBanner
              query={currentProfile.query}
              queryType={currentProfile.queryType}
              bannerInfo={currentProfile.bannerInfo}
              onSelectAnimal={resolveAnimalQuery}
            />

            {/* Animal Profile Header & Kid-Friendly Conservation Status */}
            <section
              data-testid="animal-profile-header"
              className="tactile-card rounded-3xl p-6 sm:p-7 bg-[#FFFDF7] flex flex-col lg:flex-row lg:items-center justify-between gap-5"
            >
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold text-[#2D6A4F] uppercase tracking-wider">
                  <span>Official Ranger Field Dossier</span>
                  <span aria-hidden="true">·</span>
                  <span className="italic font-serif normal-case text-sm text-[#38513E]">
                    {currentProfile.scientificName}
                  </span>
                </div>
                <h2
                  data-testid="resolved-animal-title"
                  className="text-3xl sm:text-4xl font-extrabold text-[#1E2F23] tracking-tight"
                >
                  {currentProfile.commonName}
                </h2>
              </div>

              {/* Kid-Friendly Conservation Badge Box */}
              <div
                data-testid="conservation-status-box"
                className={`rounded-2xl p-4 border-2.5 border-[#1E2F23] lg:max-w-md flex items-start gap-3.5 ${getStatusAccentColor(
                  currentProfile.conservationStatus.code
                )}`}
              >
                <div className="p-2.5 rounded-xl bg-white/90 border-2 border-[#1E2F23] text-[#1E2F23] shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-extrabold uppercase tracking-wider">
                    Conservation Status · {currentProfile.conservationStatus.code}
                  </div>
                  <div className="text-base font-extrabold">
                    {currentProfile.conservationStatus.kidFriendlyLabel}
                  </div>
                  <p className="text-xs font-semibold leading-relaxed opacity-95">
                    {currentProfile.conservationStatus.oneSentenceExplanation}
                  </p>
                </div>
              </div>
            </section>

            {/* Centerpiece Two-Column Split: Real Photo / 3D Habitat Stage + How to Be a Good Friend */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-7 flex flex-col">
                <HabitatStage3D
                  commonName={currentProfile.commonName}
                  scientificName={currentProfile.scientificName}
                  wikipediaQueryName={currentProfile.wikipediaQueryName}
                  blueprint={currentProfile.modelBlueprint}
                />
              </div>

              <div className="lg:col-span-5 flex flex-col">
                <ConservationFriendCard
                  commonName={currentProfile.commonName}
                  introEmpathyLine={currentProfile.friendActions.introEmpathyLine}
                  actions={currentProfile.friendActions.actions}
                  badgeTitle={currentProfile.friendActions.badgeTitle}
                  checkedState={currentChecked}
                  onToggleAction={handleToggleFriendAction}
                />
              </div>
            </div>

            {/* Diet, Habitat & 3 Secret Superpowers Bento Grid */}
            <AnimalBentoGrid profile={currentProfile} />
          </>
        ) : (
          <NearMeWildlifeTab
            onSelectLocalAnimal={(animalName) => {
              resolveAnimalQuery(animalName);
            }}
          />
        )}
      </main>

      {/* Quiet Field Journal Footer */}
      <footer className="mt-12 border-t-3 border-[#1E2F23] bg-[#FFFDF7] px-4 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold text-[#38513E]">
          <span>
            WildFriend: Kids&apos; Wildlife Conservation Explorer · Every kid can be a wildlife hero!
          </span>
          <span>
            Field Data Powered by iNaturalist &amp; Wikimedia Commons
          </span>
        </div>
      </footer>
    </div>
  );
}
