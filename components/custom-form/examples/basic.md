---
title: 最简单的用法 (推荐)
description: 最简单的用法
order: 0
---

```jsx
render(
  <CustomForm
    autoComplete="off"
    config={{
      username: {
        label: '用户名',
        colProps: { span: 24 },
      },
      password: {
        label: '密码',
        type: 'password',
        colProps: { span: 24 },
      },
      email: {
        label: '邮箱',
        type: 'email',
        colProps: { span: 24 },
      },
      birthday: {
        label: '生日',
        type:  'date',
        colProps: { span: 24 },
      },
      sex: {
        label: '性别',
        type: 'segmented',
        props: {
          options: ['男', '女', '未知'],
        },
        colProps: { span: 24 },
      },
      remember: {
        label: '记住我',
        type: 'checkbox',
        colProps: { span: 24 },
      },
    }}
  />
);
```
