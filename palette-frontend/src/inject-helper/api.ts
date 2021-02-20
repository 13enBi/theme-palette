import { inject } from 'vue';
import { Constructor, error, Infer } from './helper';
import {
	defineScopeProviders,
	getScope,
	reflectInjector,
	reflectScopeProviders,
	reflectInstanceMap,
	reflectProviderToken,
	defineInstanceMap,
} from './scanner';

const initProvider = (provider: Constructor) => {
	const scopeProviders = reflectScopeProviders();

	const has = (injector: Constructor) => scopeProviders.has(injector);
	reflectInjector(provider)?.filter(has).forEach(initProvider);

	if (!reflectInstanceMap(provider)) {
		defineInstanceMap(provider);
	}
};

export const provideService = (...providers: Constructor[]) => {
	defineScopeProviders(providers);
	providers.forEach(initProvider);
};

export const injectService = <T extends Constructor>(service: T): Infer<T> => {
	const token = reflectProviderToken(service);
	const scope = getScope();

	const val = scope[token] || inject<any>(token);
	if (!val) error(`${service.name} without provide`);

	return val;
};
