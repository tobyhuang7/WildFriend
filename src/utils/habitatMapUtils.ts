import { AnimalProfileData, LocalSpeciesSighting } from '../types/wildlife';

export interface WorldMapRegion {
  id: string;
  name: string;
  shortLabel: string;
  continent: string;
  center: { x: number; y: number };
  coords: { lat: number; lng: number };
  biomeSummary: string;
  /** SVG path for the shaded geographic range overlay on the 1000x520 world map */
  rangePath: string;
}

export const WORLD_MAP_REGIONS: WorldMapRegion[] = [
  {
    id: 'alaska_northern_canada',
    name: 'Alaska & Northern Canada',
    shortLabel: 'Alaska & N. Canada',
    continent: 'North America',
    center: { x: 165, y: 95 },
    coords: { lat: 62.0, lng: -135.0 },
    biomeSummary: 'Subarctic tundra, boreal spruce forests, and rushing glacier rivers.',
    rangePath:
      'M 75,68 C 110,55 190,52 248,68 C 268,78 275,108 245,122 C 195,128 135,124 85,112 C 65,102 62,78 75,68 Z',
  },
  {
    id: 'western_north_america',
    name: 'Western North America & Rockies',
    shortLabel: 'Rockies & Pacific Coast',
    continent: 'North America',
    center: { x: 172, y: 158 },
    coords: { lat: 44.0, lng: -116.0 },
    biomeSummary: 'Rugged mountain ranges, redwood & pine forests, and Pacific kelp coasts.',
    rangePath:
      'M 128,118 C 158,112 195,118 208,142 C 216,166 208,198 184,210 C 156,208 132,185 124,155 C 120,136 122,122 128,118 Z',
  },
  {
    id: 'eastern_north_america',
    name: 'Eastern & Central North America',
    shortLabel: 'Eastern US & Canada',
    continent: 'North America',
    center: { x: 245, y: 168 },
    coords: { lat: 39.0, lng: -82.0 },
    biomeSummary: 'Deciduous oak-maple woodlands, prairies, lakes, and neighborhood parks.',
    rangePath:
      'M 202,124 C 242,118 292,126 308,152 C 312,178 282,208 245,214 C 212,210 198,186 196,158 C 195,140 198,128 202,124 Z',
  },
  {
    id: 'central_america_caribbean',
    name: 'Mexico, Central America & Caribbean',
    shortLabel: 'Mexico & Central America',
    continent: 'North America',
    center: { x: 222, y: 235 },
    coords: { lat: 19.5, lng: -96.0 },
    biomeSummary: 'Warm cloud forests, freshwater canals, coral islands, and tropical jungles.',
    rangePath:
      'M 172,204 C 215,198 268,208 286,232 C 292,252 268,268 232,265 C 198,260 175,242 168,222 C 165,212 168,206 172,204 Z',
  },
  {
    id: 'amazon_northern_sa',
    name: 'Amazon Rainforest & Northern South America',
    shortLabel: 'Amazon & Tropics',
    continent: 'South America',
    center: { x: 312, y: 302 },
    coords: { lat: -5.0, lng: -62.0 },
    biomeSummary: 'Lush equatorial rainforest canopies, winding rivers, and flooded wetlands.',
    rangePath:
      'M 258,262 C 302,254 356,268 372,302 C 378,334 348,358 308,356 C 272,352 252,324 248,292 C 246,275 252,265 258,262 Z',
  },
  {
    id: 'andes_southern_sa',
    name: 'Andes Mountains & Southern South America',
    shortLabel: 'Andes & Patagonia',
    continent: 'South America',
    center: { x: 302, y: 392 },
    coords: { lat: -32.0, lng: -68.0 },
    biomeSummary: 'High mountain peaks, cloud forests, pampas grasslands, and rocky coasts.',
    rangePath:
      'M 272,345 C 305,342 336,358 338,395 C 336,435 318,465 292,468 C 272,462 264,422 265,382 C 266,360 268,348 272,345 Z',
  },
  {
    id: 'arctic_ocean',
    name: 'Arctic Circle, Sea Ice & Greenland',
    shortLabel: 'Arctic Sea Ice',
    continent: 'Arctic Circle',
    center: { x: 430, y: 52 },
    coords: { lat: 76.0, lng: -20.0 },
    biomeSummary: 'Sparkling polar pack ice, glaciers, and icy northern ocean waters.',
    rangePath:
      'M 265,28 C 380,18 560,18 685,32 C 710,42 705,68 665,75 C 520,82 375,82 275,72 C 248,64 248,36 265,28 Z',
  },
  {
    id: 'western_northern_europe',
    name: 'UK, Western & Northern Europe',
    shortLabel: 'UK & Western Europe',
    continent: 'Europe',
    center: { x: 485, y: 128 },
    coords: { lat: 52.0, lng: 4.0 },
    biomeSummary: 'Woodland parks, hedgerows, mossy forests, and northern fjords.',
    rangePath:
      'M 442,92 C 482,82 528,88 542,115 C 548,138 525,156 485,158 C 452,156 435,138 435,114 C 435,102 438,95 442,92 Z',
  },
  {
    id: 'mediterranean_eastern_europe',
    name: 'Mediterranean & Eastern Europe',
    shortLabel: 'Mediterranean & E. Europe',
    continent: 'Europe',
    center: { x: 535, y: 168 },
    coords: { lat: 43.0, lng: 20.0 },
    biomeSummary: 'Sunny sea cliffs, olive groves, mountain valleys, and historic towns.',
    rangePath:
      'M 465,148 C 515,142 575,145 595,168 C 600,188 572,202 522,202 C 482,200 458,186 458,166 C 458,155 461,150 465,148 Z',
  },
  {
    id: 'north_africa_middle_east',
    name: 'North Africa, Sahara & Middle East',
    shortLabel: 'North Africa & Middle East',
    continent: 'Africa & Middle East',
    center: { x: 545, y: 225 },
    coords: { lat: 25.0, lng: 25.0 },
    biomeSummary: 'Golden sand dunes, rocky canyons, desert oases, and warm coastal ledges.',
    rangePath:
      'M 438,195 C 508,188 595,192 632,218 C 642,245 608,266 538,266 C 472,265 432,246 430,220 C 429,206 433,198 438,195 Z',
  },
  {
    id: 'sub_saharan_africa',
    name: 'Sub-Saharan Africa & Savannas',
    shortLabel: 'African Savannas & Jungles',
    continent: 'Africa',
    center: { x: 542, y: 318 },
    coords: { lat: -2.0, lng: 24.0 },
    biomeSummary: 'Wide acacia savannas, tropical Congo rainforests, and watering holes.',
    rangePath:
      'M 455,258 C 515,252 585,262 605,305 C 612,358 585,408 538,415 C 498,412 475,365 452,312 C 444,285 448,264 455,258 Z',
  },
  {
    id: 'madagascar',
    name: 'Madagascar & Indian Ocean Islands',
    shortLabel: 'Madagascar & Mauritius',
    continent: 'Africa & Indian Ocean',
    center: { x: 622, y: 368 },
    coords: { lat: -19.5, lng: 48.0 },
    biomeSummary: 'Unique island rainforests, spiny forests, and volcanic islands like Mauritius.',
    rangePath:
      'M 598,336 C 624,330 648,344 652,372 C 650,398 628,412 605,406 C 588,396 586,368 592,348 C 594,340 596,338 598,336 Z',
  },
  {
    id: 'northern_eurasia_siberia',
    name: 'Northern Eurasia & Siberia',
    shortLabel: 'Northern Eurasia & Taiga',
    continent: 'Asia & Europe',
    center: { x: 705, y: 108 },
    coords: { lat: 60.0, lng: 90.0 },
    biomeSummary: 'Vast snowy taiga forests, northern steppes, and wilderness rivers.',
    rangePath:
      'M 565,72 C 655,62 785,65 855,88 C 872,108 855,138 785,145 C 695,148 605,142 562,122 C 548,108 552,82 565,72 Z',
  },
  {
    id: 'east_asia_china',
    name: 'East Asia, China & Bamboo Mountains',
    shortLabel: 'China & East Asia',
    continent: 'Asia',
    center: { x: 768, y: 192 },
    coords: { lat: 32.0, lng: 108.0 },
    biomeSummary: 'Misty bamboo mountain forests of Sichuan & Shaanxi, temperate valleys, and islands.',
    rangePath:
      'M 695,148 C 755,142 825,152 848,185 C 852,216 818,238 758,238 C 708,235 682,212 682,182 C 682,162 688,152 695,148 Z',
  },
  {
    id: 'south_asia_himalayas',
    name: 'Himalayas, India & South Asia',
    shortLabel: 'Himalayas & India',
    continent: 'Asia',
    center: { x: 688, y: 228 },
    coords: { lat: 24.0, lng: 82.0 },
    biomeSummary: 'High Himalayan cloud forests, monsoon jungles, and river plains.',
    rangePath:
      'M 638,188 C 682,180 728,192 738,225 C 742,258 715,282 678,280 C 645,274 632,245 632,214 C 632,198 635,190 638,188 Z',
  },
  {
    id: 'southeast_asia_indonesia',
    name: 'Southeast Asia & Indonesian Islands',
    shortLabel: 'SE Asia & Indonesia',
    continent: 'Asia',
    center: { x: 785, y: 288 },
    coords: { lat: 2.0, lng: 112.0 },
    biomeSummary: 'Tropical island jungles, coral archipelagos, and volcanic islands.',
    rangePath:
      'M 728,242 C 782,238 845,256 862,292 C 865,322 828,338 772,334 C 732,326 716,298 718,268 C 719,252 723,245 728,242 Z',
  },
  {
    id: 'australia_new_zealand',
    name: 'Australia, Tasmania & New Zealand',
    shortLabel: 'Australia & Oceania',
    continent: 'Oceania',
    center: { x: 838, y: 388 },
    coords: { lat: -26.0, lng: 138.0 },
    biomeSummary: 'Eucalyptus gum-tree woodlands, outback red deserts, and Great Barrier Reef coasts.',
    rangePath:
      'M 768,342 C 828,336 898,352 918,392 C 922,432 882,456 822,452 C 772,445 752,412 755,374 C 756,355 762,345 768,342 Z',
  },
  {
    id: 'antarctica_southern_ocean',
    name: 'Antarctica & Southern Ocean',
    shortLabel: 'Antarctica',
    continent: 'Antarctica',
    center: { x: 510, y: 485 },
    coords: { lat: -75.0, lng: 0.0 },
    biomeSummary: 'Towering ice shelves, polar glaciers, and krill-rich Southern Ocean waters.',
    rangePath:
      'M 215,468 C 380,456 640,456 815,468 C 845,476 842,504 795,508 C 610,512 390,512 225,508 C 192,502 192,474 215,468 Z',
  },
  {
    id: 'global_oceans',
    name: 'Pacific, Atlantic & Indian Oceans',
    shortLabel: 'World Oceans & Coasts',
    continent: 'Global Marine',
    center: { x: 395, y: 265 },
    coords: { lat: 10.0, lng: -40.0 },
    biomeSummary: 'Kelp forests, coral reefs, sunlit coastal waters, and deep blue ocean currents.',
    rangePath:
      'M 55,155 C 105,145 140,185 135,255 C 128,325 92,365 55,355 C 28,335 28,185 55,155 Z M 355,185 C 405,175 438,215 432,275 C 425,335 388,365 352,352 C 328,332 328,212 355,185 Z M 652,302 C 698,295 732,328 728,378 C 722,418 682,435 648,422 C 625,402 628,322 652,302 Z',
  },
];

