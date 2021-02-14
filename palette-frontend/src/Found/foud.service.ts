import { MethodsBind, Provider, Singleton } from '../inject-helper';
import { AutoWired } from '../inject-helper/decorators/auto-wired';
import { SearchService } from '../Search/search.service';

@Provider()
@Singleton()
@MethodsBind
export class FoundService {
	@AutoWired(SearchService)
	private readonly searchService!: SearchService;

	constructor() {
		console.log(this.searchService.searchWord);
	}
}
