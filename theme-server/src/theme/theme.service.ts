import { Injectable } from '@nestjs/common';
import { THEME_PATH } from './const';
import { promises } from 'fs';

const { readdir, readFile, writeFile, unlink } = promises;

@Injectable()
export class ThemeService {
	async readTheme(fileName: string) {
		return await readFile(fileName, 'utf-8');
	}

	async writeTheme(fileName: string, fileData: string) {
		await writeFile(fileName, fileData);
	}

	async getAllThemesName() {
		return await readdir(THEME_PATH);
	}

	async deleteTheme(fileName: string) {
		await unlink(fileName);
	}
}
