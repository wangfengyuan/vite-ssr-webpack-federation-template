import { ViteContext } from '~/types';

export async function installModule(ctx: ViteContext) {
  Object.values(import.meta.globEager('../modules/*.ts')).map((i: any) => i.install?.(ctx));
}
