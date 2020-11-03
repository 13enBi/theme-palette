import { createStore } from '@13enbi/vhooks';
import { lessParse } from '../common/utils';

interface State {
	searchWord: string;
	lessParseResult: ColorTheme.CssParseResult | {};
	title: string;
}

const state: State = {
	searchWord: '',
	lessParseResult: {},
	title: '',
};

export default createStore<State>(
	{
		state,

		mutations: {
			setSearchWord(state, word) {
				state.searchWord = word;
			},

			async setParseResult(state, res: ColorTheme.FileResult) {
				state.lessParseResult = {};
				state.lessParseResult = await lessParse(res.fileData);
				state.title = res.fileName;

				return state.lessParseResult;
			},
		},
	},
	{
		isReadonly: false,
	},
);
