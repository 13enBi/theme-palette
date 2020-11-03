import { useRequest } from '@13enbi/vhooks';
import { message } from 'ant-design-vue';

const request = useRequest.create({
	onError(err) {
		message.error(err);
	},
	cacheKey: 'theme',
	cacheTime: Infinity,
	requestMethod(axios) {
		axios.
	}
});

console.log(1);

export const requestAllTheme = () => request('/');
