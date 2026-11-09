import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import {
  buildFallbackAnimalProfile,
  buildWikipediaGroundedFallbackProfile,
  CURATED_PROFILES,
  fetchWikipediaSummaryForQuery,
  normalizeQueryKey,
  resolveSpellingCorrection,
  sanitizeModelBlueprint,
} from './src/utils/wildlifeResolver.ts';
import { AnimalProfileData } from './src/types/wildlife.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

function getGenAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const ANIMAL_PROFILE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    query: { type: Type.STRING, description: 'The original user search query.' },
    queryType: {
      type: Type.STRING,
      description:
        'One of: EXACT_SPECIES, UMBRELLA_OR_COLLOQUIAL, FICTIONAL_OR_MYTHICAL, EXTINCT, INVALID_OR_NON_ANIMAL',
    },
    commonName: {
      type: Type.STRING,
      description:
        'The resolved real-world animal common name (or extinct species name if EXTINCT). Never return an error.',
    },
    scientificName: {
      type: Type.STRING,
      description: 'Scientific Latin binomial name.',
    },
    wikipediaQueryName: {
      type: Type.STRING,
      description: 'Exact English Wikipedia page title with underscores (e.g. Giant_panda).',
    },
    conservationStatus: {
      type: Type.OBJECT,
      properties: {
        code: {
          type: Type.STRING,
          description: 'IUCN code: LC, NT, VU, EN, CR, EW, or EX',
        },
        kidFriendlyLabel: {
          type: Type.STRING,
          description:
            'Warm, kid-friendly status badge like "Thriving in the Wild", "Needs Our Help (Vulnerable)", "Super Rare (Endangered)", or "In the History Books (Extinct)"',
        },
        oneSentenceExplanation: {
          type: Type.STRING,
          description: 'Empowering 1-sentence explanation of what this status means for kids ages 6-11.',
        },
      },
      required: ['code', 'kidFriendlyLabel', 'oneSentenceExplanation'],
    },
    bannerInfo: {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
          description:
            'Banner title such as "Nature Detective Note!", "Storybook to Real World Bridge!", "Time Traveler\'s Log", or a playful nudge title.',
        },
        explanation: {
          type: Type.STRING,
          description:
            'Warm, engaging 2-3 sentence explanation tailored to the queryType (nuance for UMBRELLA_OR_COLLOQUIAL, real inspiration for FICTIONAL_OR_MYTHICAL, gentle history for EXTINCT, or playful redirect for INVALID_OR_NON_ANIMAL).',
        },
        storyOrFact: {
          type: Type.STRING,
          description: 'An extra delightful story tidbit or surprise connection.',
        },
        suggestedAnimals: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: '3 to 4 clickable real-world animal names for the kid to explore next.',
        },
        speciesComparisons: {
          type: Type.ARRAY,
          description:
            'When queryType is UMBRELLA_OR_COLLOQUIAL (e.g. dove, panda, bear, fox, owl, shark), provide 3 specific species comparison cards with short, kid-friendly text (under 12 words per field).',
          items: {
            type: Type.OBJECT,
            properties: {
              commonName: { type: Type.STRING },
              scientificName: { type: Type.STRING },
              wikipediaQueryName: {
                type: Type.STRING,
                description: 'Exact English Wikipedia page title with underscores for fetching its photo.',
              },
              whereTheyLive: {
                type: Type.STRING,
                description: 'Short 4-7 word habitat/range phrase for kids.',
              },
              howTheyDiffer: {
                type: Type.STRING,
                description: 'Short 8-12 word visual clue for kids.',
              },
            },
            required: ['commonName', 'scientificName', 'whereTheyLive', 'howTheyDiffer'],
          },
        },
        livingRelative: {
          type: Type.OBJECT,
          properties: {
            commonName: { type: Type.STRING },
            scientificName: { type: Type.STRING },
            connectionNote: { type: Type.STRING },
          },
        },
      },
      required: ['title', 'explanation', 'suggestedAnimals'],
    },
    modelBlueprint: {
      type: Type.OBJECT,
      properties: {
        primaryColor: { type: Type.STRING, description: 'Hex color for main body fur/skin/feathers' },
        secondaryColor: { type: Type.STRING, description: 'Hex color for belly/snout/wings' },
        accentColor: { type: Type.STRING, description: 'Hex color for nose/beak/horns/markings' },
        bodyType: {
          type: Type.STRING,
          description:
            'One of: quadruped_bear, quadruped_cat, avian, aquatic, reptile, small_mammal',
        },
        earStyle: {
          type: Type.STRING,
          description: 'One of: round, pointed, floppy, tufted, hidden',
        },
        snoutStyle: {
          type: Type.STRING,
          description: 'One of: short, long, beak, hooked_beak, wide',
        },
        tailStyle: {
          type: Type.STRING,
          description: 'One of: stubby, long_furry, feathered, fin, reptile_long, fluffy_ball',
        },
        habitatBiome: {
          type: Type.STRING,
          description: 'One of: forest, ocean, arctic, savanna, jungle, wetland',
        },
        hasStripesOrSpots: { type: Type.BOOLEAN },
        hasHornsOrAntlers: { type: Type.BOOLEAN },
        hasWings: { type: Type.BOOLEAN },
      },
      required: [
        'primaryColor',
        'secondaryColor',
        'accentColor',
        'bodyType',
        'earStyle',
        'snoutStyle',
        'tailStyle',
        'habitatBiome',
      ],
    },
    friendActions: {
      type: Type.OBJECT,
      properties: {
        introEmpathyLine: {
          type: Type.STRING,
          description:
            'Empathy-filled sentence about what this animal loves (e.g. "Bears REALLY love it when you keep campsite snacks locked up tight so they stay wild and safe!").',
        },
        actions: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: 'Exactly 3 actionable, kid-sized conservation steps.',
        },
        badgeTitle: {
          type: Type.STRING,
          description: 'Title for the badge earned, e.g. "Certified Sea Otter Friend"',
        },
      },
      required: ['introEmpathyLine', 'actions', 'badgeTitle'],
    },
    diet: {
      type: Type.OBJECT,
      properties: {
        dietType: { type: Type.STRING, description: 'e.g. Omnivore, Herbivore, Carnivore' },
        favoriteFoods: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              emoji: { type: Type.STRING },
              name: { type: Type.STRING },
            },
            required: ['emoji', 'name'],
          },
        },
        funComparison: {
          type: Type.STRING,
          description:
            'Fun kid-relatable comparison (e.g. "Eats up to 30,000 berries a day—that\'s 600 bowls of cereal!").',
        },
      },
      required: ['dietType', 'favoriteFoods', 'funComparison'],
    },
    habitat: {
      type: Type.OBJECT,
      properties: {
        description: { type: Type.STRING },
        regions: { type: Type.ARRAY, items: { type: Type.STRING } },
        climateTags: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ['description', 'regions', 'climateTags'],
    },
    secretSuperpowers: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ['title', 'description'],
      },
      description: '3 mind-blowing biological facts written for an enthusiastic 9-year-old.',
    },
  },
  required: [
    'query',
    'queryType',
    'commonName',
    'scientificName',
    'wikipediaQueryName',
    'conservationStatus',
    'modelBlueprint',
    'friendActions',
    'diet',
    'habitat',
    'secretSuperpowers',
  ],
};

