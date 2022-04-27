---
sidebar_position: 6
---

# 参数放置指令

## $path

把参数放置到路径插槽

```js
sdnx.fetch('GET /member/{memberNo}/profile', {
  $path: {
    memberNo: '12619249182749'
  }
})
```

url解析为

```text
GET /member/12619249182749/profile
```



## $query

把参数放置到url的查询参数部分

```js
sdnx.fetch('GET /member/profile', {
  $query: {
    memberNo: '12619249182749'
  }
})
```

url解析为

```text
GET /member/profile?memberNo=12619249182749
```

## $body

把参数放到json类型的body中
