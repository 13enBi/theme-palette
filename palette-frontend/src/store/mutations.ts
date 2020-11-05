import { MutationsTree } from '@13enbi/vhooks/lib/useStore';
import { lessParse } from '../common/utils';
import { State } from './state';
import * as api from '../api';

const mutations: MutationsTree<State> = {
	setSearchWord(state, word) {
		state.searchWord = word;
	},

	async setParseResult(state, res: ColorTheme.FileResult) {
		state.nowTheme = {};
		state.nowTheme = await lessParse(res.fileData);
		state.title = res.fileName;

		return state.nowTheme;
	},

	async setAllTheme(state) {
		const allTheme = await api.requestAllTheme();
		state.allTheme = allTheme;

		if (!state.nowTheme && allTheme.length) {
			mutations.setParseResult(state, state.allTheme[0]);
		}
	},
};

export default mutations;
