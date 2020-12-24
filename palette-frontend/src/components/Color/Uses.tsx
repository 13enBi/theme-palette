import { defineComponent, PropType } from 'vue';
import { UsesTypes, ThemeTypes } from '../../config';
import { clipboardWrite } from '../../common/utils';
import { message, Button } from 'ant-design-vue';

export default defineComponent({
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
