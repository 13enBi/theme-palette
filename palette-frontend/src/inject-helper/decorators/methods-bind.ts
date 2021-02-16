import { isFunction } from '../../common/utils';

const boundCache = new WeakMap();

export const mapBind = <T extends object>(source: T): T => {
	const cached = boundCache.get(source);
	if (cached) return cached;

	const bound = new Proxy(source, {
		get(target, key) {
			const prop = Reflect.get(target, key);

			return isFunction(prop) ? prop.bind(target) : prop;
		},
	});
	boundCache.set(source, bound);

	return bound;
};
export const MethodsBind: ClassDecorator = (source) => {
	return new Proxy(source, {
		construct: (...args) => mapBind(Reflect.construct(...args)),
	});
};
