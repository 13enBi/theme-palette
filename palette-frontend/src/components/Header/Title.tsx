import { defineComponent, watch, computed } from 'vue';
import { useState, useMutations, useBoolean } from '@13enbi/vhooks';
import useHash from '../../common/hooks/useHash';
import './style/Title.less';
import { useFoundReset } from '../../common/hooks/useFoundMap';
import { ThemeItem, THemeMap } from '../../store/state';
import themeService from '../../Theme/theme.service';

export default defineComponent(() => {
	const [show, toggle] = useBoolean(false);
	const { setNow, themeMap } = themeService();
	const { title } = useState(['title', 'themeMap']);

	const handleChange = (res: ThemeItem) => {
		useFoundReset();
		hash.value = res.fileName;
	};

	const hash = useHash();

	watch(hash, (val) => {
		requestAnimationFrame(() => {
			setNow(val);
		});
	});

	const showStyle = computed(() => {
		return {
			transform: show.value ? 'rotate(0)' : '',
		};
	});

	const themeList = computed(() => Object.values(themeMap));

	return () => (
		<>
			<div class="theme-title dropdown">
				<div class="dropdown-toggle" onClick={toggle}>
					<header>{title.value}</header>
				</div>
				<ul class="theme-list dropdown-menu" style={showStyle.value}>
					{themeList.value.map((item) => {
						return (
							<li class="dropdown-item" key={item.fileName} onClick={() => handleChange(item)}>
								{item.fileName}
							</li>
						);
					})}
				</ul>
			</div>
		</>
	);
});
