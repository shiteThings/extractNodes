## 简介

提取chromeGO/edgeGo等里面的节点到通用客户端使用

## 注意事项

套上warp可绕过chromego封锁的网站（P，X）

开启浏览器自带doh以及客户端tun模式也可绕过封锁，参考：[开启chrome自带doh](https://blog.mareep.net/posts/9993/)

## 订阅链接分享

### 不套warp版本（clashmeta）

```
https://goclash.topmarco.tech/
```

### 套warp版本（clashmeta）可以访问被限制的网站（如p站等）

```
https://chromegoclashwarp.marcol.top/
```

### 通用base64链接 （shadowrocket和nekoray系列）

```
https://gob64.topmarco.tech
```


## 客户端推荐
karing: https://karing.app/download 全平台可用的免费客户端，但是不开源

### Windows

- [clash verge](https://github.com/zzzgydi/clash-verge/releases) 
- [nekoray](https://github.com/MatsuriDayo/nekoray)
- [mihomo party](https://github.com/mihomo-party-org/mihomo-party/releases/latest)

### android

- [nekobox](https://github.com/MatsuriDayo/NekoBoxForAndroid)
- [clashmeta for android](https://github.com/MetaCubeX/ClashMetaForAndroid/releases)

### ios

- shadowrocket

### macos

- [clashx.meta](https://github.com/MetaCubeX/ClashX.Meta/releases)
- [clash verge](https://github.com/zzzgydi/clash-verge/releases) 
- shadowrocket
## cloudflare worker部署命令

[具体部署操作可以观看视频教学](https://www.youtube.com/watch?v=cthl7LLbTv0&t=6s)

创建项目

>npm create cloudflare@latest

安装依赖js-yaml

> npm install js-yaml

测试

> wrangler dev

部署到cloudflare

> wrangler deploy

## 致谢

- [绵阿羊](https://github.com/vveg26/chromego_merge)

## 
