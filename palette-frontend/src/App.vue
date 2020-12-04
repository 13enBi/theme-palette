<template>
	<div id="app">
		<AppHeader />

		<Color />
	</div>
</template>

<script lang="ts">
import Color from './components/Color/Color.vue';
import AppHeader from './components/Header.vue';
import { onMounted } from 'vue';
import { useMutations } from '@13enbi/vhooks';

export default {
	components: {
		Color,
		AppHeader,
	},

	setup() {
		onMounted(async () => {
			const { setAllTheme } = useMutations(['setAllTheme']);

			(setAllTheme as any)();
		});
	},
};
</script>

<style lang="less" scoped>
:root {
	margin: 0;
	padding: 0;
}
#app {
	font-family: 'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
		'Helvetica Neue', sans-serif;

	width: 100vw;
	height: 100vh;
	box-sizing: border-box;
	overflow: auto;

	&::-webkit-scrollbar {
		width: 12px;
		height: 12px;
		background-color: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background-color: rgba(69, 90, 100, 0.2);
		border-radius: 6px;
	}
}
</style>
