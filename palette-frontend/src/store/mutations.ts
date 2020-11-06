import { MutationsTree } from '@13enbi/vhooks/lib/useStore';
import { lessParse } from '../common/utils';
import { State } from './state';
import * as api from '../api';

const mutations: MutationsTree<State> = {
	setSearchWord(state, word) {
		state.searchWord = word;
	},

	async setNowTheme(state, file: ColorTheme.FileResult) {
		state.nowTheme = {};
		state.nowTheme = await lessParse(file.fileData);
		state.title = file.fileName;

		return state.nowTheme;
	},

	async setAllTheme(state) {
		const allTheme = await api.requestAllTheme();
		state.allTheme = allTheme;

		if (!state.nowTheme && allTheme.length) {
			mutations.setNowTheme(state, allTheme[0]);
		}
	},

	async uploadTheme(state, file: ColorTheme.FileResult) {
		await api.uploadTheme(file);

		state.allTheme.push(file);
		mutations.setNowTheme(state, file);
	},
};

export default mutations;
