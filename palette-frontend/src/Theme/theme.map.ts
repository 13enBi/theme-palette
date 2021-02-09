import { MethodsBind, Singleton } from '../common/inject-helper/helper';
import * as api from '../api';
import { ThemeItem } from './theme.item';
import { ref } from 'vue';

@Singleton()
@MethodsBind
export class ThemeMap {
	mapper: Record<string, ThemeItem> = {};
	list = ref<string[]>([]);

	async requestThemeMap() {
		(await api.requestAllTheme()).forEach((name) => {
			this.mapper[name] = new ThemeItem(name);
		});
		this.updateList();
	}

	protected updateList() {
		this.list.value = Object.keys(this.mapper);
	}

	getItem(name: string = Object.keys(this.mapper)[0]) {
		const item = this.mapper[name];

		if (!item) {
			throw Error(`theme:${name} is empty`);
		}

		return item;
	}

	addItem(item: ThemeItem) {
		this.mapper[item.fileName] = item;
	}
}

export default () => new ThemeMap();
