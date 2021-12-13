import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createServer as createViteServer } from 'vite';
import { NestExpressApplication } from '@nestjs/platform-express';
import path, { join } from 'path';
import ejs from 'ejs';

async function configureVite(app: NestExpressApplication) {
  const clientDirectory = join(__dirname, '../web');
  app.setBaseViewsDir(clientDirectory);
  app.setViewEngine('html');
  app.engine('html', (ejs as any).__express);
  const vite = await createViteServer({
    configFile: path.resolve(__dirname, '../web/vite.config.ts'),
    server: {
      middlewareMode: 'ssr',
    },
  });
  app.use(vite.middlewares);
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await configureVite(app);
  await app.listen(3000);
}
bootstrap();
