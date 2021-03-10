import { useEventHub, useEventListener } from '@13enbi/vhooks';
import { customRef, watch } from 'vue';
import { injectService } from 'vue-injector';

const getHash = () => location.hash.slice(1);

export const hashService = () => {
	let hash = getHash();

	const hashRef = customRef((track, trigger) => {
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
				location.hash = hash = newval;
				trigger();
			},
		};
	});

	type EventType = 'off' | 'on' | 'emit';
	const eventHub = useEventHub();

	const token: any = Symbol('_hash_change_');

	const hander = <T extends EventType>(type: T) => (params: T extends 'emit' ? any : (hash: string) => any) => {
		eventHub[type](token, params);
	};

	const addHashListener = hander('on');
	const removeHashListener = hander('off');
	const emitHash = hander('emit');

	watch(hashRef, (val) => {
		emitHash(val);
	});

	return {
		hash: hashRef,
		addHashListener,
		removeHashListener,
	};
};

export type HashService = ReturnType<typeof hashService>;

export default () => injectService(hashService);
