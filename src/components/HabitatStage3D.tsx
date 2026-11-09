import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, OrbitControls, Stage } from '@react-three/drei';
import * as THREE from 'three';
import { Camera, Cuboid, Eye, RotateCcw, Sparkles } from 'lucide-react';
import { ModelBlueprint } from '../types/wildlife';

const IS_SOFTWARE_GL = (() => {
  if (typeof document === 'undefined') return false;
  try {
    const gl = document.createElement('canvas').getContext('webgl2');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
})();

interface ProceduralAnimalProps {
  blueprint: ModelBlueprint;
  jumpTrigger: number;
  onAnimalClick: () => void;
}

function SoftwareGlPacer({ jumpTrigger }: { jumpTrigger: number }) {
  const { invalidate } = useThree();

  useEffect(() => {
    invalidate();
  }, [jumpTrigger, invalidate]);

  useEffect(() => {
    if (!IS_SOFTWARE_GL) return;
    // Gentle low-frequency heartbeat on software WebGL so breathing/blinking updates without starving headless screenshots
    const interval = window.setInterval(() => {
      invalidate();
    }, 280);
    return () => window.clearInterval(interval);
  }, [invalidate]);

  return null;
}

function BiomeBase({ biome }: { biome: ModelBlueprint['habitatBiome'] }) {
  const biomeColors = useMemo(() => {
    switch (biome) {
      case 'arctic':
        return { ground: '#E2F1F8', rim: '#B5D8EB', prop1: '#FFFFFF', prop2: '#89C2D9' };
      case 'ocean':
        return { ground: '#2B6CB0', rim: '#1E4E8C', prop1: '#F6AD55', prop2: '#4FD1C5' };
      case 'savanna':
        return { ground: '#E6B86A', rim: '#C8963E', prop1: '#688B4A', prop2: '#9E7B56' };
      case 'jungle':
        return { ground: '#2F6F4E', rim: '#1E4D35', prop1: '#48BB78', prop2: '#5A3E28' };
      case 'wetland':
        return { ground: '#3B7A75', rim: '#285955', prop1: '#68D391', prop2: '#F687B3' };
      case 'forest':
      default:
        return { ground: '#528C4E', rim: '#3B6938', prop1: '#2F5E2E', prop2: '#6B4423' };
    }
  }, [biome]);

  return (
    <group position={[0, -0.95, 0]}>
      {/* Main Low-Poly Island Pedestal */}
      <mesh receiveShadow position={[0, -0.15, 0]}>
        <cylinderGeometry args={[2.35, 2.05, 0.32, 12]} />
        <meshStandardMaterial color={biomeColors.ground} roughness={0.85} metalness={0.05} />
      </mesh>
      <mesh receiveShadow position={[0, -0.4, 0]}>
        <cylinderGeometry args={[2.05, 1.5, 0.25, 12]} />
        <meshStandardMaterial color={biomeColors.rim} roughness={0.9} metalness={0.05} />
      </mesh>

      {/* Biome Props (Trees / Ice Crystals / Coral Rocks) */}
      <group position={[-1.45, 0.02, -0.85]}>
        <mesh castShadow position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.08, 0.12, 0.5, 6]} />
          <meshStandardMaterial color={biomeColors.prop2} roughness={0.85} />
        </mesh>
        <mesh castShadow position={[0, 0.65, 0]}>
          <coneGeometry args={[0.42, 0.75, 6]} />
          <meshStandardMaterial color={biomeColors.prop1} roughness={0.65} />
        </mesh>
        <mesh castShadow position={[0, 1.0, 0]}>
          <coneGeometry args={[0.3, 0.55, 6]} />
          <meshStandardMaterial color={biomeColors.prop1} roughness={0.6} />
        </mesh>
      </group>

      {/* Low-poly decorative stones */}
      <mesh castShadow position={[1.4, 0.08, -0.7]} rotation={[0.2, 0.5, 0.1]}>
        <dodecahedronGeometry args={[0.24, 0]} />
        <meshStandardMaterial color="#8D99AE" roughness={0.8} />
      </mesh>
      <mesh castShadow position={[1.15, 0.05, -0.95]} rotation={[0.4, 0.2, 0]}>
        <dodecahedronGeometry args={[0.15, 0]} />
        <meshStandardMaterial color="#A0AEC0" roughness={0.75} />
      </mesh>
    </group>
  );
}

