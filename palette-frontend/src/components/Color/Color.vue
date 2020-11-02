<template>
	<div class="color-warp">
		<div class="color">
			<Palette
				v-for="(colorPalette, type) in lessParseResult"
				:key="type"
				:type="type"
				:colorPalette="colorPalette"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { ref, watchEffect } from 'vue';
import { useState } from '@13enbi/vhooks';
import Palette from './Palette.vue';

export default {
	setup() {
		return {
			lessParseResult: useState(['lessParseResult']).lessParseResult,
		};
	},
	components: { Palette },
};
</script>
<style lang="less">
.color-warp {
	display: grid;
	grid-template-columns: 1fr minmax(750px, 2fr) 1fr;
	justify-items: center;
	.color {
		grid-column-start: 2;
	}
}
</style>
