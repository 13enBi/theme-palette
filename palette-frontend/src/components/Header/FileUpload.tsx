import './style/FileUpload.less';
import { ref, defineComponent } from 'vue';
import { Button, Modal } from 'ant-design-vue';
import { injectService } from 'vue-injector';
import { ThemeService } from '../../Theme/theme.service';

const useConfirm = (): Promise<boolean> => {
	return new Promise((resolve) => {
		Modal.confirm({
			content: '是否上传此样式文件？',
			okText: 'YES',
			cancelText: 'NO',
			onOk: () => resolve(true),
			onCancel: () => resolve(false),
		});
	});
};

export default defineComponent(() => {
	const { upload } = injectService(ThemeService);

	const key = ref(0);
	const fileRef = ref<null | HTMLInputElement>(null);

	const resetInputFile = () => key.value++;

	const handleUpload = async () => {
		fileRef.value?.click();
	};

	const handleFileChange = async (e: Event) => {
		const { files } = e.target as HTMLInputElement;
		if (!files || files.length === 0) return;

		resetInputFile();
		upload(files, await useConfirm());
	};

	return () => (
		<>
			<div class="fileupload">
				<input
					type="file"
					key={key.value} // use to reset input:file
					accept=".less, .css"
					multiple
					ref={fileRef}
					onInput={handleFileChange}
				/>
				<Button type="primary" onClick={handleUpload}>
					上传Less
				</Button>
			</div>
		</>
	);
});
