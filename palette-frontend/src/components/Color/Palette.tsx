import { THEME_TYPES_TEXT, ThemeTypes } from '../../config';
import { defineComponent, computed, Teleport, PropType } from 'vue';
import { ParsePalette } from '../../common/utils/css-parse';
import Item from './Itme.vue';

const props = {
	type: { type: String as PropType<ThemeTypes>, default: 'other' },
	palette: { type: Object as PropType<ParsePalette>, requied: true, default: () => ({}) },
};

export default defineComponent({
	props,
	setup: (props) => {
		const headerText = computed(() => {
			return `${props.type}/${THEME_TYPES_TEXT[props.type || 'other']}`;
		});

		return () => (
			<>
				<div class="color-palette">
					<header>{{ headerText }}</header>
					<main>
						<ul>
							{Object.values(props.palette || {}).map((item) => {
								return (
									<>
										<Item key={item.name} colorItem={item}></Item>
									</>
								);
							})}
						</ul>
					</main>
				</div>

				<Teleport to=".found-color-list ul">
					<nav class={props.type}>
						<div>{headerText.value}</div>
					</nav>
				</Teleport>
			</>
		);
	},
});
