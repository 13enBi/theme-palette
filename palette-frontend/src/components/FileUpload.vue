<template>
	<div class="fileupload">
		<input
			type="file"
			accept=".less, .css"
			multiple
			ref="fileRef"
			@change="handleFileChane"
		/>
		<a-button type="primary" @click="handleUpload">上传Less</a-button>
	</div>
</template>

<script lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import { fileListReader, lessParse } from '../common/utils';
import { useMutations } from '@13enbi/vhooks';

export default {
	setup(_, { emit }: { emit: (eventName: string, value?: any) => void }) {
		const fileRef = ref<null | HTMLInputElement>(null);
		const { setParseResult } = useMutations(['setParseResult']);

		const handleUpload = () => {
			fileRef.value?.click();
		};

		const handleFileChane = async (e: Event) => {
			const files = (e.target as HTMLInputElement).files;
			if (!files || files.length === 0) return;

			setParseResult(await fileListReader(files));
		};

		return {
			fileRef,
			handleUpload,
			handleFileChane,
		};
	},
};
</script>

<style lang="less">
.fileupload {
	margin-right: 10px;
	input[type='file'] {
		display: none;
	}
}
</style>
