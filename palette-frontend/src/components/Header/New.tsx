import { defineComponent } from 'vue';
import { merge } from '../../common/utils/css-parse';
import { useMutations, useState } from '@13enbi/vhooks';
import useForm from '../Common/Form';
import useModal from '../Common/Modal';
import './style/New.less';

export default defineComponent(() => {
	const { Modal, hide } = useModal();
	const { Form, submit } = useForm();
	const { now } = useState(['now']);

	const handleOk = async () => {
		const form = await submit();
		merge(form, now.value);
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
