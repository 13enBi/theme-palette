import { defineComponent, PropType } from 'vue';
import { UsesTypes, ThemeTypes } from '../../config';
import { clipboardWrite } from '../../common/utils';
import { ElMessage as  message, ElButton } from 'element-plus';

export default defineComponent({
	props: {
		uses: {type:Set as PropType<Set<UsesTypes>>, required: true},
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
						[...props.uses].map((use) => (
							<ElButton key={use} onClick={() => handleCopy(use)}>
								{use}
							</ElButton>
						))}
				</div>
			</>
		);
	},
});
