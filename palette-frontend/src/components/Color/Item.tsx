import './style/Item.less';
import { defineComponent, PropType, toRef, Ref, toRefs } from 'vue';
import { ParseItem } from '../../common/utils';
import { ref, computed } from 'vue';
import useColorStyle from '../../common/hooks/useColorStyle';
import { FoundPayLoad, useFoundUpdate } from '../../common/hooks/useFoundMap';
import Uses from './Uses';
import { injectService } from '../../inject-helper';
import { FoundService } from '../../Found/foud.service';

const useFoundAction = (item: Ref<ParseItem>, { el, isFind }: { el: Ref<HTMLElement>; isFind: Ref<boolean> }) => {
	const payload = computed<FoundPayLoad>(() => {
		const { uses, name, type, color } = item.value;

		return {
			uses,
			name,
			type,
			color,

			isFind: isFind.value,
			el: el.value,
		};
	});

	useFoundUpdate(payload);
};

const useBgStyle = (item: Ref<ParseItem>) => {
	const bgStyle = useColorStyle(toRef(item.value, 'color')),
		nightBgStyle = useColorStyle(toRef(item.value, 'nightColor'));

	return { bgStyle, nightBgStyle };
};

export default defineComponent({
	props: {
		item: { type: Object as PropType<ParseItem>, required: true },
	},

	setup(props) {
		const { getIsFind } = injectService(FoundService);

		const el = ref();
		const { item } = toRefs(props);
		const isFind = getIsFind(item);
		const { bgStyle, nightBgStyle } = useBgStyle(item);

		useFoundAction(item, { isFind, el });

		return () => {
			const value = item.value;

			return (
				<>
					<li class={{ 'found-color-item': isFind.value, 'color-item': true }} ref={el}>
						<div class="color-item-wrap" style={bgStyle.value}>
							<span class="color-item-name">{value.name}</span>
							<span class="color-item-value">{value.color}</span>
						</div>

						<Uses uses={value.uses} type={value.type} name={value.name} />

						{value.nightColor ? (
							<div class="color-item-wrap two" style={nightBgStyle.value}>
								<span class="color-item-name">{value.name}(黑板)</span>
								<span class="color-item-value">{value.nightColor}</span>
							</div>
						) : (
							<div class="color-item-wrap"></div>
						)}
					</li>
				</>
			);
		};
	},
});
