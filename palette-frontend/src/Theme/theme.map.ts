import { MethodsBind, Singleton } from '../inject-helper';
import * as api from '../api';
import { ThemeItem } from './theme.item';
import { computed, shallowReactive } from 'vue';
import { FileResult, isString } from '../common/utils';

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

	addItem(fileRes: FileResult): ThemeItem;
	addItem(item: ThemeItem): ThemeItem;
	addItem(arg: any) {
		if (arg instanceof ThemeItem) {
			return (this.mapper[arg.fileName] = arg);
		} else {
			const { fileName, fileData } = arg;
			return (this.mapper[fileName] = new ThemeItem(fileName, fileData));
		}
	}
}
