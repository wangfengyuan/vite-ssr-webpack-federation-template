## `vite ssr`模板
在业务中老的项目还是采用的是`vue2+webpack5`，但是新的前端服务想采用新的`vue3+vite`的开发模式，为了复用原来的公共组件，采用了联邦模块的方式，在改造过程中踩了一些坑，最终才有了这个模板

### 特性
- `vue2+webpack`
- `vue3+vite`(采用`vitesse`模板)
- 联邦模块
- 多页面
- `ssr`(只负责渲染初始化数据)

### vue2-remote
该文件夹使用`vue2+webpack5`,启动方法，通过`webpack5`联邦模块暴露了`Navheader`和`Footer`组件
```
npm install
npm run dev
```

### vue3-host
该文件夹使用`vue3+vite+nestjs`,使用上面的组件，启动方法
```
npm install
npm run start
```
启动后打开以下地址
```
http://127.0.0.1:3000/apps/home
```
