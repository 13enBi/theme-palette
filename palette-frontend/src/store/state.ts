import { FileResult, ParseResult } from '../common/utils';

//export type ThemeItem = FileResult & { parsed?: ParseResult };
export interface ThemeItem extends Partial<FileResult> {
	fileName: string;
	parsed?: ParseResult;
}

export type THemeMap = Record<string, ThemeItem>;

export interface State {
	searchWord: string;
	now: ParseResult | {};
	title: string;
	themeMap: THemeMap;
}

const state: State = {
	searchWord: '',
	now: {},
	title: '',
	themeMap: {},
};

export default state;
