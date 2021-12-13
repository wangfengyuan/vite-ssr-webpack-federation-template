import type { App } from 'vue';
import type { Router, RouteRecordRaw } from 'vue-router';

export interface ViteContext {
  app: App;
  router?: Router;
  routes?: RouteRecordRaw[];
}

export type Module = (ctx: ViteContext) => void;
