import { installModule } from '~/utils';
import App from '../../App.vue';
import router from '~/router';

async function bootstrap() {
  const app = createApp(App);
  await installModule({ app, router });
  app.use(router).mount('#app');
}
bootstrap();