function ProceduralAnimalModel({ blueprint, jumpTrigger, onAnimalClick }: ProceduralAnimalProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Mesh>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const jumpProgressRef = useRef(0);
  const lastJumpTriggerRef = useRef(jumpTrigger);

  useEffect(() => {
    if (jumpTrigger !== lastJumpTriggerRef.current) {
      lastJumpTriggerRef.current = jumpTrigger;
      jumpProgressRef.current = 1.0;
    }
  }, [jumpTrigger]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (!groupRef.current) return;

    // Gentle breathing scale & idle bob
    const breath = 1 + Math.sin(t * 2.4) * 0.025;
    let jumpY = 0;
    let jumpRotY = Math.sin(t * 0.8) * 0.18;

    if (jumpProgressRef.current > 0) {
      jumpProgressRef.current = Math.max(0, jumpProgressRef.current - delta * 1.8);
      const phase = (1 - jumpProgressRef.current) * Math.PI;
      jumpY = Math.sin(phase) * 0.55;
      jumpRotY += Math.sin(phase * 2) * 0.45;
    }

    groupRef.current.position.y = jumpY;
    groupRef.current.scale.set(breath, 1 / breath, breath);
    groupRef.current.rotation.y = jumpRotY;

    if (headRef.current) {
      headRef.current.rotation.z = Math.sin(t * 1.7) * 0.06;
      headRef.current.rotation.x = Math.sin(t * 2.1) * 0.05;
    }

    if (tailRef.current) {
      tailRef.current.rotation.z = Math.sin(t * 5.0) * 0.25;
    }

    // Periodic blink every ~3.5 seconds
    const blinkCycle = t % 3.6;
    const isBlinking = blinkCycle > 3.42;
    const eyeScaleY = isBlinking ? 0.12 : 1;
    if (leftEyeRef.current && rightEyeRef.current) {
      leftEyeRef.current.scale.y = eyeScaleY;
      rightEyeRef.current.scale.y = eyeScaleY;
    }
  });

  const {
    primaryColor,
    secondaryColor,
    accentColor,
    bodyType,
    earStyle,
    snoutStyle,
    tailStyle,
    hasHornsOrAntlers,
    hasStripesOrSpots,
  } = blueprint;

  const isAvian = bodyType === 'avian';
  const isAquatic = bodyType === 'aquatic';
  const isReptile = bodyType === 'reptile';
  const isSmall = bodyType === 'small_mammal';

  const bodyDimensions: [number, number, number] = isAvian
    ? [0.95, 1.05, 1.1]
    : isAquatic
      ? [0.95, 0.72, 1.65]
      : isReptile
        ? [1.15, 0.65, 1.35]
        : isSmall
          ? [0.85, 0.8, 1.05]
          : [1.15, 0.95, 1.45];

  const headPos: [number, number, number] = isAvian
    ? [0, 0.78, 0.42]
    : isAquatic
      ? [0, 0.15, 0.88]
      : isReptile
        ? [0, 0.18, 0.82]
        : [0, 0.52, 0.78];

  return (
    <group
      ref={groupRef}
      onClick={(e) => {
        e.stopPropagation();
        onAnimalClick();
      }}
    >
      {/* Main Torso */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={bodyDimensions} />
        <meshStandardMaterial color={primaryColor} roughness={0.65} metalness={0.08} />
      </mesh>

      {/* Belly / Secondary Under-Panel */}
      <mesh castShadow position={[0, -0.08, 0.05]}>
        <boxGeometry
          args={[
            bodyDimensions[0] * 0.78,
            bodyDimensions[1] * 0.72,
            bodyDimensions[2] * 0.92,
          ]}
        />
        <meshStandardMaterial color={secondaryColor} roughness={0.4} metalness={0.05} />
      </mesh>

      {/* Reptile Shell / Spots / Dorsal Crest */}
      {isReptile && (
        <mesh castShadow position={[0, 0.28, -0.02]}>
          <dodecahedronGeometry args={[0.68, 0]} />
          <meshStandardMaterial color={secondaryColor} roughness={0.5} metalness={0.15} />
        </mesh>
      )}

      {hasStripesOrSpots && !isReptile && (
        <group>
          <mesh castShadow position={[0, bodyDimensions[1] * 0.49, -0.15]}>
            <boxGeometry args={[bodyDimensions[0] * 0.85, 0.06, 0.18]} />
            <meshStandardMaterial color={accentColor} roughness={0.5} />
          </mesh>
          <mesh castShadow position={[0, bodyDimensions[1] * 0.49, 0.18]}>
            <boxGeometry args={[bodyDimensions[0] * 0.85, 0.06, 0.18]} />
            <meshStandardMaterial color={accentColor} roughness={0.5} />
          </mesh>
        </group>
      )}

      {/* Head Group */}
      <group ref={headRef} position={headPos}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.78, 0.7, 0.72]} />
          <meshStandardMaterial color={primaryColor} roughness={0.6} metalness={0.08} />
        </mesh>

        {/* Cheek Patch */}
        <mesh castShadow position={[0, -0.1, 0.08]}>
          <boxGeometry args={[0.64, 0.42, 0.62]} />
          <meshStandardMaterial color={secondaryColor} roughness={0.45} />
        </mesh>

        {/* Snout or Beak */}
        {snoutStyle === 'beak' || snoutStyle === 'hooked_beak' || isAvian ? (
          <group position={[0, -0.04, 0.48]}>
            <mesh castShadow rotation={[Math.PI * 0.5, 0, 0]}>
              <coneGeometry args={[0.2, 0.48, 5]} />
              <meshStandardMaterial color={accentColor} roughness={0.35} metalness={0.15} />
            </mesh>
            {snoutStyle === 'hooked_beak' && (
              <mesh castShadow position={[0, -0.08, 0.18]}>
                <boxGeometry args={[0.16, 0.18, 0.16]} />
                <meshStandardMaterial color={primaryColor} roughness={0.4} />
              </mesh>
            )}
          </group>
        ) : (
          <group position={[0, -0.08, 0.42]}>
            <mesh castShadow>
              <boxGeometry
                args={[
                  snoutStyle === 'wide' ? 0.52 : 0.38,
                  0.28,
                  snoutStyle === 'long' ? 0.36 : 0.24,
                ]}
              />
              <meshStandardMaterial color={secondaryColor} roughness={0.5} />
            </mesh>
            {/* Nose Tip */}
            <mesh castShadow position={[0, 0.08, snoutStyle === 'long' ? 0.18 : 0.12]}>
              <boxGeometry args={[0.16, 0.11, 0.09]} />
              <meshStandardMaterial color={accentColor} roughness={0.25} />
            </mesh>
          </group>
        )}

        {/* Expressive Eyes */}
        <mesh ref={leftEyeRef} position={[-0.22, 0.1, 0.37]}>
          <sphereGeometry args={[0.075, 10, 10]} />
          <meshStandardMaterial color="#111827" roughness={0.15} metalness={0.2} />
        </mesh>
        <mesh ref={rightEyeRef} position={[0.22, 0.1, 0.37]}>
          <sphereGeometry args={[0.075, 10, 10]} />
          <meshStandardMaterial color="#111827" roughness={0.15} metalness={0.2} />
        </mesh>
        {/* Eye Sparkles */}
        <mesh position={[-0.2, 0.13, 0.43]}>
          <sphereGeometry args={[0.024, 6, 6]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[0.24, 0.13, 0.43]}>
          <sphereGeometry args={[0.024, 6, 6]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>

        {/* Ears / Axolotl Gill Tuft Crowns */}
        {earStyle !== 'hidden' && (
          <group>
            {earStyle === 'tufted' ? (
              <>
                {/* Feathery Gill Branches (e.g. Axolotl) */}
                <mesh castShadow position={[-0.44, 0.18, 0]} rotation={[0, 0, 0.45]}>
                  <boxGeometry args={[0.28, 0.1, 0.1]} />
                  <meshStandardMaterial color={accentColor} roughness={0.4} />
                </mesh>
                <mesh castShadow position={[-0.46, 0.02, 0]} rotation={[0, 0, 0.15]}>
                  <boxGeometry args={[0.28, 0.1, 0.1]} />
                  <meshStandardMaterial color={accentColor} roughness={0.4} />
                </mesh>
                <mesh castShadow position={[0.44, 0.18, 0]} rotation={[0, 0, -0.45]}>
                  <boxGeometry args={[0.28, 0.1, 0.1]} />
                  <meshStandardMaterial color={accentColor} roughness={0.4} />
                </mesh>
                <mesh castShadow position={[0.46, 0.02, 0]} rotation={[0, 0, -0.15]}>
                  <boxGeometry args={[0.28, 0.1, 0.1]} />
                  <meshStandardMaterial color={accentColor} roughness={0.4} />
                </mesh>
              </>
            ) : earStyle === 'pointed' ? (
              <>
                <mesh castShadow position={[-0.26, 0.44, -0.05]}>
                  <coneGeometry args={[0.14, 0.28, 4]} />
                  <meshStandardMaterial color={primaryColor} roughness={0.6} />
                </mesh>
                <mesh castShadow position={[0.26, 0.44, -0.05]}>
                  <coneGeometry args={[0.14, 0.28, 4]} />
                  <meshStandardMaterial color={primaryColor} roughness={0.6} />
                </mesh>
              </>
            ) : (
              <>
                <mesh castShadow position={[-0.28, 0.38, -0.05]}>
                  <boxGeometry args={[0.22, 0.22, 0.14]} />
                  <meshStandardMaterial color={primaryColor} roughness={0.6} />
                </mesh>
                <mesh castShadow position={[0.28, 0.38, -0.05]}>
                  <boxGeometry args={[0.22, 0.22, 0.14]} />
                  <meshStandardMaterial color={primaryColor} roughness={0.6} />
                </mesh>
              </>
            )}
          </group>
        )}

        {/* Unicorn / Narwhal Tusk or Horns */}
        {hasHornsOrAntlers && (
          <mesh castShadow position={[0, 0.26, 0.56]} rotation={[Math.PI * 0.38, 0, 0]}>
            <coneGeometry args={[0.08, 0.85, 8]} />
            <meshStandardMaterial color="#FFFBEB" roughness={0.25} metalness={0.3} />
          </mesh>
        )}
      </group>

      {/* Limbs / Wings / Flippers */}
      {isAvian ? (
        <group>
          {/* Folded Wings */}
          <mesh castShadow position={[-0.55, 0.05, 0]} rotation={[0.1, 0, 0.15]}>
            <boxGeometry args={[0.18, 0.62, 0.78]} />
            <meshStandardMaterial color={secondaryColor} roughness={0.5} />
          </mesh>
          <mesh castShadow position={[0.55, 0.05, 0]} rotation={[0.1, 0, -0.15]}>
            <boxGeometry args={[0.18, 0.62, 0.78]} />
            <meshStandardMaterial color={secondaryColor} roughness={0.5} />
          </mesh>
          {/* Bird Legs */}
          <mesh castShadow position={[-0.24, -0.68, 0.05]}>
            <boxGeometry args={[0.14, 0.45, 0.14]} />
            <meshStandardMaterial color={accentColor} roughness={0.5} />
          </mesh>
          <mesh castShadow position={[0.24, -0.68, 0.05]}>
            <boxGeometry args={[0.14, 0.45, 0.14]} />
            <meshStandardMaterial color={accentColor} roughness={0.5} />
          </mesh>
        </group>
      ) : isAquatic ? (
        <group>
          {/* Side Flippers */}
          <mesh castShadow position={[-0.62, -0.18, 0.25]} rotation={[0, 0.2, -0.35]}>
            <boxGeometry args={[0.45, 0.1, 0.32]} />
            <meshStandardMaterial color={primaryColor} roughness={0.5} />
          </mesh>
          <mesh castShadow position={[0.62, -0.18, 0.25]} rotation={[0, -0.2, 0.35]}>
            <boxGeometry args={[0.45, 0.1, 0.32]} />
            <meshStandardMaterial color={primaryColor} roughness={0.5} />
          </mesh>
        </group>
      ) : (
        <group>
          {/* 4 Sturdy Low-Poly Legs */}
          {[
            [-0.36, -0.62, 0.45],
            [0.36, -0.62, 0.45],
            [-0.36, -0.62, -0.45],
            [0.36, -0.62, -0.45],
          ].map((pos, idx) => (
            <mesh key={idx} castShadow position={pos as [number, number, number]}>
              <boxGeometry args={[0.26, 0.52, 0.26]} />
              <meshStandardMaterial color={primaryColor} roughness={0.7} />
            </mesh>
          ))}
        </group>
      )}

      {/* Tail */}
      <mesh
        ref={tailRef}
        castShadow
        position={[0, isAquatic ? 0 : 0.12, -bodyDimensions[2] * 0.55]}
        rotation={[tailStyle === 'long_furry' ? -0.4 : 0.2, 0, 0]}
      >
        <boxGeometry
          args={
            tailStyle === 'fin'
              ? [0.68, 0.14, 0.42]
              : tailStyle === 'long_furry' || tailStyle === 'reptile_long'
                ? [0.2, 0.2, 0.65]
                : [0.28, 0.28, 0.28]
          }
        />
        <meshStandardMaterial
          color={tailStyle === 'fluffy_ball' ? secondaryColor : primaryColor}
          roughness={0.6}
        />
      </mesh>
    </group>
  );
}

