import { getCurrentInstance } from 'vue';
import { HOST_PROVIDERS, HOST_INSTANCE_MAP, PROVIDER_SYMBOL, PROVIDER_CONSTRUCTOR } from './constants';
import { Constructor, error, hasOwn, Provider } from './helper';

type Scope = Record<symbol | string, any>;

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
	Reflect.set(provider, PROVIDER_SYMBOL, Symbol(provider.name));
};

export const reflectProviderToken = (provider: Provider) => {
	const token = Reflect.get(provider, PROVIDER_SYMBOL);
	if (!token) error(`${provider.name} without provide `);

	return token;
};

export const reflectIsConstructor = (provider: Provider): provider is Constructor => {
	return Reflect.get(provider, PROVIDER_CONSTRUCTOR);
};

type ScopeProvides = Set<Provider>;

export const defineScopeProviders = (providers: Provider[]) => {
	const scope = getScope();

	const scopeProviders = reflectScopeProviders(scope);

	//will cover proto
	Reflect.set(scope, HOST_PROVIDERS, new Set([...scopeProviders, ...providers]));
};

export const reflectScopeProviders = (scope = getScope()): ScopeProvides => {
	// ts 不支持Symbol为索引
	//scope[HOST_PROVIDERS]
	return Reflect.get(scope, HOST_PROVIDERS) || new Set();
};

type ScopeInstancesMap<T = Record<PropertyKey, any>> = Map<Provider, T>;

const initInstance = (provider: Provider) => (reflectIsConstructor(provider) ? new provider() : provider());

const getScopeInstanceMap = (scope: Scope) => {
	const mapper: ScopeInstancesMap = Reflect.get(scope, HOST_INSTANCE_MAP) || new Map();

	return hasOwn(scope, HOST_INSTANCE_MAP) ? mapper : new Map([...mapper]);
};

export const defineScopeInstance = <P extends Provider>(provider: P) => {
	const scope = getScope();

	const instance = initInstance(provider);

	/**
	 * 获取mapper应该在实例化之后
	 * 因为injector是在实例化过程中注入
	 */
	const mapper: ScopeInstancesMap = getScopeInstanceMap(scope);

	//will cover proto
	Reflect.set(scope, HOST_INSTANCE_MAP, mapper.set(provider, instance));
	Reflect.set(scope, reflectProviderToken(provider), instance);

	return instance;
};

export const reflectIScopenstance = (provider: Provider, scope = getScope()) => {
	const mapper: ScopeInstancesMap | undefined = Reflect.get(scope, HOST_INSTANCE_MAP);

	return mapper?.get(provider);
};

export const initProvider = (provider: Provider) => {
	const scopeProviders = reflectScopeProviders();

	const has = (injector: Provider) => scopeProviders.has(injector);
	if (!has(provider)) error(`${provider.name} without provide`);

	return reflectIScopenstance(provider) || defineScopeInstance(provider);
};
