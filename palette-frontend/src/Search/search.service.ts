import { ref } from 'vue';
import { MethodsBind, Injectable } from 'vue-injector';

@Injectable()
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
