<template>
	<a-input-search
		v-model:value="searchWord"
		placeholder="输入类名/颜色值"
		enter-button
		@search="handleSearch"
	/>
</template>

<script lang="ts">
import { reactive, ref, watchEffect, nextTick, onMounted, computed } from 'vue';

import { useClipboard } from '../common/hooks';
import { useMutations } from '@13enbi/vhooks';

export default {
	setup() {
		const { setSearchWord } = useMutations(['setSearchWord']);
		const searchWord = ref();

		const handleSearch = () => {
			setSearchWord(searchWord.value);
		};

		watchEffect(handleSearch);

		useClipboard(searchWord, handleSearch);

		return { searchWord, handleSearch };
	},
};
</script>
