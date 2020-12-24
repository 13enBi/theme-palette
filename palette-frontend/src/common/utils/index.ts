import { nextTick } from 'vue';
export * from './css-parse';

export const isDev = process.env.NODE_ENV === 'development';
export const isArray = Array.isArray;
export const isObject = (val: unknown): val is object => val !== null && !isArray(val) && typeof val === 'object';

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

export interface FileResult {
	fileName: string;
	fileData: string;
}
export function fileReader(file: File): Promise<FileResult> {
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

export async function fileListReader(fileList: FileList): Promise<FileResult> {
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

export const validateColor = (color: string) => {
	return !!color.match(/(^#(\d|[A-z]){3,6}$)|(^rgba?\(\d{1,3},\d{1,3},\d{1,3}(,\d{1,3})?\)$)/);
};
