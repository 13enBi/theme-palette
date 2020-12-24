import { FileResult, ParseResult } from '@/common/utils';

export interface State {
	searchWord: string;
	nowTheme: ParseResult | null | {};
	title: string;
	allTheme: FileResult[];
}

const state: State = {
	searchWord: '',
	nowTheme: null,
	title: '',
	allTheme: [],
};

export default state;
