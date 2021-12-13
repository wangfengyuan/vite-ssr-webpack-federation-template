## npm 脚本

```
# 本地打包
npm run debug
# 沙箱打包
npm run sandbox
# 线上打包
npm run build
# 分析打包后文件（开发环境）
npm run analyze
```

## 集成 Midas-libs

使用前先安装最新版：

```bash
tnpm install @tencent/midas-libs --save
```

输入：
```ts
import { ajax } from '@tencent/midas-libs';
```

输出：
```ts
import ajax from '@tencent/midas-libs/dist/lib/ajax';
```