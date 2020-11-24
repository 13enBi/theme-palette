<template>
	<div class="color-palette">
		<header>{{ headerText }}</header>
		<main>
			<ul>
				<Item v-for="colorItem in props.colorPalette" :key="colorItem.colorName" :colorItem="colorItem" />

				<li class="color-palette-add">
					<span> 新增 <PlusOutlined /></span>
				</li>
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

		&-add {
			margin-top: 25px;
			cursor: pointer;
			user-select: none;
			height: 40px;
			width: 50%;
			background-color: transparent;
			border: 1px dashed #1b87ed;
			outline: transparent;
			border-radius: 8px;
			display: flex;
			align-items: center;
			justify-content: center;
			transform: translateX(50%);
			position: relative;
			overflow: hidden;
			&::before {
				position: absolute;
				content: '';
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: linear-gradient(120deg, transparent, hsla(190, 77%, 83%, 0.5), transparent);
				transform: translateX(-100%);
				transition: 0.6s;
			}
			span {
				font-size: 18px;
				color: #1b87ed;
			}
			&:hover {
				&::before {
					transform: translateX(100%);
				}
			}
		}
	}
</style>
