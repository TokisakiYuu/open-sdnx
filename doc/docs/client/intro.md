---
sidebar_position: 1
---

# 简介

把生成的代码看作一个库，我称之为`Client`，这是从 [prisma](https://www.prisma.io/) 借鉴的概念，做逆向工程的思路也是多多少少参考了 prisma ，而之所做，是因为生成的这些代码可以得到各种现代代码编辑器的最大程度的支持，如代码补全、自动引入、直接导入ts，同时在开发时，我们也无需太过于关心一次请求的各种配置，或者因为反复比对文档和自己写的代码而花费更多的时间。

## 使用Client

```js
import OpenSdnx from 'opensdnx/client'

const sdnx = new OpenSdnx()
```
