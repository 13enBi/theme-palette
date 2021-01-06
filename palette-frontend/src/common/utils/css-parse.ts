import { NIGHT_PREFIX, NIGHT_REGEXP, ThemeTypes, THEME_TYPES, USES, UsesTypes, USES_TYPE_PROP } from '../../config';
import { parse as __parse, ParseFlag, RootNode, RuleNode, stringify as __stringify } from '@13enbi/css-parse';
import { useCache } from '@13enbi/vhooks';
import { message } from 'ant-design-vue';

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
	parent: ParsePalette;
}

export type ParsePalette = Record<string, ParseItem>;

export type ParseResult = Record<string, ParsePalette> & { root: RootNode };

const parseCache = useCache();
export const parse = async (input: string): Promise<ParseResult> => {
	try {
		const cache = parseCache.getCache(input);
		if (cache) return cache;

		console.time('parse');
		const parsed = cssParse(await less2css(input));
		console.timeEnd('parse');

		parseCache.setCache(input, parsed, 1e3 * 60 * 5);

		return parsed;
	} catch (error) {
		message.error(`样式解析报错,详情见控制台： ${error}, `);
		console.error(error);
		return {} as any;
	}
};

const cssParse = (css: string): ParseResult => {
	const root = __parse(css, { comment: false, source: false });

	const ctx: any = {
		root,
	};

	nonEnumerable(ctx, 'root');

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

const ruleParse = (node: RuleNode, ctx: ParseResult): ParseItem => {
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

const isNight = (node: RuleNode) => !!node.selectors.join(',').match(NIGHT_REGEXP);

const nonEnumerable = (obj: object, key: string | symbol | number) =>
	Object.defineProperty(obj, key, {
		enumerable: false,
	});

export interface ThemeForm {
	type: string;
	name: string;
	color: string;
	nightColor: string;
}

const createNode = ({ type, name, color, nightColor }: ThemeForm) => {
	const createCss = (uses: UsesTypes, night = false) => {
		return `${night ? `${NIGHT_PREFIX} ` : ''}.${type}-${uses}-${name} {
			${USES_TYPE_PROP[uses]}: ${night ? nightColor : color}
		}`;
	};

	const css = USES.reduce((str, uses: UsesTypes) => {
		return str + createCss(uses) + '\n' + createCss(uses, true);
	}, '');

	return cssParse(css);
};

export const merge = (form: ThemeForm, parsed: ParseResult): ParseResult => {
	const node = createNode(form);

	Object.entries(node).forEach(([k, v]) => {
		parsed[k] = { ...parsed[k], ...v };
	});

	parsed.root = { ...parsed.root, ...node.root };

	return parsed;
};


//TODO: patch remove 
