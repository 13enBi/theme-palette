import './App.less';
import { defineComponent } from 'vue';
import Color from './components/Color/Color';
import AppHeader from './components/Header/Header';
import { provideService } from './inject-helper';
import { ThemeService } from './Theme/theme.service';
import { SearchService } from './Search/search.service';
import { FoundService } from './Found/foud.service';

export default defineComponent(() => {
	provideService(ThemeService);
	provideService(SearchService);
	provideService(FoundService);

	return () => (
		<div id="app">
			<AppHeader />
			<Color />
		</div>
	);
});
