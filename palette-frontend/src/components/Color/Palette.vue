<template>
	<div class="color-palette">
		<header>{{ headerText }}</header>
		<main>
			<ul>
				<Item v-for="colorItem in props.colorPalette" :key="colorItem.name" :colorItem="colorItem" />
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
import { computed, watchEffect } from 'vue';
import Item from './Itme.vue';
import PlusOutlined from '@ant-design/icons-vue/PlusOutlined';
import { useState } from '@13enbi/vhooks';
import { THEME_TYPES_TEXT } from '../../config';

export default {
	props: {
		type: { type: String, default: 'other' },
		colorPalette: { type: Object, requied: true, default: () => ({}) },
	},
	setup(props) {
		const headerText = computed(() => {
			return `${props.type}/${THEME_TYPES_TEXT[props.type || 'other']}`;
		});

		const { nowTheme } = useState(['nowTheme']);

		return {
			headerText,
			props,
		};
	},

	components: { Item, PlusOutlined },
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
