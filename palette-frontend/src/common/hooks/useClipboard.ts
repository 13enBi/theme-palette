import { onUnmounted, Ref, ref, unref } from 'vue';
import { clipboardRead } from '../utils';

export default (defaultVal: string | Ref<string> = '') => {
	const copyValue = ref(unref(defaultVal));

	const handleClipRead = async () => {
		copyValue.value = (await clipboardRead()) || unref(defaultVal);
	};

	handleClipRead();
	window.addEventListener('focus', handleClipRead);

	onUnmounted(() => {
		window.removeEventListener('focus', handleClipRead);
	});

	return copyValue;
};
