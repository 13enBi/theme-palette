export enum THEME_TYPES {
	primary ,
	sub,
	mid,
	other,
}
export type ThemeTypes = 'primary' | 'sub' | 'mid' | 'other';
export enum THEME_TYPES_TEXT {
	primary = '主题色',
	sub = '辅助色',
	mid = '中性色',
	other = '其他色',
}

export enum USES_TYPES {
	text,
	bg,
	bd,
}
export enum USES_TYPE_PROP {
	text = 'color',
	bd = 'border-color',
	bg = 'background-color',
}
export type UsesTypes = 'text' | 'bg' | 'bd';
export const USES = ['text', 'bg', 'bd'];
