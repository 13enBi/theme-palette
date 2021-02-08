import { isFunction } from '../utils';

export const Singleton = (): ClassDecorator => {
	let instance: any = null;

	return function (source) {
		return new Proxy(source, {
			construct(target, ...args) {
				if (instance) return instance;
				return (instance = Reflect.construct(target, ...args));
			},
		});
	};
};

const TOKEN_SYMBOL = Symbol('_service_token_');
export const Token = (token: PropertyKey = Symbol()): ClassDecorator => {
	return function (source) {
		(source as any)[TOKEN_SYMBOL] = token;
		return source;
	};
};

const mapBind = <T extends object>(source: T): T => {
	return new Proxy(source, {
		get(target, key) {
			const prop = Reflect.get(target, key);

			return isFunction(prop) ? prop.bind(target) : prop;
		},
	});
};
export const MethodsBind: ClassDecorator = (source) => {
	return new Proxy(source, {
		construct(target, ...args) {
			const instance = Reflect.construct(target, ...args);
			return mapBind(instance);
		},
	});
};
