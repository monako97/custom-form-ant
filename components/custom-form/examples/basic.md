---
title: 最简单的用法 (推荐)
description: 最简单的用法
order: 0
---

```jsx
render(
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
      },
      test: {
        type: 'list',
        label: '测试',
        colProps: { span: 24 },
        config: {
          name: {
            type: 'string',
            label: '名称',
            colProps: { span: 24 },
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
          },
          age: {
            type: 'list',
            label: '年龄',
            colProps: { span: 24 },
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
            help: '测试 help',
            extra: '测试 extra',
            config: {
              max: {
                type: 'number',
                label: '最大',
                colProps: { span: 12 },
                rules: [{ required: true }],
              },
              min: {
                type: 'number',
                label: '最小',
                colProps: { span: 12 },
              },
            },
          },
        },
      },
      arrs: {
        type: 'list',
        label: '测试2',
        maxLength: 4,
        minLength: 1,
        colProps: { span: 24 },
        addText: '添加',
      },
    }}
  />
);
```
