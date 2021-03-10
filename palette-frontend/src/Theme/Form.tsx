import { defineComponent, reactive, ref, toRaw, watch } from 'vue';
import { ElForm, ElFormItem, ElInput, ElRadio, ElRadioGroup, ElColorPicker, ElButton, ElDialog } from 'element-plus';
import { THEMES, THEME_TYPES } from '../config';
import { validateColor } from '../common/utils';

enum FormLabel {
	type = '主题类型',
	name = '颜色名',
	color = '颜色值',
	nightColor = '黑板颜色值',
}

export type FormType = {
	type: string;
	name: string;
	color: string;
	nightColor: string;
};

const validator = async (_: never, val: string) => {
	if (!validateColor(val)) throw 'illegal color value';
};

const rules = {
	type: [
		{
			required: true,
			message: 'Please input type',
		},
	],
	name: [
		{
			required: true,
			message: 'Please input color name',
		},
		{
			pattern: /^(\w|-)+$/,
			message: 'illegal name, 字母数字中划线',
		},
	],
	color: [
		{
			required: true,
			message: 'Please input color value',
		},
		{
			validator,
			trigger: 'change',
		},
	],

	nightColor: [
		{
			required: true,
			message: 'Please input night color value',
		},
		{
			validator,
			trigger: 'change',
		},
	],
};

const initForm = (): FormType => ({ type: THEME_TYPES[0], name: '', color: '', nightColor: '' });

export default defineComponent({
	props: { visible: Boolean },

	emits: ['close', 'submit'],

	setup(props, { emit }) {
		const formRef = ref();
		const form = reactive(initForm());
		const visible = ref(props.visible);

		watch(props, ({ visible: val }) => {
			visible.value = val;
		});

		const resetForm = () => Object.assign(form, initForm());

		const handleSubmit = () => {
			return formRef.value
				?.validate()
				.then(() => {
					emit('submit', { ...toRaw(form) });
					resetForm();
				})
				.catch(() => {});
		};

		return () => (
			<ElDialog vModel={visible.value} width="500px" lock-scroll={false} onClose={() => emit('close')}>
				<ElForm model={form} labelPosition="left" rules={rules} ref={formRef}>
					<ElFormItem label={FormLabel.type} prop="type" required>
						<ElRadioGroup v-model={form.type}>
							{THEMES.map((type) => {
								return <ElRadio label={type}>{type}</ElRadio>;
							})}
						</ElRadioGroup>
					</ElFormItem>

					<ElFormItem label={FormLabel.name} prop="name" required>
						<ElInput v-model={form.name}></ElInput>
					</ElFormItem>

					<ElFormItem label={FormLabel.color} prop="color" required>
						<ElColorPicker v-model={form.color}></ElColorPicker>
					</ElFormItem>

					<ElFormItem label={FormLabel.nightColor} prop="nightColor" required>
						<ElColorPicker v-model={form.nightColor}></ElColorPicker>
					</ElFormItem>

					<ElFormItem>
						<ElButton type="primary" onClick={handleSubmit}>
							立即创建
						</ElButton>
						<ElButton onClick={() => (visible.value = false)}>取消</ElButton>
					</ElFormItem>
				</ElForm>
			</ElDialog>
		);
	},
});
