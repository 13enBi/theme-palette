import { defineComponent, ref, reactive, toRaw } from 'vue';
import PlusOutlined from '@ant-design/icons-vue/PlusOutlined';
import { Form as AntdForm, Input, Modal as AntdModal, Radio, Tag } from 'ant-design-vue';
import { useForm as useAntdForm } from '@ant-design-vue/use';
import { THEME_TYPES } from '../../config';
import { validateColor } from '../../common/utils';
import { merge, ThemeForm } from '../../common/utils/css-parse';
import { useMutations, useState } from '@13enbi/vhooks';

type FormKey = keyof ThemeForm;

const formLabel: Record<FormKey, string> = {
	type: '主题类型',
	name: '颜色名',
	color: '颜色值',
	nightColor: '黑板颜色值',
};

const validator = (_: never, val: string) => {
	return validateColor(val) ? Promise.resolve() : Promise.reject('illegal color value');
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

const flexStyle = {
	display: 'inline-flex',
	alignItems: 'center',
	gap: '10px',
};

const useForm = () => {
	const form = reactive<ThemeForm>({ type: THEME_TYPES[0], name: '', color: '', nightColor: '' });

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
						<div style={flexStyle}>
							<input type="color" value={form.color} onInput={handleInput('color', true)} />
							<Tag color={form.color}>{form.color}</Tag>
						</div>
					</AntdForm.Item>

					<AntdForm.Item label={formLabel.nightColor} {...validateInfos.nightColor}>
						<div style={flexStyle}>
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

const useModal = () => {
	const visible = ref(false);
	const show = () => {
			visible.value = true;
		},
		hide = () => {
			visible.value = false;
		};

	const Modal = defineComponent((_, { slots, emit }) => {
		return () => (
			<>
				<div class="color-palette-add" onClick={show}>
					<span>
						新增 <PlusOutlined />
					</span>
				</div>
				<AntdModal title="新建颜色" visible={visible.value} onOk={() => emit('ok')} onCancel={hide}>
					{slots.default?.()}
				</AntdModal>
			</>
		);
	});

	return {
		Modal,
		show,
		hide,
	};
};

export default defineComponent(() => {
	const { Modal, hide } = useModal();
	const { Form, submit } = useForm();
	const { theme } = useState({ theme: 'nowTheme' });
	const { setNowTheme } = useMutations(['setNowTheme']);

	const handleOk = async () => {
		const form = await submit();
		const result = merge(form, theme.value);
		hide();
		setNowTheme(result);
	};

	return () => (
		<>
			<Modal onOk={handleOk}>
				<Form></Form>
			</Modal>
		</>
	);
});
