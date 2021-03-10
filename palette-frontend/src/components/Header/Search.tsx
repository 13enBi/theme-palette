import { ElInput } from 'element-plus';
import { defineComponent } from 'vue';
import injectSearchService from '../../Search/search.service';

export default defineComponent(() => {
	const { setWord, searchWord } = injectSearchService();

	const handleInput = (value: any) => setWord(value);

	return () => (
		<>
			<ElInput
				modelValue={searchWord.value}
				onInput={handleInput}
				placeholder="输入类名/颜色值"
				enter-button
			></ElInput>
		</>
	);
});
