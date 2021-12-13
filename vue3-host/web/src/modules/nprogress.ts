import NProgress from 'nprogress';
import { Module } from '~/types';
import '@static/css/nprogress.css';

export const install: Module = ({ router }) => {
  router.beforeEach(() => {
    NProgress.start();
  });
  router.afterEach(() => {
    NProgress.done();
  });
};
