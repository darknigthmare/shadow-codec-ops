import type { UserSettings } from '../types/theme.types';

export function applyThemeClass(settings: UserSettings): string {
  const classes = ['app-shell', `theme-${settings.selectedTheme}`];
  if (settings.scanlines && !settings.reduceFlashes) classes.push('has-scanlines');
  if (settings.crtGlow) classes.push('has-crt-glow');
  if (settings.noise && !settings.reduceFlashes) classes.push('has-noise');
  if (settings.pixelPerfect) classes.push('pixel-perfect');
  if (settings.reducedMotion) classes.push('reduced-motion');
  if (settings.highContrast) classes.push('high-contrast');
  if (settings.largeText) classes.push('large-text');
  if (settings.reduceFlashes) classes.push('reduced-flashes');
  return classes.join(' ');
}
