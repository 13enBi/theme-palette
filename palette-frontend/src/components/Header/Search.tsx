import { Input } from 'ant-design-vue';
import { defineComponent } from 'vue';
import { injectService } from 'vue-injector';
import { SearchService } from '../../Search/search.service';

export default defineComponent(() => {
	const { setWord, searchWord } = injectService(SearchService);

	const handleInput = ({ target }: Event) => setWord((target as HTMLInputElement).value);

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
