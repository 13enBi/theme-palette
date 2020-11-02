declare namespace ColorTheme {
	interface FileResult {
		fileName: string;
		fileData: string;
	}

	type ColorType = 'primary' | 'sub' | 'mid' | 'other';

	interface ColorItem {
		color: string;
		nightColor?: string;
		class?: Set<string>;
		searchstr: string;
		type: ColorType;
		colorName: string;
	}

	type ColorPalette = Record<string, ColorItem>;

	type CssParseResult = Record<ColorType, ColorPalette>;
}
