import { Module } from '~/types';
import { Vue2InVue3 } from '~/utils';
const Header = Vue2InVue3(() => import('vue2remote/Header'), 'header');
const Footer = Vue2InVue3(() => import('vue2remote/Footer'), 'footer');

export const install: Module = ({ app }) => {
  // eslint-disable-next-line vue/multi-word-component-names
  app.component('Header', Header).component('Footer', Footer);
};
