import { Constructor } from '../helper';
import { initService } from '../injector';

// export const AutoWired: PropertyDecorator = (target, key) => {
// 	const service = Reflect.getMetadata(TYPE_METADATA, target,key);

// 	Reflect.defineProperty(target, key, {
// 		value: initService(service),
// 	});
// };

export const AutoWired = <T extends Constructor>(service: T): PropertyDecorator => (target, key) => {
	Reflect.defineProperty(target, key, {
		value: initService(service),
	});
};