const REGION_BY_ID: Record<string, WorldMapRegion> = Object.fromEntries(
  WORLD_MAP_REGIONS.map((r) => [r.id, r])
);

const ANIMAL_SPECIFIC_REGION_OVERRIDES: Record<string, string[]> = {
  'grizzly bear': ['alaska_northern_canada', 'western_north_america'],
  'giant panda': ['east_asia_china'],
  panda: ['east_asia_china', 'south_asia_himalayas'],
  'qinling panda': ['east_asia_china'],
  'red panda': ['south_asia_himalayas', 'east_asia_china'],
  'mourning dove': [
    'western_north_america',
    'eastern_north_america',
    'central_america_caribbean',
  ],
  'rock dove': [
    'western_north_america',
    'eastern_north_america',
    'western_northern_europe',
    'mediterranean_eastern_europe',
    'north_africa_middle_east',
    'south_asia_himalayas',
    'east_asia_china',
    'australia_new_zealand',
  ],
  'rock dove (city pigeon)': [
    'western_north_america',
    'eastern_north_america',
    'western_northern_europe',
    'mediterranean_eastern_europe',
    'north_africa_middle_east',
    'south_asia_himalayas',
    'east_asia_china',
    'australia_new_zealand',
  ],
  'eurasian collared-dove': [
    'western_northern_europe',
    'mediterranean_eastern_europe',
    'south_asia_himalayas',
    'western_north_america',
    'eastern_north_america',
  ],
  dove: [
    'western_north_america',
    'eastern_north_america',
    'central_america_caribbean',
    'amazon_northern_sa',
    'western_northern_europe',
    'mediterranean_eastern_europe',
    'sub_saharan_africa',
    'south_asia_himalayas',
    'east_asia_china',
    'australia_new_zealand',
  ],
  'polar bear': ['arctic_ocean', 'alaska_northern_canada', 'northern_eurasia_siberia'],
  'american black bear': [
    'alaska_northern_canada',
    'western_north_america',
    'eastern_north_america',
  ],
  'winnie the pooh': [
    'alaska_northern_canada',
    'western_north_america',
    'eastern_north_america',
  ],
  bear: [
    'alaska_northern_canada',
    'western_north_america',
    'eastern_north_america',
    'andes_southern_sa',
    'western_northern_europe',
    'northern_eurasia_siberia',
    'east_asia_china',
    'south_asia_himalayas',
    'arctic_ocean',
  ],
  'black panther': [
    'central_america_caribbean',
    'amazon_northern_sa',
    'sub_saharan_africa',
    'south_asia_himalayas',
    'southeast_asia_indonesia',
  ],
  'black jaguar': ['central_america_caribbean', 'amazon_northern_sa'],
  jaguar: ['central_america_caribbean', 'amazon_northern_sa'],
  leopard: ['sub_saharan_africa', 'south_asia_himalayas', 'southeast_asia_indonesia'],
  'snow leopard': ['south_asia_himalayas', 'east_asia_china'],
  dodo: ['madagascar'],
  'nicobar pigeon': ['southeast_asia_indonesia', 'south_asia_himalayas'],
  unicorn: ['arctic_ocean', 'alaska_northern_canada'],
  narwhal: ['arctic_ocean', 'alaska_northern_canada'],
  axolotl: ['central_america_caribbean'],
  'eastern box turtle': ['eastern_north_america'],
  'bald eagle': [
    'alaska_northern_canada',
    'western_north_america',
    'eastern_north_america',
    'central_america_caribbean',
  ],
  koala: ['australia_new_zealand'],
  kangaroo: ['australia_new_zealand'],
  platypus: ['australia_new_zealand'],
  wombat: ['australia_new_zealand'],
  'tasmanian devil': ['australia_new_zealand'],
  'tasmanian tiger': ['australia_new_zealand'],
  'sea otter': ['western_north_america', 'global_oceans'],
  'california sea lion': ['western_north_america', 'global_oceans'],
  'eastern gray squirrel': ['eastern_north_america', 'western_northern_europe'],
  'american robin': [
    'alaska_northern_canada',
    'western_north_america',
    'eastern_north_america',
  ],
  'red-tailed hawk': [
    'western_north_america',
    'eastern_north_america',
    'central_america_caribbean',
  ],
  'red fox': [
    'western_north_america',
    'eastern_north_america',
    'western_northern_europe',
    'mediterranean_eastern_europe',
    'northern_eurasia_siberia',
    'east_asia_china',
    'australia_new_zealand',
  ],
  'european robin': ['western_northern_europe', 'mediterranean_eastern_europe'],
  'european hedgehog': ['western_northern_europe', 'mediterranean_eastern_europe'],
  'common frog': ['western_northern_europe', 'northern_eurasia_siberia'],
  'emperor penguin': ['antarctica_southern_ocean'],
  penguin: ['antarctica_southern_ocean', 'andes_southern_sa', 'australia_new_zealand'],
  'komodo dragon': ['southeast_asia_indonesia'],
  'african bush elephant': ['sub_saharan_africa'],
  'asian elephant': ['south_asia_himalayas', 'southeast_asia_indonesia'],
  giraffe: ['sub_saharan_africa'],
  cheetah: ['sub_saharan_africa'],
  lion: ['sub_saharan_africa', 'south_asia_himalayas'],
  tiger: ['south_asia_himalayas', 'southeast_asia_indonesia', 'northern_eurasia_siberia'],
  'ring-tailed lemur': ['madagascar'],
  capybara: ['amazon_northern_sa', 'andes_southern_sa'],
  'three-toed sloth': ['central_america_caribbean', 'amazon_northern_sa'],
  'woolly mammoth': ['alaska_northern_canada', 'northern_eurasia_siberia', 'arctic_ocean'],
  'tyrannosaurus rex': ['western_north_america'],
  'great white shark': ['global_oceans', 'western_north_america', 'australia_new_zealand'],
  'blue whale': ['global_oceans', 'arctic_ocean', 'antarctica_southern_ocean'],
};

