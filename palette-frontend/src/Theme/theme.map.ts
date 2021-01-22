import { Singleton } from 'src/common/inject-helper/helper';
import * as api from '../api';
import { ThemeItem } from './theme.item';

@Singleton()
export class ThemeMap {
	mapping: Record<string, ThemeItem> = {};

	async requestThemeMap() {
		(await api.requestAllTheme()).forEach((name) => {
			this.mapping[name] = new ThemeItem(name);
		});
	}
}
