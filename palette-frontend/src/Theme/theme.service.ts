import { EMPTY_PARSE, isString } from '../common/utils';
import { Singleton, Token } from '../common/inject-helper/helper';
import { nextTick, ref } from 'vue';
import { ThemeItem } from './theme.item';
import { ThemeMap } from './theme.map';

@Token(Symbol('ThemeService'))
@Singleton()
export class ThemeService {
	protected nowItem?: ThemeItem;
	public readonly themeMap: ThemeMap;
	now = ref<ThemeItem['parsed'] | undefined>();

	constructor() {
		const map = (this.themeMap = new ThemeMap());
		map.requestThemeMap().then(() => {
			this.setNow(map.getFirstItem());
		});
	}

	async setNow(item: ThemeItem): Promise<void>;
	async setNow(name: string): Promise<void>;
	async setNow(param: unknown) {
		this.nowItem = isString(param) ? this.themeMap.getItem(param) : (param as ThemeItem);

		this.now.value = EMPTY_PARSE;
		await nextTick();
		this.now.value = await this.nowItem.parseTheme();
	}

	upload() {}
}

export default () => new ThemeService();
