import { useEventListener } from '@13enbi/vhooks';

import { customRef } from 'vue';

const getHash = () => location.hash.slice(1);

const useHash = () => {
	let hash = getHash();

	return customRef((track, trigger) => {
		useEventListener('hashchange', () => {
			trigger();
			hash = getHash();
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
