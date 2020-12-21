export enum THEME_TYPES {
	primary = 1,
	sub,
	mid,
	other,
}
export type ThemeTypes = 'primary' | 'sub' | 'mid' | 'other';
//export const ThemeTypesArr = ['primary', 'sub', 'mid', 'other'];

export enum USE_TYPES {
	text,
	bg,
	bd,
}
export enum USE_TYPE_PROP {
	text = 'color',
	bd = 'border-color',
	bg = 'background-color',
}
export type UseTypes = 'text' | 'bg' | 'bd';
