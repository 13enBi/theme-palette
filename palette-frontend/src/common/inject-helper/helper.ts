export * from './methods-bind';
import 'reflect-metadata';
import { inject, provide } from 'vue';

interface Constructor<T extends object = any, A extends any[] = any[]> {
	new (...args: A): T;
}

type Infer<T> = T extends Constructor<infer P> ? P : never;

export const Singleton = (): ClassDecorator => {
	let instance: any = null;

	return (source) =>
		new Proxy(source, {
			construct(target, ...args) {
				if (instance) return instance;
				return (instance = Reflect.construct(target, ...args));
			},
		});
};

const PROVIDER_SYMBOL = Symbol('_service_token_');
export const Provider = (token: PropertyKey = Symbol()): ClassDecorator => {
	return (source) => {
		Reflect.defineMetadata(PROVIDER_SYMBOL, token, source);
	};
};

const getToken = <T extends Constructor>(service: T) => {
	const token = Reflect.getMetadata(PROVIDER_SYMBOL, service);
	if (!token) throw new Error('token');

	return token;
};

export const provideService = <T extends Constructor>(service: T, ...args: any[]) => {
	provide(getToken(service), Reflect.construct(service, args));
};

export const injectService = <T extends Constructor>(service: T): Infer<T> => {
	const val = inject<any>(getToken(service));
	if (!val) throw new Error('without provide');

	return val;
};
