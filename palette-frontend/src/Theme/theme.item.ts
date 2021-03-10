import { ParseResult, parse, ThemeForm, mergeParsed } from '../common/utils/css-parse';
import * as api from '../api';

export class ThemeItem {
	constructor(public readonly fileName: string, protected fileData?: string) {}

	protected parsed: null | ParseResult = null;

	protected async requestTheme() {
		return (this.fileData = await api.requestTheme(this.fileName));
	}

	async parseTheme() {
		if (this.parsed) return this.parsed;
		if (!this.fileData) await this.requestTheme();

		return (this.parsed = await parse(this.fileData!));
	}

	mergeParsed(form: ThemeForm) {
		return (this.parsed = mergeParsed(form, this.parsed!));
	}
}
