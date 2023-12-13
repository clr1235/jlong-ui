<template>
	<div class="play-container">
		<div v-for="fit in fits" :key="fit" class="item">
			<jl-avatar shape="square" :size="100" :fit="fit" :src="url" />
			<span class="title">{{ fit }}</span>
		</div>
		<div class="mb-4">
			<jl-button>Default</jl-button>
			<jl-button type="primary">Primary</jl-button>
			<jl-button type="success">Success</jl-button>
			<jl-button type="info">info 按钮</jl-button>
			<jl-button type="warning">Warning</jl-button>
			<jl-button type="danger">Danger</jl-button>
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

	.play-container {
		display: flex;
		justify-content: center;
		padding-top: 200px;
		.item {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			margin-right: 20px;
		}
	}
}
</style>
