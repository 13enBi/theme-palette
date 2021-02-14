export const Singleton = (): ClassDecorator => {
	let instance: any = null;

	return (source) =>
		new Proxy(source, {
			construct: (...args) => instance || (instance = Reflect.construct(...args)),
		});
};
