import { ref, defineComponent } from 'vue';
import { fileListReader, FileResult } from '../../common/utils';
import { useMutations } from '@13enbi/vhooks';
import { Button, Modal } from 'ant-design-vue';
import './style/FileUpload.less';

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

const useThemeAction = () => {
	const { setNowTheme, uploadTheme } = useMutations(['setNowTheme', 'uploadTheme']);

	return (file: FileResult, upload = false) => (upload ? uploadTheme(file) : setNowTheme(file));
};

export default defineComponent(() => {
	const key = ref(0);
	const fileRef = ref<null | HTMLInputElement>(null);

	const setTheme = useThemeAction();

	const resetInputFile = () => key.value++;

	const handleUpload = async () => {
		fileRef.value?.click();
	};

	const handleFileChange = async (e: Event) => {
		const files = (e.target as HTMLInputElement).files;
		if (!files || files.length === 0) return;

		const file = await fileListReader(files);

		resetInputFile();

		setTheme(file, await useConfirm());
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
