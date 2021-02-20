import { Constructor } from '../helper';
import { injectService } from '../api';
import { defineInjector } from '../scanner';

export const Injector = <T extends Constructor>(service: T): PropertyDecorator => (target, key) => {
	let instance: any = null;

	defineInjector(target, service);

	Reflect.defineProperty(target, key, {
		get: () => instance || (instance = injectService(service)),
        /**
         * 装饰器会在编译期运行
         * 会取不到currentInstance
         */
		// value:injectService(service)
	});
};
