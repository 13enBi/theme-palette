import { MutationsTree } from '@13enbi/vhooks';
import { lessParse } from '../common/utils';
import { State } from './state';
import * as api from '../api';

const mutations: MutationsTree<State> = {
	setSearchWord({ state }, word) {
		state.searchWord = word;
	},

	async setNowTheme({ state }, file: ColorTheme.FileResult) {
		state.nowTheme = {};
		state.nowTheme = await lessParse(file.fileData);
		state.title = file.fileName;

		return state.nowTheme;
	},

	async setAllTheme({ state, dispatch }) {
		const allTheme = await api.requestAllTheme();
		state.allTheme = allTheme;

		if (!state.nowTheme && allTheme.length) {
			dispatch('setNowTheme', allTheme[0]);
		}
	},

	async uploadTheme({ state, dispatch }, file: ColorTheme.FileResult) {
		await api.uploadTheme(file);

		state.allTheme.push(file);
		dispatch('setNowTheme', file);
	},
};

export default mutations;
