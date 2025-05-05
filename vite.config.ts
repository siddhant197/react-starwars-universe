import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        '**/tests/**',
        '**/*.test.*',
        '**/*.spec.*',
        '**/*.config.*',
        '**/vite-env.d.ts',
        '**/main.tsx',
      ],
    },
  },
});
