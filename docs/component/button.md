# Button 按钮

常用的操作按钮。

## 基础用法

基础的按钮用法。

:::demo

```vue
<template>
    <jl-button>默认按钮</jl-button>
    <jl-button type="primary">主要按钮</jl-button>
    <jl-button type="success">成功按钮</jl-button>
    <jl-button type="info">信息按钮</jl-button>
    <jl-button type="warning">警告按钮</jl-button>
    <jl-button type="danger">危险按钮</jl-button>
</template>
```

:::

## 不同尺寸

提供三种不同尺寸的按钮。

:::demo

```vue
<template>
    <jl-button type="primary">默认按钮</jl-button>
    <jl-button type="primary" size="large">大按钮</jl-button>
    <jl-button type="primary" size="small">小按钮</jl-button>
</template>
```

:::

## Attributes

| 参数    | 说明   | 类型    | 可选值                                             | 默认值  |
| ------- | ------ | ------- | -------------------------------------------------- | ------- |
| size    | 尺寸   | string  | large / small                                | default |
| type    | 类型   | string  | primary / success / warning / info / danger / text | primary |
| loading | 加载中 | boolean | —                                                  | false   |

