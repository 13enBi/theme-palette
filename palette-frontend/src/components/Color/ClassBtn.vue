<template>
	<div class="class-btn">
		<a-button v-for="className in classList" :key="className" @click="handleCopy(className)"
			>{{ className }}
		</a-button>
	</div>
</template>

<script lang="ts">
import { ref, onMounted, computed, watchEffect } from 'vue';
import { clipboardWrite } from '../../common/utils';
import { message } from 'ant-design-vue';

export default {
	props: {
		classList: Set,
		type: { type: String, default: 'other' },
		colorName: { type: String, default: '' },
	},
	setup(props) {
		const handleCopy = (className: string) => {
			const str = [props.type, className, props.colorName].reduce((total, curr) =>
				curr ? (total += `-${curr}`) : total,
			);

			clipboardWrite(str as string);

			message.success(`copied： ${str} !`);
		};

		return { handleCopy, classList: props.classList };
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
