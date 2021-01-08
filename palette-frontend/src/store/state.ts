import { FileResult, ParseResult } from '../common/utils';

export type ThemeItem = Omit<FileResult, 'fileData'> & { parsed?: ParseResult; fileData?: string };
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
