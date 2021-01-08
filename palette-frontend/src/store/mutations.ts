import { MutationsTree } from '@13enbi/vhooks';
import { FileResult, parse } from '../common/utils';
import { State, ThemeItem } from './state';
import * as api from '../api';
import { toRaw } from 'vue';

const mutations: MutationsTree<State> = {
	setSearchWord({ state }, word) {
		state.searchWord = word;
	},

	async setNowTheme({ state, dispatch }, themeItem: ThemeItem) {
		if (!themeItem.fileData) {
			toRaw(themeItem).fileData = await api.requestTheme(themeItem.fileName);
		}

		if (!themeItem.parsed) {
			//themeItem is readonly
			toRaw(themeItem).parsed = await parse(themeItem.fileData!);
		}

		dispatch('addTheme', themeItem);

		state.title = themeItem.fileName;
		state.now = themeItem.parsed!;
    },
    
     mergeTheme() {

    },

	async setThemeMap({ state, dispatch }) {
		const map = await api.requestAllTheme();
		state.themeMap = map;

		const now = Object.values(map)[0];

		now && dispatch('setNowTheme', now);
	},

	async uploadTheme({ dispatch }, file: FileResult) {
		await api.uploadTheme(file);
		dispatch('addTheme', file);
		dispatch('setNowTheme', file);
	},

	async addTheme({ state: { themeMap } }, file: FileResult) {
		if (!themeMap[file.fileName]) {
			themeMap[file.fileName] = file;
		}
	},
};

export default mutations;
