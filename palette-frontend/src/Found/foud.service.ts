import { computed, Ref, shallowReactive } from 'vue';
import { ParseItem } from '../common/utils';
import { MethodsBind, Injectable } from '../inject-helper';
import { Injector } from '../inject-helper/decorators/injector';
import { SearchService } from '../Search/search.service';
import { ThemeService } from '../Theme/theme.service';

@Injectable()
@MethodsBind
export class FoundService {
	@Injector(SearchService)
	private readonly searchService!: SearchService;

	@Injector(ThemeService)
	private readonly themeService!: ThemeService;

	private foundMap = shallowReactive({});

	private get now() {
		return this.themeService.now;
	}

	constructor() {
		console.log(this.searchService, this.themeService);
	}

	private resetMap() {}

	getIsFind(item: Ref<ParseItem>) {
		return computed(() => {
			const { source } = item.value,
				word = this.searchService.searchWord.value;

			return !!word && source?.toLowerCase().includes(word?.toLowerCase());
		});
	}
}