interface HabitatStage3DProps {
  commonName: string;
  scientificName: string;
  wikipediaQueryName: string;
  blueprint: ModelBlueprint;
}

export const HabitatStage3D: React.FC<HabitatStage3DProps> = ({
  commonName,
  scientificName,
  wikipediaQueryName,
  blueprint,
}) => {
  const [viewMode, setViewMode] = useState<'photo' | '3d'>('photo');
  const [jumpTrigger, setJumpTrigger] = useState(0);
  const [reactionMessage, setReactionMessage] = useState<string | null>(null);
  const [wikiPhotoUrl, setWikiPhotoUrl] = useState<string | null>(null);
  const [wikiExtract, setWikiExtract] = useState<string | null>(null);
  const [photoLoading, setPhotoLoading] = useState(true);

  // Reset to Real Wildlife Photo first and fetch Wikimedia Commons photo when animal changes
  useEffect(() => {
    let isMounted = true;
    setViewMode('photo');
    setReactionMessage(null);
    setWikiPhotoUrl(null);
    setWikiExtract(null);
    setPhotoLoading(true);

    async function fetchWikiSummary() {
      const candidates = [
        wikipediaQueryName,
        commonName.replace(/\s*\(.*?\)\s*/g, '').trim().replace(/\s+/g, '_'),
        scientificName.replace(/\s+/g, '_'),
      ].filter(Boolean);

      for (const title of candidates) {
        try {
          const res = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
          );
          if (!res.ok) continue;
          const data = (await res.json()) as {
            thumbnail?: { source?: string };
            originalimage?: { source?: string };
            extract?: string;
          };
          if (isMounted && (data.thumbnail?.source || data.originalimage?.source)) {
            setWikiPhotoUrl(data.originalimage?.source || data.thumbnail?.source || null);
            setWikiExtract(data.extract || null);
            setPhotoLoading(false);
            return;
          }
        } catch {
          // Try next candidate
        }
      }
      if (isMounted) {
        setPhotoLoading(false);
      }
    }

    fetchWikiSummary();
    return () => {
      isMounted = false;
    };
  }, [commonName, scientificName, wikipediaQueryName]);

  const triggerFriendlyBounce = () => {
    if (viewMode !== '3d') {
      setViewMode('3d');
    }
    setJumpTrigger((prev) => prev + 1);
    const cheers = [
      `${commonName} did a happy ranger bounce!`,
      `${commonName} blinked and waved hello!`,
      `${commonName} loves exploring its ${blueprint.habitatBiome} home with you!`,
    ];
    setReactionMessage(cheers[jumpTrigger % cheers.length]);
  };

  return (
    <div
      data-testid="habitat-stage-container"
      data-view-mode={viewMode}
      className="tactile-card rounded-3xl overflow-hidden relative flex flex-col justify-between min-h-[420px] bg-gradient-to-b from-[#D8F3DC] via-[#E9F5EC] to-[#FAF6EC]"
    >
      {/* Top Bar Overlay inside Stage */}
      <div className="z-10 flex flex-wrap items-center justify-between gap-2 px-5 pt-4 pb-2">
        <div className="flex items-center gap-2 bg-[#FFFDF7] border-2 border-[#1E2F23] rounded-xl px-3 py-1.5 text-xs font-bold text-[#1E2F23]">
          {viewMode === 'photo' ? (
            <>
              <Camera className="w-4 h-4 text-[#2D6A4F]" />
              <span>Real Wildlife Field Photography · {commonName}</span>
            </>
          ) : (
            <>
              <Cuboid className="w-4 h-4 text-[#2D6A4F]" />
              <span>Interactive {blueprint.habitatBiome.toUpperCase()} Habitat Stage</span>
            </>
          )}
        </div>

        {reactionMessage ? (
          <div
            role="status"
            className="bg-[#FFE066] border-2 border-[#1E2F23] rounded-xl px-3 py-1 text-xs font-bold text-[#1E2F23] flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{reactionMessage}</span>
          </div>
        ) : (
          <span className="hidden sm:inline text-xs text-[#38513E] font-bold bg-[#FFFDF7]/80 px-2.5 py-1 rounded-lg border border-[#1E2F23]/20">
            {viewMode === 'photo'
              ? 'Verified Wikimedia Commons Reference'
              : 'Drag to rotate 360° · Click animal to bounce'}
          </span>
        )}
      </div>

      {/* Main Viewport: Real Wikimedia Photo (Default) or Interactive 3D Canvas */}
      <div className="relative flex-1 w-full h-[320px] sm:h-[350px]">
        {viewMode === 'photo' ? (
          <div
            data-testid="wikimedia-photo-view"
            className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-5 bg-[#FAF6EC]"
          >
            {photoLoading ? (
              <div
                data-testid="wikimedia-photo-skeleton"
                className="w-full h-full flex flex-col sm:flex-row items-center gap-5 max-w-2xl mx-auto animate-pulse"
              >
                <div className="w-full sm:w-3/5 h-56 sm:h-64 rounded-2xl bg-[#D8F3DC] border-3 border-[#1E2F23]/20 shrink-0" />
                <div className="flex-1 w-full space-y-3">
                  <div className="h-3.5 w-32 bg-[#D8F3DC] rounded" />
                  <div className="h-6 w-48 bg-[#D8F3DC] rounded" />
                  <div className="h-3 w-full bg-[#D8F3DC] rounded" />
                  <div className="h-3 w-5/6 bg-[#D8F3DC] rounded" />
                  <div className="h-3 w-4/6 bg-[#D8F3DC] rounded" />
                </div>
              </div>
            ) : wikiPhotoUrl ? (
              <div className="w-full h-full flex flex-col sm:flex-row items-center gap-5 max-w-2xl mx-auto">
                <div className="w-full sm:w-3/5 h-56 sm:h-64 rounded-2xl overflow-hidden border-3 border-[#1E2F23] bg-[#1E2F23]/5 shrink-0 flex items-center justify-center">
                  <img
                    src={wikiPhotoUrl}
                    alt={`Real wildlife photograph of ${commonName}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={() => setWikiPhotoUrl(null)}
                  />
                </div>
                <div className="flex-1 text-left space-y-2">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-[#2D6A4F]">
                    Wikimedia Commons Field Snapshot
                  </p>
                  <h4 className="text-lg sm:text-xl font-extrabold text-[#1E2F23]">
                    {commonName}
                  </h4>
                  <p className="text-xs italic font-serif text-[#38513E]">{scientificName}</p>
                  <p className="text-xs sm:text-sm text-[#1E2F23] line-clamp-5 leading-relaxed font-medium">
                    {wikiExtract ||
                      `Real-life photograph of ${commonName} (${scientificName}) fetched from Wikipedia's wildlife archive.`}
                  </p>
                </div>
              </div>
            ) : (
              <div className="max-w-md text-center p-6 rounded-2xl border-2 border-[#1E2F23] bg-[#FFFDF7] space-y-3">
                <Camera className="w-8 h-8 mx-auto text-[#2D6A4F]" />
                <p className="font-extrabold text-sm text-[#1E2F23]">
                  Field Camera Snapshot: {commonName} ({scientificName})
                </p>
                <p className="text-xs text-[#38513E] leading-relaxed">
                  Click &ldquo;Interactive 3D Model&rdquo; below to explore our custom low-poly 3D habitat for {commonName}!
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full cursor-grab active:cursor-grabbing" data-testid="three-canvas-wrapper">
            <Canvas
              shadows={!IS_SOFTWARE_GL}
              dpr={IS_SOFTWARE_GL ? 1 : [1, 2]}
              frameloop={IS_SOFTWARE_GL ? 'demand' : 'always'}
              camera={{ position: [2.8, 2.0, 3.6], fov: 40 }}
            >
              <SoftwareGlPacer jumpTrigger={jumpTrigger} />
              <ambientLight intensity={0.75} />
              <hemisphereLight args={['#FFFDF7', '#528C4E', 0.65]} />
              <directionalLight
                castShadow={!IS_SOFTWARE_GL}
                position={[4, 6, 4]}
                intensity={1.3}
                shadow-mapSize={[512, 512]}
              />
              <Stage
                intensity={0.4}
                environment="city"
                adjustCamera={false}
                shadows={false}
              >
                <group position={[0, 0.34, 0]}>
                  <ProceduralAnimalModel
                    blueprint={blueprint}
                    jumpTrigger={jumpTrigger}
                    onAnimalClick={triggerFriendlyBounce}
                  />
                  <BiomeBase biome={blueprint.habitatBiome} />
                </group>
              </Stage>
              {!IS_SOFTWARE_GL && (
                <ContactShadows
                  position={[0, -0.65, 0]}
                  opacity={0.35}
                  scale={5}
                  blur={2}
                  far={2.5}
                />
              )}
              <OrbitControls
                makeDefault
                target={[0, 0.05, 0]}
                enablePan={false}
                enableDamping={!IS_SOFTWARE_GL}
                minPolarAngle={Math.PI * 0.2}
                maxPolarAngle={Math.PI * 0.48}
                minDistance={2.5}
                maxDistance={5.5}
              />
            </Canvas>
          </div>
        )}
      </div>

      {/* Unified Single-Line Bottom Control Dock: Real Wildlife Photo FIRST, Interactive 3D Model SECOND */}
      <div className="z-10 px-4 py-3 flex items-center justify-between gap-3 bg-[#FFFDF7] border-t-2 border-[#1E2F23]">
        <div className="flex items-center gap-1 bg-[#E9F5EC] p-1 rounded-xl border-2 border-[#1E2F23] shrink-0">
          <button
            type="button"
            data-testid="toggle-photo-mode"
            onClick={() => setViewMode('photo')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              viewMode === 'photo'
                ? 'bg-[#2D6A4F] text-white'
                : 'text-[#1E2F23] hover:bg-[#D8F3DC]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Real Wildlife Photo</span>
          </button>
          <button
            type="button"
            data-testid="toggle-3d-mode"
            onClick={() => setViewMode('3d')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              viewMode === '3d'
                ? 'bg-[#2D6A4F] text-white'
                : 'text-[#1E2F23] hover:bg-[#D8F3DC]'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Interactive 3D Model</span>
          </button>
        </div>

        <button
          type="button"
          onClick={triggerFriendlyBounce}
          className="tactile-button bg-[#FFE066] text-[#1E2F23] font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Say Hi in 3D!</span>
        </button>
      </div>
    </div>
  );
};
