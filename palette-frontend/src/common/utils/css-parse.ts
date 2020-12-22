import { ThemeTypes, THEME_TYPES, UsesTypes, USES_TYPES, USES_TYPE_PROP } from '../../config';
import { parse as __parse, ParseFlag, RootNode, RuleNode, stringify as __stringify } from '@13enbi/css-parse';
import { useCache } from '@13enbi/vhooks';

const less = (window as any).less;

export interface ParseItem {
	color: string;
	nightColor?: string;

	uses: Set<UsesTypes>;
	source: string;
	type: ThemeTypes;
	name: string;

	node: RuleNode;
	nightNode?: RuleNode;
	parent: ParseType;
}

export type ParseType = Record<string, ParseItem>;

export type ParseResult = Record<string, ParseType> & { root: RootNode };

const parseCache = useCache();
export const parse = async (input: string) => {
	const cache = parseCache.getCache(input);
	if (cache) return cache;

	console.time('parse');
	const parsed = cssParse(await less2css(input));
	console.timeEnd('parse');

	parseCache.setCache(input, parsed, 'infinity');

	return parsed;
};

const cssParse = (css: string): ParseResult => {
	const root = __parse(css, { comment: false, source: false });

	const ctx: any = {
		root,
	};

	notEnumerable(ctx, 'root');

	for (const node of root.rules) {
		try {
			if (node.type !== ParseFlag.RULES) continue;

			ruleParse(node, ctx);
		} catch (error) {
			console.error('parse error:', error);
			continue;
		}
	}

	return ctx as ParseResult;
};

const removeImport = (input: string) => input.replace(/(@import)/g, '//$1');

const less2css = (input: string): Promise<string> => {
	input = removeImport(input);

	return less.render(input).then(({ css }: { css: string }) => css);
};

const parseName = (node: RuleNode): Pick<ParseItem, 'type' | 'name'> & { uses: UsesTypes } => {
	const split = node.selectors[0]
		?.match(/(\.((\w|-)+))+$/)?.[0]
		.replace(/^(\.|#)/, '')
		.split('-');

	if (!split) throw new Error(`empty name: ${node.selectors}`);

	const [type, uses, name] = split.slice(0, 2).concat(split.slice(2).join('-')) as any[];

	if (THEME_TYPES[type] === void 0) throw new Error(`THEME_TYPES err: ${node.selectors}`);

	return {
		type,
		uses,
		name,
	};
};

const parseColorProp = (node: RuleNode, uses: UsesTypes) => {
	const prop = USES_TYPE_PROP[uses];

	for (const { property, value } of node.declarations) {
		if (property === prop) {
			return value;
		}
	}

	throw new Error(`empty prop: ${node.selectors}`);
};

const nightReg = /(\.black |\.night |\[theme-mode=("|')(black|night)("|')\])/g;
const isNight = (node: RuleNode) => !!node.selectors.join(',').match(nightReg);

const notEnumerable = (obj: object, key: string | symbol | number) =>
	Object.defineProperty(obj, key, {
		enumerable: false,
	});

const ruleParse = (node: RuleNode, ctx: ParseResult = {} as any): ParseItem => {
	const { type, uses, name } = parseName(node);
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
			name,
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

export const createNode = () => {};

export interface ThemeForm {
	type: string;
	name: string;
	color: string;
	nightColor: string;
}
export const create = (form: ThemeForm) => {};
