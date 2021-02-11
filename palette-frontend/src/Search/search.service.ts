import { ref } from 'vue';
import { MethodsBind, Provider, Singleton } from '../common/inject-helper/helper';

@Provider()
@MethodsBind
@Singleton()
export class SearchService {
	private word = ref('');

	get searchWord() {
		return this.word;
	}

	setWord(word: string) {
		this.word.value = word;
	}
}