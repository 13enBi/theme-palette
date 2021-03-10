import './style/FileUpload.less';
import { ref, defineComponent } from 'vue';
import { ElButton, ElMessageBox } from 'element-plus';
import injectThemeService from '../../Theme/theme.service';

const useConfirm = (): Promise<boolean> => {
	return ElMessageBox.confirm('是否上传此样式文件？').then(({ action }) => action == 'confirm');
};

export default defineComponent(() => {
	const { upload } = injectThemeService();

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
				<ElButton type="primary" onClick={handleUpload}>
					上传Less
				</ElButton>
			</div>
		</>
	);
});
