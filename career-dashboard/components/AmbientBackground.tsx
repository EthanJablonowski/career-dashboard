'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';

/**
 * AmbientBackground - A subtle, slowly-morphing background animation
 *
 * Creates an organic, terrain-like ambient layer using SVG with:
 * - 3-4 large blob shapes that morph slowly via path interpolation
 * - Soft grain overlay for natural texture
 * - Gentle vignette for depth
 *
 * Performance optimizations:
 * - Uses CSS transforms and opacity (GPU-accelerated)
 * - Respects prefers-reduced-motion
 * - Fixed positioning with pointer-events: none
 * - Minimal repaints via requestAnimationFrame throttling
 */

// Hook to check reduced motion preference
function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      mediaQuery.addEventListener('change', callback);
      return () => mediaQuery.removeEventListener('change', callback);
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false // Server-side default
  );
}

// Organic blob path generators - creates smooth, natural shapes
function generateBlobPath(
  cx: number,
  cy: number,
  radius: number,
  points: number,
  variance: number,
  seed: number
): string {
  const angleStep = (Math.PI * 2) / points;
  const pathPoints: { x: number; y: number }[] = [];

  for (let i = 0; i < points; i++) {
    const angle = i * angleStep;
    // Use seed-based pseudo-random for consistent shapes
    const noise = Math.sin(seed * (i + 1) * 0.7) * variance;
    const r = radius + noise;
    pathPoints.push({
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    });
  }

  // Create smooth bezier curve through points
  let path = `M ${pathPoints[0].x} ${pathPoints[0].y}`;

  for (let i = 0; i < pathPoints.length; i++) {
    const p0 = pathPoints[(i - 1 + pathPoints.length) % pathPoints.length];
    const p1 = pathPoints[i];
    const p2 = pathPoints[(i + 1) % pathPoints.length];
    const p3 = pathPoints[(i + 2) % pathPoints.length];

    // Catmull-Rom to Bezier conversion for smooth curves
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  return path + ' Z';
}

// Interpolate between two blob paths
function interpolatePaths(
  cx: number,
  cy: number,
  radius: number,
  points: number,
  variance: number,
  seed1: number,
  seed2: number,
  t: number
): string {
  const angleStep = (Math.PI * 2) / points;
  const pathPoints: { x: number; y: number }[] = [];

  for (let i = 0; i < points; i++) {
    const angle = i * angleStep;
    const noise1 = Math.sin(seed1 * (i + 1) * 0.7) * variance;
    const noise2 = Math.sin(seed2 * (i + 1) * 0.7) * variance;
    const noise = noise1 + (noise2 - noise1) * t;
    const r = radius + noise;
    pathPoints.push({
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    });
  }

  let path = `M ${pathPoints[0].x} ${pathPoints[0].y}`;

  for (let i = 0; i < pathPoints.length; i++) {
    const p0 = pathPoints[(i - 1 + pathPoints.length) % pathPoints.length];
    const p1 = pathPoints[i];
    const p2 = pathPoints[(i + 1) % pathPoints.length];
    const p3 = pathPoints[(i + 2) % pathPoints.length];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  return path + ' Z';
}

// Easing function for smooth transitions
function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

// Blob configuration - defines the organic shapes
interface BlobConfig {
  cx: number;      // Center X (percentage of viewport)
  cy: number;      // Center Y (percentage of viewport)
  radius: number;  // Base radius (percentage of viewport)
  points: number;  // Number of points for smoothness
  variance: number; // How much the radius varies
  color: string;   // Fill color (from your palette)
  opacity: number; // Base opacity
  duration: number; // Morph cycle duration in ms
}

const BLOB_CONFIGS: BlobConfig[] = [
  // Large warm shape - top left area
  {
    cx: 15,
    cy: 20,
    radius: 35,
    points: 8,
    variance: 12,
    color: 'var(--color-warm-200)',
    opacity: 0.4,
    duration: 25000,
  },
  // Medium sage shape - right side
  {
    cx: 85,
    cy: 45,
    radius: 30,
    points: 7,
    variance: 10,
    color: 'var(--color-sage-200)',
    opacity: 0.3,
    duration: 30000,
  },
  // Subtle forest accent - bottom
  {
    cx: 40,
    cy: 85,
    radius: 40,
    points: 9,
    variance: 15,
    color: 'var(--color-forest-100)',
    opacity: 0.25,
    duration: 35000,
  },
  // Small warm accent - center-ish
  {
    cx: 60,
    cy: 30,
    radius: 20,
    points: 6,
    variance: 8,
    color: 'var(--color-amber-100)',
    opacity: 0.2,
    duration: 20000,
  },
];

// Generate initial static paths
const INITIAL_PATHS = BLOB_CONFIGS.map((config, index) =>
  generateBlobPath(
    config.cx,
    config.cy,
    config.radius,
    config.points,
    config.variance,
    index * 1.5 + 1
  )
);

export default function AmbientBackground() {
  const prefersReducedMotion = useReducedMotion();
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // Animation loop - directly updates DOM without React state
  useEffect(() => {
    if (prefersReducedMotion) {
      // Set static paths when reduced motion is preferred
      pathRefs.current.forEach((pathEl, index) => {
        if (pathEl) {
          pathEl.setAttribute('d', INITIAL_PATHS[index]);
        }
      });
      return;
    }

    startTimeRef.current = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current;

      BLOB_CONFIGS.forEach((config, index) => {
        const pathEl = pathRefs.current[index];
        if (!pathEl) return;

        // Calculate which morph cycle we're in
        const cycleProgress = (elapsed % config.duration) / config.duration;
        const easedProgress = easeInOutSine(cycleProgress);

        // Seed values that change each cycle
        const cycleIndex = Math.floor(elapsed / config.duration);
        const seed1 = (index + 1) * 1.5 + cycleIndex * 0.3;
        const seed2 = (index + 1) * 1.5 + (cycleIndex + 1) * 0.3;

        const newPath = interpolatePaths(
          config.cx,
          config.cy,
          config.radius,
          config.points,
          config.variance,
          seed1,
          seed2,
          easedProgress
        );

        pathEl.setAttribute('d', newPath);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      {/* SVG layer with morphing blobs */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Blur filter for soft edges */}
        <defs>
          <filter id="ambient-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
        </defs>

        {/* Render blob shapes */}
        <g filter="url(#ambient-blur)">
          {BLOB_CONFIGS.map((config, index) => (
            <path
              key={index}
              ref={(el) => { pathRefs.current[index] = el; }}
              d={INITIAL_PATHS[index]}
              fill={config.color}
              opacity={config.opacity}
            />
          ))}
        </g>
      </svg>

      {/* Grain overlay - static texture for natural feel */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />

      {/* Soft vignette - subtle edge darkening for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(250, 250, 248, 0.4) 100%)',
        }}
      />
    </div>
  );
}
