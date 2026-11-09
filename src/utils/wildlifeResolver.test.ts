import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildFallbackAnimalProfile,
  calculateFriendProgress,
  classifyHeuristicQuery,
  CURATED_PROFILES,
  getSpellingSuggestions,
  parseINaturalistSpeciesCounts,
  resolveSpellingCorrection,
  sanitizeModelBlueprint,
} from './wildlifeResolver';
import {
  lookupOfflineCityOrZip,
  resolveAnimalRangeRegions,
  resolveUsZipPrefixFallback,
} from './habitatMapUtils';
import { QueryType } from '../types/wildlife';

test('classifyHeuristicQuery resolves all 5 required queryType categories accurately', () => {
  assert.equal(classifyHeuristicQuery('Grizzly Bear'), QueryType.EXACT_SPECIES);
  assert.equal(classifyHeuristicQuery('Axolotl'), QueryType.EXACT_SPECIES);
  assert.equal(classifyHeuristicQuery('Black Panther'), QueryType.UMBRELLA_OR_COLLOQUIAL);
  assert.equal(classifyHeuristicQuery('Panda'), QueryType.UMBRELLA_OR_COLLOQUIAL);
  assert.equal(classifyHeuristicQuery('Dove'), QueryType.UMBRELLA_OR_COLLOQUIAL);
  assert.equal(classifyHeuristicQuery('Bear'), QueryType.UMBRELLA_OR_COLLOQUIAL);
  assert.equal(classifyHeuristicQuery('Winnie the Pooh'), QueryType.FICTIONAL_OR_MYTHICAL);
  assert.equal(classifyHeuristicQuery('Unicorn'), QueryType.FICTIONAL_OR_MYTHICAL);
  assert.equal(classifyHeuristicQuery('Dragon'), QueryType.FICTIONAL_OR_MYTHICAL);
  assert.equal(classifyHeuristicQuery('Dodo'), QueryType.EXTINCT);
  assert.equal(classifyHeuristicQuery('Woolly Mammoth'), QueryType.EXTINCT);
  assert.equal(classifyHeuristicQuery('Pizza'), QueryType.INVALID_OR_NON_ANIMAL);
  assert.equal(classifyHeuristicQuery('asdfg'), QueryType.INVALID_OR_NON_ANIMAL);
});

test('typing "panda" or misspelled "penda" returns Giant Panda with bamboo, bear archetype, fur (never feathers), and speciesComparisons', () => {
  for (const input of ['panda', 'penda']) {
    const profile = buildFallbackAnimalProfile(input);
    assert.equal(profile.commonName, 'Giant Panda');
    assert.equal(profile.scientificName, 'Ailuropoda melanoleuca');
    assert.equal(profile.modelBlueprint.bodyType, 'quadruped_bear');
    assert.equal(profile.modelBlueprint.hasWings, false);

    // Mentions bamboo in diet.favoriteFoods
    const hasBamboo = profile.diet.favoriteFoods.some((f) =>
      f.name.toLowerCase().includes('bamboo')
    );
    assert.equal(hasBamboo, true, `Expected bamboo in diet for ${input}`);

    // Never mentions feathers anywhere in superpowers or descriptions
    const fullText = JSON.stringify(profile).toLowerCase();
    assert.equal(
      fullText.includes('feather'),
      false,
      `Panda profile must never hallucinate feathers`
    );
    assert.equal(fullText.includes('fur'), true, 'Panda profile should mention fur');

    // Includes Giant Panda vs. Red Panda specificity comparison cards
    const comparisons = profile.bannerInfo?.speciesComparisons || [];
    assert.ok(comparisons.length >= 2);
    assert.ok(comparisons.some((c) => c.commonName === 'Giant Panda'));
    assert.ok(comparisons.some((c) => c.commonName === 'Red Panda'));
  }

  const misspelled = buildFallbackAnimalProfile('penda');
  assert.equal(misspelled.wasAutocorrected, true);
  assert.equal(misspelled.originalQuery, 'penda');
});

test('typing "dove" or misspelled "duv" triggers UMBRELLA_OR_COLLOQUIAL with specific species comparison cards', () => {
  for (const input of ['dove', 'duv']) {
    const profile = buildFallbackAnimalProfile(input);
    assert.equal(profile.queryType, QueryType.UMBRELLA_OR_COLLOQUIAL);
    assert.equal(profile.commonName, 'Mourning Dove');
    const comparisons = profile.bannerInfo?.speciesComparisons || [];
    assert.equal(comparisons.length, 3);
    assert.equal(comparisons[0].commonName, 'Mourning Dove');
    assert.equal(comparisons[1].commonName, 'Rock Dove');
    assert.ok(comparisons[0].whereTheyLive.length > 10);
    assert.ok(comparisons[0].howTheyDiffer.length > 10);
  }

  const duvProfile = buildFallbackAnimalProfile('duv');
  assert.equal(duvProfile.wasAutocorrected, true);
  assert.equal(duvProfile.originalQuery, 'duv');
});

test('fuzzy spellcheck and getSpellingSuggestions resolve phonetic kid misspellings', () => {
  assert.equal(resolveSpellingCorrection('grizly').resolvedQuery, 'Grizzly Bear');
  assert.equal(resolveSpellingCorrection('axolotul').resolvedQuery, 'Axolotl');
  assert.equal(resolveSpellingCorrection('chita').resolvedQuery, 'Cheetah');
  assert.equal(resolveSpellingCorrection('pengwin').resolvedQuery, 'Emperor Penguin');

  const suggestionsForPenda = getSpellingSuggestions('penda');
  assert.ok(suggestionsForPenda.includes('Panda'));

  const suggestionsForDuv = getSpellingSuggestions('duv');
  assert.ok(suggestionsForDuv.includes('Dove'));
});

