import { defineComponent, PropType, toRef, watch, Ref, onMounted } from 'vue';
import { clipboardWrite, ParseItem } from '../../common/utils';
import { ref, computed } from 'vue';
import { useEventHub, useState } from '@13enbi/vhooks';
import { ThemeTypes, UsesTypes } from '@/config';
import { message, Button } from 'ant-design-vue';
import './style/Item.less';
import { useColorStyle } from '../../common/hooks';
import { FoundPayLoad, FOUND_EVENT } from '../Header/FoundList';

const Uses = defineComponent({
	props: {
		uses: Set as PropType<Set<UsesTypes>>,
		type: { type: String as PropType<ThemeTypes>, default: 'other' },
		name: { type: String, default: '' },
	},
	setup(props) {
		const handleCopy = (use: string) => {
			const str = [props.type, use, props.name].reduce((total, curr) => (curr ? (total += `-${curr}`) : total));

			clipboardWrite(str);

			message.success(`copied： ${str} !`);
		};

		return () => (
			<>
				<div class="class-btn">
					{props.uses &&
						[...props.uses].map((use) => {
							return (
								<Button key={use} onClick={() => handleCopy(use)}>
									{use}
								</Button>
							);
						})}
				</div>
			</>
		);
	},
});

const useFoundAction = (isFound: Ref<boolean>, payload: Ref<FoundPayLoad>) => {
	const { emit } = useEventHub();

	watch(isFound, (find) => {
		if (find) {
			emit(FOUND_EVENT.ADD, payload.value);
		} else {
			emit(FOUND_EVENT.DELETE, payload.value);
		}
	});
};

export default defineComponent({
	props: {
		item: { type: Object as PropType<ParseItem>, required: true },
	},

	setup(props) {
		const { searchWord } = useState(['searchWord']);

		const colorItemRef = ref();

		const bgStyle = useColorStyle(toRef(props.item, 'color')),
			nightBgStyle = useColorStyle(toRef(props.item, 'nightColor'));

		const isFound = computed(() => {
			const { source } = props.item,
				word = searchWord.value;

			if (word === '') return false;

			return source?.toLowerCase().includes(word?.toLowerCase());
		});

		const foundPayload = computed<FoundPayLoad>(() => {
			const { uses, name, type } = props.item;

			return {
				uses,
				name,
				type,
				el: colorItemRef.value,
			};
		});

		onMounted(() => {
			useFoundAction(isFound, foundPayload);
		});

		return () => {
			const item = props.item;

			return (
				<>
					<li class={{ 'found-color-item': isFound.value, 'color-item': true }} ref={colorItemRef}>
						<div class="color-item-wrap" style={bgStyle.value}>
							<span class="color-item-name">{item.name}</span>
							<span class="color-item-value">{item.color}</span>
						</div>

						<Uses uses={item.uses} type={item.type} name={item.name} />

						{item.nightColor ? (
							<div class="color-item-wrap two" style={nightBgStyle.value}>
								<span class="color-item-name">{item.name}(黑板)</span>
								<span class="color-item-value">{item.nightColor}</span>
							</div>
						) : (
							<div class="color-item-wrap"></div>
						)}
					</li>

					{/* <Teleport to={to} disabled={isFound.value}>
						<div
							style={colorStyle(item.color)}
							class="color-item-wrap found"
							onClick={handleInView}
							data-uses={[...item.uses].join('|')}
							data-type={item.type}
							data-name={item.name}
						>
							<span class="color-item-name">{item.name}</span>
							<span class="color-item-value">{item.color}</span>
						</div>
					</Teleport> */}
				</>
			);
		};
	},
});
