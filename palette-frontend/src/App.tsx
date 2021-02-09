import './App.less';
import { defineComponent } from 'vue';
import Color from './components/Color/Color';
import AppHeader from './components/Header/Header';
import { provideService } from './common/inject-helper/helper';
import { ThemeService } from './Theme/theme.service';

export default defineComponent(() => {
	provideService(ThemeService);

	return () => (
		<div id="app">
			<AppHeader />
			<Color />
		</div>
	);
});
