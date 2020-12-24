import { defineComponent, watch, computed } from 'vue';
import { useState, useMutations, useBoolean } from '@13enbi/vhooks';
import { useHash } from '../../common/hooks';
import { FileResult } from '../../common/utils';
import './style/Title.less';

export default defineComponent(() => {
	const [show, toggle] = useBoolean(false);
	const { title, allTheme } = useState(['title', 'allTheme']);
	const { setNowThemeByFile } = useMutations(['setNowThemeByFile']);

	type ThemeMap = Record<string, FileResult>;
	const themeMap = computed<ThemeMap>(() => {
		return allTheme.value.reduce((map: ThemeMap, res: FileResult) => {
			map[res.fileName] = res;
			return map;
		}, {});
	});

	const change = (res: FileResult) => {
		hash.value = res.fileName;
	};

	const hash = useHash();

	watch(hash, () => {
		const now = themeMap.value[hash.value];

		now && requestAnimationFrame(() => setNowThemeByFile(now));
	});

	const showStyle = computed(() => {
		return {
			transform: show.value ? 'rotate(0)' : '',
		};
	});

	return () => (
		<>
			<div class="theme-title dropdown">
				<div class="dropdown-toggle" onClick={toggle}>
					<header>{title.value}</header>
				</div>
				<ul class="theme-list dropdown-menu" style={showStyle.value}>
					{(allTheme.value as FileResult[]).map((item) => {
						return (
							<>
								<li class="dropdown-item" key={item.fileName} onClick={() => change(item)}>
									{item.fileName}
								</li>
							</>
						);
					})}
				</ul>
			</div>
		</>
	);
});
