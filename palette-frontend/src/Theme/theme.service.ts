import { fileListReader, isString } from '../common/utils';
import { EMPTY_PARSE, ParseResult } from '../common/utils/css-parse';
import { MethodsBind, Injectable, injectService } from 'vue-injector';
import { nextTick, ref } from 'vue';
import { ThemeItem } from './theme.item';
import { ThemeMap } from './theme.map';
import * as api from '../api';
import injectHashService from '../Hash/hash.service';
import showForm from './theme.form';

@Injectable()
@MethodsBind
export class ThemeService {
	protected nowItem?: ThemeItem;
	protected themeMap!: ThemeMap;
	readonly now = ref(EMPTY_PARSE);
	readonly title = ref('');

	protected hashService = injectHashService();

	constructor() {
		this.initMap();
		this.initHashListener();
	}

	get themeList() {
		return this.themeMap.list;
	}

	protected async forceUpdateNow(parse?: ParseResult) {
		const { now } = this;

		const val = parse || now.value;

		now.value = EMPTY_PARSE;
		await nextTick();
		now.value = val;
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

		const parase = await this.nowItem.parseTheme();
		this.forceUpdateNow(parase);
		this.title.value = this.nowItem.fileName;
	}

	async upload(files: FileList, isUpload = false) {
		const fileRes = await fileListReader(files);

		const item = this.themeMap.addItem(fileRes);
		this.setNow(item);

		isUpload && api.uploadTheme(fileRes);
	}

	async addPalette() {
		showForm().then((payload) => {
			if (payload.action === 'confirm') {
				const parse = this.nowItem!.mergeParsed(payload.form);

				this.forceUpdateNow(parse);
			}
		});
	}
}

export default () => injectService(ThemeService);
