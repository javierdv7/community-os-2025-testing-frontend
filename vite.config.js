import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',  // Simula el entorno de navegador
  },
});