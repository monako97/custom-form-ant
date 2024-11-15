---
title: 复杂列表
description: 复杂列表
order: 1
---

```jsx
render(
  <CustomForm
    labelCol={{ span: 4 }}
    wrapperCol={{ span: 20 }}
    initialValues={{
      test: [{ age: [{ max: 2 }] }],
    }}
    config={{
      test: {
        type: 'list',
        label: '测试',
        colProps: { span: 24 },
        config: {
          name: {
            type: 'string',
            label: '名称',
            colProps: { span: 24 },
          },
          age: {
            type: 'list',
            label: '年龄',
            colProps: { span: 24 },
            help: '测试 help',
            config: {
              max: {
                type: 'number',
                colon: false,
                labelCol: { span: 0 },
                wrapperCol: {},
                colProps: { span: 12 },
                rules: [{ required: true }],
              },
              min: {
                type: 'number',
                colon: false,
                labelCol: { span: 0 },
                wrapperCol: { span: 24 },
                colProps: { span: 12 },
              },
            },
          },
        },
      },
    }}
  />
);
```
