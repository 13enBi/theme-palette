import { Singleton } from 'src/common/inject-helper/helper';
import * as api from '../api';
import { ThemeItem } from './theme.item';

@Singleton()
export class ThemeMap {
	mapper: Record<string, ThemeItem> = {};

	constructor() {
		this.requestThemeMap();
	}

	async requestThemeMap() {
		(await api.requestAllTheme()).forEach((name) => {
			this.mapper[name] = new ThemeItem(name);
		});
	}

	getItem(name: string) {
		const item = this.mapper[name];

		if (!item) {
			throw Error(`theme:${name} is empty`);
		}

		return item;
	}

	getFirstItem() {
		return Object.values(this.mapper)[0];
	}

	addItem(item: ThemeItem) {
		this.mapper[item.fileName] = item;
	}
}
