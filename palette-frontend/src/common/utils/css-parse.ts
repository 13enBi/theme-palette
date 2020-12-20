import {
	parse as __parse,
	ParseFlag,
	ParseNode,
	RootNode,
	RuleNode,
	stringify as __stringify,
} from '@13enbi/css-parse';
import { useCache } from '@13enbi/vhooks';

const less = (window as any).less;

export enum ThemeType {
	primary = 1,
	sub,
	mid,
	other,
}

export type UseType = 'text' | 'bg' | 'bd';
const useType = ['bg', 'bd', 'text'];

type ColorType = 'primary' | 'sub' | 'mid' | 'other';
const colorType = ['primary', 'sub', 'mid', 'other'];

export enum ColorProp {
	text = 'color',
	bd = 'border-color',
	bg = 'background-color',
}

const removeImport = (input: string): string => input.replace(/(@import)/g, '//$1');

const less2css = (input: string): Promise<string> => {
	input = removeImport(input);

	return less.render(input).then(({ css }: { css: string }) => css);
};

const parseName = (node: RuleNode) => {
	const split = node.selectors[0]
		?.match(/(\.((\w|-)+))+$/)?.[0]
		.replace(/^(\.|#)/, '')
		.split('-');

	if (!split) throw new Error('empty class');

	const result = split.slice(0, 2).concat(split.slice(2).join('-')) as [ColorTheme.ColorType, UseType, string];

	if (!ThemeType[result[0]]) throw new Error('');

	return result;
};

const parseColorProp = (node: RuleNode, use: UseType) => {
	const prop = ColorProp[use];

	for (const { property, value } of node.declarations) {
		if (property === prop) {
			return value;
		}
	}

	throw new Error('');
};

const nightReg = /(\.black |\.night |\[theme-mode=("|')(black|night)("|')\])/g;
const isNight = (node: RuleNode) => !!node.selectors.join(',').match(nightReg);

const notEnumerable = (obj: object, key: string | symbol | number) =>
	Object.defineProperty(obj, key, {
		enumerable: false,
	});

export interface ParseItme {
	color: string;
	nightColor?: string;

	class: Set<string>;
	searchstr: string;
	type: string;
	colorName: string;

	node: RuleNode;
	nightNode?: RuleNode;
	parent: ParseType;
}

export type ParseType = Record<string, ParseItme>;

export type ParseResult = Record<string, ParseType> & { root: RootNode };

const cssParseItem = (node: ParseNode, ctx: ParseResult = {} as any) => {
	if (node.type !== ParseFlag.RULES) return;

	const [type, use, name] = parseName(node);
	const value = parseColorProp(node, use);

	if (!ctx[type]) {
		ctx[type] = Object.create(null);
	}

	const parent = ctx[type];

	if (!parent[name]) {
		parent[name] = {
			color: '',
			class: new Set([]),
			searchstr: node.loc.source,
			type,
			colorName: name,
			parent,
			node,
		};
	}

	const result = ctx[type][name];

	const night = isNight(node);

	result[night ? 'nightColor' : 'color'] = value;
	result[night ? 'nightNode' : 'node'] = node;
	result.class?.add(use);
	result.searchstr += name;

	return result;
};

const cssParse = (css: string): ParseResult => {
	const root = __parse(css, { comment: false, source: false });

	const cssParseResult: any = {
		root,
	};

	notEnumerable(cssParseResult, 'root');

	for (const node of root.rules) {
		try {
			if (node.type !== ParseFlag.RULES) continue;
			const [type, use, name] = parseName(node);
			const value = parseColorProp(node, use);

			

			cssParseItem(node, cssParseResult);
		} catch (error) {
			continue;
		}
	}

	return cssParseResult as ParseResult;
};

const parseCache = useCache();
export const parse = async (input: string) => {
	const cache = parseCache.getCache(input);
	if (cache) return cache;

	console.time('parse');
	const parse = cssParse(await less2css(input));
	console.timeEnd('parse');

	parseCache.setCache(input, parse, 'infinity');

	return parse;
};

// export type PatchType = 'name' | 'color' | 'nightColor';
// const patch = (node: ParseItme, type: PatchType, value: string) => {
// 	switch (type) {
// 		case 'name':
// 			return patchName(node, value);

// 		case 'color':
// 			return patchColor(node, value);

// 		case 'nightColor':
// 			return patchColor(node, value, true);

// 		default:
// 			throw new Error('');
// 	}
// };

interface ThemeItem {
	color: string;
	nightColor: string;
	name: string;
	type: string;
}

export const create = ({ color, nightColor, name, type }: ThemeItem): ParseItme => {
	const css = useType.reduce((str, use) => {
		const selc = `${type}-${use}-${name}`,
			prop = `${useType[use as any]}`;

		return (
			str +
			`${selc} {
		${prop}: ${color}
	}
	
	[theme-mode='black'] ${selc} {
		${prop}: ${nightColor}
	}
	`
		);
	}, '');

	const node = __parse(css).rules[0];

	return cssParseItem(node) as ParseItme;
};

const patchName = (item: ParseItme, name: string) => {
	const node = item.node,
		nitghtNode = item.nightNode;

	item.colorName = name;
};

const patchColor = (node: ParseItme, value: string, night = false) => {};

const stringify = (result: ParseResult) => __stringify(result.root);
