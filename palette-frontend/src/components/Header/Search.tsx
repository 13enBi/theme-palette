import { useMutations, useState } from '@13enbi/vhooks';
import { Input } from 'ant-design-vue';
import { defineComponent } from 'vue';

export default defineComponent(() => {
	const { searchWord } = useState(['searchWord']);
	const { setSearchWord } = useMutations(['setSearchWord']);

	const handleInput = (e: InputEvent) => setSearchWord((e.target as HTMLInputElement).value);

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
