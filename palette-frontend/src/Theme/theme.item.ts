import { ParseResult, parse, ThemeForm, merge } from '../common/utils';
import * as api from '../api';

export class ThemeItem {
	constructor(public readonly fileName: string) {}

	protected parsed: null | ParseResult = null;
	protected fileData?: string;

	protected async requestTheme() {
		return (this.fileData = await api.requestTheme(this.fileName));
	}

	async parseTheme() {
		if (this.parsed) return this.parsed;
		if (!this.fileData) await this.requestTheme();

		return (this.parsed = await parse(this.fileData!));
	}

	mergeTheme(form: ThemeForm) {
		this.parsed = merge(form, this.parsed!);
	}
}
