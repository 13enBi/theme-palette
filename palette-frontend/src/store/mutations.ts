import { MutationsTree } from '@13enbi/vhooks';
import { FileResult, parse } from '../common/utils';
import { State } from './state';
import * as api from '../api';

const mutations: MutationsTree<State> = {
	setSearchWord({ state }, word) {
		state.searchWord = word;
	},

	setNowTheme({ state }, theme) {
		state.nowTheme = theme;
	},

	async setNowThemeByFile({ state }, file: FileResult) {
		state.nowTheme = {};
		state.nowTheme = await parse(file.fileData);
		state.title = file.fileName;

		return state.nowTheme;
	},

	async setAllTheme({ state, dispatch }) {
		const allTheme = await api.requestAllTheme();
		state.allTheme = allTheme;

		if (!state.nowTheme && allTheme.length) {
			dispatch('setNowThemeByFile', allTheme[0]);
		}
	},

	async uploadTheme({ state, dispatch }, file: FileResult) {
		await api.uploadTheme(file);

		state.allTheme.push(file);
		dispatch('setNowThemeByFile', file);
	},

	async addTheme({ state }, theme: any) {},
};

export default mutations;
