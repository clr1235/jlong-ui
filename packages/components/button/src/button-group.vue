<template>
	<div :class="`${ns.b('group')}`">
		<slot></slot>
	</div>
</template>

<!-- <script lang="ts">
export default {
	name: 'ElButtonGroup',
}
</script> -->
<script lang="ts" setup>
import { provide, reactive, toRef } from 'vue'
import { useNamespace } from '@jlong-ui/hooks'
import { buttonGroupProps } from './button-group'
import { buttonGroupContextKey } from './constants'

defineOptions({ name: 'ElButtonGroup' })
const props = defineProps(buttonGroupProps)
provide(
	buttonGroupContextKey,
	reactive({
		size: toRef(props, 'size'),
		type: toRef(props, 'type'),
	})
)
const ns = useNamespace('button')
</script>