/**
 * Resolves the world geographic regions where an animal appears so the Explore Animals
 * map can shade its real habitat areas.
 */
export function resolveAnimalRangeRegions(profile: AnimalProfileData): WorldMapRegion[] {
  const nameKey = profile.commonName.trim().toLowerCase();
  const queryKey = profile.query.trim().toLowerCase();

  const matchedIds = new Set<string>();

  if (ANIMAL_SPECIFIC_REGION_OVERRIDES[nameKey]) {
    for (const id of ANIMAL_SPECIFIC_REGION_OVERRIDES[nameKey]) {
      matchedIds.add(id);
    }
  } else if (ANIMAL_SPECIFIC_REGION_OVERRIDES[queryKey]) {
    for (const id of ANIMAL_SPECIFIC_REGION_OVERRIDES[queryKey]) {
      matchedIds.add(id);
    }
  }

  // Also inspect habitat.regions and habitat.description for dynamic Gemini profiles
  const combinedText = [
    profile.commonName,
    profile.habitat.description,
    ...profile.habitat.regions,
    ...profile.habitat.climateTags,
  ]
    .join(' ')
    .toLowerCase();

  if (
    /alaska|yukon|northwest territories|boreal canada|northern canada/.test(combinedText)
  ) {
    matchedIds.add('alaska_northern_canada');
  }
  if (
    /rocky mountains|rockies|western north america|pacific northwest|california|western canada|yellowstone|sierra nevada/.test(
      combinedText
    )
  ) {
    matchedIds.add('western_north_america');
  }
  if (
    /eastern north america|eastern united states|appalachian|great plains|midwest|new england|atlantic coast|southern canada|united states/.test(
      combinedText
    )
  ) {
    matchedIds.add('eastern_north_america');
  }
  if (/north america/.test(combinedText) && !matchedIds.has('western_north_america')) {
    matchedIds.add('western_north_america');
    matchedIds.add('eastern_north_america');
  }
  if (
    /mexico|central america|caribbean|costa rica|xochimilco|yucatan/.test(combinedText)
  ) {
    matchedIds.add('central_america_caribbean');
  }
  if (
    /amazon|brazil|northern south america|orinoco|guiana|colombia|venezuela|ecuador|peru/.test(
      combinedText
    )
  ) {
    matchedIds.add('amazon_northern_sa');
  }
  if (/andes|patagonia|argentina|chile|pampas|galapagos|southern south america/.test(combinedText)) {
    matchedIds.add('andes_southern_sa');
  }
  if (/south america/.test(combinedText) && !matchedIds.has('amazon_northern_sa')) {
    matchedIds.add('amazon_northern_sa');
    matchedIds.add('andes_southern_sa');
  }
  if (
    /arctic|sea ice|greenland|svalbard|polar ocean|baffin|hudson bay/.test(combinedText)
  ) {
    matchedIds.add('arctic_ocean');
  }
  if (
    /united kingdom|britain|england|scotland|western europe|northern europe|scandinavia|france|germany|norway/.test(
      combinedText
    )
  ) {
    matchedIds.add('western_northern_europe');
  }
  if (
    /mediterranean|southern europe|eastern europe|italy|spain|greece|balkans/.test(
      combinedText
    )
  ) {
    matchedIds.add('mediterranean_eastern_europe');
  }
  if (/\beurope\b/.test(combinedText) && !matchedIds.has('western_northern_europe')) {
    matchedIds.add('western_northern_europe');
    matchedIds.add('mediterranean_eastern_europe');
  }
  if (/sahara|north africa|middle east|arabia|egypt|morocco/.test(combinedText)) {
    matchedIds.add('north_africa_middle_east');
  }
  if (
    /savanna|sub-saharan|serengeti|kenya|tanzania|south africa|congo|kalahari|african|africa/.test(
      combinedText
    ) &&
    !/north africa/.test(combinedText)
  ) {
    matchedIds.add('sub_saharan_africa');
  }
  if (/madagascar|mauritius|indian ocean island|mascarene/.test(combinedText)) {
    matchedIds.add('madagascar');
  }
  if (/siberia|russia|taiga|eurasia|kamchatka|mongolia/.test(combinedText)) {
    matchedIds.add('northern_eurasia_siberia');
  }
  if (
    /china|sichuan|qinling|shaanxi|minshan|qionglai|japan|korea|east asia/.test(
      combinedText
    )
  ) {
    matchedIds.add('east_asia_china');
  }
  if (
    /himalaya|nepal|bhutan|sikkim|india|sri lanka|south asia|bengal/.test(combinedText)
  ) {
    matchedIds.add('south_asia_himalayas');
  }
  if (
    /southeast asia|indonesia|borneo|sumatra|komodo|malaysia|thailand|vietnam|philippines|nicobar/.test(
      combinedText
    )
  ) {
    matchedIds.add('southeast_asia_indonesia');
  }
  if (
    /australia|queensland|new south wales|victoria|tasmania|new zealand|outback|eucalyptus/.test(
      combinedText
    )
  ) {
    matchedIds.add('australia_new_zealand');
  }
  if (/antarctica|antarctic|southern ocean|ross sea/.test(combinedText)) {
    matchedIds.add('antarctica_southern_ocean');
  }
  if (
    /pacific ocean|atlantic ocean|indian ocean|coral reef|open ocean|worldwide oceans|kelp forest|marine/.test(
      combinedText
    ) ||
    profile.modelBlueprint.habitatBiome === 'ocean'
  ) {
    matchedIds.add('global_oceans');
  }

  // Fallback if no specific keyword matched so every animal always shades its biome region
  if (matchedIds.size === 0) {
    switch (profile.modelBlueprint.habitatBiome) {
      case 'arctic':
        matchedIds.add('arctic_ocean');
        matchedIds.add('alaska_northern_canada');
        break;
      case 'savanna':
        matchedIds.add('sub_saharan_africa');
        break;
      case 'jungle':
        matchedIds.add('amazon_northern_sa');
        matchedIds.add('southeast_asia_indonesia');
        break;
      case 'ocean':
        matchedIds.add('global_oceans');
        matchedIds.add('western_north_america');
        break;
      case 'wetland':
        matchedIds.add('eastern_north_america');
        matchedIds.add('amazon_northern_sa');
        break;
      case 'forest':
      default:
        matchedIds.add('western_north_america');
        matchedIds.add('eastern_north_america');
        break;
    }
  }

  return Array.from(matchedIds)
    .map((id) => REGION_BY_ID[id])
    .filter((r): r is WorldMapRegion => Boolean(r));
}