test('buildFallbackAnimalProfile returns complete profiles with banners and living relatives', () => {
  const pooh = buildFallbackAnimalProfile('Winnie the Pooh');
  assert.equal(pooh.queryType, QueryType.FICTIONAL_OR_MYTHICAL);
  assert.equal(pooh.commonName, 'American Black Bear');
  assert.ok(pooh.bannerInfo?.title.includes('Storybook'));

  const dodo = buildFallbackAnimalProfile('Dodo');
  assert.equal(dodo.queryType, QueryType.EXTINCT);
  assert.equal(dodo.bannerInfo?.livingRelative?.commonName, 'Nicobar Pigeon');

  const panther = buildFallbackAnimalProfile('Black Panther');
  assert.equal(panther.queryType, QueryType.UMBRELLA_OR_COLLOQUIAL);
  assert.ok(panther.bannerInfo?.title.includes('Nature Detective'));

  const pizza = buildFallbackAnimalProfile('Pizza');
  assert.equal(pizza.queryType, QueryType.INVALID_OR_NON_ANIMAL);
  assert.equal(pizza.commonName, 'Eastern Box Turtle');
});

test('calculateFriendProgress computes Certified Friend status when all 3 actions checked', () => {
  const partial = calculateFriendProgress([true, false, true]);
  assert.equal(partial.completedCount, 2);
  assert.equal(partial.isCertified, false);
  assert.equal(partial.progressPercent, 67);

  const complete = calculateFriendProgress([true, true, true]);
  assert.equal(complete.completedCount, 3);
  assert.equal(complete.isCertified, true);
  assert.equal(complete.progressPercent, 100);
});

test('sanitizeModelBlueprint normalizes invalid bodyType and preserves colors', () => {
  const bp = sanitizeModelBlueprint({
    primaryColor: '#123456',
    bodyType: 'avian',
  });
  assert.equal(bp.primaryColor, '#123456');
  assert.equal(bp.bodyType, 'avian');
  assert.equal(bp.hasWings, true);
});

test('parseINaturalistSpeciesCounts extracts species cards cleanly', () => {
  const sample = {
    results: [
      {
        count: 42,
        taxon: {
          id: 101,
          name: 'Buteo jamaicensis',
          preferred_common_name: 'red-tailed hawk',
          iconic_taxon_name: 'Aves',
          default_photo: {
            medium_url: 'https://static.inaturalist.org/photos/1/medium.jpg',
          },
        },
      },
    ],
  };

  const parsed = parseINaturalistSpeciesCounts(sample);
  assert.equal(parsed.length, 1);
  assert.equal(parsed[0].commonName, 'Red-Tailed Hawk');
  assert.equal(parsed[0].sightingCount, 42);
  assert.equal(parsed[0].iconicTaxonName, 'Aves');
});

test('resolveAnimalRangeRegions shades accurate geographic range zones for each animal', () => {
  const grizzlyRegions = resolveAnimalRangeRegions(CURATED_PROFILES['grizzly bear']).map(
    (r) => r.id
  );
  assert.ok(grizzlyRegions.includes('alaska_northern_canada'));
  assert.ok(grizzlyRegions.includes('western_north_america'));
  assert.equal(grizzlyRegions.includes('australia_new_zealand'), false);

  const pandaRegions = resolveAnimalRangeRegions(CURATED_PROFILES['giant panda']).map(
    (r) => r.id
  );
  assert.ok(pandaRegions.includes('east_asia_china'));

  const polarRegions = resolveAnimalRangeRegions(CURATED_PROFILES['polar bear']).map(
    (r) => r.id
  );
  assert.ok(polarRegions.includes('arctic_ocean'));

  const koalaRegions = resolveAnimalRangeRegions(CURATED_PROFILES['koala']).map(
    (r) => r.id
  );
  assert.deepEqual(koalaRegions, ['australia_new_zealand']);
});

test('lookupOfflineCityOrZip and resolveUsZipPrefixFallback resolve cities and 5-digit ZIP codes accurately', () => {
  const zip90210 = lookupOfflineCityOrZip('90210');
  assert.ok(zip90210);
  assert.ok(zip90210.displayName.includes('Beverly Hills'));
  assert.ok(Math.abs(zip90210.lat - 34.09) < 0.5);

  const chicago = lookupOfflineCityOrZip('Chicago');
  assert.ok(chicago);
  assert.equal(chicago.displayName, 'Chicago, IL');
  assert.ok(Math.abs(chicago.lat - 41.8781) < 0.5);

  const miamiZip = lookupOfflineCityOrZip('33101');
  assert.ok(miamiZip);
  assert.ok(miamiZip.displayName.includes('Miami'));

  const arbitraryZip = resolveUsZipPrefixFallback('80305');
  assert.ok(arbitraryZip);
  assert.ok(arbitraryZip.displayName.includes('80305'));
  assert.equal(arbitraryZip.regionPresetKey, 'rockies');

  // Invalid inputs must return null
  assert.equal(lookupOfflineCityOrZip(''), null);
  assert.equal(lookupOfflineCityOrZip('00000'), null);
  assert.equal(lookupOfflineCityOrZip('???'), null);
});

