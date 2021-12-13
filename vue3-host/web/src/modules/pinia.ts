import { createPinia } from 'pinia';
import { Module } from '~/types';

// Setup Pinia
// https://pinia.esm.dev/
export const install: Module = ({ app }) => {
  const pinia = createPinia();
  app.use(pinia);
};
