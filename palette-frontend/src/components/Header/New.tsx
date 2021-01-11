import { defineComponent } from 'vue';
import { useMutations } from '@13enbi/vhooks';
import useForm from '../Common/Form';
import useModal from '../Common/Modal';
import './style/New.less';

export default defineComponent(() => {
	const { Modal, hide } = useModal();
	const { Form, submit } = useForm();
	const { mergeTheme } = useMutations(['mergeTheme']);

	const handleOk = async () => {
		const form = await submit();
		mergeTheme(form);
		hide();
	};

	return () => (
		<>
			<Modal onOk={handleOk}>
				<Form></Form>
			</Modal>
		</>
	);
});
