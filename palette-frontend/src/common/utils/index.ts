import { useCache } from '@13enbi/vhooks';
import { nextTick } from 'vue';
const less = (window as any).less;

export function deleteLessImport(input: string): string {
	return input.replace(/@import.+/g, '');
}

export async function lessRender(input: string): Promise<string> {
	input = deleteLessImport(input);
	return await less.render(input, { compress: true }).then(({ css }: { css: string }) => css.replace(/\n/g, ''));
}

function getColorName(cssItem: string): [ColorTheme.ColorType, string, string] {
	const colorNameReg = /(\.((\w|-)+))+$/;
	const nameMatch = cssItem.split('{')[0].trim().match(colorNameReg);

	if (nameMatch === null) throw Error('empty class name');

	const result = nameMatch[0]
		.replace(/^\./, '')
		.split('-')
		.reduce(
			(total: string[], cur, index) => {
				if (index < 2) {
					total[index] = cur;
				} else {
					total[2] += cur;
				}
				return total;
			},
			['', '', ''],
		) as [ColorTheme.ColorType, string, string];

	if (!result.join('') || !['primary', 'sub', 'mid', 'other'].includes(result[0])) {
		throw Error('empty class name');
	}

	return result;
}

function getColorValue(cssItem: string): string {
	const colorValueReg = /#.{3,6}/;

	const colorMatch = cssItem.split('{')[1].trim().match(colorValueReg);

	if (colorMatch === null) throw Error('empty color value or not hex value');

	return colorMatch[0].toLowerCase();
}

function isNight(cssItem: string): boolean {
	const reg = /^(\.black |\.night |\[theme-mode=("|')(black|night)("|')\])/;
	return cssItem.match(reg) !== null;
}

export function cssParse(css: string): ColorTheme.CssParseResult {
	const cssParseResult: Record<ColorTheme.ColorType, any> = {
		primary: {},
		sub: {},
		mid: {},
		other: {},
	};
	const cssList = css.split('}').filter((c) => c !== '');

	for (const cssItem of cssList) {
		try {
			const [type, use, colorName] = getColorName(cssItem);
			const colorValue = getColorValue(cssItem);

			cssParseResult[type][colorName] ||
				(cssParseResult[type][colorName] = {
					color: '',
					class: new Set([]),
					searchstr: cssItem,
					type,
					colorName,
				});

			const result = cssParseResult[type][colorName];

			result[isNight(cssItem) ? 'nightColor' : 'color'] = colorValue;

			result.class?.add(use);
			result.searchstr += cssItem;
		} catch (e) {
			continue;
		}
	}

	return cssParseResult;
}

const parseCache = useCache();
export async function lessParse(less: string) {
	const cache = parseCache.getCache(less);
	if (cache) return cache;

	const parse = cssParse(await lessRender(less));

	return parseCache.setCache(less, parse, 0), parse;
}

export function isMoreThanDDD(color: string): boolean {
	const colorArr = Array.from(color);
	const first = colorArr.shift();

	if (first !== '#') return false;

	color = colorArr.join('');
	if (colorArr.length === 3) {
		color += color;
	}

	return parseInt(color, 16) >= 14540253 /*parseInt('dddddd',16)*/;
}

export function clipboardWrite(text: string): void {
	if (navigator.clipboard) {
		navigator.clipboard.writeText(text);
	} else {
		const input = document.createElement('input');
		input.value = text;
		Object.assign(input.style, { postion: 'fixed', top: '-999px' });

		document.body.appendChild(input);

		input.select();

		document.execCommand('copy');

		document.body.removeChild(input);
	}
}

export function clipboardRead(): Promise<string> {
	return navigator.clipboard?.readText();
}

export function downLoadFile(fileName: string, content: any): void {
	const aTag = document.createElement('a');
	const blob = new Blob([content]);
	const url = URL.createObjectURL(blob);

	aTag.download = fileName;
	aTag.style.display = 'none';
	aTag.href = url;
	document.body.appendChild(aTag);
	aTag.click();

	requestAnimationFrame(() => {
		document.body.removeChild(aTag);
		window.URL.revokeObjectURL(url);
	});
}

export function fileReader(file: File): Promise<ColorTheme.FileResult> {
	return new Promise((resove, reject) => {
		const reader = new FileReader();

		reader.readAsText(file);

		reader.onload = () => {
			const fileData = reader.result as string;

			fileData ? resove({ fileData, fileName: file.name }) : reject('empty data');
		};

		reader.onerror = () => {
			reject(reader.error);
		};
	});
}

export async function fileListReader(fileList: FileList): Promise<ColorTheme.FileResult> {
	let fileData = '';
	const fileName = fileList[0].name;
	for (const file of fileList) {
		try {
			fileData += (await fileReader(file)).fileData;
		} catch (e) {
			continue;
		}
	}
	return { fileData, fileName };
}

export async function scrollInView(el: HTMLElement | Element | null) {
	await nextTick();
	el?.scrollIntoView({ block: 'center', behavior: 'smooth' });
}
