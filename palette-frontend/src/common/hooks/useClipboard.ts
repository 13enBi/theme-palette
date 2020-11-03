import { onMounted, Ref, onUnmounted } from 'vue';
import { clipboardRead } from '../utils';

export default function useClipboard(copyValue: Ref<string>, cb?: Function) {
	const handleClipRead = async () => {
		copyValue.value = await clipboardRead();
		cb?.();
	};

	onMounted(() => {
		window.addEventListener('focus', handleClipRead);
	});

	onUnmounted(() => {
		window.removeEventListener('focus', handleClipRead);
	});
}
