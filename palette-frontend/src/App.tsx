import './App.less';
import { defineComponent } from 'vue';
import Color from './components/Color/Color';
import AppHeader from './components/Header/Header';
import { provideService } from 'vue-injector';
import { ThemeService } from './Theme/theme.service';
import { SearchService } from './Search/search.service';
import { hashService } from './Hash/hash.service';
import { FoundService } from './Found/foud.service';

const initRootService = () => provideService(ThemeService, SearchService, hashService, FoundService);

export default defineComponent({
	setup: () => {
		initRootService();

		return () => (
			<div id="app">
				<AppHeader />
				<Color />
			</div>
		);
	},
});
