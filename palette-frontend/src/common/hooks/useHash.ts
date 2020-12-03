import { useEventListener } from '@13enbi/vhooks';

import { customRef } from 'vue';

const useHash = () => {
	let hash = location.hash.slice(1);

	return customRef((track, trigger) => {
		useEventListener('hashchange', () => {
			trigger();
			hash = location.hash.slice(1);
		});

		return {
			get() {
				track();
				return hash;
			},
			set(newval: string) {
				trigger();
				location.hash = hash = newval;
			},
		};
	});
};

export default useHash;
