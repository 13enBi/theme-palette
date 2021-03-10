import Palette from './Palette';
import './style/Color.less';
import { defineComponent } from 'vue';
import { ThemeTypes } from '../../config';
import { ParsePalette } from '../../common/utils/css-parse';
import injectThemeService from '../../Theme/theme.service';

export default defineComponent(() => {
	const { now } = injectThemeService();

	return () => (
		<>
			<div class="color-warp">
				<div class="color">
					{Object.entries(now.value).map(([type, palette]) => (
						<Palette key={type} type={type as ThemeTypes} palette={palette as ParsePalette}></Palette>
					))}
				</div>
			</div>
		</>
	);
});
