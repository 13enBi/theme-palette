import { App, inject } from 'vue';
import './test';

const tokenKey = Symbol('token');

const providers = new Set<any>();

export default (app: App) => {
	providers.forEach((provide) => {
		const token = provide[tokenKey];
		app.provide(token, provide);
	});
};

export const Provide = (): ClassDecorator => {
	return (source) => {
		(source as any)[tokenKey] = Symbol();
		providers.add(source);
	};
};

export const Inject = <F extends Function>(source: F): PropertyDecorator => {
	const token = (source as any)[tokenKey];
	if (!token) throw Error(`${source.name}`);

	const value = inject(token);
	if (!value) throw Error(`empty`);

	return (target, key) => Reflect.set(target, key, value);
};




