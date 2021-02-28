import { defineComponent, reactive } from 'vue';
import { ElForm, ElFormItem, ElRadio } from 'element-plus';
import { THEME_TYPES } from '../config';

export class ThemeFormService {
	protected _form = reactive({ type: THEME_TYPES[0], name: '', color: '', nightColor: '' });

	component = defineComponent({
		setup: () => {
			const t = this;

			return () => (
				<>
					<ElForm></ElForm>
				</>
			);
		},
	});
}

export default defineComponent({
	setup() {
		const form = reactive({ type: THEME_TYPES[0], name: '', color: '', nightColor: '' });

		return () => (
			<ElForm>
				<ElFormItem>
					<ElRadio></ElRadio>
				</ElFormItem>
			</ElForm>
		);
	},
});
