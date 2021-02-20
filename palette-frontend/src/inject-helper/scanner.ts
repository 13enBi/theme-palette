import { getCurrentInstance } from 'vue';
import { isFunction } from '../common/utils';
import { INJECTOR_SYMBOL, HOST_PROVIDERS, HOST_INSTANCE_MAP, PROVIDER_SYMBOL } from './constants';
import { Constructor, error, hasOwn } from './helper';

type Scope = Record<symbol | string, any>;

export const getScope = (instance: any = getCurrentInstance()): Scope => {
	//instance.provides is internal
	if (!instance) error('should  inside setup()');

	const scope = instance.provides;
	const parent = instance.parent && instance.parent.provides;

	return parent === scope ? (instance.provides = Object.create(parent)) : scope;
};

export const defineProviderToken = (service: Function) => {
	const token = Symbol(service.name);
	Reflect.defineMetadata(PROVIDER_SYMBOL, token, service.prototype);
};

export const reflectProviderToken = (service: Function) => {
	const token = Reflect.getMetadata(PROVIDER_SYMBOL, service.prototype);
	if (!token) error(`${service.name} token `);

	return token;
};

export function reflectInjector<T extends Object>(target: T): Constructor[] | undefined;
export function reflectInjector<T extends Constructor>(service: T): Constructor[] | undefined;
export function reflectInjector(arg: unknown) {
	const target = isFunction(arg) ? (arg as Constructor).prototype : (arg as Object);

	return Reflect.getMetadata(INJECTOR_SYMBOL, target);
}

export const defineInjector = <T extends Object>(target: T, service: Constructor) => {
	const injectors = reflectInjector(target) || [];

	injectors.push(service);

	Reflect.defineMetadata(INJECTOR_SYMBOL, injectors, target);
};

type ScopeProvides = Set<Constructor>;

export const defineScopeProviders = (providers: Constructor[]) => {
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

type ScopeInstancesMap<T = Record<PropertyKey, any>> = Map<Constructor, T>;

const getScopeInstanceMap = (scope: Scope) => {
	const mapper: ScopeInstancesMap = Reflect.get(scope, HOST_INSTANCE_MAP) || new Map();

	return hasOwn(scope, HOST_INSTANCE_MAP) ? mapper : new Map(mapper.entries());
};

export const defineInstanceMap = <P extends Constructor>(provider: P) => {
	const scope = getScope();

	const mapper: ScopeInstancesMap = getScopeInstanceMap(scope);

	const instance = new provider();

	//will cover proto
	Reflect.set(scope, HOST_INSTANCE_MAP, mapper.set(provider, instance));
	Reflect.set(scope, reflectProviderToken(provider), instance);
};

export const reflectInstanceMap = (provider: Constructor, scope = getScope()) => {
	const mapper: ScopeInstancesMap | undefined = Reflect.get(scope, HOST_INSTANCE_MAP);

	return mapper?.get(provider);
};
