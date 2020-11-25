import { useEventListener } from '@13enbi/vhooks';
import { customRef } from 'vue';

const useHash = (defaultVal: string) => {
	let hash = location.hash || ((location.hash = defaultVal), defaultVal);

	return customRef((track, trigger) => {
		useEventListener('hashchange', () => {
			trigger();
			hash = location.hash;
		});

		return {
			get() {
				track();
				return hash;
			},
			set(newval: string) {
				trigger();
				location.hash = hash = newval || defaultVal;
			},
		};
	});
};

export default useHash;
