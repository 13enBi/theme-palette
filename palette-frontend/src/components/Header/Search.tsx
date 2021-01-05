import useClipboard from '../../common/hooks/useClipboard';
import { useMutations, useState } from '@13enbi/vhooks';
import { Input } from 'ant-design-vue';
import { defineComponent, watch } from 'vue';

export default defineComponent(() => {
	const { searchWord } = useState(['searchWord']);
	const { setSearchWord } = useMutations(['setSearchWord']);

	const handleInput = ({ target }: Event) => setSearchWord((target as HTMLInputElement).value);

	const copyVal = useClipboard(searchWord);
	watch(copyVal, (val) => setSearchWord(val));

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
