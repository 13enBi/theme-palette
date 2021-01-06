export * from './fs';

export const isDev = process.env.NODE_ENV === 'development';

export const combineURLs = (baseURL: string, relativeURL?: string) => {
	return relativeURL
		? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
		: baseURL;
};

export const asyncForeach = async <T>(
	arr: T[],
	handler: (value: T, index: number, array: T[]) => Promise<any>,
	shouldContinue = true,
) => {
	for (let i = 0, len = arr.length; i < len; i++) {
		try {
			handler(arr[i], i, arr);
		} catch (error) {
			if (!shouldContinue) {
				throw error;
			}
			continue;
		}
	}
};

export const asyncMap = async <T, R>(
	arr: T[],
	handler: (value: T, index: number, array: T[]) => Promise<R>,
	shouldContinue = true,
) => {
	const res: R[] = [];

	asyncForeach(
		arr,
		async (value, index, arr) => {
			return (res[index] = await handler(value, index, arr));
		},
		shouldContinue,
	);

	return res;
};
