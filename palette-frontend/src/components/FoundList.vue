<template>
	<div class="found-color-list">
		<ul ref="foundListRef"></ul>
	</div>
</template>

<script lang="ts">
import { ref, watchEffect, nextTick, onMounted } from 'vue';
import { scrollInView as _scrollInView, clipboardWrite } from '../common/utils';
import { message } from 'ant-design-vue';
import { useKeyPress, useMutationObserver, useDebounceFn } from '@13enbi/vhooks';

export default {
	setup(props) {
		const foundListRef = ref();
		const foundItem = ref<HTMLElement>();

		const [scrollInView] = useDebounceFn(() => {
			foundItem.value?.click();
		}, 100);

		const mutationCallBack = async (mutationsList: MutationRecord[]) => {
			foundItem.value = foundListRef.value?.querySelector('.color-item-wrap');

			scrollInView();

			if (foundItem.value) {
				const { type, uses, name } = foundItem.value.dataset,
					usesList = uses?.split('|');

				if (usesList && usesList.length === 1) {
					const str = `${type}-${usesList[0]}${name ? `-${name}` : ''}`;
					clipboardWrite(str);
					message.success(`copied : ${str}`);
				}
			}
		};

		onMounted(() => {
			useMutationObserver(foundListRef, mutationCallBack, {
				childList: true,
				subtree: true,
			});
		});

		useKeyPress('enter', scrollInView);

		return {
			foundListRef,
		};
	},
};
</script>

<style lang="less">
.found-color-list {
	// position: fixed;
	// top: 50px;
	// left: 10px;
	width: 220px;
	text-align: center;

	ul {
		overflow-y: auto;
		overflow-x: hidden;
		max-height: calc(100vh - 60px);
		padding: 0;
		margin: 0;
		//	margin-bottom: 30px;

		&::-webkit-scrollbar {
			width: 6px;
			height: 6px;
			background-color: transparent;
		}

		&::-webkit-scrollbar-thumb {
			background-color: transparent;
			border-radius: 6px;
		}

		&:hover {
			&::-webkit-scrollbar-thumb {
				background-color: rgba(69, 90, 100, 0.2);
			}
		}
	}
	header {
		font-size: 22px;
		margin-top: 20px;
	}
	nav {
		margin: 20px;
		div {
			font-size: 18px;
		}
	}
}
</style>
