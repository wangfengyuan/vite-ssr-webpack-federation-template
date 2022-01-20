import { ViteContext } from '~/types';
import { ImportMeta } from 'vite/types';

export async function installModule(ctx: ViteContext) {
  Object.values(import.meta.globEager('../modules/*.ts')).map((i: any) => i.install?.(ctx));
}
