---
sidebar_position: 2
---

# OpenSdnx类

这个类用于构造一个请求函数的上下文对象。

## 用法

```js
const sdnx = new OpenSdnx(config)
```

#### 为每个请求带上Token

```js
const sdnx = new OpenSdnx({
  headers: {
    sdnxRequestId: 'sd_token_xxxxxxxxxxxxxxxxxx'
  }
})
```

## config

参考Axios的 [Request Config](https://axios-http.com/docs/req_config)
