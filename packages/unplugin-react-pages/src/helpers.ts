import { assignWith, isArray, isObject } from 'lodash-es';

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export function withDefaults<T>(defaults: T, inputs?: DeepPartial<T>) {
  return assignWith(defaults, inputs, (v1, v2) => {
    if (isObject(v1)) {
      return withDefaults(v1, v2);
    }

    return v2 === undefined ? v1 : v2;
  });
}

export function indentLine(line: string, size = 0) {
  return ' '.repeat(size) + line;
}

interface JSXLike {
  tag: string;
  props?: Record<string, string>;
  children?: JSXLike[];
}

export function jsxLikeStringify(jsxLike: JSXLike) {
  const stringify = (jsx: JSXLike): string => {
    const arg1 = jsx.props
      ? `{${Object.entries(jsx.props)
          .map(([key, value]) => `${key}: ${value}`)
          .join(', ')}}`
      : 'null';
    const arg2 = jsx.children ? `, ${jsx.children.map(stringify).join(', ')}` : '';
    return `createElement(${jsx.tag}, ${arg1}${arg2})`;
  };
  return stringify(jsxLike);
}

export function ensureArray(el: string | string[] | undefined) {
  return isArray(el) ? el : el ? [el] : [];
}
