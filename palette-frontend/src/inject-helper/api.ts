import { Infer, Provider } from './helper';
import { defineScopeProviders, getScope, initProvider, reflectProviderToken, defineProviderToken } from './scanner';

export const provideService = (...providers: Provider[]) => {
	defineScopeProviders(providers);
	return providers.map(defineProviderToken).map(initProvider);
};

export const injectService = <T extends Provider>(service: T): Infer<T> => {
	const token = reflectProviderToken(service);
	const scope = getScope(false);

	return scope[token as any] || initProvider(service);
};
