import { inject, provide } from 'vue';
import { Constructor, error, Infer } from './helper';
import {
	defineHostProviders,
	getHost,
	reflectAutoWired,
	reflectHostProviders,
	reflectProviderInstances,
	reflectProviderToken,
	defineProviderInstances,
} from './scanner';

const initProvider = (provider: Constructor) => {
	const hostProviders = reflectHostProviders();

	const isIn = (dep: Constructor) => hostProviders.includes(dep);

	reflectAutoWired(provider)?.filter(isIn).forEach(initProvider);

	if (!reflectProviderInstances(provider)) {
		defineProviderInstances(provider);
	}
};

export const provideService = (...providers: Constructor[]) => {
	defineHostProviders(providers);
	providers.forEach(initProvider);
};

export const injectService = <T extends Constructor>(service: T): Infer<T> => {
	const token = reflectProviderToken(service);
	const host = getHost();

	const val = host[token] || inject<any>(token);
	if (!val) error('without provide');

	return val;
};
