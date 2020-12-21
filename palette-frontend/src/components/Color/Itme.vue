<template>
	<li class="color-item" :class="{ 'found-color-item': isFound }" ref="colorItemRef">
		<div class="color-item-wrap" :style="colorStyle(color.color)">
			<span class="color-item-name">{{ color.colorName }}</span>
			<span class="color-item-value">{{ color.color }}</span>
		</div>

		<ClassBtn :classList="color.uses" :type="color.type" :colorName="color.colorName" />

		<div v-if="color.nightColor" class="color-item-wrap two" :style="colorStyle(color.nightColor)">
			<span class="color-item-name">{{ color.colorName }}(黑板)</span>
			<span class="color-item-value">{{ color.nightColor }}</span>
		</div>
		<div class="color-item-wrap" v-else></div>
	</li>

	<teleport :to="`.found-color-list .${color.type}`" v-if="isFound">
		<div
			class="color-item-wrap found"
			:style="colorStyle(color.color)"
			@click="handleInView"
			:data-uses="[...color.uses].join('|')"
			:data-type="color.type"
			:data-color="color.colorName"
		>
			<span class="color-item-name">{{ color.colorName }}</span>
			<span class="color-item-value">{{ color.color }}</span>
		</div>
	</teleport>
</template>

<script lang="ts">
import { isMoreThanDDD, scrollInView } from '../../common/utils';
import ClassBtn from './ClassBtn.vue';
import { ref, computed } from 'vue';
import { useState } from '@13enbi/vhooks';

export default {
	props: { colorItem: { type: Object, default: () => ({}) } },

	setup(props) {
		const colorItemRef = ref();

		const colorStyle = (color: string) => {
			return {
				backgroundColor: color,
				color: isMoreThanDDD(color) ? '#000' : '#fff',
			};
		};

		const isFound = computed(() => {
			const { source } = props.colorItem,
				{
					searchWord: { value: searchWord },
				} = useState(['searchWord']);

			if (searchWord === '') return false;

			return source?.toLowerCase().includes(searchWord?.toLowerCase());
		});

		const handleInView = () => {
			scrollInView(colorItemRef.value);
		};

		return {
			colorStyle,
			isFound,
			color: props.colorItem,
			handleInView,
			colorItemRef,
		};
	},
	components: { ClassBtn },
};
</script>

<style lang="less">
.gradient-border {
	padding: 4px;
	position: relative;
	background: #fff;
	z-index: 100;

	&::after {
		position: absolute;
		content: '';
		top: 0;
		left: 0;
		z-index: -20;
		width: 100%;
		height: 100%;

		background: linear-gradient(
			60deg,
			hsl(224, 85%, 66%),
			hsl(269, 85%, 66%),
			hsl(314, 85%, 66%),
			hsl(359, 85%, 66%),
			hsl(44, 85%, 66%),
			hsl(89, 85%, 66%),
			hsl(134, 85%, 66%),
			hsl(179, 85%, 66%)
		);
		background-size: 300% 300%;
		background-position: 0 50%;
		border-radius: 4px;
		animation: moveGradient 4s alternate infinite;
	}
}

@keyframes moveGradient {
	50% {
		background-position: 100% 50%;
	}
}

.found-color-item {
	.gradient-border();
}
.color-item {
	margin: auto;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	z-index: 100;

	.class-btn {
		display: none;
	}
	&:hover,
	&.found-color-item {
		.class-btn {
			display: flex;
		}
	}
	&-wrap {
		display: flex;
		justify-content: space-between;
		min-height: 50px;
		padding: 0 12px;
		line-height: 50px;
		transition: all 0.3s ease-in-out;
		cursor: pointer;
		position: relative;
		&:nth-last-child(1) {
			grid-column-start: 3;
		}
		&:hover {
			transform: scale(1.05);
			z-index: 10;
		}
		&.found {
			font-size: 16px;
			width: 180px;
			height: 45px;
		}
	}
}
</style>
