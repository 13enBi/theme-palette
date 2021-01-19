export const Singleton = (): ClassDecorator => {
	let instance: any = null;

	return function (source) {
		return new Proxy(source.prototype.constructor, {
			construct(target, ...args) {
				if (instance) return instance;
				return (instance = new target(...args));
			},
		});
	};
};

