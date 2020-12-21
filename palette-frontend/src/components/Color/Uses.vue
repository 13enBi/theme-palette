<template>
	<div class="class-btn">
		<a-button v-for="use in uses" :key="use" @click="handleCopy(use)">{{ use }} </a-button>
	</div>
</template>

<script lang="ts">
import { ref, onMounted, computed, watchEffect } from 'vue';
import { clipboardWrite } from '../../common/utils';
import { message } from 'ant-design-vue';

export default {
	props: {
		uses: Set,
		type: { type: String, default: 'other' },
		name: { type: String, default: '' },
	},
	setup(props) {
		const handleCopy = (use: string) => {
			const str = [props.type, use, props.name].reduce((total, curr) =>
				curr ? (total += `-${curr}`) : total,
			);

			clipboardWrite(str as string);

			message.success(`copied： ${str} !`);
		};

		return { handleCopy, use: props.use };
	},
};
</script>

<style lang="less">
.class-btn {
	display: flex;
	gap: 5px;
	justify-content: center;
	align-items: center;
	padding: 0 5px;
	z-index: 249;
	button {
		width: 31%;
		margin: 0 5px;
	}
}
</style>
