---
sidebar_position: 1
---

# 简介

**OpenSdnx**是一个逆向工程工具，用来为前端项目生成接口请求代码的，让我们免于重复书写差不多的代码和繁多的比对工作，一定程度上提高我们公司前端团队的开发效率

## 开始

安装依赖
```bash
npm install -D open-sdnx
```

## 生成代码

在此之前，你得先从后端那里得到一个swagger生成得OpenAPI.json文件，据我观察，我们公司用的swagger版本生成出来的并不是完全符合标准的OpenAPI，如果你想了解标准OpenAPI，可以看看[这个](https://swagger.io/docs/specification/about/)。把得到的OpenAPI.json文件放在项目根目录下，然后就可以执行生成了。

在项目根目录下执行：

```bash
opensdnx gen
```

如果你想指定其它文件：

```bash
opensdnx gen -i path/to/api.json
```

如果输出的打印中包含`Successed.`字样，就可以开始使用代码了。

## 使用代码

```javascript
import OpenSdnx from 'opensdnx/client'

const sdnx = new OpenSdnx()
```
