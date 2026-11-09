# WildFriend: Kids' Wildlife Conservation Explorer

An interactive, kid-friendly wildlife conservation web application built with React, Tailwind CSS, Lucide icons, Three.js (`@react-three/fiber` & `@react-three/drei`), and Google Gemini 3.8 Flash.

---

## Features

- **Intelligent Wildlife Resolution Engine:** Classifies user searches across exact species, umbrella groups (with specificity guides), fictional inspirations (e.g., Winnie the Pooh), extinct animals, and non-animal redirects.
- **Wildlife Photo & 3D Low-Poly Habitat Stage:** Displays high-resolution Wikimedia Commons field photography alongside an interactive, animated 3D low-poly procedural animal model.
- **Wild Range Map:** Highlights and shades real geographic regions on an interactive world atlas where the species appears.
- **Backyard Wildlife "Near Me" Explorer:** Powered by iNaturalist observations with global city geocoding and 5-digit US ZIP code search.
- **Conservation Action Checklist:** Three actionable, kid-friendly steps to earn a badge for every animal.

---

## Quickstart

### 1. Prerequisites
- Node.js 18+ or 20+
- npm or pnpm

### 2. Installation
```bash
git clone https://github.com/<your-username>/wildfriend-explorer.git
cd wildfriend-explorer
npm install
```

### 3. Environment Variables
Create a `.env` file in the project root based on `.env.example`:

```bash
cp .env.example .env
```

Add your Gemini API key from [Google AI Studio](https://aistudio.google.com/):
```env
GEMINI_API_KEY="your_api_key_here"
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Running Tests & Linting
```bash
npx --yes tsx --test src/utils/wildlifeResolver.test.ts
npm run lint
```
