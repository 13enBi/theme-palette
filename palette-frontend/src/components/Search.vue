<template>
	<a-input-search v-model:value="searchWord" placeholder="输入类名/颜色值" enter-button />

	<!-- @search="handleSearch" -->
</template>

<script lang="ts">
import { reactive, ref, watchEffect, nextTick, onMounted, computed } from 'vue';

import { useClipboard } from '../common/hooks';
import { useState } from '@13enbi/vhooks';

export default {
	setup() {
		return {
			...useState(['searchWord']),
		};
	},
};
</script>
