import './App.less';
import { defineComponent } from 'vue';
import Color from './components/Color/Color';
import AppHeader from './components/Header/Header';
import { provideService } from './common/inject-helper/helper';
import { ThemeService } from './Theme/theme.service';
import { SearchService } from './Search/search.service';

export default defineComponent(() => {
	provideService(ThemeService);
    provideService(SearchService)

	return () => (
		<div id="app">
			<AppHeader />
			<Color />
		</div>
	);
});
