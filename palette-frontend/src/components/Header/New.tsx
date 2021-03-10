import { defineComponent } from 'vue';
import './style/New.less';
import injectThemeService from '../../Theme/theme.service';

export default defineComponent(() => {
	const { addPalette } = injectThemeService();

	return () => (
		<>
			<div class="color-palette-add" onClick={addPalette}>
				<span>
					新增 <i class="el-icon-plus"></i>
				</span>
			</div>
		</>
	);
});
