export interface State {
	searchWord: string;
	nowTheme: ColorTheme.CssParseResult | null | {};
	title: string;
	allTheme: ColorTheme.FileResult[];
}

const state: State = {
	searchWord: '',
	nowTheme: null,
	title: '',
	allTheme: [],
};

export default state;
