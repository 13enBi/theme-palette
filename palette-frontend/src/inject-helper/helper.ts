export interface Constructor<T extends object = any> {
	new (): T;
}

export type Infer<T> = T extends Constructor<infer P> ? P : never;

export const error = (msg: string) => {
	throw new Error(msg);
};

const hasOwnProperty = Object.prototype.hasOwnProperty;
export const hasOwn = (val: object, key: string | symbol): key is keyof typeof val => hasOwnProperty.call(val, key);
