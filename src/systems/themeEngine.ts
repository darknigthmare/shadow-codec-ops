import type { UserSettings } from '../types/theme.types';

export function applyThemeClass(settings: UserSettings): string {
  const classes = ['app-shell', `theme-${settings.selectedTheme}`];
  if (settings.scanlines) classes.push('has-scanlines');
  if (settings.crtGlow) classes.push('has-crt-glow');
  if (settings.noise) classes.push('has-noise');
  if (settings.pixelPerfect) classes.push('pixel-perfect');
  return classes.join(' ');
}
