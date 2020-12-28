import { defineComponent, PropType, toRef, watch, Ref, onMounted, toRefs, reactive } from 'vue';
import { ParseItem } from '../../common/utils';
import { ref, computed } from 'vue';
import { useState } from '@13enbi/vhooks';
import './style/Item.less';
import useColorStyle from '../../common/hooks/useColorStyle';
import { FoundPayLoad, useFoundUpdate } from '../../common/hooks/useFoundMap';
import Uses from './Uses';

const useFoundAction = (item: Ref<ParseItem>, { el, isFind }: { el: Ref<HTMLElement>; isFind: Ref<boolean> }) => {
	const payload = computed<FoundPayLoad>(() => {
		const { uses, name, type, color } = item.value;

		//use reactive to unwrap ref
		return reactive({
			uses,
			name,
			type,
			color,

			isFind,
			el,
		});
	});

	useFoundUpdate(payload);
};

const useIsFind = (item: Ref<ParseItem>) => {
	const { searchWord } = useState(['searchWord']);

	const isFind = computed(() => {
		const { source } = item.value,
			word = searchWord.value;

		if (word === '') return false;

		return source?.toLowerCase().includes(word?.toLowerCase());
	});

	return isFind;
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
		const { item } = toRefs(props);

		const isFind = useIsFind(item);
		const { bgStyle, nightBgStyle } = useBgStyle(item);

		const el = ref();

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
