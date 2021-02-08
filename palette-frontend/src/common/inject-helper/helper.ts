export const Singleton = (): ClassDecorator => {
	let instance: any = null;

	return function (source) {
		return new Proxy(source.prototype.constructor, {
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
