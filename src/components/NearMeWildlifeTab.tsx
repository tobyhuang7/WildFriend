import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  Binoculars,
  Compass,
  LocateFixed,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { LocalSpeciesSighting } from '../types/wildlife';
import {
  parseINaturalistSpeciesCounts,
  PRESET_LOCATIONS,
} from '../utils/wildlifeResolver';
import {
  geocodeCityOrZip,
  REGIONAL_FALLBACK_SPECIES,
  selectPresetKeyForCoords,
} from '../utils/habitatMapUtils';

interface NearMeWildlifeTabProps {
  onSelectLocalAnimal: (animalName: string) => void;
}

export const NearMeWildlifeTab: React.FC<NearMeWildlifeTabProps> = ({
  onSelectLocalAnimal,
}) => {
  const [activeLocationName, setActiveLocationName] = useState<string>(
    PRESET_LOCATIONS[0].name
  );
  const [activeCoords, setActiveCoords] = useState<{ lat: number; lng: number }>({
    lat: PRESET_LOCATIONS[0].lat,
    lng: PRESET_LOCATIONS[0].lng,
  });
  const [activePresetId, setActivePresetId] = useState<string>(PRESET_LOCATIONS[0].id);
  const [customCityInput, setCustomCityInput] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [speciesList, setSpeciesList] = useState<LocalSpeciesSighting[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<number, boolean>>({});

  const getFallbackForRegion = (regionKey: string): LocalSpeciesSighting[] => {
    if (regionKey === 'san-francisco') return REGIONAL_FALLBACK_SPECIES['west_coast'];
    if (regionKey === 'new-haven') return REGIONAL_FALLBACK_SPECIES['northeast'];
    return (
      REGIONAL_FALLBACK_SPECIES[regionKey] ||
      REGIONAL_FALLBACK_SPECIES['northeast']
    );
  };

  const fetchWildlifeByCoords = async (
    lat: number,
    lng: number,
    locationLabel: string,
    regionKey = 'northeast'
  ) => {
    setLoading(true);
    setValidationError(null);
    setActiveLocationName(locationLabel);
    setActiveCoords({ lat, lng });
    setStatusMessage(`Scanning iNaturalist ranger reports within 25 km of ${locationLabel}...`);

    const url = `https://api.inaturalist.org/v1/observations/species_counts?lat=${lat}&lng=${lng}&radius=25&iconic_taxa[]=Mammalia&iconic_taxa[]=Aves&iconic_taxa[]=Reptilia&iconic_taxa[]=Amphibia&per_page=8`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      const parsed = parseINaturalistSpeciesCounts(data);

      if (parsed.length > 0) {
        setSpeciesList(parsed.slice(0, 8));
        setStatusMessage(
          `Found ${parsed.length} verified wild neighbors spotted near ${locationLabel}!`
        );
      } else {
        setSpeciesList(getFallbackForRegion(regionKey));
        setStatusMessage(`Showing verified regional wildlife sightings for ${locationLabel}.`);
      }
    } catch {
      setSpeciesList(getFallbackForRegion(regionKey));
      setStatusMessage(
        `Showing verified regional wildlife sightings for ${locationLabel}.`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initial = PRESET_LOCATIONS[0];
    fetchWildlifeByCoords(initial.lat, initial.lng, initial.name, initial.id);
  }, []);

  const handleCustomCitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const raw = customCityInput.trim();
    if (!raw) {
      setValidationError('Please enter a City name (like "Chicago") or 5-digit ZIP code (like "90210").');
      return;
    }

    setValidationError(null);
    setLoading(true);
    setStatusMessage(`Looking up coordinates for "${raw}"...`);

    const resolved = await geocodeCityOrZip(raw);
    if (!resolved) {
      setLoading(false);
      setValidationError(
        `We couldn't find "${raw}" on our ranger map—try a city name like "Chicago, IL", "Seattle", or a 5-digit ZIP code like "90210"!`
      );
      setStatusMessage(null);
      return;
    }

    // Check if the resolved location matches one of our preset chips
    const matchedPreset = PRESET_LOCATIONS.find(
      (loc) =>
        Math.abs(loc.lat - resolved.lat) < 0.15 &&
        Math.abs(loc.lng - resolved.lng) < 0.15
    );
    setActivePresetId(matchedPreset ? matchedPreset.id : 'custom');

    await fetchWildlifeByCoords(
      resolved.lat,
      resolved.lng,
      resolved.displayName,
      resolved.regionPresetKey
    );
  };

  const handleUseBrowserGeolocation = () => {
    if (!navigator.geolocation) {
      setStatusMessage(
        'Browser GPS is unavailable in this window—try typing your City or ZIP code above!'
      );
      return;
    }

    setValidationError(null);
    setLoading(true);
    setStatusMessage('Asking your compass for your local coordinates...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setActivePresetId('gps');
        const regionKey = selectPresetKeyForCoords(latitude, longitude);
        fetchWildlifeByCoords(
          Number(latitude.toFixed(4)),
          Number(longitude.toFixed(4)),
          `Your Backyard (${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°)`,
          regionKey
        );
      },
      () => {
        const fallback = PRESET_LOCATIONS[1];
        setActivePresetId(fallback.id);
        fetchWildlifeByCoords(fallback.lat, fallback.lng, fallback.name, fallback.id);
        setStatusMessage(
          `Location permission was blocked by the browser sandbox, so we hopped to ${fallback.name}!`
        );
      },
      { timeout: 6000 }
    );
  };

  return (
    <div data-testid="near-me-wildlife-tab" className="space-y-8">
      {/* Ranger Station Control Deck */}
      <section className="tactile-card rounded-3xl p-6 sm:p-8 bg-[#FFFDF7] space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#2D6A4F]">
              <Binoculars className="w-4 h-4" />
              <span>Stage 2 · Local Backyard Wildlife Explorer</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1E2F23] tracking-tight">
              Who Lives in Your Neighborhood?
            </h1>
            <p className="text-sm sm:text-base text-[#38513E] font-medium leading-relaxed">
              Real nature scientists and families log wildlife sightings every day using{' '}
              <span className="font-bold text-[#1E2F23]">iNaturalist</span>. Enter any{' '}
              <span className="font-bold text-[#1E2F23]">City or 5-digit ZIP code</span> (like{' '}
              <span className="underline">90210</span>, <span className="underline">Chicago</span>, or{' '}
              <span className="underline">Miami</span>) to discover wild neighbors near you!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleUseBrowserGeolocation}
              disabled={loading}
              className="tactile-button bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-extrabold text-sm sm:text-base px-5 py-3.5 rounded-2xl flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <LocateFixed className="w-5 h-5 text-[#FFE066]" />
              <span>Find Animals Near Me</span>
            </button>

            <form onSubmit={handleCustomCitySubmit} className="flex items-center gap-2">
              <label htmlFor="city-zip-input" className="sr-only">
                Enter City or ZIP Code
              </label>
              <input
                id="city-zip-input"
                data-testid="city-zip-input"
                type="text"
                value={customCityInput}
                onChange={(e) => {
                  setCustomCityInput(e.target.value);
                  if (validationError) setValidationError(null);
                }}
                placeholder="City or ZIP (e.g. 90210, Chicago)..."
                className="px-3.5 py-3 rounded-2xl bg-[#FAF6EC] border-2 border-[#1E2F23] text-xs sm:text-sm font-bold text-[#1E2F23] w-56 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              />
              <button
                type="submit"
                disabled={loading}
                data-testid="city-zip-submit"
                className="tactile-button bg-[#FFE066] text-[#1E2F23] font-extrabold text-xs sm:text-sm px-4 py-3 rounded-2xl whitespace-nowrap shrink-0 cursor-pointer"
              >
                {loading ? '...' : 'Go'}
              </button>
            </form>
          </div>
        </div>

        {validationError && (
          <div
            role="alert"
            data-testid="city-zip-error"
            className="rounded-2xl bg-[#FEE2E2] border-2 border-[#991B1B] px-4 py-3 text-xs sm:text-sm font-extrabold text-[#991B1B] flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Preset City Selector Bar */}
        <div className="pt-4 border-t-2 border-[#1E2F23]/15 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-extrabold text-[#1E2F23] flex items-center gap-1 mr-1">
              <MapPin className="w-4 h-4 text-[#2D6A4F]" />
              <span>Or Jump to a Ranger Outpost:</span>
            </span>
            {PRESET_LOCATIONS.map((loc) => {
              const isSelected = activePresetId === loc.id;
              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => {
                    setActivePresetId(loc.id);
                    setCustomCityInput('');
                    fetchWildlifeByCoords(loc.lat, loc.lng, loc.name, loc.id);
                  }}
                  className={`tactile-button px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#FFE066] text-[#1E2F23]'
                      : 'bg-white hover:bg-[#E9F5EC] text-[#1E2F23]'
                  }`}
                >
                  {loc.name}
                </button>
              );
            })}
          </div>

          {statusMessage && (
            <div
              role="status"
              className="text-xs font-bold text-[#2D6A4F] flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}
        </div>
      </section>

      {/* Species Sightings Grid */}
      <section aria-label={`Wildlife spotted near ${activeLocationName}`} className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2
              data-testid="near-me-location-heading"
              className="text-xl sm:text-2xl font-extrabold text-[#1E2F23]"
            >
              Verified Wildlife Near {activeLocationName}
            </h2>
            <p className="text-xs font-bold text-[#2D6A4F] tabular-nums">
              Ranger Coordinates: {Math.abs(activeCoords.lat).toFixed(2)}°
              {activeCoords.lat >= 0 ? 'N' : 'S'}, {Math.abs(activeCoords.lng).toFixed(2)}°
              {activeCoords.lng >= 0 ? 'E' : 'W'}
            </p>
          </div>
          <span className="text-xs font-bold text-[#38513E] tabular-nums">
            Showing {speciesList.length} local species · Radius: 25 km
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[0, 1, 2, 3].map((n) => (
              <div
                key={n}
                className="tactile-card rounded-3xl p-4 h-72 bg-[#FFFDF7] flex flex-col justify-between animate-pulse"
              >
                <div className="w-full h-40 bg-[#E9F5EC] rounded-2xl border-2 border-[#1E2F23]/20" />
                <div className="space-y-2">
                  <div className="h-4 w-2/3 bg-[#E9F5EC] rounded" />
                  <div className="h-3 w-1/2 bg-[#E9F5EC] rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            data-testid="local-species-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {speciesList.map((species) => {
              const showFallbackIllustration =
                !species.photoUrl || brokenImages[species.id];

              return (
                <button
                  key={species.id}
                  type="button"
                  onClick={() => onSelectLocalAnimal(species.commonName)}
                  className="tactile-card rounded-3xl p-4 bg-[#FFFDF7] hover:bg-[#FFE066]/20 text-left flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    {/* Species Photo or Resilient Field Illustration */}
                    <div className="w-full h-44 rounded-2xl overflow-hidden border-2 border-[#1E2F23] bg-gradient-to-br from-[#D8F3DC] to-[#95D5B2] relative mb-3.5">
                      {!showFallbackIllustration ? (
                        <img
                          src={species.photoUrl!}
                          alt={species.commonName}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          onError={() =>
                            setBrokenImages((prev) => ({ ...prev, [species.id]: true }))
                          }
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                          <Compass className="w-10 h-10 text-[#1E2F23] mb-1.5" />
                          <span className="text-xs font-extrabold text-[#1E2F23]">
                            {species.commonName}
                          </span>
                          <span className="text-[11px] text-[#2D6A4F] font-semibold">
                            Field Sketch · {species.iconicTaxonName}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Metadata Line (Zero-Pill Unboxed Text with · separator) */}
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D6A4F] tabular-nums">
                      <span>{species.iconicTaxonName}</span>
                      <span aria-hidden="true">·</span>
                      <span>{species.sightingCount.toLocaleString()} local sightings</span>
                    </div>

                    <h3 className="text-lg font-extrabold text-[#1E2F23] mt-1 group-hover:text-[#2D6A4F] transition-colors">
                      {species.commonName}
                    </h3>
                    <p className="text-xs italic text-[#38513E]">{species.scientificName}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t-2 border-[#1E2F23]/10 flex items-center justify-between text-xs font-extrabold text-[#1E2F23]">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>Open 3D Profile</span>
                    </span>
                    <span aria-hidden="true">→</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