async function startServer() {
  const app = express();
  app.use(express.json());

  app.post('/api/wildlife/resolve', async (req, res) => {
    const rawQuery = typeof req.body?.query === 'string' ? req.body.query.trim() : '';
    if (!rawQuery) {
      res.status(400).json({ error: 'Please type an animal name to explore!' });
      return;
    }

    const { resolvedQuery, wasAutocorrected, originalQuery } =
      resolveSpellingCorrection(rawQuery);
    const normalized = normalizeQueryKey(resolvedQuery);

    // If we have a verified, 100% biologically curated profile (e.g. panda, dove, bear, grizzly bear), return it with spellcheck metadata
    if (CURATED_PROFILES[normalized]) {
      const curated = CURATED_PROFILES[normalized];
      res.json({
        ...curated,
        query: originalQuery,
        originalQuery,
        wasAutocorrected,
        correctedQuery: wasAutocorrected ? curated.commonName : undefined,
      });
      return;
    }

    const ai = getGenAIClient();
    if (!ai) {
      const profile = await buildWikipediaGroundedFallbackProfile(rawQuery);
      res.json(profile);
      return;
    }

    try {
      const wikiSummary = await fetchWikipediaSummaryForQuery(resolvedQuery);
      const wikiContextBlock = wikiSummary
        ? `\nVerified Wikipedia Reference for "${wikiSummary.title}":\n${wikiSummary.extract}\n`
        : '';

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Resolve the child's wildlife search query: "${resolvedQuery}" (original input: "${rawQuery}").${wikiContextBlock}
CRITICAL BIOLOGICAL & UX RULES:
1. Classify into EXACT_SPECIES, UMBRELLA_OR_COLLOQUIAL, FICTIONAL_OR_MYTHICAL, EXTINCT, or INVALID_OR_NON_ANIMAL.
2. Strictly anchor all diet, anatomy, habitat, and superpower facts in real biology using the Wikipedia reference above. Highlight exact staple foods (e.g. bamboo for Giant Pandas, eucalyptus for Koalas, krill for Blue Whales). Mammals have fur/hair (NEVER feathers!); birds have feathers (NEVER fur!).
3. If UMBRELLA_OR_COLLOQUIAL (like "dove", "panda", "bear", "fox", "owl", "shark", "turtle"), explain the nuance in a Nature Detective Note in bannerInfo and populate bannerInfo.speciesComparisons with 3 real specific species showing commonName, scientificName, whereTheyLive, and howTheyDiffer.
4. If FICTIONAL_OR_MYTHICAL (like Winnie the Pooh, Unicorn, Dragon, Sonic), bridge to the real-world animal inspiration and populate the profile with that real counterpart.
5. If EXTINCT (like Dodo, Woolly Mammoth, T-Rex), include a gentle Time Traveler's Log in bannerInfo and populate livingRelative with a real surviving cousin.
6. If INVALID_OR_NON_ANIMAL (like Pizza or random letters), playfully nudge them to a connected animal (like Eastern Box Turtle for Pizza).`,
        config: {
          systemInstruction:
            'You are Ranger Scout, the enthusiastic wildlife biologist behind WildFriend for kids ages 6–11. Every fact must be 100% biologically accurate, taxonomy-specific, and grounded in real science—never invent generic filler facts.',
          responseMimeType: 'application/json',
          responseSchema: ANIMAL_PROFILE_SCHEMA,
        },
      });

      const text = response.text;
      if (!text) {
        throw new Error('Empty response from Gemini model');
      }

      const parsed = JSON.parse(text) as AnimalProfileData;
      parsed.modelBlueprint = sanitizeModelBlueprint(parsed.modelBlueprint);
      parsed.query = originalQuery;
      parsed.originalQuery = originalQuery;
      parsed.wasAutocorrected = wasAutocorrected;
      if (wasAutocorrected) {
        parsed.correctedQuery = parsed.commonName;
      }

      if (!Array.isArray(parsed.friendActions?.actions) || parsed.friendActions.actions.length < 3) {
        const fb = buildFallbackAnimalProfile(rawQuery);
        parsed.friendActions = fb.friendActions;
      }
      if (!Array.isArray(parsed.secretSuperpowers) || parsed.secretSuperpowers.length < 3) {
        const fb = buildFallbackAnimalProfile(rawQuery);
        parsed.secretSuperpowers = fb.secretSuperpowers;
      }

      res.json(parsed);
    } catch {
      const fallback = await buildWikipediaGroundedFallbackProfile(rawQuery);
      res.json(fallback);
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`WildFriend server listening on http://localhost:${PORT}`);
  });
}

startServer();