export interface GeocodedLocationResult {
  lat: number;
  lng: number;
  displayName: string;
  regionPresetKey: string;
  source: 'curated' | 'zip_api' | 'geocoding_api' | 'zip_prefix';
}

interface CityCoordEntry {
  displayName: string;
  lat: number;
  lng: number;
  aliases: string[];
}

const KNOWN_CITIES_AND_ZIPS: CityCoordEntry[] = [
  {
    displayName: 'New Haven, CT',
    lat: 41.3083,
    lng: -72.9279,
    aliases: ['new haven', 'new haven, ct', 'new haven ct', '06510', '06511', '06520'],
  },
  {
    displayName: 'San Francisco, CA',
    lat: 37.7749,
    lng: -122.4194,
    aliases: ['san francisco', 'san francisco, ca', 'sf', 'sfo', '94102', '94103', '94110', '94117'],
  },
  {
    displayName: 'Beverly Hills, CA (90210)',
    lat: 34.0901,
    lng: -118.4065,
    aliases: ['90210', 'beverly hills', 'beverly hills, ca'],
  },
  {
    displayName: 'Los Angeles, CA',
    lat: 34.0522,
    lng: -118.2437,
    aliases: ['los angeles', 'los angeles, ca', 'la', '90001', '90012', '90024', '90045'],
  },
  {
    displayName: 'San Diego, CA',
    lat: 32.7157,
    lng: -117.1611,
    aliases: ['san diego', 'san diego, ca', '92101', '92103'],
  },
  {
    displayName: 'San Jose, CA',
    lat: 37.3382,
    lng: -121.8863,
    aliases: ['san jose', 'san jose, ca', '95101', '95110', '95112'],
  },
  {
    displayName: 'Sacramento, CA',
    lat: 38.5816,
    lng: -121.4944,
    aliases: ['sacramento', 'sacramento, ca', '95814'],
  },
  {
    displayName: 'New York, NY',
    lat: 40.7128,
    lng: -74.006,
    aliases: [
      'new york',
      'new york city',
      'new york, ny',
      'nyc',
      'manhattan',
      'brooklyn',
      '10001',
      '10002',
      '10019',
      '10024',
      '11201',
    ],
  },
  {
    displayName: 'Chicago, IL',
    lat: 41.8781,
    lng: -87.6298,
    aliases: ['chicago', 'chicago, il', 'chicago il', '60601', '60611', '60614', '60657'],
  },
  {
    displayName: 'Miami, FL',
    lat: 25.7617,
    lng: -80.1918,
    aliases: ['miami', 'miami, fl', 'miami fl', 'miami beach', '33101', '33130', '33139'],
  },
  {
    displayName: 'Orlando, FL',
    lat: 28.5383,
    lng: -81.3792,
    aliases: ['orlando', 'orlando, fl', '32801', '32830'],
  },
  {
    displayName: 'Tampa, FL',
    lat: 27.9506,
    lng: -82.4572,
    aliases: ['tampa', 'tampa, fl', '33602'],
  },
  {
    displayName: 'Seattle, WA',
    lat: 47.6062,
    lng: -122.3321,
    aliases: ['seattle', 'seattle, wa', 'seattle wa', '98101', '98104', '98109'],
  },
  {
    displayName: 'Portland, OR',
    lat: 45.5152,
    lng: -122.6784,
    aliases: ['portland', 'portland, or', 'portland or', '97201', '97204', '97209'],
  },
  {
    displayName: 'Austin, TX',
    lat: 30.2672,
    lng: -97.7431,
    aliases: ['austin', 'austin, tx', 'austin tx', '78701', '78704'],
  },
  {
    displayName: 'Houston, TX',
    lat: 29.7604,
    lng: -95.3698,
    aliases: ['houston', 'houston, tx', 'houston tx', '77001', '77002'],
  },
  {
    displayName: 'Dallas, TX',
    lat: 32.7767,
    lng: -96.797,
    aliases: ['dallas', 'dallas, tx', 'dallas tx', '75201', '75202'],
  },
  {
    displayName: 'San Antonio, TX',
    lat: 29.4241,
    lng: -98.4936,
    aliases: ['san antonio', 'san antonio, tx', '78201', '78205'],
  },
  {
    displayName: 'Denver, CO',
    lat: 39.7392,
    lng: -104.9903,
    aliases: ['denver', 'denver, co', 'denver co', '80201', '80202', '80203'],
  },
  {
    displayName: 'Boulder, CO',
    lat: 40.015,
    lng: -105.2705,
    aliases: ['boulder', 'boulder, co', '80301', '80302'],
  },
  {
    displayName: 'Boston, MA',
    lat: 42.3601,
    lng: -71.0589,
    aliases: ['boston', 'boston, ma', 'boston ma', 'cambridge, ma', '02101', '02108', '02116', '02138'],
  },
  {
    displayName: 'Washington, DC',
    lat: 38.9072,
    lng: -77.0369,
    aliases: ['washington', 'washington, dc', 'washington dc', 'dc', '20001', '20005', '20500'],
  },
  {
    displayName: 'Philadelphia, PA',
    lat: 39.9526,
    lng: -75.1652,
    aliases: ['philadelphia', 'philadelphia, pa', 'philly', '19101', '19103', '19107'],
  },
  {
    displayName: 'Atlanta, GA',
    lat: 33.749,
    lng: -84.388,
    aliases: ['atlanta', 'atlanta, ga', 'atlanta ga', '30301', '30303', '30309'],
  },
  {
    displayName: 'Phoenix, AZ',
    lat: 33.4484,
    lng: -112.074,
    aliases: ['phoenix', 'phoenix, az', 'phoenix az', '85001', '85004'],
  },
  {
    displayName: 'Tucson, AZ',
    lat: 32.2226,
    lng: -110.9747,
    aliases: ['tucson', 'tucson, az', '85701'],
  },
  {
    displayName: 'Las Vegas, NV',
    lat: 36.1699,
    lng: -115.1398,
    aliases: ['las vegas', 'las vegas, nv', 'vegas', '89101', '89109'],
  },
  {
    displayName: 'Salt Lake City, UT',
    lat: 40.7608,
    lng: -111.891,
    aliases: ['salt lake city', 'salt lake city, ut', '84101', '84111'],
  },
  {
    displayName: 'Minneapolis, MN',
    lat: 44.9778,
    lng: -93.265,
    aliases: ['minneapolis', 'minneapolis, mn', '55401', '55402'],
  },
  {
    displayName: 'Detroit, MI',
    lat: 42.3314,
    lng: -83.0458,
    aliases: ['detroit', 'detroit, mi', '48201', '48226'],
  },
  {
    displayName: 'Nashville, TN',
    lat: 36.1627,
    lng: -86.7816,
    aliases: ['nashville', 'nashville, tn', '37201', '37203'],
  },
  {
    displayName: 'Charlotte, NC',
    lat: 35.2271,
    lng: -80.8431,
    aliases: ['charlotte', 'charlotte, nc', '28201', '28202'],
  },
  {
    displayName: 'Raleigh, NC',
    lat: 35.7796,
    lng: -78.6382,
    aliases: ['raleigh', 'raleigh, nc', '27601'],
  },
  {
    displayName: 'New Orleans, LA',
    lat: 29.9511,
    lng: -90.0715,
    aliases: ['new orleans', 'new orleans, la', '70112', '70116'],
  },
  {
    displayName: 'St. Louis, MO',
    lat: 38.627,
    lng: -90.1994,
    aliases: ['st. louis', 'st louis', 'st. louis, mo', '63101'],
  },
  {
    displayName: 'Columbus, OH',
    lat: 39.9612,
    lng: -82.9988,
    aliases: ['columbus', 'columbus, oh', '43215'],
  },
  {
    displayName: 'Honolulu, HI',
    lat: 21.3069,
    lng: -157.8583,
    aliases: ['honolulu', 'honolulu, hi', 'hawaii', '96801', '96813', '96815'],
  },
  {
    displayName: 'Anchorage, AK',
    lat: 61.2181,
    lng: -149.9003,
    aliases: ['anchorage', 'anchorage, ak', 'alaska', '99501', '99503'],
  },
  {
    displayName: 'London, UK',
    lat: 51.5074,
    lng: -0.1278,
    aliases: ['london', 'london, uk', 'london uk'],
  },
  {
    displayName: 'Toronto, Canada',
    lat: 43.6532,
    lng: -79.3832,
    aliases: ['toronto', 'toronto, on', 'toronto, canada'],
  },
  {
    displayName: 'Vancouver, Canada',
    lat: 49.2827,
    lng: -123.1207,
    aliases: ['vancouver', 'vancouver, bc', 'vancouver, canada'],
  },
  {
    displayName: 'Sydney, Australia',
    lat: -33.8688,
    lng: 151.2093,
    aliases: ['sydney', 'sydney, australia'],
  },
  {
    displayName: 'Tokyo, Japan',
    lat: 35.6762,
    lng: 139.6503,
    aliases: ['tokyo', 'tokyo, japan'],
  },
  {
    displayName: 'Paris, France',
    lat: 48.8566,
    lng: 2.3522,
    aliases: ['paris', 'paris, france'],
  },
];

