export enum QueryType {
  EXACT_SPECIES = 'EXACT_SPECIES',
  UMBRELLA_OR_COLLOQUIAL = 'UMBRELLA_OR_COLLOQUIAL',
  FICTIONAL_OR_MYTHICAL = 'FICTIONAL_OR_MYTHICAL',
  EXTINCT = 'EXTINCT',
  INVALID_OR_NON_ANIMAL = 'INVALID_OR_NON_ANIMAL',
}

export type BodyType =
  | 'quadruped_bear'
  | 'quadruped_cat'
  | 'avian'
  | 'aquatic'
  | 'reptile'
  | 'small_mammal';

export type EarStyle = 'round' | 'pointed' | 'floppy' | 'tufted' | 'hidden';
export type SnoutStyle = 'short' | 'long' | 'beak' | 'hooked_beak' | 'wide' | ' blunt';
export type TailStyle = 'stubby' | 'long_furry' | 'feathered' | 'fin' | 'reptile_long' | 'fluffy_ball';
export type HabitatBiome = 'forest' | 'ocean' | 'arctic' | 'savanna' | 'jungle' | 'wetland';

export interface ModelBlueprint {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bodyType: BodyType;
  earStyle: EarStyle;
  snoutStyle: SnoutStyle;
  tailStyle: TailStyle;
  habitatBiome: HabitatBiome;
  hasStripesOrSpots?: boolean;
  hasHornsOrAntlers?: boolean;
  hasWings?: boolean;
}

export interface SpeciesComparisonCard {
  commonName: string;
  scientificName: string;
  wikipediaQueryName?: string;
  imageUrl?: string;
  whereTheyLive: string;
  howTheyDiffer: string;
}

export interface AdaptiveBannerInfo {
  title: string;
  explanation: string;
  storyOrFact?: string;
  suggestedAnimals: string[];
  speciesComparisons?: SpeciesComparisonCard[];
  livingRelative?: {
    commonName: string;
    scientificName: string;
    connectionNote: string;
  };
}

export interface FoodItem {
  emoji: string;
  name: string;
}

export interface AnimalProfileData {
  query: string;
  originalQuery?: string;
  wasAutocorrected?: boolean;
  correctedQuery?: string;
  queryType: QueryType;
  commonName: string;
  scientificName: string;
  wikipediaQueryName: string;
  conservationStatus: {
    code: 'LC' | 'NT' | 'VU' | 'EN' | 'CR' | 'EW' | 'EX';
    kidFriendlyLabel: string;
    oneSentenceExplanation: string;
  };
  bannerInfo?: AdaptiveBannerInfo;
  modelBlueprint: ModelBlueprint;
  friendActions: {
    introEmpathyLine: string;
    actions: [string, string, string];
    badgeTitle: string;
  };
  diet: {
    dietType: string;
    favoriteFoods: FoodItem[];
    funComparison: string;
  };
  habitat: {
    description: string;
    regions: string[];
    climateTags: string[];
  };
  secretSuperpowers: [
    { title: string; description: string },
    { title: string; description: string },
    { title: string; description: string }
  ];
}

export interface LocalSpeciesSighting {
  id: number;
  commonName: string;
  scientificName: string;
  iconicTaxonName: string;
  sightingCount: number;
  photoUrl: string | null;
  attribution?: string;
  conservationStatus?: string;
}
