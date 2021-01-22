import { Singleton } from 'src/common/inject-helper/helper';
import { ParseResult, parse } from 'src/common/utils';

export class ThemeService {
	parsed: null | ParseResult = null;

	constructor(public readonly fileName: string, public readonly fileData: string) {}

	async parseTheme() {
		return (this.parsed = await parse(this.fileData));
	}
}