/**
 * Resolves any 5-digit US ZIP code using its 3-digit prefix to a real US state/metro hub
 * when offline or if the external ZIP API does not respond.
 */
export function resolveUsZipPrefixFallback(zipRaw: string): GeocodedLocationResult | null {
  const match = zipRaw.trim().match(/^(\d{5})(?:-\d{4})?$/);
  if (!match) return null;

  const zip5 = match[1];
  const prefix3 = Number(zip5.slice(0, 3));

  if (prefix3 < 5 || prefix3 > 999) {
    return null;
  }

  // Exact match in KNOWN_CITIES_AND_ZIPS first
  const exact = KNOWN_CITIES_AND_ZIPS.find((c) => c.aliases.includes(zip5));
  if (exact) {
    const displayName = exact.displayName.includes(zip5)
      ? exact.displayName
      : `${exact.displayName} (${zip5})`;
    return {
      lat: exact.lat,
      lng: exact.lng,
      displayName,
      regionPresetKey: selectPresetKeyForCoords(exact.lat, exact.lng),
      source: 'curated',
    };
  }

  // US Postal Service 3-digit prefix geographical mapping
  if (prefix3 >= 10 && prefix3 <= 27) {
    return {
      lat: 42.3601,
      lng: -71.0589,
      displayName: `Massachusetts Region (ZIP ${zip5})`,
      regionPresetKey: 'northeast',
      source: 'zip_prefix',
    };
  }
  if (prefix3 >= 60 && prefix3 <= 69) {
    return {
      lat: 41.3083,
      lng: -72.9279,
      displayName: `Connecticut Region (ZIP ${zip5})`,
      regionPresetKey: 'northeast',
      source: 'zip_prefix',
    };
  }
  if (prefix3 >= 5 && prefix3 <= 99) {
    return {
      lat: 41.824,
      lng: -71.4128,
      displayName: `New England Region (ZIP ${zip5})`,
      regionPresetKey: 'northeast',
      source: 'zip_prefix',
    };
  }
  if (prefix3 >= 100 && prefix3 <= 149) {
    return {
      lat: 40.7128,
      lng: -74.006,
      displayName: `New York Region (ZIP ${zip5})`,
      regionPresetKey: 'northeast',
      source: 'zip_prefix',
    };
  }
  if (prefix3 >= 150 && prefix3 <= 199) {
    return {
      lat: 39.9526,
      lng: -75.1652,
      displayName: `Pennsylvania / Mid-Atlantic (ZIP ${zip5})`,
      regionPresetKey: 'northeast',
      source: 'zip_prefix',
    };
  }
  if (prefix3 >= 200 && prefix3 <= 299) {
    return {
      lat: 37.5407,
      lng: -77.436,
      displayName: `Mid-Atlantic & Carolinas (ZIP ${zip5})`,
      regionPresetKey: 'southeast',
      source: 'zip_prefix',
    };
  }
  if (prefix3 >= 300 && prefix3 <= 349) {
    return {
      lat: 28.5383,
      lng: -81.3792,
      displayName: `Southeast & Florida (ZIP ${zip5})`,
      regionPresetKey: 'southeast',
      source: 'zip_prefix',
    };
  }
  if (prefix3 >= 350 && prefix3 <= 399) {
    return {
      lat: 35.1495,
      lng: -90.049,
      displayName: `Deep South Region (ZIP ${zip5})`,
      regionPresetKey: 'southeast',
      source: 'zip_prefix',
    };
  }
  if (prefix3 >= 400 && prefix3 <= 499) {
    return {
      lat: 40.4173,
      lng: -82.9071,
      displayName: `Great Lakes & Ohio Valley (ZIP ${zip5})`,
      regionPresetKey: 'midwest',
      source: 'zip_prefix',
    };
  }
  if (prefix3 >= 500 && prefix3 <= 599) {
    return {
      lat: 44.9778,
      lng: -93.265,
      displayName: `Upper Midwest & Plains (ZIP ${zip5})`,
      regionPresetKey: 'midwest',
      source: 'zip_prefix',
    };
  }
  if (prefix3 >= 600 && prefix3 <= 699) {
    return {
      lat: 41.8781,
      lng: -87.6298,
      displayName: `Central Midwest Region (ZIP ${zip5})`,
      regionPresetKey: 'midwest',
      source: 'zip_prefix',
    };
  }
  if (prefix3 >= 700 && prefix3 <= 799) {
    return {
      lat: 30.2672,
      lng: -97.7431,
      displayName: `Texas & Gulf South (ZIP ${zip5})`,
      regionPresetKey: 'southwest',
      source: 'zip_prefix',
    };
  }
  if (prefix3 >= 800 && prefix3 <= 899) {
    return {
      lat: 39.7392,
      lng: -104.9903,
      displayName: `Rocky Mountains & Southwest (ZIP ${zip5})`,
      regionPresetKey: 'rockies',
      source: 'zip_prefix',
    };
  }
  if (prefix3 >= 900 && prefix3 <= 961) {
    return {
      lat: 36.7783,
      lng: -119.4179,
      displayName: `California Region (ZIP ${zip5})`,
      regionPresetKey: 'west_coast',
      source: 'zip_prefix',
    };
  }
  if (prefix3 >= 967 && prefix3 <= 968) {
    return {
      lat: 21.3069,
      lng: -157.8583,
      displayName: `Hawaii Islands (ZIP ${zip5})`,
      regionPresetKey: 'west_coast',
      source: 'zip_prefix',
    };
  }
  if (prefix3 >= 970 && prefix3 <= 994) {
    return {
      lat: 47.6062,
      lng: -122.3321,
      displayName: `Pacific Northwest (ZIP ${zip5})`,
      regionPresetKey: 'west_coast',
      source: 'zip_prefix',
    };
  }
  return {
    lat: 61.2181,
    lng: -149.9003,
    displayName: `Alaska Region (ZIP ${zip5})`,
    regionPresetKey: 'rockies',
    source: 'zip_prefix',
  };
}

