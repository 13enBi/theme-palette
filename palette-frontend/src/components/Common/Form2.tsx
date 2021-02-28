import { defineComponent, reactive } from 'vue';
import { ElForm, ElFormItem, ElInput, ElRadio, ElRadioGroup, ElColorPicker } from 'element-plus';
import { THEMES, THEME_TYPES } from '../../config';

enum FormLabel {
	type = '主题类型',
	name = '颜色名',
	color = '颜色值',
	nightColor = '黑板颜色值',
}

export default defineComponent({
	setup() {
		const form = reactive({ type: THEME_TYPES[0], name: '', color: '', nightColor: '' });

		return () => (
			<ElForm model={form} inline={true}>
				<ElFormItem label={FormLabel.type}>
					<ElRadioGroup v-model={form.type}>
						{THEMES.map((type) => {
							return <ElRadio label={type}>{type}</ElRadio>;
						})}
					</ElRadioGroup>
				</ElFormItem>

				<ElFormItem label={FormLabel.name}>
					<ElInput v-model={form.name} size="middle"></ElInput>
				</ElFormItem>

				<ElFormItem label={FormLabel.color}>
					<ElColorPicker v-model={form.color}></ElColorPicker>
				</ElFormItem>

				<ElFormItem label={FormLabel.nightColor}>
					<ElColorPicker v-model={form.nightColor}></ElColorPicker>
				</ElFormItem>
			</ElForm>
		);
	},
});
