---
title: 最简单的用法 (推荐)
description: 最简单的用法
order: 0
---

```jsx
<CustomForm
  config={{
    username: {
      label: '用户名',
    },
    password: {
      label: '密码',
      type: 'password',
    },
    email: {
      label: '邮箱',
      type: 'email',
    },
    remember: {
      label: '记住我',
      type: 'checkbox',
    }
  }}
/>
```