export function selectPresetKeyForCoords(lat: number, lng: number): string {
  if (lng > -30 && lng < 40 && lat > 35) return 'london';
  if (lng <= -115 && lat >= 30) return 'west_coast';
  if (lng <= -100 && lng > -115 && lat >= 35) return 'rockies';
  if (lng <= -95 && lat < 35) return 'southwest';
  if (lng > -95 && lng <= -75 && lat < 34) return 'southeast';
  if (lng > -100 && lng <= -80 && lat >= 34) return 'midwest';
  return 'northeast';
}

/**
 * Pure synchronous lookup against curated cities and US ZIP codes/prefixes.
 */
export function lookupOfflineCityOrZip(rawInput: string): GeocodedLocationResult | null {
  const cleaned = rawInput.trim();
  if (!cleaned) return null;

  const lower = cleaned.toLowerCase().replace(/\s+/g, ' ');

  // 1. Check exact curated city or ZIP alias
  const foundCity = KNOWN_CITIES_AND_ZIPS.find(
    (entry) =>
      entry.displayName.toLowerCase() === lower || entry.aliases.includes(lower)
  );
  if (foundCity) {
    const isZip = /^\d{5}$/.test(lower);
    const displayName =
      isZip && !foundCity.displayName.includes(lower)
        ? `${foundCity.displayName} (${lower})`
        : foundCity.displayName;
    return {
      lat: foundCity.lat,
      lng: foundCity.lng,
      displayName,
      regionPresetKey: selectPresetKeyForCoords(foundCity.lat, foundCity.lng),
      source: 'curated',
    };
  }

  // 2. Check partial city match if input has at least 3 letters (e.g. "Chicago, Illinois")
  const cityPrefix = lower.split(',')[0].trim();
  if (cityPrefix.length >= 3 && /^[a-z.\s-]+$/.test(cityPrefix)) {
    const partialCity = KNOWN_CITIES_AND_ZIPS.find((entry) =>
      entry.aliases.includes(cityPrefix)
    );
    if (partialCity) {
      return {
        lat: partialCity.lat,
        lng: partialCity.lng,
        displayName: partialCity.displayName,
        regionPresetKey: selectPresetKeyForCoords(partialCity.lat, partialCity.lng),
        source: 'curated',
      };
    }
  }

  // 3. Check 5-digit US ZIP code prefix fallback
  const zipFallback = resolveUsZipPrefixFallback(cleaned);
  if (zipFallback) {
    return zipFallback;
  }

  return null;
}

