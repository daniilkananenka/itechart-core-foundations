type Color = 'RED' | 'GREEN' | 'BLUE' | 'RED';

type ColorConfig = { background: `#${string}`; border: `#${string}` };

const COLORS_CONFIG: Record<Color, ColorConfig> = Object.freeze({
  RED: Object.freeze({ background: '#cf3838ff', border: '#973131ff' }),
  GREEN: Object.freeze({ background: '#43b338ff', border: '#32812bff' }),
  BLUE: Object.freeze({ background: '#3f3fe7ff', border: '#3434b6ff' }),
  YELLOW: Object.freeze({ background: '#e2c416ff', border: '#c7ac13ff' }),
} as const);

const AVAILABLE_COLORS = Object.keys(COLORS_CONFIG) as unknown as Color[];

export { COLORS_CONFIG, AVAILABLE_COLORS, Color, ColorConfig };
