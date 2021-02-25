import './style/Title.less';
import { defineComponent, computed } from 'vue';
import { useBoolean } from '@13enbi/vhooks';
import { ThemeService } from '../../Theme/theme.service';
import { injectService } from 'vue-injector';
import { hashService } from '../../Hash/hash.service';

export default defineComponent(() => {
	const [show, toggle] = useBoolean(false);
	const { title, themeList } = injectService(ThemeService);
	const { hash } = injectService(hashService);

	const handleChange = (name: string) => {
		hash.value = name;
	};

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
