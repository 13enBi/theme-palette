import { Singleton } from 'src/common/inject-helper/helper';
import * as api from '../api';
import { ThemeItem } from './theme.item';

@Singleton()
export class ThemeMap {
	mapping: Record<string, ThemeItem> = {};

	constructor() {
		this.requestThemeMap();
	}

	async requestThemeMap() {
		(await api.requestAllTheme()).forEach((name) => {
			this.mapping[name] = new ThemeItem(name);
		});
	}

	getFirstItem() {
		return Object.values(this.mapping)[0];
	}

	addItem(item: ThemeItem) {
		this.mapping[item.fileName] = item;
	}
}
