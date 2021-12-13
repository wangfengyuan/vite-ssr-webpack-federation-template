import { createI18n } from 'vue3-i18n/dist/vue3-i18n.esm';
import { Module } from '~/types';

const messages = {
  en: window.langResource,
};

export const i18n = createI18n({
  locale: 'en',
  messages,
});

export const install: Module = ({ app }) => {
  const { t } = i18n;
  i18n.t = (key: string, params: any) => t(key, params) || key;
  app.use(i18n);
};
