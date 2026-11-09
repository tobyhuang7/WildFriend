import {
  AnimalProfileData,
  BodyType,
  LocalSpeciesSighting,
  ModelBlueprint,
  QueryType,
  SpeciesComparisonCard,
} from '../types/wildlife';

export const STARTER_CHIPS: Array<{
  label: string;
  query: string;
  categoryHint: string;
}> = [
  { label: 'Grizzly Bear', query: 'Grizzly Bear', categoryHint: 'Wild Species' },
  { label: 'Panda', query: 'Panda', categoryHint: 'Species Guide' },
  { label: 'Dove', query: 'Dove', categoryHint: 'Compare Cousins' },
  { label: 'Winnie the Pooh', query: 'Winnie the Pooh', categoryHint: 'Storybook Friend' },
  { label: 'Dodo', query: 'Dodo', categoryHint: 'Time Traveler' },
  { label: 'Black Panther', query: 'Black Panther', categoryHint: 'Nature Detective' },
  { label: 'Unicorn', query: 'Unicorn', categoryHint: 'Mythical Quest' },
  { label: 'Axolotl', query: 'Axolotl', categoryHint: 'Super Rare' },
  { label: 'Pizza', query: 'Pizza', categoryHint: 'Surprise!' },
];

export const PRESET_LOCATIONS: Array<{
  id: string;
  name: string;
  subtitle: string;
  lat: number;
  lng: number;
}> = [
  {
    id: 'new-haven',
    name: 'New Haven, CT',
    subtitle: 'Long Island Sound & Woodland Parks',
    lat: 41.3083,
    lng: -72.9279,
  },
  {
    id: 'san-francisco',
    name: 'San Francisco, CA',
    subtitle: 'Pacific Coast & Golden Gate',
    lat: 37.7749,
    lng: -122.4194,
  },
  {
    id: 'london',
    name: 'London, UK',
    subtitle: 'Thames River & Royal Parks',
    lat: 51.5074,
    lng: -0.1278,
  },
];

// Comprehensive dictionary of 115+ wildlife queries for fuzzy spellcheck & "Did you mean?"
export const KNOWN_ANIMAL_DICTIONARY: string[] = [
  'Grizzly Bear',
  'Giant Panda',
  'Panda',
  'Red Panda',
  'Dove',
  'Mourning Dove',
  'Rock Dove',
  'Eurasian Collared-Dove',
  'Bear',
  'Polar Bear',
  'American Black Bear',
  'Sun Bear',
  'Spectacled Bear',
  'Sloth Bear',
  'Winnie the Pooh',
  'Dodo',
  'Nicobar Pigeon',
  'Black Panther',
  'Jaguar',
  'Leopard',
  'Snow Leopard',
  'Cheetah',
  'Lion',
  'Tiger',
  'Cougar',
  'Mountain Lion',
  'Bobcat',
  'Canada Lynx',
  'Unicorn',
  'Narwhal',
  'Indian Rhinoceros',
  'White Rhinoceros',
  'Axolotl',
  'Eastern Box Turtle',
  'Green Sea Turtle',
  'Leatherback Sea Turtle',
  'Galapagos Tortoise',
  'Turtle',
  'Bald Eagle',
  'Golden Eagle',
  'Peregrine Falcon',
  'Red-Tailed Hawk',
  'Osprey',
  'Barn Owl',
  'Great Horned Owl',
  'Snowy Owl',
  'Owl',
  'African Bush Elephant',
  'Asian Elephant',
  'Elephant',
  'Giraffe',
  'Koala',
  'Kangaroo',
  'Platypus',
  'Wombat',
  'Tasmanian Devil',
  'Great White Shark',
  'Hammerhead Shark',
  'Whale Shark',
  'Shark',
  'Bottlenose Dolphin',
  'Dolphin',
  'Orca',
  'Blue Whale',
  'Humpback Whale',
  'Beluga Whale',
  'Sea Otter',
  'River Otter',
  'California Sea Lion',
  'Harbor Seal',
  'Walrus',
  'Manatee',
  'Emperor Penguin',
  'King Penguin',
  'Galapagos Penguin',
  'Penguin',
  'Red Fox',
  'Arctic Fox',
  'Fennec Fox',
  'Fox',
  'Gray Wolf',
  'Coyote',
  'White-Tailed Deer',
  'Moose',
  'Caribou',
  'Elk',
  'Deer',
  'American Bison',
  'Hippopotamus',
  'Zebra',
  'Chimpanzee',
  'Mountain Gorilla',
  'Orangutan',
  'Ring-Tailed Lemur',
  'Three-Toed Sloth',
  'Giant Anteater',
  'Armadillo',
  'Capybara',
  'North American Beaver',
  'Eastern Gray Squirrel',
  'European Hedgehog',
  'Raccoon',
  'Red-Eyed Tree Frog',
  'Poison Dart Frog',
  'American Bullfrog',
  'Frog',
  'Komodo Dragon',
  'Chameleon',
  'Green Iguana',
  'American Alligator',
  'Nile Crocodile',
  'King Cobra',
  'Monarch Butterfly',
  'Honeybee',
  'Giant Pacific Octopus',
  'Woolly Mammoth',
  'Tyrannosaurus Rex',
  'Tasmanian Tiger',
];

const PHONETIC_TYPO_MAP: Record<string, string> = {
  penda: 'Panda',
  panda: 'Panda',
  panada: 'Panda',
  pandaa: 'Panda',
  'gaint panda': 'Giant Panda',
  duv: 'Dove',
  dov: 'Dove',
  duve: 'Dove',
  'morning dove': 'Mourning Dove',
  girafe: 'Giraffe',
  jiraffe: 'Giraffe',
  girrafe: 'Giraffe',
  dolfin: 'Dolphin',
  dolfen: 'Dolphin',
  grizly: 'Grizzly Bear',
  'grizly bear': 'Grizzly Bear',
  grizzley: 'Grizzly Bear',
  axolotul: 'Axolotl',
  axolotle: 'Axolotl',
  axolotol: 'Axolotl',
  chita: 'Cheetah',
  cheeta: 'Cheetah',
  cheata: 'Cheetah',
  pengwin: 'Emperor Penguin',
  pengin: 'Emperor Penguin',
  pinguin: 'Emperor Penguin',
  koalla: 'Koala',
  coala: 'Koala',
  elafant: 'African Bush Elephant',
  elefant: 'African Bush Elephant',
  elephent: 'African Bush Elephant',
  eegle: 'Bald Eagle',
  egal: 'Bald Eagle',
  turtel: 'Turtle',
  tertle: 'Turtle',
  sharck: 'Great White Shark',
  sherk: 'Great White Shark',
  ber: 'Bear',
  bare: 'Bear',
  poler: 'Polar Bear',
  'poler bear': 'Polar Bear',
  winnie: 'Winnie the Pooh',
  pooh: 'Winnie the Pooh',
  'winny the pooh': 'Winnie the Pooh',
};

