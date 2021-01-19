import { App, inject } from 'vue';

let app: App<Element> | null = null;
const tokenKey = Symbol('token');

export default ($app: App) => (app = $app);

export const Provide = (): ClassDecorator => {
	if (!app) throw Error();

	return (source) => {
		const token = ((source as any)[tokenKey] = Symbol());
		app!.provide(token, source);
	};
};

export const Inject = <F extends Function>(source: F): PropertyDecorator => {
	const token = (source as any)[tokenKey];
	if (!token) throw Error(`${source.name}`);

	const value = inject(token);
	if (!value) throw Error(`empty`);

	return (target, key) => Reflect.set(target, key, value);
};
