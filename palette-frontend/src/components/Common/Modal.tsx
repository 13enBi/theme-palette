import { defineComponent, ref } from 'vue';
import PlusOutlined from '@ant-design/icons-vue/PlusOutlined';
import { Modal as AntdModal } from 'ant-design-vue';
import './style/New.less';
import { useBoolean } from '@13enbi/vhooks';
export default () => {
	const [visible, toggle] = useBoolean(false);
	const show = () => toggle(true),
		hide = () => toggle(false);

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
