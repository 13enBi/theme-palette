import { ref, watch } from 'vue';
import { MethodsBind, Injectable } from 'vue-injector';
import useClipboard from '../common/hooks/useClipboard';

@Injectable()
@MethodsBind
export class SearchService {
	private word = ref('');

	constructor() {
		this.watchClipboard();
	}

	get searchWord() {
		return this.word;
	}

	setWord(word: string) {
		this.word.value = word.trim();
	}

	protected watchClipboard() {
		const copyVal = useClipboard(this.word);
		watch(copyVal, (val) => this.setWord(val));
	}
}
