# Avatar 头像

Avatar 组件可以用来代表人物或对象， 支持使用图片、图标或者文字作为 Avatar。

## 基础用法

使用 shape 和 size 属性来设置 Avatar 的形状和大小。

:::demo

```vue
<template>
  <div class="demo-avatar demo-basic">
    <div>
      <div class="sub-title">circle</div>
      <div class="demo-basic--circle">
        <div class="block">
          <jl-avatar :size="50" :src="circleUrl" />
        </div>
        <div v-for="size in sizeList" :key="size" class="block">
          <jl-avatar :size="size" :src="circleUrl" />
        </div>
      </div>
    </div>
    <div>
      <div class="sub-title">square</div>
      <div class="demo-basic--circle">
        <div class="block">
          <jl-avatar shape="square" :size="50" :src="squareUrl" />
        </div>
        <div v-for="size in sizeList" :key="size" class="block">
          <jl-avatar shape="square" :size="size" :src="squareUrl" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, toRefs } from 'vue'

const state = reactive({
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  squareUrl:
    'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
  sizeList: ['small', '', 'large'] as const,
})

const { circleUrl, squareUrl, sizeList } = toRefs(state)
</script>

<style scoped>
.demo-basic {
  text-align: center;
}
.demo-basic .sub-title {
  margin-bottom: 10px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
}
.demo-basic .demo-basic--circle,
.demo-basic .demo-basic--square {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.demo-basic .block:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}
.demo-basic .block {
  flex: 1;
}
.demo-basic .el-col:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}
</style>

```

:::

## 不同尺寸

提供三种不同尺寸的按钮。

:::demo

```vue
<template>

</template>
```

:::

## 加载中

点击按钮进行数据加载操作，在按钮上面显示加载状态。

:::demo

```vue
<template>
  
</template>
```

:::

## Attributes

| 参数    | 说明   | 类型    | 可选值                                             | 默认值  |
| ------- | ------ | ------- | -------------------------------------------------- | ------- |
| size    | 尺寸   | string  | large / small / mini                               | default |
| type    | 类型   | string  | primary / success / warning / info / danger / text | primary |
| loading | 加载中 | boolean | —                                                  | false   |

