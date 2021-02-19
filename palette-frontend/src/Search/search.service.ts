import { ref } from 'vue';
import { MethodsBind, Provider } from '../inject-helper';

@Provider()
@MethodsBind
export class SearchService {
	private word = ref('');

	get searchWord() {
		return this.word;
	}

	setWord(word: string) {
		this.word.value = word.trim();
	}
}