/**
 * Geocodes a City name or 5-digit ZIP code using live APIs (Zippopotam.us for ZIP codes,
 * Open-Meteo Geocoding API for cities worldwide) and falls back cleanly to offline lookup.
 */
export async function geocodeCityOrZip(
  rawInput: string
): Promise<GeocodedLocationResult | null> {
  const cleaned = rawInput.trim();
  if (!cleaned) return null;

  // 1. If 5-digit US ZIP code, try live Zippopotam.us API first for exact town name + coords
  const zipMatch = cleaned.match(/^(\d{5})(?:-\d{4})?$/);
  if (zipMatch) {
    const zip5 = zipMatch[1];
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3500);
      const res = await fetch(`https://api.zippopotam.us/us/${zip5}`, {
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (res.ok) {
        const data = (await res.json()) as {
          places?: Array<{
            'place name'?: string;
            'state abbreviation'?: string;
            latitude?: string;
            longitude?: string;
          }>;
        };
        const place = data.places?.[0];
        if (place && place.latitude && place.longitude) {
          const lat = Number(place.latitude);
          const lng = Number(place.longitude);
          if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
            const city = place['place name'] || 'Local Area';
            const state = place['state abbreviation'] || '';
            return {
              lat,
              lng,
              displayName: state ? `${city}, ${state} (${zip5})` : `${city} (${zip5})`,
              regionPresetKey: selectPresetKeyForCoords(lat, lng),
              source: 'zip_api',
            };
          }
        }
      }
    } catch {
      // Fall through to curated / prefix lookup
    }
    return resolveUsZipPrefixFallback(zip5);
  }

  // 2. Check curated instant match for common cities (e.g. "Chicago", "Seattle, WA", "Miami")
  const curatedMatch = lookupOfflineCityOrZip(cleaned);
  if (curatedMatch && curatedMatch.source === 'curated') {
    return curatedMatch;
  }

  // 3. Query Open-Meteo global geocoding API for any city / town worldwide
  const parts = cleaned.split(',').map((p) => p.trim()).filter(Boolean);
  const searchName = parts[0] || cleaned;
  const regionFilter = parts[1]?.toLowerCase() || '';

  if (searchName.length >= 2 && /[a-zA-Z]/.test(searchName)) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        searchName
      )}&count=6&language=en&format=json`;
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);
      if (res.ok) {
        const data = (await res.json()) as {
          results?: Array<{
            name?: string;
            latitude?: number;
            longitude?: number;
            admin1?: string;
            country?: string;
            country_code?: string;
          }>;
        };
        const results = data.results || [];
        if (results.length > 0) {
          const picked =
            (regionFilter
              ? results.find(
                  (r) =>
                    r.admin1?.toLowerCase().includes(regionFilter) ||
                    r.country?.toLowerCase().includes(regionFilter) ||
                    r.country_code?.toLowerCase() === regionFilter
                )
              : undefined) || results[0];

          if (
            picked &&
            typeof picked.latitude === 'number' &&
            typeof picked.longitude === 'number'
          ) {
            const sub = picked.admin1 || picked.country || '';
            const label = sub ? `${picked.name}, ${sub}` : picked.name || cleaned;
            return {
              lat: picked.latitude,
              lng: picked.longitude,
              displayName: label,
              regionPresetKey: selectPresetKeyForCoords(
                picked.latitude,
                picked.longitude
              ),
              source: 'geocoding_api',
            };
          }
        }
      }
    } catch {
      // Fall through to offline fallback
    }
  }

  return curatedMatch;
}

export const REGIONAL_FALLBACK_SPECIES: Record<string, LocalSpeciesSighting[]> = {
  northeast: [
    {
      id: 48639,
      commonName: 'Eastern Gray Squirrel',
      scientificName: 'Sciurus carolinensis',
      iconicTaxonName: 'Mammalia',
      sightingCount: 1420,
      photoUrl: null,
    },
    {
      id: 12727,
      commonName: 'American Robin',
      scientificName: 'Turdus migratorius',
      iconicTaxonName: 'Aves',
      sightingCount: 1185,
      photoUrl: null,
    },
    {
      id: 39552,
      commonName: 'Eastern Box Turtle',
      scientificName: 'Terrapene carolina',
      iconicTaxonName: 'Reptilia',
      sightingCount: 312,
      photoUrl: null,
    },
    {
      id: 4956,
      commonName: 'Red-Tailed Hawk',
      scientificName: 'Buteo jamaicensis',
      iconicTaxonName: 'Aves',
      sightingCount: 640,
      photoUrl: null,
    },
  ],
  west_coast: [
    {
      id: 41715,
      commonName: 'California Sea Lion',
      scientificName: 'Zalophus californianus',
      iconicTaxonName: 'Mammalia',
      sightingCount: 2190,
      photoUrl: null,
    },
    {
      id: 36204,
      commonName: 'Western Fence Lizard',
      scientificName: 'Sceloporus occidentalis',
      iconicTaxonName: 'Reptilia',
      sightingCount: 1840,
      photoUrl: null,
    },
    {
      id: 9083,
      commonName: 'Anna’s Hummingbird',
      scientificName: 'Calypte anna',
      iconicTaxonName: 'Aves',
      sightingCount: 2450,
      photoUrl: null,
    },
    {
      id: 41864,
      commonName: 'Sea Otter',
      scientificName: 'Enhydra lutris',
      iconicTaxonName: 'Mammalia',
      sightingCount: 530,
      photoUrl: null,
    },
  ],
  southeast: [
    {
      id: 26160,
      commonName: 'American Alligator',
      scientificName: 'Alligator mississippiensis',
      iconicTaxonName: 'Reptilia',
      sightingCount: 1620,
      photoUrl: null,
    },
    {
      id: 46322,
      commonName: 'Manatee',
      scientificName: 'Trichechus manatus',
      iconicTaxonName: 'Mammalia',
      sightingCount: 480,
      photoUrl: null,
    },
    {
      id: 4956,
      commonName: 'Bald Eagle',
      scientificName: 'Haliaeetus leucocephalus',
      iconicTaxonName: 'Aves',
      sightingCount: 890,
      photoUrl: null,
    },
    {
      id: 39552,
      commonName: 'Green Sea Turtle',
      scientificName: 'Chelonia mydas',
      iconicTaxonName: 'Reptilia',
      sightingCount: 710,
      photoUrl: null,
    },
  ],
  midwest: [
    {
      id: 42223,
      commonName: 'White-Tailed Deer',
      scientificName: 'Odocoileus virginianus',
      iconicTaxonName: 'Mammalia',
      sightingCount: 1940,
      photoUrl: null,
    },
    {
      id: 3454,
      commonName: 'Mourning Dove',
      scientificName: 'Zenaida macroura',
      iconicTaxonName: 'Aves',
      sightingCount: 1580,
      photoUrl: null,
    },
    {
      id: 41638,
      commonName: 'Raccoon',
      scientificName: 'Procyon lotor',
      iconicTaxonName: 'Mammalia',
      sightingCount: 920,
      photoUrl: null,
    },
    {
      id: 65987,
      commonName: 'American Bullfrog',
      scientificName: 'Lithobates catesbeianus',
      iconicTaxonName: 'Amphibia',
      sightingCount: 540,
      photoUrl: null,
    },
  ],
  rockies: [
    {
      id: 41663,
      commonName: 'Grizzly Bear',
      scientificName: 'Ursus arctos horribilis',
      iconicTaxonName: 'Mammalia',
      sightingCount: 410,
      photoUrl: null,
    },
    {
      id: 5305,
      commonName: 'Bald Eagle',
      scientificName: 'Haliaeetus leucocephalus',
      iconicTaxonName: 'Aves',
      sightingCount: 980,
      photoUrl: null,
    },
    {
      id: 42198,
      commonName: 'Elk',
      scientificName: 'Cervus canadensis',
      iconicTaxonName: 'Mammalia',
      sightingCount: 1340,
      photoUrl: null,
    },
    {
      id: 42051,
      commonName: 'Red Fox',
      scientificName: 'Vulpes vulpes',
      iconicTaxonName: 'Mammalia',
      sightingCount: 760,
      photoUrl: null,
    },
  ],
  southwest: [
    {
      id: 42055,
      commonName: 'Coyote',
      scientificName: 'Canis latrans',
      iconicTaxonName: 'Mammalia',
      sightingCount: 1320,
      photoUrl: null,
    },
    {
      id: 47065,
      commonName: 'Armadillo',
      scientificName: 'Dasypus novemcinctus',
      iconicTaxonName: 'Mammalia',
      sightingCount: 840,
      photoUrl: null,
    },
    {
      id: 3454,
      commonName: 'Mourning Dove',
      scientificName: 'Zenaida macroura',
      iconicTaxonName: 'Aves',
      sightingCount: 1710,
      photoUrl: null,
    },
    {
      id: 4956,
      commonName: 'Red-Tailed Hawk',
      scientificName: 'Buteo jamaicensis',
      iconicTaxonName: 'Aves',
      sightingCount: 910,
      photoUrl: null,
    },
  ],
  london: [
    {
      id: 42069,
      commonName: 'Red Fox',
      scientificName: 'Vulpes vulpes',
      iconicTaxonName: 'Mammalia',
      sightingCount: 1680,
      photoUrl: null,
    },
    {
      id: 12894,
      commonName: 'European Robin',
      scientificName: 'Erithacus rubecula',
      iconicTaxonName: 'Aves',
      sightingCount: 2890,
      photoUrl: null,
    },
    {
      id: 43042,
      commonName: 'European Hedgehog',
      scientificName: 'Erinaceus europaeus',
      iconicTaxonName: 'Mammalia',
      sightingCount: 490,
      photoUrl: null,
    },
    {
      id: 25497,
      commonName: 'Common Frog',
      scientificName: 'Rana temporaria',
      iconicTaxonName: 'Amphibia',
      sightingCount: 720,
      photoUrl: null,
    },
  ],
};
