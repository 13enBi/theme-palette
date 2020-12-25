import { ref, defineComponent, Ref, PropType, computed, unref } from 'vue';
import { scrollInView, ParseItem } from '../../common/utils';
import { useEventHub } from '@13enbi/vhooks';
import { THEMES, ThemeTypes, THEME_TYPES_TEXT } from '../../config';
import { useColorStyle } from '../../common/hooks';
import './style/FoundList.less';

export enum FOUND_EVENT {
	ADD = 'found:add',
	DELETE = 'found:delete',
}

export interface FoundPayLoad extends Pick<ParseItem, 'uses' | 'name' | 'type' | 'color'> {
	el: HTMLElement;
	isFind: boolean;
}

const useFoundMap = () => {
	const initMap = THEMES.reduce((map, type) => {
		map[type] = new Set([]);
		return map;
	}, {} as any) as Record<ThemeTypes, Set<FoundPayLoad>>;

	const foundMap = ref(initMap);

	const handler = (ev: FOUND_EVENT) => (payload?: FoundPayLoad) => {
		if (!payload) return;

		const set = foundMap.value[payload.type];
		const act = ev === FOUND_EVENT.ADD ? 'add' : 'delete';
		set?.[act](payload);
	};

	const { on } = useEventHub();
	on(FOUND_EVENT.ADD, handler(FOUND_EVENT.ADD));
	on(FOUND_EVENT.DELETE, handler(FOUND_EVENT.DELETE));

	return foundMap;
};

const FoudItem = defineComponent({
	props: {
		payload: {
			type: Object as PropType<FoundPayLoad>,
			required: true,
		},
	},
	setup(props) {
		const bgStyle = useColorStyle(computed(() => props.payload.color));

		const handleInView = () => {
			const el = props.payload.el;

			scrollInView(el);
		};

		return () => {
			const payload = props.payload;

			return (
				<>
					<div
						style={{ ...bgStyle.value, display: payload.isFind ? 'block' : 'none' }}
						class="color-item-wrap found"
						onClick={handleInView}
					>
						<span class="color-item-name">{payload.name}</span>
						<span class="color-item-value">{payload.color}</span>
					</div>
				</>
			);
		};
	},
});

export default defineComponent(() => {
	const foundMap = useFoundMap();

	const headerText = (type: ThemeTypes) => {
		return `${type}/${THEME_TYPES_TEXT[type || 'other']}`;
	};

	return () => (
		<>
			<div class="found-color-list">
				<ul>
					{Object.entries(foundMap.value).map(([type, list]) => {
						return (
							<nav class={type}>
								<div>{headerText(type as ThemeTypes)}</div>

								{[...list].map((payload) => (
									<FoudItem payload={payload} key={payload.name}></FoudItem>
								))}
							</nav>
						);
					})}
				</ul>
			</div>
		</>
	);
});
