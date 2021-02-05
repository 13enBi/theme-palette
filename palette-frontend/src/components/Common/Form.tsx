import { defineComponent, reactive, toRaw, watch } from 'vue';
import { Form as AntdForm, Input, Radio, Tag } from 'ant-design-vue';
import { useForm as useAntdForm } from '@ant-design-vue/use';
import { THEME_TYPES } from '../../config';
import { validateColor } from '../../common/utils';
import { ThemeForm } from '../../common/utils/css-parse';

type FormKey = keyof ThemeForm;

enum formLabel {
	type = '主题类型',
	name = '颜色名',
	color = '颜色值',
	nightColor = '黑板颜色值',
}

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



export default (param?: ThemeForm) => {
	const initForm = { type: THEME_TYPES[0], name: '', color: '', nightColor: '' };
	const form = reactive<ThemeForm>(param || initForm);

	const handleInput = (key: FormKey, rAF = false) => (e: Event) => {
		const change = () => (form[key] = (e.target as HTMLInputElement)?.value || '');

		//rAF 防止input：color 卡顿
		rAF ? requestAnimationFrame(change) : change();
	};

	const { validate, validateInfos, resetFields: reset } = useAntdForm(form, reactive(rules));

	const submit = async () => {
		return await validate(), toRaw(form);
	};

	const Form = defineComponent(() => {
		return () => (
			<>
				<AntdForm model={form}>
					<AntdForm.Item label="主题类型" {...validateInfos['type']}>
						<Radio.Group name="THEME_TYPES" value={form.type} onChange={handleInput('type')}>
							{Array(4)
								.fill(Radio)
								.map((Radio, i) => (
									<Radio value={THEME_TYPES[i]}>{THEME_TYPES[i]}</Radio>
								))}
						</Radio.Group>
					</AntdForm.Item>

					<AntdForm.Item label={formLabel.name} {...validateInfos.name}>
						<Input value={form.name} onInput={handleInput('name')} placeholder={formLabel.name} />
					</AntdForm.Item>

					<AntdForm.Item label={formLabel.color} {...validateInfos.color}>
						<div class="flex-style">
							<input type="color" value={form.color} onInput={handleInput('color', true)} />
							<Tag color={form.color}>{form.color}</Tag>
						</div>
					</AntdForm.Item>

					<AntdForm.Item label={formLabel.nightColor} {...validateInfos.nightColor}>
						<div class="flex-style">
							<input type="color" value={form.nightColor} onInput={handleInput('nightColor', true)} />
							<Tag color={form.nightColor}>{form.nightColor}</Tag>
						</div>
					</AntdForm.Item>
				</AntdForm>
			</>
		);
	});

	return {
		Form,
		submit,
		reset,
	};
};
