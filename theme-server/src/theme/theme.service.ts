import { Injectable } from '@nestjs/common';
import { promises } from 'fs';
import { asyncMap, combineURLs } from 'src/common/utils';
const { readdir, readFile } = promises;
const THEME_PATH = './src/theme/static';

@Injectable()
export class ThemeService {
	async feachAll() {
		return await asyncMap(await readdir(THEME_PATH), async (fileName) => ({
			fileName,
			fileData: await readFile(combineURLs(THEME_PATH, fileName), 'utf8'),
		}));
	}
}
