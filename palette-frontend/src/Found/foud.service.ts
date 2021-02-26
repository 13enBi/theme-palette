import { computed, reactive, Ref, watch } from 'vue';
import { ParseItem } from '../common/utils';
import { MethodsBind, Injectable, Injector } from 'vue-injector';
import { SearchService } from '../Search/search.service';
import { THEMES, ThemeTypes } from '../config';
import { useMounted } from '@13enbi/vhooks';
import { HashService, hashService } from '../Hash/hash.service';

export interface FoundPayLoad extends Pick<ParseItem, 'uses' | 'name' | 'type' | 'color'> {
	el: HTMLElement;
	isFind: boolean;
}

export type FoundMap = Record<ThemeTypes, Set<FoundPayLoad>>;

@Injectable()
@MethodsBind
export class FoundService {
	@Injector(SearchService)
	private readonly searchService!: SearchService;

	@Injector(hashService)
	private readonly hasService!: HashService;

	private _foundMap: FoundMap = reactive(this.getInitMap());

	get foundMap() {
		return this._foundMap;
	}

	constructor() {
		this.initResetListener();
	}

	protected getInitMap(): FoundMap {
		const entires = THEMES.map((type) => [type, new Set()]);

		return Object.fromEntries(entires);
	}

	protected initResetListener() {
		const reset = () => Object.assign(this._foundMap, this.getInitMap());

		this.hasService.addHashListener(reset);
	}

	protected getSetByPayload(payload?: FoundPayLoad) {
		return payload ? this._foundMap[payload.type] : void 0;
	}

	protected emitAddFound(payload?: FoundPayLoad) {
		const set = this.getSetByPayload(payload);
		set!?.add(payload!);
	}

	protected emitDeleteFound(payload?: FoundPayLoad) {
		const set = this.getSetByPayload(payload);
		set!?.delete(payload!);
	}

	protected createPayLoad(item: Ref<ParseItem>, el: Ref<HTMLElement>, isFind: Ref<boolean>) {
		const payload = computed<FoundPayLoad>(() => {
			const { uses, name, type, color } = item.value;

			return {
				uses,
				name,
				type,
				color,

				isFind: isFind.value,
				el: el.value,
			};
		});

		return payload;
	}

	insertFound(item: Ref<ParseItem>, el: Ref<HTMLElement>, isFind = this.getIsFind(item)) {
		const payload = this.createPayLoad(item, el, isFind);

		useMounted(() => {
			watch(
				payload,

				(val, oldVal) => {
					this.emitDeleteFound(oldVal);
					this.emitAddFound(val);
				},

				{ immediate: true },
			);
		});
	}

	getIsFind(item: Ref<ParseItem>) {
		return computed(() => {
			const { source } = item.value,
				word = this.searchService.searchWord.value;

			return !!word && source?.toLowerCase().includes(word?.toLowerCase());
		});
	}
}
