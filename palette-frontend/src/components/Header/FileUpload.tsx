import { ref, defineComponent } from 'vue';
import { fileListReader } from '../../common/utils';
import { useMutations } from '@13enbi/vhooks';
import { Button } from 'ant-design-vue';
import './style/FileUpload.less';

export default defineComponent(() => {
	const fileRef = ref<null | HTMLInputElement>(null);
	const { setNowThemeByFile, uploadTheme } = useMutations(['setNowThemeByFile', 'uploadTheme']);

	const handleUpload = () => {
		fileRef.value?.click();
	};

	const handleFileChane = async (e: Event) => {
		const files = (e.target as HTMLInputElement).files;
		if (!files || files.length === 0) return;

		const file = await fileListReader(files);

		uploadTheme(file);
	};

	return () => (
		<>
			<div class="fileupload">
				<input type="file" accept=".less, .css" multiple ref="fileRef" onChange={handleFileChane} />
				<Button type="primary" onClick={handleUpload}>
					上传Less
				</Button>
			</div>
		</>
	);
});
