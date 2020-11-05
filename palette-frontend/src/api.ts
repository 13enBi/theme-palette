import { useRequest } from '@13enbi/vhooks';
import { message } from 'ant-design-vue';

const request = useRequest.create((axios) => {
	const isDevelopment = process.env.NODE_ENV === 'development';

	axios!.defaults.baseURL = isDevelopment ? '//localhost:3001/' : '/';

	return {
		onError(err) {
			message.error(err?.toString?.() ?? '服务器拉跨了');
		},
		formatData({ errorCode, errorMsg, result }: { errorCode: number; errorMsg: string; result: any }) {
			if (errorCode === 0) return result;
			else throw errorMsg;
		},
	};
});

export const requestAllTheme = (): Promise<ColorTheme.FileResult[]> =>
	request('/theme', { cacheKey: 'theme', cacheTime: 60 * 10 * 1000 });

export const uploadTheme = (file: ColorTheme.FileResult) =>
	request({
		url: '/theme',
		method: 'post',
		data: file,
	});
