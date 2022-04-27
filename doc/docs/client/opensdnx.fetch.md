---
sidebar_position: 3
---

# fetch

请求函数

## 用法

拿oms的获取订单详情接口举个例

![获取订单](/img/Snipaste_2022-04-25_16-49-08.png)

```js
const res = await sdnx.fetch('GET /admin/order/detail', { orderNo: '63817284718723' })
```

在你输入参数的时候你应该会看到编辑器提示，而无需一个字一个字地打完 `/admin/order/detail`，包括在输入接口参数的时候，当你刚输入 `ord` 的时候，编辑器已经给到你补全提示了，并且你可以在任何时候通过 `Ctrl + i` 主动触发补全提示(VSCode)

## config

你也可以在fetch函数的最后一个参数放一个配置对象

```js
const res = await sdnx.fetch('GET /admin/order/detail', { orderNo: '63817284718723' }, config)
```

它仅在此次请求有效，这不难理解，详细配置项请参考Axios的 [Request Config](https://axios-http.com/docs/req_config)

## 你无需关心接口参数放在哪

比如假设有接口 `POST /member/{memberNo}`，按照我们之前的使用的 `umi-request` 库的写法：

```js
request('post', `/member/${memberNo}`, {
  params: {
    action: paramAction
  },
  data: {
    friends: paramFriends
  }
})
```

接口需要的参数来自三个地方：
- path中: `memberNo`
- query中: `action`
- body中: `friends`

现在你只需要全部写在fetch函数第二个参数对象中:

```js
const res = await sdnx.fetch('GET /admin/order/detail', {
  memberNo: paramMemberNo,
  action: paramAction,
  friends: paramFriends
})
```

我会在代码生成时处理好每个参数的去向。

有一种特殊情况，比如 query 和 body 里都有一个名为 `friends` 的参数，那么也允许你使用 [参数放置指令](/docs/client/param_put_command) 来指定某个参数应该放在哪里，不过这种情况极其罕见，所你一般用不上

```js
const res = await sdnx.fetch('GET /admin/order/detail', {
  $query: {
    friends: param_a
  },
  $body: {
    friends: param_b
  }
})
```
