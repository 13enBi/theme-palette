import { getCurrentInstance } from 'vue';
import { HOST_PROVIDERS, HOST_INSTANCE_MAP, PROVIDER_SYMBOL, PROVIDER_CONSTRUCTOR } from './constants';
import { Constructor, error, hasOwn, Infer, Provider } from './helper';

type ScopeToken = {
	[HOST_PROVIDERS]?: ScopeProvides;
	[HOST_INSTANCE_MAP]?: ScopeInstancesMap;
};
type Scope = ScopeToken & Record<any, any>;

export const getScope = (cover = true): Scope => {
	//instance.provides is internal
	const instance: any = getCurrentInstance();
	if (!instance) error('should inside setup()');

	const scope = instance.provides;
	const parent = instance.parent && instance.parent.provides;

	/**
	 * 子组件provides默认会和父组件provides
	 * 同一引用
	 */
	return cover && parent === scope ? (instance.provides = Object.create(parent)) : scope;
};

export const defineProviderToken = (provider: Provider) => {
	provider[PROVIDER_SYMBOL] = Symbol(provider.name);
	return provider;
};

export const reflectProviderToken = (provider: Provider): symbol => {
	const token = provider[PROVIDER_SYMBOL];
	if (!token) error(`${provider.name} without provide `);

	return token!;
};

export const reflectIsConstructor = (provider: Provider): provider is Constructor => {
	return !!provider[PROVIDER_CONSTRUCTOR];
};

type ScopeProvides = Set<Provider>;

export const defineScopeProviders = (providers: Provider[]): ScopeProvides => {
	const scope = getScope();

	const scopeProviders = reflectScopeProviders(scope);

	//will cover proto
	return (scope[HOST_PROVIDERS] = new Set([...scopeProviders, ...providers]));
};

export const reflectScopeProviders = (scope = getScope()): ScopeProvides => scope[HOST_PROVIDERS] || new Set();

type ScopeInstancesMap = Map<Provider, Infer<Provider>>;

const initInstance = (provider: Provider) => (reflectIsConstructor(provider) ? new provider() : provider());

const getScopeInstanceMap = (scope: Scope) => {
	const mapper: ScopeInstancesMap = scope[HOST_INSTANCE_MAP] || new Map();

	return hasOwn(scope, HOST_INSTANCE_MAP) ? mapper : new Map([...mapper]);
};

export const defineScopeInstance = <P extends Provider>(provider: P): Infer<P> => {
	const scope = getScope();

	const instance = initInstance(provider);

	/**
	 * 获取mapper应该在实例化之后
	 * 因为injector是在实例化过程中注入
	 */
	const mapper: ScopeInstancesMap = getScopeInstanceMap(scope);

	const token: any = reflectProviderToken(provider);
	//will cover proto
	scope[token] = instance;
	scope[HOST_INSTANCE_MAP] = mapper.set(provider, instance);

	return instance;
};

export const reflectIScopenstance = <P extends Provider>(provider: P, scope = getScope()): Infer<P> | undefined => {
	const mapper: ScopeInstancesMap | undefined = scope[HOST_INSTANCE_MAP];

	return mapper?.get(provider);
};

export const initProvider = <P extends Provider>(provider: P) => {
	const has = reflectScopeProviders().has(provider);
	if (!has) error(`${provider.name} without provide`);

	return reflectIScopenstance<P>(provider) || defineScopeInstance<P>(provider);
};
