import { Constructor } from '../helper';
import { injectService } from '../injector';
import { defineAutoWired } from '../scanner';

export const AutoWired = <T extends Constructor>(service: T): PropertyDecorator => (target, key) => {
	let instance: any = null;

	defineAutoWired(target, service);

	Reflect.defineProperty(target, key, {
		get: () => instance || (instance = injectService(service)),
	});
};
