import { useRequest } from '@13enbi/vhooks';
import { message } from 'ant-design-vue';
import { FileResult, isDev } from './common/utils';

const request = useRequest.create((axios) => {
	axios!.defaults.baseURL = isDev ? '//localhost:80/api' : './api';

	return {
		onError(err) {
			message.error(err?.toString?.() ?? '服务器拉跨了');
		},
		formatData(res: { errorCode: number; errorMsg: string; result: any } | undefined) {
			if (!res) return void 0;

			const { errorCode, errorMsg, result } = res;
			if (errorCode === 0) return result;
			else throw errorMsg;
		},
	};
});

export type FileMap = Record<string, Omit<FileResult, 'fileData'>>;
export const requestAllTheme = async () => {
	const res = (await request('/theme/all')) as string[];

	return res.reduce((mapped, fileName) => ((mapped[fileName] = { fileName }), mapped), {} as FileMap);
};

export const requestTheme = (fileName: string) => {
	return request(
		{
			url: '/theme',
			params: {
				fileName,
			},
		},
		{ cacheKey: fileName, cacheTime: 60 * 10 * 1000 /* 10min */ },
	);
};

export const uploadTheme = (file: FileResult) =>
	request({
		url: '/theme',
		method: 'post',
		data: file,
	});

export const updateTheme = (file: FileResult) => request({ url: '/theme', method: 'patch', data: file });
