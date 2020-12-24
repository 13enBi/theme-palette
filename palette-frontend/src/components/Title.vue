<template>
	<div class="theme-title dropdown">
		<div class="dropdown-toggle" @click="toggle">
			<header>{{ title }}</header>
		</div>
		<ul class="theme-list dropdown-menu" :style="{ transform: show ? 'rotate(0)' : '' }">
			<li class="dropdown-item" v-for="item in allTheme" :key="item.fileName" @click="change(item)">
				{{ item.fileName }}
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { ref, watchEffect, reactive, computed, watch } from 'vue';

import { useState, useMutations, useBoolean } from '@13enbi/vhooks';
import { useHash } from '../common/hooks';
import { State } from '../store/state';

export default {
	setup() {
		const [show, toggle] = useBoolean(false);
		const { title, allTheme } = useState(['title', 'allTheme']);
		const { setNowThemeByFile } = useMutations(['setNowThemeByFile']);

		const themeMap = computed(() => {
			return allTheme.value.reduce((map, res) => {
				return (map[res.fileName] = res), map;
			}, {});
		});

		const change = (res: ColorTheme.FileResult) => {
			hash.value = res.fileName;
		};

		const hash = useHash();

		watchEffect(() => {
			const now = themeMap.value[hash.value];

			now && requestAnimationFrame(() => setNowThemeByFile(now));
		});

		return { title, show, toggle, change, allTheme };
	},
};
</script>

<style lang="less">
.theme-title {
	position: relative;
	header {
		font-size: 20px;
		width: 200px;
	}
}
.dropdown {
	--dropdown-item-hover-color: hsl(0, 0%, 96%);
	--dropdown-item-divider-color: rgba(255, 255, 255, 0.2);

	position: relative;

	.dropdown-toggle {
		color: #1890ff;
		cursor: pointer;
	}

	.dropdown-menu {
		width: 100%;
		position: absolute;
		top: calc(100% + 4px);
		left: 0;
		margin: 0;
		padding: 4px 0;
		list-style-type: none;
		transform: perspective(400px) rotateX(-90deg);
		transform-origin: top;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
		white-space: nowrap;
		transition: 0.4s;
		border-radius: 6px;

		.dropdown-item {
			cursor: pointer;
			display: block;
			padding: 6px 12px;
			//text-align: center;
			text-decoration: none;
			//	color: #000;
			background-color: #fff;
			transition: 0.4s;
			&::selection {
				background-color: #91d5ff;
			}
			&:hover {
				background-color: var(--dropdown-item-hover-color);
			}
		}

		.dropdown-item:not(:last-child) a {
			border-bottom: 1px solid var(--dropdown-item-divider-color);
		}
	}

	&:hover {
		.dropdown-toggle {
			&::after {
				transform: scaleY(-1);
			}
		}

		// .dropdown-menu {
		// 	transform: rotate(0);
		// }
	}
}
</style>
