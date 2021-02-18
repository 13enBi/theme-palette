import { getCurrentInstance, inject, provide } from 'vue';
import { PROVIDER_SYMBOL } from './constants';
import { Constructor, Infer } from './helper';

const getToken = <T extends Constructor>(service: T) => {
	const token = Reflect.getMetadata(PROVIDER_SYMBOL, service.prototype);
	if (!token) throw new Error('token');

	return token;
};

export const provideService = (...ctors: Constructor[]) => {
	ctors.forEach((service) => provide(getToken(service), new service()));
};

export const injectService = <T extends Constructor>(service: T): Infer<T> => {
	const instance = getCurrentInstance();
	if (!instance) throw new Error('instance');

	const token = getToken(service);
	const provides = (instance as any).provides;

	const val = provides[token] || inject<any>(token);
	if (!val) throw new Error('without provide');

	return val;
};
