import { useRequest } from '@13enbi/vhooks';
import { message } from 'ant-design-vue';
import { isDev } from './common/utils';

const request = useRequest.create((axios) => {
	axios!.defaults.baseURL = isDev ? '//localhost:3001/' : '/';

	return {
		onError(err) {
			message.error(err?.toString?.() ?? '服务器拉跨了');
		},
		formatData(res: { errorCode: number; errorMsg: string; result: any } | undefined) {
			if (!res) {
				return void 0;
			}

			const { errorCode, errorMsg, result } = res;
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

export const updateTheme = (file: ColorTheme.FileResult) => request({ url: '/theme', method: 'patch', data: file });
