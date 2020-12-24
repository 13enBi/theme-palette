import { computed, Ref } from 'vue';
import { isMoreThanDDD } from '../utils';

export default (colorRef: Ref<string | undefined>) =>
	computed(() => {
		const color = colorRef.value;
		if (!color) {
			return {};
		}
		return {
			backgroundColor: color,
			color: isMoreThanDDD(color) ? '#000' : '#fff',
		};
	});
