import { Infer, Provider } from '../helper';
import { injectService } from '../api';

export const Injector = <T extends Provider>(injector: T): PropertyDecorator => (target, key) => {
	let instance: Infer<T> | null = null;

	Reflect.defineProperty(target, key, {
		get: () => instance || (instance = injectService(injector)),
		/**
		 * 装饰器会在ts编译期运行
		 * 会取不到currentInstance
		 */
		//value: useInjector(injector),
	});
};
