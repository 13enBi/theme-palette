export const combineURLs = (baseURL: string, relativeURL?: string) => {
	return relativeURL
		? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
		: baseURL;
};

export const asyncMap = async <T, R>(
	arr: T[],
	handler: (value: T, index: number, array: T[]) => Promise<R>,
): Promise<R[]> => {
	let res: R[] = [];

	for (let i = 0, len = arr.length; i < len; i++) {
		res[i] = await handler(arr[i], i, arr);
	}

	return res;
};
