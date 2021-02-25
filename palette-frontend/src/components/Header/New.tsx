import { defineComponent } from 'vue';
import useForm from '../Common/Form';
import useModal from '../Common/Modal';
import './style/New.less';
import { injectService } from 'vue-injector';
import { ThemeService } from '../../Theme/theme.service';

export default defineComponent(() => {
	const { Modal, hide } = useModal();
	const { Form, submit } = useForm();
	const { mergeTheme } = injectService(ThemeService);

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
