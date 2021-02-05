import { isString } from '@13enbi/vhooks/lib/utils';
import { Singleton } from 'src/common/inject-helper/helper';
import { ThemeItem } from './theme.item';
import { ThemeMap } from './theme.map';

@Singleton()
export class ThemeService {
	now?: ThemeItem;
	themeMap = new ThemeMap();

	setNow(item: ThemeItem): void;
	setNow(name: string): void;
	setNow(param: unknown) {
		if (isString(param)) {
			this.now = this.themeMap.getItem(param);
		} else this.now = param as ThemeItem;

		this.now.parseTheme();
	}
}