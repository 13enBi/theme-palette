import Palette from './Palette';
import './style/Color.less';
import { defineComponent } from 'vue';
import { ThemeTypes } from '../../config';
import { ParsePalette } from '../../common/utils/css-parse';
import { ThemeService } from '../../Theme/theme.service';
import { injectService, provideService } from '../../inject-helper';
import { FoundService } from '../../Found/foud.service';

export default defineComponent(() => {
	provideService(FoundService);
	const { now } = injectService(ThemeService);

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
