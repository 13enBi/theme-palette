import { useState } from '@13enbi/vhooks';
import Palette from './Palette';
import { defineComponent } from 'vue';
import { ThemeTypes } from '../../config';
import { ParsePalette } from '../../common/utils/css-parse';
import './Color.less';

export default defineComponent(() => {
	const { nowTheme } = useState(['nowTheme']);

	return () => (
		<>
			<div class="color-warp">
				<div class="color">
					{Object.entries(nowTheme.value || {}).map(([type, palette]) => {
						return (
							<>
								<Palette
									key={type}
									type={type as ThemeTypes}
									palette={palette as ParsePalette}
								></Palette>
							</>
						);
					})}
				</div>
			</div>
		</>
	);
});
