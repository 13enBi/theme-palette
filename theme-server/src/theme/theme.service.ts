import { Injectable } from '@nestjs/common';
import { THEME_PATH } from './const';
import { promises } from 'fs';
import { basename, resolve } from 'path';

const { readdir, readFile, writeFile, unlink } = promises;

@Injectable()
export class ThemeService {
	private themes: Map<string, string>;

	constructor() {
		console.time();
		this.initThemes();
		console.timeEnd();
	}

	private async initThemes() {
		this.themes = new Map();

		for (const fileName of await readdir(THEME_PATH)) {
			const fileUrl = resolve(THEME_PATH, fileName);

			this.themes.set(fileUrl, await readFile(fileUrl, 'utf-8'));
		}
	}

	readTheme(fileName: string) {
		return this.themes.get(fileName);
	}

	async writeTheme(fileName: string, fileData: string) {
		await writeFile(fileName, fileData);

		this.themes.set(fileName, fileData);
	}

	feachAll() {
		return [...this.themes.entries()].map(([fileName, fileData]) => ({
			fileName: basename(fileName),
			fileData,
		}));
	}

	async deleteTheme(fileName: string) {
		await unlink(fileName);

		this.themes.delete(fileName);
	}
}
