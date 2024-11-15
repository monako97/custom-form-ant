---
title: 字符串列表
description: 字符串列表
order: 2
---

```jsx
render(
  <CustomForm
    initialValues={{
      arrs: [''],
    }}
    config={{
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
