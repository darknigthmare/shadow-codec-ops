import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, 'docs/**'],
    environment: 'jsdom',
    globals: false,
    clearMocks: true,
    restoreMocks: true
  }
});
