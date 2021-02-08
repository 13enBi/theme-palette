import { Singleton } from '../common/inject-helper/helper';
import * as api from '../api';
import { ThemeItem } from './theme.item';
import { ref } from 'vue';

@Singleton()
export class ThemeMap {
	mapper: Record<string, ThemeItem> = {};
	list = ref<string[]>([]);

	async requestThemeMap() {
		(await api.requestAllTheme()).forEach((name) => {
			this.mapper[name] = new ThemeItem(name);
		});
	}

	protected updateList() {
		this.list.value = Object.keys(this.mapper);
	}

	getItem(name: string) {
		const item = this.mapper[name];

		if (!item) {
			throw Error(`theme:${name} is empty`);
		}

		return item;
	}

	getFirstItem() {
		return this.getItem(Object.keys(this.mapper)[0]);
	}

	addItem(item: ThemeItem) {
		this.mapper[item.fileName] = item;
	}
}

export default () => new ThemeMap();
