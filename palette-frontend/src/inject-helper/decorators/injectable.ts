import { PROVIDER_CONSTRUCTOR } from '../constants';

export const Injectable = (): ClassDecorator => (target) => {
	Reflect.set(target, PROVIDER_CONSTRUCTOR, true);
};
