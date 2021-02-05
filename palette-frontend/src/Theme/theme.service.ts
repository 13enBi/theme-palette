import { Singleton } from 'src/common/inject-helper/helper';
import { ThemeItem } from './theme.item';
import { ThemeMap } from './theme.map';

@Singleton()
export class ThemeService {
	now?: ThemeItem;
	themeMap = new ThemeMap();
}
