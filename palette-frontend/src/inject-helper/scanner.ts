import { getCurrentInstance } from 'vue';
import { isFunction } from '../common/utils';
import { AUTO_WIRED_SYMBOL, HOST_PROVIDERS, HOST_PROVIDERS_INSTANCES, PROVIDER_SYMBOL } from './constants';
import { Constructor, error } from './helper';

type HostProvides = Record<symbol | string, any>;

export const getHost = (instance = getCurrentInstance()): HostProvides => {
	if (!instance) error('not inside setup()');

	return (instance as any).provides;
};

export const reflectProviderToken = (service: Constructor) => {
	const token = Reflect.getMetadata(PROVIDER_SYMBOL, service.prototype);
	if (!token) error('token');

	return token;
};

export function reflectAutoWired<T extends Object>(target: T): Constructor[] | undefined;
export function reflectAutoWired<T extends Constructor>(service: T): Constructor[] | undefined;
export function reflectAutoWired(arg: unknown) {
	const target = isFunction(arg) ? (arg as Constructor).prototype : (arg as Object);

	return Reflect.getMetadata(AUTO_WIRED_SYMBOL, target);
}

export const defineAutoWired = <T extends Object>(target: T, service: Constructor) => {
	const deps = reflectAutoWired(target) || [];

	deps.push(service);

	Reflect.defineMetadata(AUTO_WIRED_SYMBOL, deps, target);
};

export const defineHostProviders = (providers: Constructor[]) => {
	const host = getHost();

	const hostProviders = reflectHostProviders(host);
	Reflect.set(host, HOST_PROVIDERS, hostProviders.concat(providers));
};

export const reflectHostProviders = (host = getHost()): Constructor[] => {
	// ts 不支持Symbol为索引
	//host[HOST_PROVIDERS]
	return Reflect.get(host, HOST_PROVIDERS) || [];
};

type HostInstances<T = Record<PropertyKey, any>> = WeakMap<Constructor, T>;

export const defineProviderInstances = <P extends Constructor>(provider: P) => {
	const host = getHost();

	const instances: HostInstances = Reflect.get(host, HOST_PROVIDERS_INSTANCES) || new WeakMap();

	const instance = new provider();

	Reflect.set(host, HOST_PROVIDERS_INSTANCES, instances.set(provider, instance));
	Reflect.set(host, reflectProviderToken(provider), instance);
};

export const reflectProviderInstances = (provider: Constructor, host = getHost()) => {
	const instances = Reflect.get(host, HOST_PROVIDERS_INSTANCES) as HostInstances | undefined;

	return instances?.get(provider);
};
