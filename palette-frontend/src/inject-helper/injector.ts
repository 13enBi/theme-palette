import { inject, provide } from 'vue';
import { PARAMTYPES_METADATA, PROVIDER_SYMBOL } from './constants';
import { Constructor, Infer } from './helper';

const getToken = <T extends Constructor>(service: T) => {
	const token = Reflect.getMetadata(PROVIDER_SYMBOL, service.prototype);
	if (!token) throw new Error('token');

	return token;
};

export const initService = <T extends Constructor>(target: T): Infer<T> => {
	/**
	 * 吐了🤮，esbuild不提供metadata,直接tsc有metadata
	 * see:https://esbuild.github.io/content-types/#typescript
	 */
	const params = Reflect.getMetadata(PARAMTYPES_METADATA, target) || [];

	return Reflect.construct(target, params.map(initService));
};

export const provideService = <T extends Constructor>(service: T) => {
	provide(getToken(service), initService(service));
};

export const injectService = <T extends Constructor>(service: T): Infer<T> => {
	const val = inject<any>(getToken(service));
	if (!val) throw new Error('without provide');

	return val;
};
