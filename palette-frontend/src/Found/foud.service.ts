import { computed, Ref, shallowReactive } from 'vue';
import { ParseItem } from '../common/utils';
import { MethodsBind, Provider, Singleton } from '../inject-helper';
import { AutoWired } from '../inject-helper/decorators/auto-wired';
import { SearchService } from '../Search/search.service';
import { ThemeService } from '../Theme/theme.service';

@Provider()
@Singleton()
@MethodsBind
export class FoundService {
	@AutoWired(SearchService)
	private readonly searchService!: SearchService;

	@AutoWired(ThemeService)
	private readonly themeService!: ThemeService;

	private foundMap = shallowReactive({});

	private get now() {
		return this.themeService.now;
	}

	constructor() {}

	private resetMap() {}

	getIsFind(item: Ref<ParseItem>) {
		return computed(() => {
			const { source } = item.value,
				word = this.searchService.searchWord.value;

			return !!word && source?.toLowerCase().includes(word?.toLowerCase());
		});
	}
}
