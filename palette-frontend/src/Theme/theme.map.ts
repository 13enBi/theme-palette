import { MethodsBind, Singleton } from '../common/inject-helper/helper';
import * as api from '../api';
import { ThemeItem } from './theme.item';
import { computed, shallowReactive } from 'vue';
import { isString } from '../common/utils';

@Singleton()
@MethodsBind
export class ThemeMap {
	protected mapper: Record<string, ThemeItem> = shallowReactive({});
	readonly list = computed(() => Object.keys(this.mapper));

	async requestThemeMap() {
		(await api.requestAllTheme()).forEach((name) => {
			this.mapper[name] = new ThemeItem(name);
		});
	}

	getItem(name: string = this.list.value[0]) {
		const item = this.mapper[name];

		if (!item) {
			throw Error(`theme:${name} is empty`);
		}

		return item;
	}

	addItem(name: string, data?: string): void;
	addItem(item: ThemeItem): void;
	addItem(...args: any[]) {
		if (isString(args[0])) {
			const [name, data] = args;
			this.mapper[name] = new ThemeItem(name, data);
		} else {
			const item = args[0];
			this.mapper[item.fileName] = item;
		}
	}
}