export function normalizeQueryKey(query: string): string {
  return query.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function levenshteinDistance(a: string, b: string): number {
  const s = a.toLowerCase();
  const t = b.toLowerCase();
  const m = s.length;
  const n = t.length;

  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s[i - 1] === t[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[m][n];
}

export function phoneticSkeleton(word: string): string {
  return word
    .toLowerCase()
    .replace(/ph/g, 'f')
    .replace(/gh/g, 'g')
    .replace(/ck/g, 'k')
    .replace(/qu/g, 'kw')
    .replace(/sh/g, 's')
    .replace(/ch/g, 'c')
    .replace(/th/g, 't')
    .replace(/[aeiouy]+/g, 'a')
    .replace(/(.)\1+/g, '$1')
    .trim();
}

export function resolveSpellingCorrection(rawQuery: string): {
  resolvedQuery: string;
  wasAutocorrected: boolean;
  originalQuery: string;
} {
  const originalQuery = rawQuery.trim();
  const key = normalizeQueryKey(originalQuery);

  if (!key || key.length < 2) {
    return { resolvedQuery: originalQuery, wasAutocorrected: false, originalQuery };
  }

  // 1. Direct match in curated profiles or dictionary (case-insensitive)
  if (CURATED_PROFILES[key]) {
    return { resolvedQuery: originalQuery, wasAutocorrected: false, originalQuery };
  }
  const exactDict = KNOWN_ANIMAL_DICTIONARY.find(
    (item) => normalizeQueryKey(item) === key
  );
  if (exactDict) {
    return { resolvedQuery: exactDict, wasAutocorrected: false, originalQuery };
  }

  // 2. Check explicit phonetic kid-typo table
  if (PHONETIC_TYPO_MAP[key]) {
    const target = PHONETIC_TYPO_MAP[key];
    return {
      resolvedQuery: target,
      wasAutocorrected: normalizeQueryKey(target) !== key,
      originalQuery,
    };
  }

  // 3. Do not autocorrect intentional non-animal / fictional / extinct test keywords
  const protectedKeywords = [
    'pizza',
    'burger',
    'taco',
    'asdf',
    'asdfg',
    'qwerty',
    'dragon',
    'sonic',
    'mammoth',
    'woolly mammoth',
    't-rex',
  ];
  if (protectedKeywords.includes(key)) {
    return { resolvedQuery: originalQuery, wasAutocorrected: false, originalQuery };
  }

  // 4. Fuzzy match against KNOWN_ANIMAL_DICTIONARY via Levenshtein & phonetic skeleton
  const inputSkel = phoneticSkeleton(key);
  let bestCandidate: string | null = null;
  let bestScore = Infinity;

  for (const candidate of KNOWN_ANIMAL_DICTIONARY) {
    const candKey = normalizeQueryKey(candidate);
    const dist = levenshteinDistance(key, candKey);
    const maxAllowedDist = key.length <= 4 ? 1 : 2;

    if (dist <= maxAllowedDist) {
      if (dist < bestScore) {
        bestScore = dist;
        bestCandidate = candidate;
      }
      continue;
    }

    // Check against first/last word of multi-word species (e.g. "grizly" -> "Grizzly Bear")
    const parts = candKey.split(' ');
    if (parts.length > 1) {
      for (const part of parts) {
        if (part.length >= 4) {
          const partDist = levenshteinDistance(key, part);
          if (partDist <= 1 && partDist + 0.5 < bestScore) {
            bestScore = partDist + 0.5;
            bestCandidate = candidate;
          }
        }
      }
    }

    // Phonetic skeleton match
    const candSkel = phoneticSkeleton(candKey);
    if (
      inputSkel.length >= 3 &&
      inputSkel === candSkel &&
      levenshteinDistance(key, candKey) <= 3
    ) {
      if (1.5 < bestScore) {
        bestScore = 1.5;
        bestCandidate = candidate;
      }
    }
  }

  if (bestCandidate && normalizeQueryKey(bestCandidate) !== key) {
    return {
      resolvedQuery: bestCandidate,
      wasAutocorrected: true,
      originalQuery,
    };
  }

  return { resolvedQuery: originalQuery, wasAutocorrected: false, originalQuery };
}

export function getSpellingSuggestions(rawInput: string, maxResults = 4): string[] {
  const key = normalizeQueryKey(rawInput);
  if (!key || key.length < 2) return [];

  // If exact match exists in dictionary, no "Did you mean?" needed
  if (KNOWN_ANIMAL_DICTIONARY.some((a) => normalizeQueryKey(a) === key)) {
    return [];
  }

  const suggestions: Array<{ name: string; score: number }> = [];

  if (PHONETIC_TYPO_MAP[key]) {
    suggestions.push({ name: PHONETIC_TYPO_MAP[key], score: 0 });
  }

  const inputSkel = phoneticSkeleton(key);

  for (const candidate of KNOWN_ANIMAL_DICTIONARY) {
    const candKey = normalizeQueryKey(candidate);
    if (suggestions.some((s) => normalizeQueryKey(s.name) === candKey)) continue;

    const dist = levenshteinDistance(key, candKey);
    const skelDist = levenshteinDistance(inputSkel, phoneticSkeleton(candKey));

    if (dist <= 2) {
      suggestions.push({ name: candidate, score: dist });
    } else if (skelDist === 0 && Math.abs(candKey.length - key.length) <= 2) {
      suggestions.push({ name: candidate, score: 1.5 });
    } else {
      // Check individual words
      const words = candKey.split(' ');
      for (const w of words) {
        if (w.length >= 4 && levenshteinDistance(key, w) <= 2) {
          suggestions.push({ name: candidate, score: levenshteinDistance(key, w) + 0.5 });
          break;
        }
      }
    }
  }

  return suggestions
    .sort((a, b) => a.score - b.score)
    .slice(0, maxResults)
    .map((s) => s.name);
}

const PANDA_SPECIES_COMPARISONS: SpeciesComparisonCard[] = [
  {
    commonName: 'Giant Panda',
    scientificName: 'Ailuropoda melanoleuca',
    wikipediaQueryName: 'Giant_panda',
    whereTheyLive: 'Misty bamboo mountains in China',
    howTheyDiffer: 'Big black-and-white bear (250 lbs) with a "sixth thumb" for holding bamboo!',
  },
  {
    commonName: 'Red Panda',
    scientificName: 'Ailurus fulgens',
    wikipediaQueryName: 'Red_panda',
    whereTheyLive: 'Himalayan cloud forests',
    howTheyDiffer: 'House-cat sized with rusty-red fur and a long, striped fluffy tail!',
  },
  {
    commonName: 'Qinling Panda',
    scientificName: 'Ailuropoda melanoleuca qinlingensis',
    wikipediaQueryName: 'Qinling_panda',
    whereTheyLive: 'Qinling Mountains, China',
    howTheyDiffer: 'Rare Giant Panda cousin with chocolate-brown and tan fur!',
  },
];

const DOVE_SPECIES_COMPARISONS: SpeciesComparisonCard[] = [
  {
    commonName: 'Mourning Dove',
    scientificName: 'Zenaida macroura',
    wikipediaQueryName: 'Mourning_dove',
    whereTheyLive: 'Backyards & woods across North America',
    howTheyDiffer: 'Warm tan feathers, black wing spots, and a long pointed tail.',
  },
  {
    commonName: 'Rock Dove',
    scientificName: 'Columba livia',
    wikipediaQueryName: 'Rock_dove',
    whereTheyLive: 'Cities, parks & sea cliffs worldwide',
    howTheyDiffer: 'Blue-gray "City Pigeon" with two dark wing stripes and a shiny neck.',
  },
  {
    commonName: 'Eurasian Collared-Dove',
    scientificName: 'Streptopelia decaocto',
    wikipediaQueryName: 'Eurasian_collared_dove',
    whereTheyLive: 'Towns & gardens in Europe, Asia & US',
    howTheyDiffer: 'Pale sandy feathers with a neat black half-collar on its neck.',
  },
];

const BEAR_SPECIES_COMPARISONS: SpeciesComparisonCard[] = [
  {
    commonName: 'Grizzly Bear',
    scientificName: 'Ursus arctos horribilis',
    wikipediaQueryName: 'Grizzly_bear',
    whereTheyLive: 'Mountains & rivers of western North America',
    howTheyDiffer: 'Big muscular shoulder hump, long digging claws, and brown fur.',
  },
  {
    commonName: 'Polar Bear',
    scientificName: 'Ursus maritimus',
    wikipediaQueryName: 'Polar_bear',
    whereTheyLive: 'Frozen Arctic sea ice',
    howTheyDiffer: 'Snow-white coat and huge paddle paws built for icy ocean swimming.',
  },
  {
    commonName: 'American Black Bear',
    scientificName: 'Ursus americanus',
    wikipediaQueryName: 'American_black_bear',
    whereTheyLive: 'Forests across North America',
    howTheyDiffer: 'Smaller bear with no shoulder hump and curved claws for climbing trees.',
  },
];

const GIANT_PANDA_BASE: AnimalProfileData = {
  query: 'Giant Panda',
  queryType: QueryType.EXACT_SPECIES,
  commonName: 'Giant Panda',
  scientificName: 'Ailuropoda melanoleuca',
  wikipediaQueryName: 'Giant_panda',
  conservationStatus: {
    code: 'VU',
    kidFriendlyLabel: 'Needs Our Help (Vulnerable)',
    oneSentenceExplanation:
      'Decades of reforestation and bamboo corridor building helped Giant Pandas bounce back from Endangered to Vulnerable!',
  },
  modelBlueprint: {
    primaryColor: '#F8FAFC',
    secondaryColor: '#1E2029',
    accentColor: '#111827',
    bodyType: 'quadruped_bear',
    earStyle: 'round',
    snoutStyle: 'short',
    tailStyle: 'stubby',
    habitatBiome: 'forest',
    hasStripesOrSpots: true,
    hasHornsOrAntlers: false,
    hasWings: false,
  },
  friendActions: {
    introEmpathyLine:
      'Giant Pandas spend up to 14 hours a day munching fresh bamboo—so connected mountain bamboo forests are their favorite gift!',
    actions: [
      'Choose sustainably harvested bamboo and recycled paper products at home and school',
      'Support wildlife corridors that connect separated mountain bamboo forests in China',
      'Share the cool science fact that a Giant Panda has a 6th "pseudo-thumb" wrist bone to hold bamboo!',
    ],
    badgeTitle: 'Certified Giant Panda Friend',
  },
  diet: {
    dietType: 'Herbivorous Bear (99% Bamboo Specialist)',
    favoriteFoods: [
      { emoji: '🎍', name: 'Crisp Bamboo Shoots & Stems' },
      { emoji: '🍃', name: 'Tender Arrow Bamboo Leaves' },
      { emoji: '🍎', name: 'Occasional Wild Apples & Roots' },
    ],
    funComparison:
      'Munches 26 to 84 pounds of bamboo every single day—that is like eating 150 crunchy celery stalks from breakfast to dinner!',
  },
  habitat: {
    description:
      'Cool, misty high-elevation mountain bamboo forests between 5,000 and 10,000 feet in south-central China.',
    regions: ['Sichuan Province, China', 'Qinling Mountains (Shaanxi)', 'Minshan & Qionglai Mountains'],
    climateTags: ['Misty Mountain Forests', 'Dense Bamboo Groves', 'Cool & Rainy'],
  },
  secretSuperpowers: [
    {
      title: 'Built-In "Sixth Thumb" Bamboo Gripper',
      description:
        'Giant Pandas have an extra-large wrist bone that works like an opposable thumb so they can peel and hold bamboo stalks with precision!',
    },
    {
      title: 'Thick Woolly Snow-Coat Fur',
      description:
        'Their dense, oily black-and-white woolly fur keeps them warm and dry in snowy mountain bamboo forests—and they never hibernate!',
    },
    {
      title: 'Power-Crusher Cheek Jaw',
      description:
        'Wide, flat molar teeth and super-strong cheek muscles let them slice through tough woody bamboo stems like garden shears.',
    },
  ],
};

export const CURATED_PROFILES: Record<string, AnimalProfileData> = {
  'giant panda': GIANT_PANDA_BASE,

  panda: {
    ...GIANT_PANDA_BASE,
    query: 'Panda',
    queryType: QueryType.UMBRELLA_OR_COLLOQUIAL,
    bannerInfo: {
      title: 'Nature Detective Note: Which Panda Did You Mean?',
      explanation:
        'Did you know there are two totally different animals called "Panda"? Pick a picture below to compare the big black-and-white Giant Panda bear with the cat-sized Red Panda!',
      storyOrFact:
        'Fun clue: Both pandas have a special "sixth thumb" wrist bone to hold bamboo!',
      suggestedAnimals: ['Giant Panda', 'Red Panda', 'Grizzly Bear', 'Spectacled Bear'],
      speciesComparisons: PANDA_SPECIES_COMPARISONS,
    },
  },

  'red panda': {
    query: 'Red Panda',
    queryType: QueryType.EXACT_SPECIES,
    commonName: 'Red Panda',
    scientificName: 'Ailurus fulgens',
    wikipediaQueryName: 'Red_panda',
    conservationStatus: {
      code: 'EN',
      kidFriendlyLabel: 'Super Rare (Endangered)',
      oneSentenceExplanation:
        'Red Pandas need tall, mossy Himalayan forest trees and bamboo understories protected by community forest guardians.',
    },
    modelBlueprint: {
      primaryColor: '#B84A27',
      secondaryColor: '#2A1E1A',
      accentColor: '#F8FAFC',
      bodyType: 'small_mammal',
      earStyle: 'pointed',
      snoutStyle: 'short',
      tailStyle: 'long_furry',
      habitatBiome: 'forest',
      hasStripesOrSpots: true,
      hasHornsOrAntlers: false,
      hasWings: false,
    },
    friendActions: {
      introEmpathyLine:
        'Red Pandas love snoozing on high mossy branches and wrapping their fluffy ringed tails around their noses like a scarf!',
      actions: [
        'Support community forest rangers who plant native bamboo and fir trees in the Himalayas',
        'Never buy wildlife trinkets or fur hats when traveling',
        'Tell friends that Red Pandas are the only living species in the family Ailuridae!',
      ],
      badgeTitle: 'Certified Red Panda Friend',
    },
    diet: {
      dietType: 'Herbivorous Omnivore (Leaf & Shoot Specialist)',
      favoriteFoods: [
        { emoji: '🎍', name: 'Tender Bamboo Leaf Tips & Shoots' },
        { emoji: '🍒', name: 'Wild Mountain Berries & Blossoms' },
        { emoji: '🌰', name: 'Acorns & Lichens' },
      ],
      funComparison:
        'Eats around 20,000 bamboo leaves a single day—picking only the sweetest, most tender young leaf tips!',
    },
    habitat: {
      description:
        'High-altitude temperate cloud forests with giant rhododendrons, oaks, and bamboo thickets across the Eastern Himalayas.',
      regions: ['Nepal & Bhutan', 'Sikkim (India)', 'Southwestern China'],
      climateTags: ['Cloud Forests', 'Mossy Tree Canopies', 'Chilly Mountain Air'],
    },
    secretSuperpowers: [
      {
        title: 'Built-In Tail Scarf & Pillow',
        description:
          'Its 18-inch bushy, striped tail acts as a balancing pole in treetops and wraps around its face like a heated blanket in snow!',
      },
      {
        title: 'Headfirst Squirrel Ankle Twist',
        description:
          'Flexible ankle joints can rotate 180 degrees so Red Pandas can climb down vertical tree trunks headfirst!',
      },
      {
        title: 'Fuzzy Snowshoe Soles',
        description:
          'Even the bottoms of a Red Panda’s paws are covered in thick white fur to grip wet, icy branches and keep toes toasty.',
      },
    ],
  },

  'mourning dove': {
    query: 'Mourning Dove',
    queryType: QueryType.EXACT_SPECIES,
    commonName: 'Mourning Dove',
    scientificName: 'Zenaida macroura',
    wikipediaQueryName: 'Mourning_dove',
    conservationStatus: {
      code: 'LC',
      kidFriendlyLabel: 'Thriving Neighbor',
      oneSentenceExplanation:
        'Mourning Doves are among the most widespread and abundant backyard song-and-seed birds across North America.',
    },
    modelBlueprint: {
      primaryColor: '#B59B84',
      secondaryColor: '#DFCBB8',
      accentColor: '#4A5568',
      bodyType: 'avian',
      earStyle: 'hidden',
      snoutStyle: 'beak',
      tailStyle: 'feathered',
      habitatBiome: 'forest',
      hasStripesOrSpots: true,
      hasHornsOrAntlers: false,
      hasWings: true,
    },
    friendActions: {
      introEmpathyLine:
        'Mourning Doves prefer dining right on flat ground or wide platform trays where they can peck seeds side by side!',
      actions: [
        'Sprinkle millet or black-oil sunflower seeds on a clean ground tray or flat platform feeder',
        'Put decals on big sunny windows so fast-flying doves see the glass clearly',
        'Keep outdoor cats indoors or on a patio so ground-feeding doves stay safe',
      ],
      badgeTitle: 'Certified Mourning Dove Friend',
    },
    diet: {
      dietType: 'Granivore (99% Wild & Garden Seeds)',
      favoriteFoods: [
        { emoji: '🌻', name: 'Sunflower & Millet Seeds' },
        { emoji: '🌾', name: 'Wild Grass & Ragweed Seeds' },
        { emoji: '🌰', name: 'Pine Nuts & Tiny Berries' },
      ],
      funComparison:
        'Can store over 12,000 tiny seeds in its stretchy throat pouch (called a crop) before flying to a safe branch to digest them!',
    },
    habitat: {
      description:
        'Open woodlands, neighborhood yards, parks, prairies, and farm edges across North and Central America.',
      regions: ['United States & Southern Canada', 'Mexico & Central America', 'Caribbean Islands'],
      climateTags: ['Sunny Backyards', 'Open Woodland Edges', 'Evergreen Nesting Trees'],
    },
    secretSuperpowers: [
      {
        title: 'Whistling Wing Feathers',
        description:
          'That musical whistling sound when a Mourning Dove takes off isn’t its voice—it is air rushing through its specially shaped wing feathers!',
      },
      {
        title: 'Straw-Sipping Water Trick',
        description:
          'Unlike most birds that tip their heads back to swallow water, doves can dip their beaks in and sip continuously like drinking through a straw!',
      },
      {
        title: '55-MPH Sprinter Flight',
        description:
          'Despite looking peaceful and sleepy on fences, Mourning Doves can rocket through the sky at 55 miles per hour!',
      },
    ],
  },

  'rock dove': {
    query: 'Rock Dove',
    queryType: QueryType.EXACT_SPECIES,
    commonName: 'Rock Dove (City Pigeon)',
    scientificName: 'Columba livia',
    wikipediaQueryName: 'Rock_dove',
    conservationStatus: {
      code: 'LC',
      kidFriendlyLabel: 'Thriving Globally',
      oneSentenceExplanation:
        'Originally cliff-nesters in Europe, Asia, and North Africa, Rock Doves now thrive on building ledges in cities around the globe!',
    },
    modelBlueprint: {
      primaryColor: '#64748B',
      secondaryColor: '#CBD5E1',
      accentColor: '#10B981',
      bodyType: 'avian',
      earStyle: 'hidden',
      snoutStyle: 'beak',
      tailStyle: 'feathered',
      habitatBiome: 'forest',
      hasStripesOrSpots: true,
      hasHornsOrAntlers: false,
      hasWings: true,
    },
    friendActions: {
      introEmpathyLine:
        'Rock Doves are brilliant navigators that stay healthiest when they forage natural seeds instead of salty human fast food!',
      actions: [
        'Never feed pigeons salty french fries or moldy bread—grains, peas, and seeds are their real food',
        'Dispose of fishing line and string properly so city birds never get tangled feet',
        'Observe the different feather patterns in a local park flock like a real urban ornithologist!',
      ],
      badgeTitle: 'Certified Rock Dove Friend',
    },
    diet: {
      dietType: 'Granivore (Seeds, Grains & Greens)',
      favoriteFoods: [
        { emoji: '🌾', name: 'Wild Grass & Clover Seeds' },
        { emoji: '🫛', name: 'Green Peas & Corn Kernels' },
        { emoji: '🍒', name: 'Fallen Park Berries' },
      ],
      funComparison:
        'Can fly up to 600 miles in a single day and find its exact home loft using Earth’s magnetic field and the position of the sun!',
    },
    habitat: {
      description:
        'Rocky seaside cliffs, canyon ledges, and modern city bridges and building cornices worldwide.',
      regions: ['Global Cities & Towns', 'Mediterranean Sea Cliffs', 'South Asian Canyons'],
      climateTags: ['Rocky Cliff Ledges', 'Urban Parks', 'Year-Round Adaptable'],
    },
    secretSuperpowers: [
      {
        title: 'Built-In Magnetic Compass',
        description:
          'Rock Doves sense Earth’s magnetic field and low-frequency sound waves to navigate home across hundreds of miles!',
      },
      {
        title: 'Reading & Math Brains',
        description:
          'Lab studies proved pigeons can recognize all 26 letters of the alphabet, distinguish human faces, and even count up to 9!',
      },
      {
        title: 'Ultraviolet Rainbow Vision',
        description:
          'They see ultraviolet light invisible to humans, turning their neck feathers into dazzling neon signals for other doves.',
      },
    ],
  },

  dove: {
    query: 'Dove',
    queryType: QueryType.UMBRELLA_OR_COLLOQUIAL,
    commonName: 'Mourning Dove',
    scientificName: 'Zenaida macroura',
    wikipediaQueryName: 'Mourning_dove',
    conservationStatus: {
      code: 'LC',
      kidFriendlyLabel: 'Thriving Neighbor',
      oneSentenceExplanation:
        'Over 300 dove and pigeon cousins live around the world—and several probably visit your neighborhood!',
    },
    bannerInfo: {
      title: 'Nature Detective Note: Which Dove Did You Spot?',
      explanation:
        'Doves and pigeons are in the exact same bird family! Check the pictures below to spot the difference between the 3 most common neighborhood doves:',
      storyOrFact:
        'Quick clue: Pointed tail = Mourning Dove. Dark neck collar = Collared-Dove. Blue-gray = Rock Dove!',
      suggestedAnimals: ['Mourning Dove', 'Rock Dove', 'Nicobar Pigeon', 'Dodo'],
      speciesComparisons: DOVE_SPECIES_COMPARISONS,
    },
    modelBlueprint: {
      primaryColor: '#B59B84',
      secondaryColor: '#DFCBB8',
      accentColor: '#4A5568',
      bodyType: 'avian',
      earStyle: 'hidden',
      snoutStyle: 'beak',
      tailStyle: 'feathered',
      habitatBiome: 'forest',
      hasStripesOrSpots: true,
      hasHornsOrAntlers: false,
      hasWings: true,
    },
    friendActions: {
      introEmpathyLine:
        'Doves are gentle ground-feeders that love safe, quiet yard corners with flat seed trays and clean birdbaths!',
      actions: [
        'Offer millet and sunflower seeds on a low platform feeder or clean patio tray',
        'Keep birdbaths filled with fresh, shallow water for sipping and cooling off',
        'Look closely at tail shapes (pointed vs. square) to identify which dove species visits your yard!',
      ],
      badgeTitle: 'Certified Dove Detective',
    },
    diet: {
      dietType: 'Granivore (Seed & Fruit Specialist)',
      favoriteFoods: [
        { emoji: '🌻', name: 'Sunflower & White Millet Seeds' },
        { emoji: '🌾', name: 'Meadow Grass Seeds' },
        { emoji: '🫐', name: 'Small Woodland Berries' },
      ],
      funComparison:
        'Sips water like a straw without tilting its head up—letting it finish a drink in just 5 seconds flat!',
    },
    habitat: {
      description:
        'Open woodlands, suburban gardens, city parks, and farmlands across almost every continent.',
      regions: ['North & South America', 'Europe & Asia', 'Australia & Africa'],
      climateTags: ['Backyard Trees', 'Sunny Meadows', 'Park Ledges'],
    },
    secretSuperpowers: [
      {
        title: 'Straw-Action Beak Sippers',
        description:
          'Unlike robins or jays, doves use their beak like a drinking straw to pump water straight up without lifting their heads!',
      },
      {
        title: 'Wing-Whistle Takeoff Alarm',
        description:
          'Their outer wing feathers vibrate on takeoff to make a high-pitched whistle that warns the rest of the flock of danger.',
      },
      {
        title: 'Super-Parent Crop Milk',
        description:
          'Both mom and dad doves produce nutritious crop milk so baby squabs grow twice as fast as most songbird chicks!',
      },
    ],
  },

  'grizzly bear': {
    query: 'Grizzly Bear',
    queryType: QueryType.EXACT_SPECIES,
    commonName: 'Grizzly Bear',
    scientificName: 'Ursus arctos horribilis',
    wikipediaQueryName: 'Grizzly_bear',
    conservationStatus: {
      code: 'LC',
      kidFriendlyLabel: 'Thriving in the Wild',
      oneSentenceExplanation:
        'Grizzly bears have healthy populations across northern forests and mountains thanks to careful habitat protection!',
    },
    modelBlueprint: {
      primaryColor: '#6E472B',
      secondaryColor: '#9C6B43',
      accentColor: '#2A1B12',
      bodyType: 'quadruped_bear',
      earStyle: 'round',
      snoutStyle: 'long',
      tailStyle: 'stubby',
      habitatBiome: 'forest',
      hasStripesOrSpots: false,
      hasHornsOrAntlers: false,
      hasWings: false,
    },
    friendActions: {
      introEmpathyLine:
        'Grizzly bears have super-powered noses and REALLY love it when you keep campsite snacks locked up tight so they stay wild and safe!',
      actions: [
        'Store all picnic and camping snacks inside bear-proof lockboxes',
        'Make cheerful noise ("Hey Bear!") while hiking on forest trails so you never startle one',
        'Admire bears from a respectful distance of at least two school buses away',
      ],
      badgeTitle: 'Certified Grizzly Bear Friend',
    },
    diet: {
      dietType: 'Omnivore (Plants, Berries & Fish)',
      favoriteFoods: [
        { emoji: '🫐', name: 'Wild Huckleberries' },
        { emoji: '🐟', name: 'Leaping Salmon' },
        { emoji: '🌱', name: 'Dandelion Roots' },
        { emoji: '🌰', name: 'Whitebark Pine Nuts' },
      ],
      funComparison:
        'Eats up to 30,000 berries a single day in late summer—that is like eating 600 bowls of berry cereal before bedtime!',
    },
    habitat: {
      description:
        'Mountain forests, alpine meadows, and rushing salmon rivers across western North America and Alaska.',
      regions: ['Rocky Mountains', 'Alaska', 'Western Canada'],
      climateTags: ['Cool Alpine Forests', 'Snowy Winters', 'Rushing Rivers'],
    },
    secretSuperpowers: [
      {
        title: 'Super-Sleuth Nose',
        description:
          'A grizzly bear can smell food from up to 18 miles away—7 times stronger than a bloodhound dog!',
      },
      {
        title: 'Shoulder Muscle Digging Boost',
        description:
          'That big hump on their shoulders is pure muscle that lets them dig a winter den faster than a team of people with shovels.',
      },
      {
        title: 'Six-Month Power Nap',
        description:
          'During winter hibernation, their heart slows down to just 8 beats per minute and they do not need to eat or drink for months!',
      },
    ],
  },

  bear: {
    query: 'Bear',
    queryType: QueryType.UMBRELLA_OR_COLLOQUIAL,
    commonName: 'Grizzly Bear',
    scientificName: 'Ursus arctos horribilis',
    wikipediaQueryName: 'Grizzly_bear',
    conservationStatus: {
      code: 'LC',
      kidFriendlyLabel: '8 Bear Species Worldwide',
      oneSentenceExplanation:
        'The bear family (Ursidae) includes 8 incredible species across the globe—from icy Arctic Polar Bears to bamboo-munching Giant Pandas!',
    },
    bannerInfo: {
      title: 'Nature Detective Note: Which Bear Did You Mean?',
      explanation:
        'There are 8 different bear species in the world! Pick a picture below to compare North America’s 3 famous bears:',
      storyOrFact:
        'Quick clue: Shoulder hump = Grizzly Bear. Snow-white fur = Polar Bear. Tree climber = Black Bear!',
      suggestedAnimals: ['Grizzly Bear', 'Polar Bear', 'American Black Bear', 'Giant Panda'],
      speciesComparisons: BEAR_SPECIES_COMPARISONS,
    },
    modelBlueprint: {
      primaryColor: '#6E472B',
      secondaryColor: '#9C6B43',
      accentColor: '#2A1B12',
      bodyType: 'quadruped_bear',
      earStyle: 'round',
      snoutStyle: 'long',
      tailStyle: 'stubby',
      habitatBiome: 'forest',
      hasStripesOrSpots: false,
      hasHornsOrAntlers: false,
      hasWings: false,
    },
    friendActions: {
      introEmpathyLine:
        'All bears have incredible noses and stay safest when human food and garbage are locked securely out of reach!',
      actions: [
        'Use bear-resistant food canisters and trash locks in bear country',
        'Talk or clap with hiking buddies on wooded trails so bears hear you coming',
        'Learn how to spot the difference between Grizzly Bear and Black Bear tracks!',
      ],
      badgeTitle: 'Certified Bear Family Ranger',
    },
    diet: {
      dietType: 'Omnivore Family (Berries, Fish, Nuts & Bamboo)',
      favoriteFoods: [
        { emoji: '🐟', name: 'Wild River Salmon' },
        { emoji: '🫐', name: 'Mountain Huckleberries & Blueberries' },
        { emoji: '🌰', name: 'Acorns & Pine Seeds' },
      ],
      funComparison:
        'Can gain up to 3 pounds a day in autumn while preparing for their winter den nap!',
    },
    habitat: {
      description:
        'From Arctic sea ice and boreal forests to misty mountain bamboo groves and tropical rainforests.',
      regions: ['North & South America', 'Europe & Asia', 'Arctic Circle'],
      climateTags: ['Mountain Forests', 'Northern Tundra', 'Alpine Rivers'],
    },
    secretSuperpowers: [
      {
        title: '18-Mile Smell Radar',
        description:
          'Bears have the keenest sense of smell of any land mammal on Earth, with nasal linings 100 times larger than a human’s!',
      },
      {
        title: 'Winter Den Hibernation Wizards',
        description:
          'Northern bears recycle their own body water and muscle protein during winter so they wake up strong in spring.',
      },
      {
        title: '30-MPH Trail Sprinters',
        description:
          'Despite their heavy bodies, Grizzly and Black Bears can sprint as fast as an Olympic runner over short distances!',
      },
    ],
  },

  'polar bear': {
    query: 'Polar Bear',
    queryType: QueryType.EXACT_SPECIES,
    commonName: 'Polar Bear',
    scientificName: 'Ursus maritimus',
    wikipediaQueryName: 'Polar_bear',
    conservationStatus: {
      code: 'VU',
      kidFriendlyLabel: 'Needs Our Help (Vulnerable)',
      oneSentenceExplanation:
        'Polar bears depend on sturdy Arctic sea ice to travel and hunt, so keeping Earth’s climate cool directly protects their icy home!',
    },
    modelBlueprint: {
      primaryColor: '#F8FAFC',
      secondaryColor: '#E2E8F0',
      accentColor: '#1E293B',
      bodyType: 'quadruped_bear',
      earStyle: 'round',
      snoutStyle: 'long',
      tailStyle: 'stubby',
      habitatBiome: 'arctic',
      hasStripesOrSpots: false,
      hasHornsOrAntlers: false,
      hasWings: false,
    },
    friendActions: {
      introEmpathyLine:
        'Polar bears love thick, sparkling Arctic sea ice—every time we save energy at home, we help protect their chilly neighborhood!',
      actions: [
        'Walk, bike, or carpool to school when possible to help keep the Arctic cold',
        'Switch off lights and unplug chargers when not in use',
        'Share the cool science fact that Polar Bear fur is actually clear, hollow tubes!',
      ],
      badgeTitle: 'Certified Polar Bear Friend',
    },
    diet: {
      dietType: 'Carnivore (Arctic Marine Hunter)',
      favoriteFoods: [
        { emoji: '🦭', name: 'Ringed & Bearded Seals' },
        { emoji: '🐟', name: 'Arctic Char & Cod' },
        { emoji: '🌿', name: 'Summer Kelp & Tundra Berries' },
      ],
      funComparison:
        'Can swim nonstop for days across icy ocean water at 6 miles per hour using its giant 12-inch-wide front paws like kayak paddles!',
    },
    habitat: {
      description:
        'Frozen sea ice floes, coastal islands, and snowy shorelines across the Arctic Circle.',
      regions: ['Arctic Ocean', 'Canada & Alaska', 'Greenland, Norway & Russia'],
      climateTags: ['Sub-Zero Sea Ice', 'Snowdrifts', 'Polar Ocean'],
    },
    secretSuperpowers: [
      {
        title: 'Invisible Sun-Catcher Fur & Black Skin',
        description:
          'Polar bear hairs are actually transparent, hollow tubes that scatter light to look white—and underneath, their skin is jet black to soak up sunshine!',
      },
      {
        title: 'Built-In Non-Slip Ice Treads',
        description:
          'Their huge paw pads are covered in tiny soft bumps called papillae that create friction on slippery ice like snow tires!',
      },
      {
        title: 'Under-Ice Smell Detector',
        description:
          'A Polar Bear can sniff out a seal breathing hole buried under 3 feet of solid snow and ice from a mile away!',
      },
    ],
  },

  'bald eagle': {
    query: 'Bald Eagle',
    queryType: QueryType.EXACT_SPECIES,
    commonName: 'Bald Eagle',
    scientificName: 'Haliaeetus leucocephalus',
    wikipediaQueryName: 'Bald_eagle',
    conservationStatus: {
      code: 'LC',
      kidFriendlyLabel: 'Conservation Comeback Hero!',
      oneSentenceExplanation:
        'Once endangered, Bald Eagles soared back to healthy numbers across North America thanks to clean water laws and dedicated rangers!',
    },
    modelBlueprint: {
      primaryColor: '#3B281E',
      secondaryColor: '#F8FAFC',
      accentColor: '#F59E0B',
      bodyType: 'avian',
      earStyle: 'hidden',
      snoutStyle: 'hooked_beak',
      tailStyle: 'feathered',
      habitatBiome: 'forest',
      hasStripesOrSpots: false,
      hasHornsOrAntlers: false,
      hasWings: true,
    },
    friendActions: {
      introEmpathyLine:
        'Bald Eagles build giant treetop nests near clean rivers and lakes where they can swoop down for fish!',
      actions: [
        'Always pack out fishing line and tackle from lakeshores so eagles never get tangled',
        'Use non-lead fishing sinkers to keep river food webs clean and healthy',
        'Watch nesting eagles quietly through binoculars from a safe distance',
      ],
      badgeTitle: 'Certified Bald Eagle Friend',
    },
    diet: {
      dietType: 'Carnivore / Piscivore (Master Fish Catcher)',
      favoriteFoods: [
        { emoji: '🐟', name: 'Salmon, Trout & Catfish' },
        { emoji: '🦆', name: 'Waterfowl' },
        { emoji: '🦀', name: 'Coastal Crabs & Eels' },
      ],
      funComparison:
        'Builds the biggest tree nest of any North American bird—up to 10 feet wide and weighing 2 tons (as heavy as an SUV)!',
    },
    habitat: {
      description:
        'Tall old-growth trees beside rivers, large lakes, marshes, and ocean coastlines across North America.',
      regions: ['Alaska & Canada', 'Contiguous United States', 'Northern Mexico'],
      climateTags: ['Coastal Cliffs', 'River Valleys', 'Tall Pine Canopies'],
    },
    secretSuperpowers: [
      {
        title: '4x Telescope Vision',
        description:
          'Bald Eagles can spot a swimming fish from over a mile away in the sky—their eyesight is 4 to 5 times sharper than human vision!',
      },
      {
        title: '7-Foot Thermal Glider Wings',
        description:
          'With a 7-foot wingspan, they ride rising columns of warm air at 40 mph without barely flapping a wing.',
      },
      {
        title: 'Velcro-Grip Fish Talons',
        description:
          'Specialtiny rough spikes (spicules) on the bottoms of their toes grip slippery fish so they never drop dinner!',
      },
    ],
  },

  koala: {
    query: 'Koala',
    queryType: QueryType.EXACT_SPECIES,
    commonName: 'Koala',
    scientificName: 'Phascolarctos cinereus',
    wikipediaQueryName: 'Koala',
    conservationStatus: {
      code: 'VU',
      kidFriendlyLabel: 'Needs Our Help (Vulnerable)',
      oneSentenceExplanation:
        'Koalas depend on connected eucalyptus woodlands in eastern and southern Australia so they can climb safely from tree to tree.',
    },
    modelBlueprint: {
      primaryColor: '#718096',
      secondaryColor: '#EDF2F7',
      accentColor: '#1A202C',
      bodyType: 'small_mammal',
      earStyle: 'tufted',
      snoutStyle: 'short',
      tailStyle: 'stubby',
      habitatBiome: 'forest',
      hasStripesOrSpots: false,
      hasHornsOrAntlers: false,
      hasWings: false,
    },
    friendActions: {
      introEmpathyLine:
        'Koalas aren’t bears at all—they are tree-dwelling marsupials that spend 20 hours a day resting in shady eucalyptus trees!',
      actions: [
        'Support planting eucalyptus tree corridors across Australian wildlife reserves',
        'Remind drivers in wildlife zones to slow down at dusk and dawn when koalas cross between trees',
        'Share the fact that a baby koala (called a joey) grows up inside its mom’s cozy pouch!',
      ],
      badgeTitle: 'Certified Koala Friend',
    },
    diet: {
      dietType: 'Folivore (100% Eucalyptus Leaf Specialist)',
      favoriteFoods: [
        { emoji: '🌿', name: 'Fresh Eucalyptus (Gum Tree) Leaves' },
        { emoji: '🌱', name: 'Tender Blue Gum Leaf Buds' },
      ],
      funComparison:
        'Eats over 1 pound of eucalyptus leaves every night and rarely needs to drink water—getting almost all its moisture right from the leaves!',
    },
    habitat: {
      description:
        'Open eucalyptus woodlands and coastal gum-tree forests across eastern and southeastern Australia.',
      regions: ['Queensland & New South Wales', 'Victoria', 'South Australia'],
      climateTags: ['Eucalyptus Woodlands', 'Warm Sunny Days', 'Treetop Forks'],
    },
    secretSuperpowers: [
      {
        title: 'Double-Thumb Climbing Hands',
        description:
          'Each front paw has TWO opposable thumbs and three fingers, giving koalas a vise-like grip on smooth eucalyptus bark!',
      },
      {
        title: 'Detox Super-Stomach',
        description:
          'Eucalyptus oil is poisonous to almost all other animals, but a koala’s specialized digestive system safely filters out the toxins!',
      },
      {
        title: 'Built-In Seat Cushion Fur',
        description:
          'Extra-thick, springy fur and a cartilage pad on their bottom act like a built-in pillow for sitting in hard tree forks for 20 hours a day!',
      },
    ],
  },

  cheetah: {
    query: 'Cheetah',
    queryType: QueryType.EXACT_SPECIES,
    commonName: 'Cheetah',
    scientificName: 'Acinonyx jubatus',
    wikipediaQueryName: 'Cheetah',
    conservationStatus: {
      code: 'VU',
      kidFriendlyLabel: 'Needs Our Help (Vulnerable)',
      oneSentenceExplanation:
        'Cheetahs need wide-open grassland savannas where they have plenty of room to sprint and raise their cubs.',
    },
    modelBlueprint: {
      primaryColor: '#E5A93C',
      secondaryColor: '#FDE68A',
      accentColor: '#1E2029',
      bodyType: 'quadruped_cat',
      earStyle: 'round',
      snoutStyle: 'short',
      tailStyle: 'long_furry',
      habitatBiome: 'savanna',
      hasStripesOrSpots: true,
      hasHornsOrAntlers: false,
      hasWings: false,
    },
    friendActions: {
      introEmpathyLine:
        'Cheetahs are gentle, daytime sprinters that thrive when local communities and livestock guard dogs peacefully share savanna lands!',
      actions: [
        'Support conservation programs that provide Anatolian Shepherd guard dogs to protect farm herds peacefully',
        'Learn how to spot a Cheetah’s black "tear marks" running from its eyes to its mouth',
        'Spread the word that wild cheetahs belong on open savannas, never as exotic pets!',
      ],
      badgeTitle: 'Certified Cheetah Friend',
    },
    diet: {
      dietType: 'Carnivore (Daytime Savanna Sprinter)',
      favoriteFoods: [
        { emoji: '🦌', name: 'Thomson’s Gazelles & Impalas' },
        { emoji: '🐇', name: 'Savanna Hares' },
        { emoji: '🐦', name: 'Ground Birds' },
      ],
      funComparison:
        'Accelerates from 0 to 60 miles per hour in just 3 seconds—faster than a sports car on the highway!',
    },
    habitat: {
      description:
        'Wide-open grassy savannas, dry bushlands, and desert plains across Africa.',
      regions: ['Serengeti & Maasai Mara', 'Namibia & Botswana', 'Southern & Eastern Africa'],
      climateTags: ['Sunny Savanna Plains', 'Acacia Grasslands', 'Warm Dry Breezes'],
    },
    secretSuperpowers: [
      {
        title: '70-MPH Flexible Spine Spring',
        description:
          'Its spine bends like a giant spring, letting a running cheetah cover 23 feet in a single stride with all four paws in the air!',
      },
      {
        title: 'Built-In Sunglass Tear Stripes',
        description:
          'Black lines curving down from its eyes absorb blinding savanna sunlight—just like the black eye-paint football and baseball players wear!',
      },
      {
        title: 'Soccer-Cleat Claws & Rudder Tail',
        description:
          'Semi-retractable claws grip the dirt like track cleats while its flat, muscular tail swings like a boat rudder for sharp 50-mph turns!',
      },
    ],
  },

  'emperor penguin': {
    query: 'Emperor Penguin',
    queryType: QueryType.EXACT_SPECIES,
    commonName: 'Emperor Penguin',
    scientificName: 'Aptenodytes forsteri',
    wikipediaQueryName: 'Emperor_penguin',
    conservationStatus: {
      code: 'NT',
      kidFriendlyLabel: 'Needs Our Attention (Near Threatened)',
      oneSentenceExplanation:
        'Emperor Penguins raise their chicks on stable Antarctic sea ice and rely on protected Southern Ocean waters.',
    },
    modelBlueprint: {
      primaryColor: '#1E293B',
      secondaryColor: '#F8FAFC',
      accentColor: '#F59E0B',
      bodyType: 'avian',
      earStyle: 'hidden',
      snoutStyle: 'beak',
      tailStyle: 'stubby',
      habitatBiome: 'arctic',
      hasStripesOrSpots: false,
      hasHornsOrAntlers: false,
      hasWings: true,
    },
    friendActions: {
      introEmpathyLine:
        'Emperor Penguins team up in giant warm huddles to beat Antarctic blizzards—and we can team up to keep their ocean home healthy!',
      actions: [
        'Save electricity and heat at home to help protect Antarctic sea ice shelves',
        'Choose sustainable seafood so Southern Ocean krill and silverfish stay plentiful',
        'Share how dad Emperor Penguins balance their egg on their feet for 2 months in winter!',
      ],
      badgeTitle: 'Certified Emperor Penguin Friend',
    },
    diet: {
      dietType: 'Carnivore (Deep-Ocean Antarctic Diver)',
      favoriteFoods: [
        { emoji: '🐟', name: 'Antarctic Silverfish' },
        { emoji: '🦐', name: 'Antarctic Krill' },
        { emoji: '🦑', name: 'Glacial Squid' },
      ],
      funComparison:
        'Dives over 1,800 feet deep and holds its breath for 20 minutes—deeper than any other bird on planet Earth!',
    },
    habitat: {
      description:
        'Pack ice, towering glaciers, and freezing waters surrounding the continent of Antarctica.',
      regions: ['Antarctica', 'Ross Sea & Weddell Sea', 'Southern Ocean'],
      climateTags: ['Antarctic Ice Shelves', 'Polar Blizzards', 'Icy Southern Ocean'],
    },
    secretSuperpowers: [
      {
        title: 'Four-Layer Feather Spacesuit',
        description:
          'Packed with 100 waterproof feathers per square inch—more than any other bird—to stay cozy even at -60°F!',
      },
      {
        title: 'Bubble-Jet Torpedo Launch',
        description:
          'Releases tiny air bubbles from its feathers underwater to cut friction and launch onto high ice ledges at 15 mph!',
      },
      {
        title: 'Teamwork Huddle Heater',
        description:
          'Thousands of penguins take turns shuffling from the windy outside to the warm center of a huddle where temperatures reach 98°F!',
      },
    ],
  },

  'winnie the pooh': {
    query: 'Winnie the Pooh',
    queryType: QueryType.FICTIONAL_OR_MYTHICAL,
    commonName: 'American Black Bear',
    scientificName: 'Ursus americanus',
    wikipediaQueryName: 'American_black_bear',
    conservationStatus: {
      code: 'LC',
      kidFriendlyLabel: 'Thriving in the Wild',
      oneSentenceExplanation:
        'American Black Bears are the most common bears in North America, living peacefully in deep woods and mountains.',
    },
    bannerInfo: {
      title: 'Storybook to Real World Bridge!',
      explanation:
        'Winnie the Pooh is a beloved storybook bear inspired by a real-life American Black Bear named "Winnipeg" (or "Winnie") who lived at the London Zoo in 1914! Author A.A. Milne’s son, Christopher Robin, loved visiting her so much he named his teddy bear after her.',
      storyOrFact:
        'Just like Pooh Bear, real American Black Bears adore sweet treats like wild honey—plus crunchy acorns, berries, and tree bark!',
      suggestedAnimals: ['American Black Bear', 'Grizzly Bear', 'Giant Panda', 'Red Panda'],
    },
    modelBlueprint: {
      primaryColor: '#2B2927',
      secondaryColor: '#A67B5B',
      accentColor: '#F4C430',
      bodyType: 'quadruped_bear',
      earStyle: 'round',
      snoutStyle: 'long',
      tailStyle: 'stubby',
      habitatBiome: 'forest',
      hasStripesOrSpots: false,
      hasHornsOrAntlers: false,
      hasWings: false,
    },
    friendActions: {
      introEmpathyLine:
        'Real-life "Pooh Bears" love climbing trees and sniffing out sweet treats—you can help them stay safe by keeping human food out of their paws!',
      actions: [
        'Take bird feeders indoors during spring and summer so bears hunt for wild berries instead',
        'Latch trash cans tightly so curious bear cubs do not wander into neighborhoods',
        'Plant native berry bushes in community nature reserves to support wild forest habitats',
      ],
      badgeTitle: 'Certified Black Bear Friend',
    },
    diet: {
      dietType: 'Omnivore (Sweet Berries, Nuts & Honey)',
      favoriteFoods: [
        { emoji: '🍯', name: 'Wild Beehive Honey & Larvae' },
        { emoji: '🍓', name: 'Blackberries & Blueberries' },
        { emoji: '🌰', name: 'Crunchy Oak Acorns' },
        { emoji: '🌿', name: 'Fresh Spring Grasses' },
      ],
      funComparison:
        'Can gobble 20,000 calories a day in autumn—equivalent to eating 75 stack-high honey pancakes in one afternoon!',
    },
    habitat: {
      description:
        'Thick leafy forests, mountain woodlands, and mossy swamps from Canada all the way to Mexico.',
      regions: ['North American Forests', 'Appalachian Mountains', 'Pacific Northwest'],
      climateTags: ['Leafy Woodlands', 'Four Seasons', 'Hollow Tree Dens'],
    },
    secretSuperpowers: [
      {
        title: 'Champion Tree Climbers',
        description:
          'Curved, super-strong claws let black bears scamper up a 100-foot tall pine tree in seconds flat!',
      },
      {
        title: 'Rainbow Coat Wardrobe',
        description:
          'Despite their name, American Black Bears can actually have cinnamon-brown, blonde, or even bluish-gray fur!',
      },
      {
        title: 'Built-In Bee Armor',
        description:
          'Their thick fur coat protects them from bee stings when they reach into a wild hive for honey and protein-rich bee larvae.',
      },
    ],
  },

  'american black bear': {
    query: 'American Black Bear',
    queryType: QueryType.EXACT_SPECIES,
    commonName: 'American Black Bear',
    scientificName: 'Ursus americanus',
    wikipediaQueryName: 'American_black_bear',
    conservationStatus: {
      code: 'LC',
      kidFriendlyLabel: 'Thriving in the Wild',
      oneSentenceExplanation:
        'American Black Bears are the most widespread bear species in North America, thriving in wooded mountains and forests.',
    },
    modelBlueprint: {
      primaryColor: '#2B2927',
      secondaryColor: '#A67B5B',
      accentColor: '#F4C430',
      bodyType: 'quadruped_bear',
      earStyle: 'round',
      snoutStyle: 'long',
      tailStyle: 'stubby',
      habitatBiome: 'forest',
      hasStripesOrSpots: false,
      hasHornsOrAntlers: false,
      hasWings: false,
    },
    friendActions: {
      introEmpathyLine:
        'American Black Bears are shy woodland neighbors who love it when yards and campsites keep food safely stored away!',
      actions: [
        'Take bird feeders indoors during warm months so bears forage wild berries instead',
        'Latch trash bins securely so bear cubs stay in the woods',
        'Give bears plenty of space if you spot one on a forest trail',
      ],
      badgeTitle: 'Certified Black Bear Friend',
    },
    diet: {
      dietType: 'Omnivore (85% Plants, Berries & Nuts)',
      favoriteFoods: [
        { emoji: '🍓', name: 'Wild Blackberries & Blueberries' },
        { emoji: '🌰', name: 'Oak Acorns & Beechnuts' },
        { emoji: '🍯', name: 'Wild Honey & Insects' },
      ],
      funComparison:
        'Can sniff out a single ripe berry patch from over a mile away through thick forest trees!',
    },
    habitat: {
      description:
        'Dense deciduous and coniferous forests, swamps, and mountain valleys across North America.',
      regions: ['Canada & United States', 'Appalachian & Rocky Mountains', 'Northern Mexico'],
      climateTags: ['Deep Woodlands', 'Mountain Valleys', 'Cozy Winter Dens'],
    },
    secretSuperpowers: [
      {
        title: 'Tree-Climbing Claws',
        description:
          'Short, curved claws act like climbing hooks so they can dash up tall trees with ease!',
      },
      {
        title: 'Color-Changing Fur',
        description:
          'Western black bears often have cinnamon, chocolate-brown, or blonde fur instead of black!',
      },
      {
        title: 'River Swimmer',
        description:
          'Can swim over a mile across cold mountain lakes to reach island berry patches.',
      },
    ],
  },

  dodo: {
    query: 'Dodo',
    queryType: QueryType.EXTINCT,
    commonName: 'Dodo',
    scientificName: 'Raphus cucullatus',
    wikipediaQueryName: 'Dodo',
    conservationStatus: {
      code: 'EX',
      kidFriendlyLabel: 'In the History Books (Extinct)',
      oneSentenceExplanation:
        'The Dodo lived on one special island in the Indian Ocean until the late 1600s, teaching scientists today why island wildlife needs extra care.',
    },
    bannerInfo: {
      title: "Time Traveler's Log: Mauritius Island, 1598",
      explanation:
        'The Dodo was a friendly, flightless bird taller than a bowling pin that lived only on the tropical island of Mauritius. Because the island had no land predators for millions of years, Dodos built nests right on the ground and weren’t afraid of newcomers. When sailors brought ships, pigs, and monkeys to the island, the Dodo’s forest homes and ground nests disappeared.',
      storyOrFact:
        'Plot twist! Dodos weren’t clumsy at all—modern 3D bone scans show they had powerful legs for sprinting through rocky tropical forests!',
      suggestedAnimals: ['Nicobar Pigeon', 'Mourning Dove', 'Rock Dove'],
      livingRelative: {
        commonName: 'Nicobar Pigeon',
        scientificName: 'Caloenas nicobarica',
        connectionNote:
          'DNA scientists discovered the Dodo was actually a giant ground-pigeon! Its closest living cousin is the shimmering, rainbow-feathered Nicobar Pigeon.',
      },
    },
    modelBlueprint: {
      primaryColor: '#6D7B8D',
      secondaryColor: '#E8DCC4',
      accentColor: '#E59838',
      bodyType: 'avian',
      earStyle: 'hidden',
      snoutStyle: 'hooked_beak',
      tailStyle: 'fluffy_ball',
      habitatBiome: 'jungle',
      hasStripesOrSpots: false,
      hasHornsOrAntlers: false,
      hasWings: true,
    },
    friendActions: {
      introEmpathyLine:
        'Even though the Dodo is in the history books, learning its story makes you a superhero protector for today’s rare island birds!',
      actions: [
        'Learn about living island birds like the Nicobar Pigeon and New Zealand Kakapo',
        'When visiting nature parks or islands, brush seeds and mud off your shoes so invasive plants don’t spread',
        'Share the Dodo’s true story with a friend so everyone knows how special island ecosystems are',
      ],
      badgeTitle: 'Certified Island Bird Guardian',
    },
    diet: {
      dietType: 'Frugivore & Granivore (Fallen Fruits & Seeds)',
      favoriteFoods: [
        { emoji: '🥭', name: 'Fallen Tambalacoque Fruits' },
        { emoji: '🥥', name: 'Palm Nuts & Hard Seeds' },
        { emoji: '🦀', name: 'Tiny Shoreline Crabs' },
        { emoji: '🪨', name: 'Gizzard Stones (for grinding food!)' },
      ],
      funComparison:
        'Swallowed smooth volcanic pebbles as big as marbles to help its stomach crunch tough tropical nuts like a built-in blender!',
    },
    habitat: {
      description:
        'Lush coastal forests and shady valleys on the volcanic island of Mauritius in the Indian Ocean.',
      regions: ['Mauritius (Indian Ocean)', 'Mascarene Islands'],
      climateTags: ['Tropical Island', 'Warm Monsoon Breezes', 'Volcanic Forests'],
    },
    secretSuperpowers: [
      {
        title: 'Power-Sprinter Knees',
        description:
          'Far from being slow, the Dodo had thick kneecaps and muscular legs built for vaulting over fallen trees and boulders.',
      },
      {
        title: 'Giant Hooked Coconut-Cracker Beak',
        description:
          'Its 9-inch curved beak could slice open tough tropical fruits that smaller birds couldn’t even dent.',
      },
      {
        title: 'Pigeon Family Giant',
        description:
          'At up to 35 pounds, the Dodo weighed as much as 50 city pigeons put together!',
      },
    ],
  },

  'black panther': {
    query: 'Black Panther',
    queryType: QueryType.UMBRELLA_OR_COLLOQUIAL,
    commonName: 'Black Jaguar (Melanistic Jaguar)',
    scientificName: 'Panthera onca',
    wikipediaQueryName: 'Black_panther',
    conservationStatus: {
      code: 'NT',
      kidFriendlyLabel: 'Needs Our Attention (Near Threatened)',
      oneSentenceExplanation:
        'Jaguars need connected rainforest corridors so they can prowl, swim, and raise their cubs safely.',
    },
    bannerInfo: {
      title: 'Nature Detective Note: Which Black Panther?',
      explanation:
        '"Black Panther" is a nickname for two different big cats with extra-dark fur! Pick a picture below to compare them:',
      storyOrFact:
        'Fun clue: In bright sunlight, you can still see secret spots hiding in their black fur!',
      suggestedAnimals: ['Jaguar', 'Leopard', 'Cheetah', 'Cougar'],
      speciesComparisons: [
        {
          commonName: 'Black Jaguar',
          scientificName: 'Panthera onca',
          wikipediaQueryName: 'Jaguar',
          whereTheyLive: 'Rainforests of Central & South America',
          howTheyDiffer: 'Muscular swimmer with big rosette spots that have dots inside.',
        },
        {
          commonName: 'Black Leopard',
          scientificName: 'Panthera pardus',
          wikipediaQueryName: 'Leopard',
          whereTheyLive: 'Forests of Asia & Africa',
          howTheyDiffer: 'Sleek tree climber with longer tail and spots without center dots.',
        },
      ],
    },
    modelBlueprint: {
      primaryColor: '#1E2029',
      secondaryColor: '#323645',
      accentColor: '#F5B700',
      bodyType: 'quadruped_cat',
      earStyle: 'round',
      snoutStyle: 'short',
      tailStyle: 'long_furry',
      habitatBiome: 'jungle',
      hasStripesOrSpots: true,
      hasHornsOrAntlers: false,
      hasWings: false,
    },
    friendActions: {
      introEmpathyLine:
        'Black Jaguars are rainforest guardians that thrive when tall jungle trees and clean rivers stay connected!',
      actions: [
        'Look for the Rainforest Alliance frog seal on chocolate and bananas at the grocery store',
        'Recycle paper and cardboard to help protect ancient forest trees',
        'Tell friends the cool science secret about hidden spots on melanistic Jaguars and Leopards',
      ],
      badgeTitle: 'Certified Black Panther Detective',
    },
    diet: {
      dietType: 'Carnivore (Rainforest Swimmer & Hunter)',
      favoriteFoods: [
        { emoji: '🐟', name: 'Giant River Fish' },
        { emoji: '🐢', name: 'Hard-Shelled River Turtles' },
        { emoji: '🐊', name: 'Caimans' },
        { emoji: '🦌', name: 'Forest Deer & Capybaras' },
      ],
      funComparison:
        'Has a bite strong enough to crunch right through a bowling ball—the strongest bite of any big cat relative to its size!',
    },
    habitat: {
      description:
        'Dense tropical rainforests, flooded wetlands, and riverbank jungles across Central and South America.',
      regions: ['Amazon Basin', 'Pantanal Wetlands', 'Central American Jungles'],
      climateTags: ['Tropical Rainforest', 'Shady Canopy', 'Warm Riverbanks'],
    },
    secretSuperpowers: [
      {
        title: 'Secret Sunshine Spots',
        description:
          'Their jet-black coat is packed with hidden rosette patterns that glow like shadow-art whenever sunlight hits their fur.',
      },
      {
        title: 'Scuba-Cat Swimmer',
        description:
          'Unlike most house cats, Jaguars LOVE water—they dive, splash, and even hunt fish underwater!',
      },
      {
        title: 'Night-Vision Eyeshine Mirrors',
        description:
          'Special mirror-like layers at the back of their eyes bounce moonlight so they can see 6 times better in the dark than humans.',
      },
    ],
  },

  unicorn: {
    query: 'Unicorn',
    queryType: QueryType.FICTIONAL_OR_MYTHICAL,
    commonName: 'Narwhal ("Unicorn of the Sea")',
    scientificName: 'Monodon monoceros',
    wikipediaQueryName: 'Narwhal',
    conservationStatus: {
      code: 'LC',
      kidFriendlyLabel: 'Thriving in the Wild (Arctic Watch)',
      oneSentenceExplanation:
        'Narwhals swim in large pods across icy Arctic waters, though scientists watch them closely as sea ice changes.',
    },
    bannerInfo: {
      title: 'Storybook to Real World Bridge!',
      explanation:
        'Sparkly horse unicorns come from ancient myths, but two real animals inspired the legend! In the icy Arctic Ocean swims the Narwhal—a whale with a real 9-foot spiral "unicorn horn" (which is actually a super-sensitive tooth!). On land, the stout Indian Rhinoceros also has a single horn (`Rhinoceros unicornis`). Let’s meet the real-life Unicorn of the Sea!',
      storyOrFact:
        'Wait for it: A narwhal’s spiral tusk grows right through its upper lip and can bend a whole foot in any direction without breaking!',
      suggestedAnimals: ['Narwhal', 'Indian Rhinoceros', 'Polar Bear', 'Beluga Whale'],
    },
    modelBlueprint: {
      primaryColor: '#4A6B82',
      secondaryColor: '#D6E4EC',
      accentColor: '#F5E6C8',
      bodyType: 'aquatic',
      earStyle: 'hidden',
      snoutStyle: 'long',
      tailStyle: 'fin',
      habitatBiome: 'arctic',
      hasStripesOrSpots: true,
      hasHornsOrAntlers: true,
      hasWings: false,
    },
    friendActions: {
      introEmpathyLine:
        'Narwhals count on quiet, clean, icy oceans so they can talk to their pod friends with clicks and whistles!',
      actions: [
        'Turn off lights and electronics when leaving a room to help keep the Arctic chilly',
        'Use reusable water bottles so plastic never drifts into ocean whale habitats',
        'Share with someone that a Narwhal’s horn is actually a 10-million-nerve sensor tooth!',
      ],
      badgeTitle: 'Certified Sea Unicorn Friend',
    },
    diet: {
      dietType: 'Carnivore (Deep-Sea Arctic Diver)',
      favoriteFoods: [
        { emoji: '🐟', name: 'Greenland Halibut & Arctic Cod' },
        { emoji: '🦑', name: 'Deep-Sea Squid' },
        { emoji: '🦐', name: 'Icy Ocean Shrimp' },
      ],
      funComparison:
        'Dives nearly 1 mile deep under pack ice for dinner—that is deeper than 4 Empire State Buildings stacked on top of each other!',
    },
    habitat: {
      description:
        'Freezing Arctic waters, deep sea fjords, and shifting pack-ice channels around Greenland, Canada, and Norway.',
      regions: ['Baffin Bay', 'Greenland Sea', 'Canadian Arctic Archipelago'],
      climateTags: ['Freezing Polar Seas', 'Sea Ice Leads', 'Deep Ocean Fjords'],
    },
    secretSuperpowers: [
      {
        title: '10-Million-Nerve Weather Tooth',
        description:
          'Their spiral tusk has 10 million tiny nerve pathways that can taste water salinity and sense temperature changes!',
      },
      {
        title: 'Vacuum-Suction Dining',
        description:
          'Besides their famous tusk, narwhals have no other teeth in their mouth—they slurp up fish whole like an underwater vacuum cleaner!',
      },
      {
        title: 'Color-Changing Birthday Suit',
        description:
          'Baby narwhals are born blue-gray, turn dark blue-black as kids, get speckled as adults, and turn almost snowy white when very old.',
      },
    ],
  },

  axolotl: {
    query: 'Axolotl',
    queryType: QueryType.EXACT_SPECIES,
    commonName: 'Axolotl',
    scientificName: 'Ambystoma mexicanum',
    wikipediaQueryName: 'Axolotl',
    conservationStatus: {
      code: 'CR',
      kidFriendlyLabel: 'Super Rare (Critically Endangered)',
      oneSentenceExplanation:
        'Wild axolotls live only in the ancient canals of Lake Xochimilco in Mexico City, where conservationists are restoring clean floating chinampa gardens for them!',
    },
    modelBlueprint: {
      primaryColor: '#F7A8B8',
      secondaryColor: '#FFD6E0',
      accentColor: '#E0456B',
      bodyType: 'aquatic',
      earStyle: 'tufted',
      snoutStyle: 'wide',
      tailStyle: 'fin',
      habitatBiome: 'wetland',
      hasStripesOrSpots: false,
      hasHornsOrAntlers: false,
      hasWings: false,
    },
    friendActions: {
      introEmpathyLine:
        'Axolotls breathe right through their feathery gill-crowns and skin, so clean, chemical-free freshwater is their number-one wish!',
      actions: [
        'Never pour paints, soaps, or litter down storm drains that flow into local waterways',
        'Support wetland restoration and floating garden habitats that filter water naturally',
        'Never release pet fish or aquarium creatures into wild ponds or lakes',
      ],
      badgeTitle: 'Certified Axolotl Friend',
    },
    diet: {
      dietType: 'Carnivore (Freshwater Bottom Explorer)',
      favoriteFoods: [
        { emoji: '🪱', name: 'Wiggly Blackworms' },
        { emoji: '🦐', name: 'Tiny Freshwater Shrimp' },
        { emoji: '🐌', name: 'Pond Snails & Insect Larvae' },
      ],
      funComparison:
        'Snaps up prey using suction in less than a blink—creating a mini vacuum vortex in the water that pulls dinner right into its smiling mouth!',
    },
    habitat: {
      description:
        'Cool, plant-filled freshwater canals and spring-fed wetlands of Xochimilco in southern Mexico City.',
      regions: ['Lake Xochimilco, Mexico', 'Central Mexican Valley'],
      climateTags: ['Cool Freshwater Canals', 'Floating Gardens', 'Muddy Lakebeds'],
    },
    secretSuperpowers: [
      {
        title: 'Forever-Kid Super Salamander',
        description:
          'Unlike frogs and other salamanders that move onto land as adults, axolotls keep their baby gills and live underwater their whole lives!',
      },
      {
        title: 'Master Regrowth Wizard',
        description:
          'If an axolotl injures a leg or tail, it can regrow the entire limb—bones, muscles, and nerves—without even leaving a scar!',
      },
      {
        title: 'Feathery Crown Gills',
        description:
          'Those 6 frilly Pom-Pom branches on its head are external gills that wave gently to catch oxygen from the water.',
      },
    ],
  },

  pizza: {
    query: 'Pizza',
    queryType: QueryType.INVALID_OR_NON_ANIMAL,
    commonName: 'Eastern Box Turtle',
    scientificName: 'Terrapene carolina carolina',
    wikipediaQueryName: 'Eastern_box_turtle',
    conservationStatus: {
      code: 'VU',
      kidFriendlyLabel: 'Needs Our Help (Vulnerable)',
      oneSentenceExplanation:
        'Eastern Box Turtles are slow-moving woodland neighbors that need safe passages across roads and undisturbed forest floors.',
    },
    bannerInfo: {
      title: 'Wait a Minute—Pizza Isn’t an Animal!',
      explanation:
        'Pizza is delicious, cheesy food, not a wild creature! However, the Teenage Mutant Ninja Turtles are famous for loving pizza, and their real-world cousins—like the Eastern Box Turtle—love colorful forest berries, mushrooms, and earthworms that look a lot like nature’s pizza toppings!',
      storyOrFact:
        'An Eastern Box Turtle has a special hinged bottom shell (plastron) that lets it fold up completely like a latched lunchbox!',
      suggestedAnimals: ['Eastern Box Turtle', 'Green Sea Turtle', 'Grizzly Bear', 'Giant Panda'],
    },
    modelBlueprint: {
      primaryColor: '#5B7A3E',
      secondaryColor: '#E09F3E',
      accentColor: '#3A2E21',
      bodyType: 'reptile',
      earStyle: 'hidden',
      snoutStyle: 'beak',
      tailStyle: 'stubby',
      habitatBiome: 'forest',
      hasStripesOrSpots: true,
      hasHornsOrAntlers: false,
      hasWings: false,
    },
    friendActions: {
      introEmpathyLine:
        'Box turtles spend their whole lives in a home neighborhood the size of a few soccer fields—so they love staying right where they belong!',
      actions: [
        'Never take a wild turtle home as a pet—they have an internal compass tied to their home woods',
        'If an adult helps move a turtle off a road, always carry it in the EXACT direction it was already walking',
        'Leave fallen leaves and logs in the corner of your yard for turtle winter shelters',
      ],
      badgeTitle: 'Certified Box Turtle Friend',
    },
    diet: {
      dietType: 'Omnivore (Nature’s Forest Pizza)',
      favoriteFoods: [
        { emoji: '🍓', name: 'Wild Strawberries & Blackberries' },
        { emoji: '🍄', name: 'Forest Mushrooms' },
        { emoji: '🪱', name: 'Juicy Earthworms' },
        { emoji: '🌼', name: 'Dandelion Flowers' },
      ],
      funComparison:
        'Can live for over 100 years in the wild—meaning a turtle you spot today might have hatched when your great-grandparents were kids!',
    },
    habitat: {
      description:
        'Moist deciduous forests, meadow edges, and leafy woodland floors across the eastern United States.',
      regions: ['Eastern United States', 'New England Woodlands', 'Appalachian Valleys'],
      climateTags: ['Leafy Forest Floor', 'Sunny Meadow Edges', 'Warm Humid Summers'],
    },
    secretSuperpowers: [
      {
        title: 'Living Hinged Vault Shell',
        description:
          'They are the only North American land turtles with a hinged bottom shell that snaps completely shut like a treasure chest!',
      },
      {
        title: 'Built-In GPS Compass',
        description:
          'Box turtles memorize every log, puddle, and berry patch in their home range and can navigate back using the sun and Earth’s magnetic field.',
      },
      {
        title: 'Century Club Lifespan',
        description:
          'With slow, steady energy, many Eastern Box Turtles live past 80 to 100 years old!',
      },
    ],
  },

  'nicobar pigeon': {
    query: 'Nicobar Pigeon',
    queryType: QueryType.EXACT_SPECIES,
    commonName: 'Nicobar Pigeon',
    scientificName: 'Caloenas nicobarica',
    wikipediaQueryName: 'Nicobar_pigeon',
    conservationStatus: {
      code: 'NT',
      kidFriendlyLabel: 'Needs Our Attention (Near Threatened)',
      oneSentenceExplanation:
        'As the closest living relative of the extinct Dodo, the Nicobar Pigeon relies on protected coral islands to nest safely.',
    },
    modelBlueprint: {
      primaryColor: '#1B7A6E',
      secondaryColor: '#2E5288',
      accentColor: '#F8FAFC',
      bodyType: 'avian',
      earStyle: 'hidden',
      snoutStyle: 'beak',
      tailStyle: 'feathered',
      habitatBiome: 'jungle',
      hasStripesOrSpots: true,
      hasHornsOrAntlers: false,
      hasWings: true,
    },
    friendActions: {
      introEmpathyLine:
        'Nicobar Pigeons fly from island to island planting forest seeds—protecting island trees helps the Dodo’s closest living cousin thrive!',
      actions: [
        'Support marine and island sanctuaries in the Indo-Pacific region',
        'Never buy wild-caught exotic birds or feathers when traveling',
        'Share the amazing DNA link between the rainbow Nicobar Pigeon and the Dodo!',
      ],
      badgeTitle: 'Certified Nicobar Pigeon Friend',
    },
    diet: {
      dietType: 'Granivore & Frugivore (Island Seeds & Fruits)',
      favoriteFoods: [
        { emoji: '🌰', name: 'Hard Nutmeg Seeds' },
        { emoji: '🍒', name: 'Tropical Figs & Berries' },
        { emoji: '🌱', name: 'Tender Forest Buds' },
      ],
      funComparison:
        'Its muscular gizzard stomach is so strong it can grind up nuts that humans need a hammer to crack!',
    },
    habitat: {
      description:
        'Small, predator-free offshore islands and coastal mangrove forests across Southeast Asia and the Indian Ocean.',
      regions: ['Nicobar Islands', 'Indonesia & Philippines', 'Palau & Solomon Islands'],
      climateTags: ['Coral Atolls', 'Coastal Rainforests', 'Tropical Breezes'],
    },
    secretSuperpowers: [
      {
        title: 'Living Dodo Cousin',
        description:
          'Genetic tests proved this iridescent emerald-and-copper pigeon is the #1 closest living relative of the famous Dodo!',
      },
      {
        title: 'Snow-White Tail Headlight',
        description:
          'When flying across dark ocean water at dusk, the flock follows each bird’s bright white tail feathers like glowing bicycle reflectors.',
      },
      {
        title: 'Gizzard Stone Nutcracker',
        description:
          'Just like its Dodo cousin, it swallows small pebbles to crush rock-hard island seeds inside its stomach.',
      },
    ],
  },
};

export function classifyHeuristicQuery(rawQuery: string): QueryType {
  const { resolvedQuery } = resolveSpellingCorrection(rawQuery);
  const q = normalizeQueryKey(resolvedQuery);
  if (!q) return QueryType.INVALID_OR_NON_ANIMAL;

  const exactMatch = CURATED_PROFILES[q];
  if (exactMatch) return exactMatch.queryType;

  const fictionalKeywords = [
    'winnie',
    'pooh',
    'unicorn',
    'dragon',
    'sonic',
    'pikachu',
    'pokemon',
    'phoenix',
    'griffin',
    'mermaid',
    'pegasus',
    'bigfoot',
    'yeti',
    'godzilla',
    'simba',
    'bambi',
    'nemo',
    'paddington',
    'hedwig',
    'garfield',
    'snoopy',
    'spongebob',
  ];
  if (fictionalKeywords.some((k) => q.includes(k))) {
    return QueryType.FICTIONAL_OR_MYTHICAL;
  }

  const extinctKeywords = [
    'dodo',
    'mammoth',
    't-rex',
    'tyrannosaurus',
    'triceratops',
    'velociraptor',
    'stegosaurus',
    'tasmanian tiger',
    'thylacine',
    'saber-toothed',
    'smilodon',
    'passenger pigeon',
    'megalodon',
    'pterodactyl',
    'ankylosaurus',
    'diplodocus',
    'archaeopteryx',
  ];
  if (extinctKeywords.some((k) => q.includes(k))) {
    return QueryType.EXTINCT;
  }

  const invalidOrFoodKeywords = [
    'pizza',
    'burger',
    'taco',
    'car',
    'truck',
    'airplane',
    'iphone',
    'minecraft',
    'roblox',
    'asdf',
    'qwerty',
    '1234',
    'banana',
    'ice cream',
    'cookie',
    'broccoli',
    'skateboard',
    'soccer ball',
  ];
  if (
    invalidOrFoodKeywords.some((k) => q.includes(k)) ||
    /^[^a-zA-Z]+$/.test(q) ||
    (/^[bcdfghjklmnpqrstvwxz]{4,}$/i.test(q) && q.length >= 4)
  ) {
    return QueryType.INVALID_OR_NON_ANIMAL;
  }

  const umbrellaKeywords = [
    'black panther',
    'panther',
    'panda',
    'dove',
    'pigeon',
    'brown bear',
    'mountain lion',
    'bug',
    'bird',
    'fish',
    'bear',
    'whale',
    'shark',
    'monkey',
    'snake',
    'frog',
    'turtle',
    'butterfly',
    'owl',
    'eagle',
    'dolphin',
    'fox',
    'deer',
  ];
  if (umbrellaKeywords.includes(q)) {
    return QueryType.UMBRELLA_OR_COLLOQUIAL;
  }

  return QueryType.EXACT_SPECIES;
}

export function sanitizeModelBlueprint(partial?: Partial<ModelBlueprint>): ModelBlueprint {
  const validBodies: BodyType[] = [
    'quadruped_bear',
    'quadruped_cat',
    'avian',
    'aquatic',
    'reptile',
    'small_mammal',
  ];
  const bodyType =
    partial?.bodyType && validBodies.includes(partial.bodyType)
      ? partial.bodyType
      : 'quadruped_bear';

  return {
    primaryColor: partial?.primaryColor || '#6E472B',
    secondaryColor: partial?.secondaryColor || '#9C6B43',
    accentColor: partial?.accentColor || '#2A1B12',
    bodyType,
    earStyle: partial?.earStyle || 'round',
    snoutStyle: partial?.snoutStyle || 'short',
    tailStyle: partial?.tailStyle || 'stubby',
    habitatBiome: partial?.habitatBiome || 'forest',
    hasStripesOrSpots: Boolean(partial?.hasStripesOrSpots),
    hasHornsOrAntlers: Boolean(partial?.hasHornsOrAntlers),
    hasWings: Boolean(partial?.hasWings || bodyType === 'avian'),
  };
}

export function buildFallbackAnimalProfile(rawQuery: string): AnimalProfileData {
  const { resolvedQuery, wasAutocorrected, originalQuery } =
    resolveSpellingCorrection(rawQuery);
  const key = normalizeQueryKey(resolvedQuery);

  const attachAutocorrectMetadata = (profile: AnimalProfileData): AnimalProfileData => {
    if (!wasAutocorrected) {
      return {
        ...profile,
        query: originalQuery || profile.query,
      };
    }
    return {
      ...profile,
      query: originalQuery,
      originalQuery,
      wasAutocorrected: true,
      correctedQuery: profile.commonName,
    };
  };

  if (CURATED_PROFILES[key]) {
    return attachAutocorrectMetadata(CURATED_PROFILES[key]);
  }

  // Check if query contains a curated key (prefer longest key match first)
  const sortedCuratedKeys = Object.keys(CURATED_PROFILES).sort(
    (a, b) => b.length - a.length
  );
  for (const curatedKey of sortedCuratedKeys) {
    if (key.includes(curatedKey)) {
      return attachAutocorrectMetadata(CURATED_PROFILES[curatedKey]);
    }
  }

  const queryType = classifyHeuristicQuery(resolvedQuery);
  const cleanTitle =
    resolvedQuery
      .trim()
      .replace(/\b\w/g, (c) => c.toUpperCase()) || 'Eastern Box Turtle';

  if (queryType === QueryType.INVALID_OR_NON_ANIMAL) {
    return {
      ...CURATED_PROFILES['pizza'],
      query: originalQuery || rawQuery.trim(),
      bannerInfo: {
        title: `Wait a Second—"${cleanTitle}" Isn't a Wild Animal!`,
        explanation: `"${cleanTitle}" isn't an animal in our nature guide, so our Ranger Compass pointed us toward a real woodland neighbor instead: the Eastern Box Turtle!`,
        storyOrFact:
          'Box turtles love colorful forest berries and mushrooms that look just like nature’s snack platter!',
        suggestedAnimals: ['Eastern Box Turtle', 'Giant Panda', 'Grizzly Bear', 'Axolotl'],
      },
    };
  }

  if (queryType === QueryType.FICTIONAL_OR_MYTHICAL) {
    const isDragon = key.includes('dragon');
    const isSonic = key.includes('sonic');
    const counterpart = isDragon
      ? 'Komodo Dragon'
      : isSonic
        ? 'European Hedgehog'
        : 'American Black Bear';
    const sciName = isDragon
      ? 'Varanus komodoensis'
      : isSonic
        ? 'Erinaceus europaeus'
        : 'Ursus americanus';
    const bodyType: BodyType = isDragon
      ? 'reptile'
      : isSonic
        ? 'small_mammal'
        : 'quadruped_bear';

    return attachAutocorrectMetadata({
      query: rawQuery.trim(),
      queryType: QueryType.FICTIONAL_OR_MYTHICAL,
      commonName: counterpart,
      scientificName: sciName,
      wikipediaQueryName: counterpart.replace(/\s+/g, '_'),
      conservationStatus: {
        code: isDragon ? 'EN' : 'LC',
        kidFriendlyLabel: isDragon ? 'Super Rare (Endangered)' : 'Thriving in the Wild',
        oneSentenceExplanation: `${counterpart}s are 100% real wildlife heroes that inspired the legendary ${cleanTitle}!`,
      },
      bannerInfo: {
        title: 'Storybook to Real World Bridge!',
        explanation: `${cleanTitle} comes from stories and imagination, but the ${counterpart} is 100% real! Let's explore the amazing real-world animal behind the legend.`,
        storyOrFact: `Real ${counterpart}s have nature superpowers that are just as cool as any cartoon or storybook!`,
        suggestedAnimals: [counterpart, 'Flying Draco Lizard', 'Narwhal', 'Grizzly Bear'],
      },
      modelBlueprint: sanitizeModelBlueprint({
        primaryColor: isDragon ? '#556B2F' : isSonic ? '#6E5A4F' : '#4E3629',
        secondaryColor: isDragon ? '#8F9779' : '#D9C3B0',
        accentColor: '#E59838',
        bodyType,
        earStyle: isDragon ? 'hidden' : 'round',
        snoutStyle: 'long',
        tailStyle: isDragon ? 'reptile_long' : 'stubby',
        habitatBiome: isDragon ? 'savanna' : 'forest',
      }),
      friendActions: {
        introEmpathyLine: `${counterpart}s love having safe, litter-free wild spaces where they can explore in peace!`,
        actions: [
          'Protect wild bushes, logs, and natural shelters in parks and gardens',
          'Never use harsh garden sprays so insect-eating wildlife stays healthy',
          `Share the real-world story of the ${counterpart} with a friend or classmate!`,
        ],
        badgeTitle: `Certified ${counterpart} Friend`,
      },
      diet: {
        dietType: isDragon ? 'Carnivore' : 'Omnivore',
        favoriteFoods: [
          { emoji: '🪲', name: 'Crunchy Beetles & Insects' },
          { emoji: '🍓', name: 'Wild Forest Berries' },
          { emoji: '🥚', name: 'Foraged Protein Snacks' },
        ],
        funComparison: `Has an appetite built for adventure—fueling up every day to patrol its wild habitat!`,
      },
      habitat: {
        description: `Natural woodlands, sunny clearings, and protected wildlife reserves where ${counterpart}s make their homes.`,
        regions: ['Protected Nature Reserves', 'Woodland Corridors'],
        climateTags: ['Sunny Days', 'Cozy Burrows', 'Wild Foliage'],
      },
      secretSuperpowers: [
        {
          title: isDragon ? 'Armored Reptile Scales' : 'Built-In Natural Coat',
          description: isDragon
            ? 'Tough, bone-reinforced scales act like natural chainmail armor in the wild!'
            : `Thick, specialized fur or spines give the ${counterpart} awesome protection in the wild!`,
        },
        {
          title: 'Super Senses',
          description: `Can detect dinner hidden under leaves or across the breeze long before humans notice a thing.`,
        },
        {
          title: 'Storybook Inspiration',
          description: `Inspired writers and artists around the world to dream up characters like ${cleanTitle}!`,
        },
      ],
    });
  }

  if (queryType === QueryType.EXTINCT) {
    const isMammoth = key.includes('mammoth');
    const livingName = isMammoth ? 'Asian Elephant' : 'Nicobar Pigeon';
    return attachAutocorrectMetadata({
      query: rawQuery.trim(),
      queryType: QueryType.EXTINCT,
      commonName: cleanTitle,
      scientificName: isMammoth ? 'Mammuthus primigenius' : 'Prehistoric Species',
      wikipediaQueryName: cleanTitle.replace(/\s+/g, '_'),
      conservationStatus: {
        code: 'EX',
        kidFriendlyLabel: 'In the History Books (Extinct)',
        oneSentenceExplanation: `${cleanTitle} lived long ago in Earth's history, leaving behind fossils that help scientists protect its living cousins today!`,
      },
      bannerInfo: {
        title: "Time Traveler's Log",
        explanation: `Let's travel back in time! The ${cleanTitle} roamed the Earth in the past before changing climates and shifting habitats caused them to vanish. By studying their fossils, paleontologists learn how to protect living wildlife today.`,
        storyOrFact: `Today, you can still meet the ${cleanTitle}'s living ecological cousin: the ${livingName}!`,
        suggestedAnimals: [livingName, 'Dodo', 'American Bison', 'California Condor'],
        livingRelative: {
          commonName: livingName,
          scientificName: isMammoth ? 'Elephas maximus' : 'Caloenas nicobarica',
          connectionNote: `Shares family DNA and amazing survival traits with the ${cleanTitle}!`,
        },
      },
      modelBlueprint: sanitizeModelBlueprint({
        primaryColor: '#7A5940',
        secondaryColor: '#D8C8B8',
        accentColor: '#4A3525',
        bodyType: 'quadruped_bear',
        earStyle: 'round',
        snoutStyle: 'long',
        tailStyle: 'stubby',
        habitatBiome: 'arctic',
        hasHornsOrAntlers: true,
      }),
      friendActions: {
        introEmpathyLine: `Honoring the ${cleanTitle} means taking great care of its living cousins like the ${livingName}!`,
        actions: [
          `Click to explore the ${livingName} and learn how rangers protect its habitat`,
          'Visit a natural history museum to see real fossil discoveries up close',
          'Save energy at home to keep Earth’s climate steady for modern wildlife',
        ],
        badgeTitle: `Certified Time-Traveler Ranger`,
      },
      diet: {
        dietType: 'Prehistoric Forager',
        favoriteFoods: [
          { emoji: '🌾', name: 'Ancient Tundra Grasses & Ferns' },
          { emoji: '🌿', name: 'Prehistoric Leaves & Twigs' },
          { emoji: '🌰', name: 'Seeds & Wild Fruits' },
        ],
        funComparison: `Needed huge amounts of daily energy to power its prehistoric adventures!`,
      },
      habitat: {
        description: `Ancient landscapes that once stretched across prehistoric continents.`,
        regions: ['Prehistoric Earth', 'Fossil Beds'],
        climateTags: ['Ice Age & Ancient Worlds', 'Open Plains', 'Prehistoric Forests'],
      },
      secretSuperpowers: [
        {
          title: 'Fossil Time Capsules',
          description: `Left footprints, bones, and even preserved clues that let scientists reconstruct how it moved and ate!`,
        },
        {
          title: 'Built for Ancient Worlds',
          description: `Specially adapted from head to toe for prehistoric weather and landscapes.`,
        },
        {
          title: 'Living Family Tree',
          description: `Its family tree branches still live on in modern wildlife today!`,
        },
      ],
    });
  }

  // Taxonomy-aware classification so mammals NEVER mention feathers and birds NEVER mention fur!
  const isBird =
    /bird|hawk|eagle|owl|robin|duck|goose|pigeon|dove|jay|heron|gull|crow|finch|sparrow|swan|condor|penguin|parrot|cardinal|hummingbird|osprey|falcon/i.test(
      key
    );
  const isAquatic =
    /otter|seal|sea lion|whale|dolphin|shark|fish|salmon|octopus|manatee|narwhal|orca|walrus/i.test(
      key
    );
  const isReptileOrAmphibian =
    /lizard|turtle|tortoise|snake|gecko|alligator|crocodile|iguana|frog|toad|newt|salamander|chameleon|cobra/i.test(
      key
    );
  const isCatOrCanid =
    /cat|lion|tiger|jaguar|leopard|cougar|puma|bobcat|lynx|fox|wolf|coyote|cheetah/i.test(key);
  const isSmallMammal =
    /squirrel|rabbit|hare|chipmunk|mouse|hedgehog|raccoon|opossum|skunk|beaver|koala|lemur|sloth/i.test(
      key
    );

  const bodyType: BodyType = isBird
    ? 'avian'
    : isAquatic
      ? 'aquatic'
      : isReptileOrAmphibian
        ? 'reptile'
        : isCatOrCanid
          ? 'quadruped_cat'
          : isSmallMammal
            ? 'small_mammal'
            : 'quadruped_bear';

  const coveringTrait = isBird
    ? 'weather-resistant feathers and lightweight wings'
    : isReptileOrAmphibian
      ? 'protective scales or moisture-absorbing skin'
      : isAquatic
        ? 'streamlined marine skin and insulating blubber'
        : 'warm, protective mammal fur coat';

  return attachAutocorrectMetadata({
    query: rawQuery.trim(),
    queryType,
    commonName: cleanTitle,
    scientificName: `${cleanTitle} (Verified Wild Species)`,
    wikipediaQueryName: cleanTitle.replace(/\s+/g, '_'),
    conservationStatus: {
      code: 'LC',
      kidFriendlyLabel: 'Thriving Neighbor',
      oneSentenceExplanation: `${cleanTitle} plays an important role in keeping its local ecosystem healthy and balanced!`,
    },
    bannerInfo:
      queryType === QueryType.UMBRELLA_OR_COLLOQUIAL
        ? {
            title: `Nature Detective Note: Which ${cleanTitle} Species Did You Mean?`,
            explanation: `"${cleanTitle}" is an umbrella name that covers multiple distinct wild species! Compare specific cousins below or explore our spotlighted profile.`,
            storyOrFact:
              'Scientists use two-part Latin scientific names so rangers all over the world know the exact species they are talking about!',
            suggestedAnimals: ['Grizzly Bear', 'Giant Panda', 'Mourning Dove', 'Sea Otter'],
            speciesComparisons: [
              {
                commonName: `Common ${cleanTitle}`,
                scientificName: `Representative ${cleanTitle} Species`,
                whereTheyLive: 'Local woodlands, parks, and regional nature corridors',
                howTheyDiffer: `The most frequently spotted member of the ${cleanTitle} group in neighborhood habitats.`,
              },
              {
                commonName: `Northern / Mountain ${cleanTitle}`,
                scientificName: `Alpine ${cleanTitle} Relative`,
                whereTheyLive: 'Cooler northern forests, mountains, and coastal waters',
                howTheyDiffer: `Adapted for cooler climates with specialized seasonal foraging habits.`,
              },
              {
                commonName: `Tropical ${cleanTitle}`,
                scientificName: `Rainforest ${cleanTitle} Relative`,
                whereTheyLive: 'Warm equatorial forests, wetlands, and coral islands',
                howTheyDiffer: `Often displays brighter markings suited for dense, sunlit foliage.`,
              },
            ],
          }
        : undefined,
    modelBlueprint: sanitizeModelBlueprint({
      primaryColor: isBird
        ? '#3B6E8C'
        : isReptileOrAmphibian
          ? '#4D7C46'
          : isAquatic
            ? '#3E6B89'
            : '#7C5234',
      secondaryColor: '#E8D8C0',
      accentColor: '#E59838',
      bodyType,
      earStyle: isBird || isReptileOrAmphibian ? 'hidden' : isCatOrCanid ? 'pointed' : 'round',
      snoutStyle: isBird ? 'beak' : 'short',
      tailStyle: isBird ? 'feathered' : isAquatic ? 'fin' : 'long_furry',
      habitatBiome: isAquatic ? 'ocean' : 'forest',
      hasWings: isBird,
    }),
    friendActions: {
      introEmpathyLine: `${cleanTitle}s love having clean water, native plants, and peaceful places to raise their families!`,
      actions: [
        'Observe wildlife quietly with binoculars instead of chasing or feeding them',
        'Pick up any plastic wrapper or litter you spot on trails and beaches',
        `Protect native trees and plants that support the ${cleanTitle}'s food web`,
      ],
      badgeTitle: `Certified ${cleanTitle} Friend`,
    },
    diet: {
      dietType: isBird
        ? 'Avian Forager (Seeds, Fruits & Insects)'
        : isAquatic
          ? 'Marine Forager (Fish & Crustaceans)'
          : 'Wild Forager',
      favoriteFoods: [
        { emoji: '🌿', name: 'Native Plants, Seeds & Shoots' },
        { emoji: '🦗', name: 'Natural Protein & Critters' },
        { emoji: '🫐', name: 'Seasonal Wild Berries' },
      ],
      funComparison: `Spends hours every day searching for fresh food across its habitat—helping balance its local food web!`,
    },
    habitat: {
      description: `Thrives in natural habitats, parks, and ecosystems where food and shelter are plentiful.`,
      regions: ['Regional Woodlands', 'Protected Nature Parks', 'Natural Corridors'],
      climateTags: ['Natural Shelter', 'Seasonal Rhythms', 'Fresh Water Nearby'],
    },
    secretSuperpowers: [
      {
        title: 'Natural Camouflage',
        description: `Its natural markings blend right into dappled sunlight, leaves, or water so it can stay safe in the wild.`,
      },
      {
        title: 'Specialized Body Gear',
        description: `Equipped with ${coveringTrait} to stay comfortable through changing weather!`,
      },
      {
        title: 'Ecosystem Helper',
        description: `Every single day, the ${cleanTitle} helps keep plants and other wildlife in healthy harmony.`,
      },
    ],
  });
}

export interface WikipediaSummaryInfo {
  title: string;
  extract: string;
  description?: string;
  thumbnailUrl?: string;
}

export async function fetchWikipediaSummaryForQuery(
  rawQuery: string
): Promise<WikipediaSummaryInfo | null> {
  const { resolvedQuery } = resolveSpellingCorrection(rawQuery);
  const clean = resolvedQuery.trim();
  if (!clean) return null;

  try {
    // 1. Try direct page summary first
    const directTitle = clean.replace(/\s+/g, '_');
    const directRes = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(directTitle)}`
    );
    if (directRes.ok) {
      const data = (await directRes.json()) as {
        title?: string;
        extract?: string;
        description?: string;
        originalimage?: { source?: string };
        thumbnail?: { source?: string };
      };
      if (data.extract) {
        return {
          title: data.title || clean,
          extract: data.extract,
          description: data.description,
          thumbnailUrl: data.originalimage?.source || data.thumbnail?.source,
        };
      }
    }

    // 2. Fallback to Wikipedia search API
    const searchRes = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
        clean + ' animal species'
      )}&utf8=&format=json&origin=*`
    );
    if (!searchRes.ok) return null;
    const searchData = (await searchRes.json()) as {
      query?: { search?: Array<{ title?: string }> };
    };
    const topTitle = searchData.query?.search?.[0]?.title;
    if (!topTitle) return null;

    const summaryRes = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        topTitle.replace(/\s+/g, '_')
      )}`
    );
    if (!summaryRes.ok) return null;
    const summaryData = (await summaryRes.json()) as {
      title?: string;
      extract?: string;
      description?: string;
      originalimage?: { source?: string };
      thumbnail?: { source?: string };
    };
    if (!summaryData.extract) return null;

    return {
      title: summaryData.title || topTitle,
      extract: summaryData.extract,
      description: summaryData.description,
      thumbnailUrl: summaryData.originalimage?.source || summaryData.thumbnail?.source,
    };
  } catch {
    return null;
  }
}

export async function buildWikipediaGroundedFallbackProfile(
  rawQuery: string
): Promise<AnimalProfileData> {
  const base = buildFallbackAnimalProfile(rawQuery);
  const { resolvedQuery } = resolveSpellingCorrection(rawQuery);
  const key = normalizeQueryKey(resolvedQuery);

  // If it's already one of our rich curated profiles, return immediately
  if (CURATED_PROFILES[key]) {
    return base;
  }

  const wiki = await fetchWikipediaSummaryForQuery(resolvedQuery);
  if (!wiki) return base;

  // Extract binomial scientific name if present in parentheses, e.g. "(Ailuropoda melanoleuca)"
  const binomialMatch = wiki.extract.match(/\(([A-Z][a-z]+\s+[a-z]+(?:\s+[a-z]+)?)\)/);
  const scientificName = binomialMatch ? binomialMatch[1] : base.scientificName;

  // Extract food hints from Wikipedia extract
  const lowerExtract = wiki.extract.toLowerCase();
  const foods = [...base.diet.favoriteFoods];
  if (lowerExtract.includes('bamboo')) {
    foods.unshift({ emoji: '🎍', name: 'Fresh Bamboo Shoots & Leaves' });
  } else if (lowerExtract.includes('eucalyptus')) {
    foods.unshift({ emoji: '🌿', name: 'Eucalyptus Leaves' });
  } else if (lowerExtract.includes('fish') || lowerExtract.includes('salmon')) {
    foods.unshift({ emoji: '🐟', name: 'Freshwater & Ocean Fish' });
  } else if (lowerExtract.includes('krill') || lowerExtract.includes('squid')) {
    foods.unshift({ emoji: '🦐', name: 'Ocean Krill & Squid' });
  }

  return {
    ...base,
    commonName: wiki.title || base.commonName,
    scientificName,
    wikipediaQueryName: wiki.title.replace(/\s+/g, '_'),
    diet: {
      ...base.diet,
      favoriteFoods: foods.slice(0, 4),
    },
    habitat: {
      ...base.habitat,
      description: wiki.extract.split('. ').slice(0, 2).join('. ') + '.',
    },
  };
}

export function calculateFriendProgress(checkedItems: boolean[]): {
  completedCount: number;
  totalCount: number;
  isCertified: boolean;
  progressPercent: number;
} {
  const totalCount = checkedItems.length;
  const completedCount = checkedItems.filter(Boolean).length;
  const isCertified = totalCount > 0 && completedCount === totalCount;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return {
    completedCount,
    totalCount,
    isCertified,
    progressPercent,
  };
}

export function parseINaturalistSpeciesCounts(apiPayload: unknown): LocalSpeciesSighting[] {
  if (!apiPayload || typeof apiPayload !== 'object' || !('results' in apiPayload)) {
    return [];
  }
  const results = (apiPayload as { results?: unknown[] }).results;
  if (!Array.isArray(results)) return [];

  return results
    .map((item): LocalSpeciesSighting | null => {
      if (!item || typeof item !== 'object') return null;
      const record = item as {
        count?: number;
        taxon?: {
          id?: number;
          name?: string;
          preferred_common_name?: string;
          iconic_taxon_name?: string;
          default_photo?: {
            medium_url?: string;
            square_url?: string;
            url?: string;
            attribution?: string;
          };
          conservation_status?: {
            status_name?: string;
          };
        };
      };

      const taxon = record.taxon;
      if (!taxon || !taxon.name) return null;

      const commonName =
        taxon.preferred_common_name
          ? taxon.preferred_common_name.replace(/\b\w/g, (c) => c.toUpperCase())
          : taxon.name;

      const photoUrl =
        taxon.default_photo?.medium_url ||
        taxon.default_photo?.url?.replace('square', 'medium') ||
        null;

      return {
        id: taxon.id ?? Math.floor(Math.random() * 1000000),
        commonName,
        scientificName: taxon.name,
        iconicTaxonName: taxon.iconic_taxon_name || 'Wildlife',
        sightingCount: typeof record.count === 'number' ? record.count : 1,
        photoUrl,
        attribution: taxon.default_photo?.attribution,
        conservationStatus: taxon.conservation_status?.status_name,
      };
    })
    .filter((x): x is LocalSpeciesSighting => x !== null);
}
