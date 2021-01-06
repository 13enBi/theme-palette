import { useState } from '@13enbi/vhooks';
import Palette from './Palette';
import { defineComponent } from 'vue';
import { ThemeTypes } from '../../config';
import { ParsePalette } from '../../common/utils/css-parse';
import './style/Color.less';

export default defineComponent(() => {
	const { now } = useState(['now']);

	return () => (
		<>
			<div class="color-warp">
				<div class="color">
					{Object.entries(now.value || {}).map(([type, palette]) => (
						<Palette key={type} type={type as ThemeTypes} palette={palette as ParsePalette}></Palette>
					))}
				</div>
			</div>
		</>
	);
});
