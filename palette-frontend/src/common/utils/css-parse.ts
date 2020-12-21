import { THEME_TYPES, UseTypes, USE_TYPES, USE_TYPE_PROP } from '../../config';
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

	const result = split.slice(0, 2).concat(split.slice(2).join('-')) as [ColorTheme.ColorType, UseTypes, string];

	if (!THEME_TYPES[result[0]]) throw new Error('');

	return result;
};

const parseColorProp = (node: RuleNode, uses: UseTypes) => {
	const prop = USE_TYPE_PROP[uses];

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

	uses: Set<string>;
	source: string;
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

	const [type, uses, name] = parseName(node);
	const value = parseColorProp(node, uses);

	if (!ctx[type]) {
		ctx[type] = Object.create(null);
	}

	const parent = ctx[type];

	if (!parent[name]) {
		parent[name] = {
			color: '',
			uses: new Set([]),
			source: node.loc.source,
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
	result.uses?.add(uses);
	result.source += name;

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
			const [type, uses, name] = parseName(node);
			const value = parseColorProp(node, uses);

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

interface ThemeItem {
	color: string;
	nightColor: string;
	name: string;
	type: string;
}

// export const create = ({ color, nightColor, name, type }: ThemeItem): ParseItme => {
// 	const css = Array.from(USE_TYPES).reduce((str, uses) => {
// 		const selc = `${type}-${uses}-${name}`,
// 			prop = `${useType[uses as any]}`;

// 		return (
// 			str +
// 			`${selc} {
// 		${prop}: ${color}
// 	}
	
// 	[theme-mode='black'] ${selc} {
// 		${prop}: ${nightColor}
// 	}
// 	`
// 		);
// 	}, '');

// 	const node = __parse(css).rules[0];

// 	return cssParseItem(node) as ParseItme;
// };
