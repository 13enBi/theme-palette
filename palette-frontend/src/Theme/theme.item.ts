import { ParseResult, parse } from 'src/common/utils';
import * as api from '../api';

export class ThemeItem {
	parsed: null | ParseResult = null;
	fileData?: string;

	constructor(public readonly fileName: string) {}

	async parseTheme() {
		if (!this.fileData) {
			this.requestTheme();
		}

		return (this.parsed = await parse(this.fileData!));
	}

	async requestTheme() {
		return (this.fileData = await api.requestTheme(this.fileName));
	}
}
