<template>
    <div class="play-container">
        <div class="demo-fit">
            <div v-for="fit in fits" :key="fit" class="block">
            <span class="title">{{ fit }}</span>
            <jl-avatar shape="square" :size="100" :fit="fit" :src="url" />
        </div>
        <div class="mb-4">
            <jl-button>Default</jl-button>
            <jl-button type="primary">Primary</jl-button>
            <jl-button type="success">Success</jl-button>
            <jl-button type="info">Info</jl-button>
            <jl-button type="warning">Warning</jl-button>
            <jl-button type="danger">Danger</jl-button>
        </div>
    </div>
    </div>
</template>
  
<script setup lang="ts">
    import { reactive, toRefs } from 'vue'

    const state = reactive({
    fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    })

    const { fits, url } = toRefs(state)
</script>
  
<style lang="scss">
html,
body {
    width: 100vw;
    height: 100vh;
    margin: 0;
    #play {
      height: 100%;
      width: 100%;
      .play-container {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
}
.demo-fit {
  display: flex;
  text-align: center;
  justify-content: space-between;
}
.demo-fit .block {
  flex: 1;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
}

.demo-fit .title {
  margin-bottom: 10px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
}
</style>
  