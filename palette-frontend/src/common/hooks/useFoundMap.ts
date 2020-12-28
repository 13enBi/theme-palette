import { reactive, Ref, watch } from 'vue';
import { ParseItem } from '../../common/utils';
import { useEventHub, useMounted } from '@13enbi/vhooks';
import { THEMES, ThemeTypes } from '../../config';

export enum FOUND_EVENT {
	ADD = 'found:add',
	DELETE = 'found:delete',
	RESET = 'found:reset',
}

export interface FoundPayLoad extends Pick<ParseItem, 'uses' | 'name' | 'type' | 'color'> {
	el: HTMLElement;
	isFind: boolean;
}

export type FoundMap = Record<ThemeTypes, Set<FoundPayLoad>>;

const getInitMap = (): FoundMap =>
	THEMES.reduce((map, type) => {
		map[type] = new Set([]);
		return map;
	}, {} as any);

const { emit, on } = useEventHub();

export default () => {
	const foundMap = reactive(getInitMap());

	const handler = (ev: FOUND_EVENT) => (payload?: FoundPayLoad) => {
		if (!payload) return;

		const set = foundMap[payload.type];
		const act = ev === FOUND_EVENT.ADD ? 'add' : 'delete';
		set?.[act](payload);
	};

	on(FOUND_EVENT.ADD, handler(FOUND_EVENT.ADD));
	on(FOUND_EVENT.DELETE, handler(FOUND_EVENT.DELETE));
	on(FOUND_EVENT.RESET, () => Object.assign(foundMap, getInitMap()));

	return foundMap;
};

const useFound = (ev: FOUND_EVENT) => (payload: FoundPayLoad) => emit(ev, payload);

export const useFoundAdd = useFound(FOUND_EVENT.ADD);
export const useFoundDelete = useFound(FOUND_EVENT.DELETE);
export const useFoundReset = useFound(FOUND_EVENT.RESET) as () => void;

export const useFoundUpdate = (payload: Ref<FoundPayLoad>) => {
	useMounted(() => {
		watch(
			payload,
			(val, oldVal) => {
				oldVal && useFoundDelete(oldVal);
				useFoundAdd(val);
			},
			{ immediate: true },
		);
	});
};
