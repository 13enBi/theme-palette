import { PROVIDER_SYMBOL } from '../constants';

export const Provider = (token: PropertyKey = Symbol()): ClassDecorator => {
	return (source) => {
		Reflect.defineMetadata(PROVIDER_SYMBOL, token, source.prototype);
	};
};
