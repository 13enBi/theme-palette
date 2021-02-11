import useClipboard from '../../common/hooks/useClipboard';

import { Input } from 'ant-design-vue';
import { defineComponent, watch } from 'vue';
import { injectService } from '../../common/inject-helper/helper';
import { SearchService } from '../../Search/search.service';

export default defineComponent(() => {
	const { setWord, searchWord } = injectService(SearchService);

	const handleInput = ({ target }: Event) => setWord((target as HTMLInputElement).value);

	const copyVal = useClipboard(searchWord);
	watch(copyVal, (val) => setWord(val));

	return () => (
		<>
			<Input.Search
				value={searchWord.value}
				onInput={handleInput}
				placeholder="输入类名/颜色值"
				enter-button
			></Input.Search>
		</>
	);
});
