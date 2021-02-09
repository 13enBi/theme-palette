import { defineComponent, watch, computed } from 'vue';
import { useBoolean } from '@13enbi/vhooks';
import useHash from '../../common/hooks/useHash';
import './style/Title.less';
import { useFoundReset } from '../../common/hooks/useFoundMap';
import { ThemeService } from '../../Theme/theme.service';
import { injectService } from '../../common/inject-helper/helper';

export default defineComponent(() => {
	const [show, toggle] = useBoolean(false);
	const { setNow, title, themeList } = injectService(ThemeService);

	const handleChange = (name: string) => {
		useFoundReset();
		setNow(name);
		hash.value = name;
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

	return () => (
		<>
			<div class="theme-title dropdown">
				<div class="dropdown-toggle" onClick={toggle}>
					<header>{title.value}</header>
				</div>
				<ul class="theme-list dropdown-menu" style={showStyle.value}>
					{themeList.value.map((item) => {
						return (
							<li class="dropdown-item" key={item} onClick={() => handleChange(item)}>
								{item}
							</li>
						);
					})}
				</ul>
			</div>
		</>
	);
});
