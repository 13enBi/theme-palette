import { ref, onMounted, defineComponent, Ref } from 'vue';
import { scrollInView as _scrollInView, clipboardWrite, ParseItem } from '../../common/utils';
import { message } from 'ant-design-vue';
import { useKeyPress, useMutationObserver, useDebounceFn, useEventHub } from '@13enbi/vhooks';
import './style/FoundList.less';
import { THEMES, ThemeTypes } from '../../config';

const initFound = (): Record<ThemeTypes, Set<FoundPayLoad>> => {
	return THEMES.reduce((map, type) => {
		map[type] = new Set([]);
		return map;
	}, {} as any);
};

export enum FOUND_EVENT {
	ADD = 'found:add',
	DELETE = 'found:remove',
}

export type FoundPayLoad = Pick<ParseItem, 'uses' | 'name' | 'type'> & { el: Ref<HTMLElement> };

const useFoundMap = () => {
	const foundMap = ref(initFound());

	const handler = (ev: FOUND_EVENT) => (payload?: FoundPayLoad) => {
		if (!payload) return;

		const set = foundMap.value[payload.type];
		const act = ev === FOUND_EVENT.DELETE ? 'add' : 'delete';

		console.log(payload);
		set?.[act](payload);
	};

	const eventHub = useEventHub();
	eventHub.on(FOUND_EVENT.ADD, handler(FOUND_EVENT.ADD));
	eventHub.on(FOUND_EVENT.DELETE, handler(FOUND_EVENT.DELETE));

	return foundMap;
};

export default defineComponent(() => {
	const foundMap = useFoundMap();

	return () => (
		<>
			<div class="found-color-list">
				<ul></ul>
			</div>
		</>
	);
});
