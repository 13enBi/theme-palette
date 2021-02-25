import { EMPTY_PARSE, fileListReader, isString } from '../common/utils';
import { MethodsBind, Injectable, Injector } from 'vue-injector';
import { nextTick, ref } from 'vue';
import { ThemeItem } from './theme.item';
import { ThemeMap } from './theme.map';
import * as api from '../api';
import { hashService, HashService } from '../Hash/hash.service';

@Injectable()
@MethodsBind
export class ThemeService {
	protected nowItem?: ThemeItem;
	protected themeMap!: ThemeMap;
	readonly now = ref(EMPTY_PARSE);
	readonly title = ref('');

	@Injector(hashService)
	protected hashService!: HashService;

	constructor() {
		this.initMap();
		this.initHashListener();
	}

	get themeList() {
		return this.themeMap.list;
	}

	protected initMap() {
		const map = (this.themeMap = new ThemeMap());
		map.requestThemeMap().then(() => {
			this.setNow(map.getItem());
		});
	}

	protected initHashListener() {
		this.hashService.addHashListener((hash) => {
			this.setNow(hash);
		});
	}

	async setNow(item: ThemeItem): Promise<void>;
	async setNow(name: string): Promise<void>;
	async setNow(param: unknown) {
		this.nowItem = isString(param) ? this.themeMap.getItem(param) : (param as ThemeItem);

		this.now.value = EMPTY_PARSE;
		await nextTick();
		this.now.value = await this.nowItem.parseTheme();
		this.title.value = this.nowItem.fileName;
	}

	async upload(files: FileList, isUpload = false) {
		const fileRes = await fileListReader(files);

		const item = this.themeMap.addItem(fileRes);
		this.setNow(item);

		isUpload && api.uploadTheme(fileRes);
	}

	mergeTheme(f: any) {}
}
