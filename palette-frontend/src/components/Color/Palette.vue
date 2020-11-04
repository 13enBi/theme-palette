<template>
	<div class="color-palette">
		<header>{{ headerText }}</header>
		<main>
			<ul>
				<Item v-for="colorItem in props.colorPalette" :key="colorItem.colorName" :colorItem="colorItem" />
			</ul>
		</main>
	</div>

	<teleport to=".found-color-list ul">
		<nav :class="`${props.type}`">
			<div>{{ headerText }}</div>
		</nav>
	</teleport>
</template>

<script lang="ts">
import { computed } from 'vue';
import Item from './Itme.vue';

export default {
	props: {
		type: { type: String, default: 'other' },
		colorPalette: { type: Object, requied: true, default: () => ({}) },
	},
	setup(props) {
		const headerText = computed(() => {
			const headMap: any = {
				primary: '品牌色',
				sub: '辅助色',
				mid: '中性色',
				other: '其他',
			};

			return `${props.type}/${headMap[props.type || 'other']}`;
		});

		return {
			headerText,
			props,
		};
	},

	components: { Item },
};
</script>

<style lang="less">
.color-palette {
	color: #fff;
	z-index: 10;
	header {
		color: #000;
		text-align: center;
		font-size: 22px;
		margin: 20px 0;
	}
	ul {
		width: 750px;
		list-style: none;
		background-color: #fff;
		padding: 0;
		margin: auto;
	}
}
</style>
