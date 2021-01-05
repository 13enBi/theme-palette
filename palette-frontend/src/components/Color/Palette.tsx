import { ThemeTypes } from '../../config';
import { defineComponent, computed, PropType } from 'vue';
import { ParsePalette } from '../../common/utils/css-parse';
import { headerText } from '../../common/utils';
import Item from './Item';

export default defineComponent({
	props: {
		type: { type: String as PropType<ThemeTypes>, default: 'other' },
		palette: { type: Object as PropType<ParsePalette>, requied: true, default: () => ({}) },
	},
	setup: (props) => {
		const header = computed(() => headerText(props.type));

		return () => (
			<>
				<div class="color-palette">
					<header>{header.value}</header>
					<main>
						<ul>
							{Object.values(props.palette || {}).map((item) => {
								return (
									<>
										<Item key={item.name} item={item}></Item>
									</>
								);
							})}
						</ul>
					</main>
				</div>
			</>
		);
	},
});
