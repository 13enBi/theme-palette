import { useRequest, axios } from '@13enbi/vhooks';
import { message } from 'ant-design-vue';

axios.defaults.baseURL = '//localhost:3001/';
const request = useRequest.create({
	onError(err) {
		message.error(err.toString());
	},
	formatData({ errorCode, errorMsg, result }: { errorCode: number; errorMsg: string; result: any }) {
		if (errorCode === 0) return result;
		else message.error(errorMsg);
	},
	cacheKey: 'theme',
	cacheTime: 0,
});

export const requestAllTheme = () => request('/theme').then((data) => console.log(data));
