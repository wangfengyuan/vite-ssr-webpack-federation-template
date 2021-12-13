import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(['home', 'about'])
  @Render('home')
  getHello() {
    return {
      meta: {
        title: 'home',
        keywords: 'keywords',
        desc: 'vue2-webpack-vue3-vite-ssr-demo',
      },
      SERVER_DATA: {
        name: 'wangfengyuan'
      }
    };
  }
}
