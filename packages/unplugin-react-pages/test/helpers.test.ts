import { jsxLikeStringify, withDefaults } from '../src/helpers';

test('jsxLikeStringify', () => {
    expect(
        jsxLikeStringify({
            tag: 'div',
            props: {
                className: 'foo',
            },
        }),
    ).toMatchInlineSnapshot(`"createElement(div, {className: foo})"`);
    expect(
        jsxLikeStringify({
            tag: 'div',
            props: {
                className: '"foo"',
            },
        }),
    ).toMatchInlineSnapshot(`"createElement(div, {className: "foo"})"`);
    expect(
        jsxLikeStringify({
            tag: 'div',
            props: {
                className: '"foo"',
                id: 'aa',
            },
            children: [
                {
                    tag: 'span',
                },
            ],
        }),
    ).toMatchInlineSnapshot(`"createElement(div, {className: "foo", id: aa}, createElement(span, null))"`);
});

test('withDefaults', () => {
    expect(
        withDefaults(
            {
                a: 1,
                b: 2,
                c: { d: 1, e: 2 },
            },
            {
                a: 3,
                b: undefined,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                c: { d: undefined, e: 4 },
            },
        ),
    ).toEqual({
        a: 3,
        b: 2,
        c: {
            d: 1,
            e: 4,
        },
    });
});
