import { defineComponent, PropType, computed } from 'vue';
import { scrollInView } from '../../common/utils';
import { ThemeTypes, THEME_TYPES_TEXT } from '../../config';
import useColorStyle from '../../common/hooks/useColorStyle';
import './style/FoundList.less';
import useFoundMap, { FoundPayLoad } from '../../common/hooks/useFoundMap';

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
					{Object.entries(foundMap).map(([type, list]) => {
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
