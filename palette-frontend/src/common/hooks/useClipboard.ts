import { useEventListener } from '@13enbi/vhooks';
import { Ref, ref, unref } from 'vue';
import { clipboardRead } from '../utils';

export default (defaultVal: string | Ref<string> = '') => {
	const copyValue = ref(unref(defaultVal));

	const handleClipRead = async () => {
		copyValue.value = (await clipboardRead()) || unref(defaultVal);
	};

	useEventListener('focus', handleClipRead, { target: window });

	return copyValue;
};
