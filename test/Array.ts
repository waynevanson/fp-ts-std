import {
    length, elemFlipped, any, all, join, pluckFirst, upsert, getDisorderedEq, insertMany,
} from '../src/Array';
import * as O from 'fp-ts/Option';
import * as A from 'fp-ts/Array';
import { contramap as eqContramap, eqNumber } from 'fp-ts/Eq';
import { contramap as ordContramap, ordNumber } from 'fp-ts/Ord';
import { flow, pipe, Predicate } from 'fp-ts/function';
import fc from 'fast-check';
import { fold, monoidSum } from 'fp-ts/Monoid';
import { split } from '../src/String';
import { NonEmptyArray } from 'fp-ts/NonEmptyArray';

describe('Array', () => {
    describe('length', () => {
        const f = length;

        it('returns length of array', () => {
            expect(f([])).toBe(0);
            expect(f([1, 2, 3])).toBe(3);
        });

        it('returned value is always non-negative', () => {
            fc.assert(fc.property(
                fc.array(fc.anything()),
                xs => f(xs) >= 0,
            ));
        });
    });

    describe('elemFlipped', () => {
        const f = elemFlipped(eqNumber);

        it('finds the element', () => {
            expect(f([])(0)).toBe(false);
            expect(f([1, 2, 3])(2)).toBe(true);
            expect(f([1, 2, 3])(4)).toBe(false);
        });
    });

    describe('any', () => {
        const f = any<number>(n => n === 5);

        it('returns false for empty input array', () => {
            expect(f([])).toBe(false);
        });

        it('returns true if any predicate succeeds', () => {
            expect(f([5])).toBe(true);
            expect(f([3, 5])).toBe(true);
            expect(f([5, 3])).toBe(true);
            expect(f([5, 5])).toBe(true);
        });

        it('returns false if all predicates fail', () => {
            expect(f([3])).toBe(false);
            expect(f([3, 3])).toBe(false);
        });
    });

    describe('all', () => {
        const f = all<number>(n => n === 5);

        it('returns true for empty input array', () => {
            expect(f([])).toBe(true);
        });

        it('returns true if all predicates succeed', () => {
            expect(f([5])).toBe(true);
            expect(f([5, 5])).toBe(true);
        });

        it('returns false if any predicates fail', () => {
            expect(f([3])).toBe(false);
            expect(f([3, 3])).toBe(false);
            expect(f([3, 5])).toBe(false);
            expect(f([5, 3])).toBe(false);
        });
    });

    describe('join', () => {
        const delim = ',';
        const f = join(delim);

        it('joins', () => {
            expect(f([])).toBe('');
            expect(f(['x'])).toBe('x');
            expect(f(['x', 'yz'])).toBe('x,yz');

            fc.assert(fc.property(
                fc.array(fc.string()),
                xs => {
                    const countDelims = flow(
                        split(''),
                        A.filter(c => c === delim),
                        length,
                    );

                    const countDelimsA = flow(
                        A.map(countDelims),
                        fold(monoidSum),
                    );

                    return countDelims(f(xs)) === countDelimsA(xs) + Math.max(0, xs.length - 1);
                },
            ))
        });
    });

    describe('pluckFirst', () => {
        const p: Predicate<number> = x => x % 2 === 1;
        const f = pluckFirst(p);

        it('finds the item', () => {
            expect(f([2, 3, 4])).toEqual([O.some(3), [2, 4]]);
        });

        it('does not "find" an incorrect item', () => {
            expect(f([2, 4, 6])).toEqual([O.none, [2, 4, 6]]);
        });

        it('removes only the first, left-most match', () => {
            expect(f([2, 3, 4, 5])).toEqual([O.some(3), [2, 4, 5]]);
        });

        it('does not mutate input', () => {
            const xs = [2, 3, 4];
            // eslint-disable-next-line functional/no-expression-statement
            f(xs);
            expect(xs).toEqual([2, 3, 4]);
        });
    });

    describe('upsert', () => {
        type Thing = { id: number; name: string };
        const eqThing = eqContramap<number, Thing>(x => x.id)(eqNumber);

        const x1: Thing = { id: 1, name: 'x' };
        const x2: Thing = { id: 1, name: 'x2' };
        const y: Thing = { id: 2, name: 'y' };
        const z: Thing = { id: 3, name: 'z' };

        const f = upsert;
        const g = f(eqThing)(x2);

        it('appends non-present item', () => {
            expect(g([])).toEqual([x2]);
            expect(g([y, z])).toEqual([y, z, x2]);
        });

        it('updates present item in-place', () => {
            expect(g([x1, y])).toEqual([x2, y]);
            expect(g([y, x1])).toEqual([y, x2]);
        });

        it('does not mutate input', () => {
            const xs = [{ ...x1 }];
            // eslint-disable-next-line functional/no-expression-statement
            g(xs);
            expect(xs).toEqual([{ ...x1 }]);
        });

        it('always returns a non-empty array', () => {
            fc.assert(fc.property(
                fc.array(fc.integer()), fc.integer(),
                (xs, y) => !!f(eqNumber)(y)(xs).length,
            ));
        });
    });

    describe('getDisorderedEq', () => {
        type Thing = { id: number; name: string };
        const ordThing = ordContramap<number, Thing>(x => x.id)(ordNumber);

        const y: Thing = { id: 1, name: 'x' };
        const z: Thing = { id: 2, name: 'y' };
        const zAlt: Thing = { id: 2, name: 'changed' };

        const f = getDisorderedEq(ordThing).equals;

        it('its equality using Eq', () => {
            expect(f([], [])).toBe(true);
            expect(f([y], [y])).toBe(true);
            expect(f([z], [zAlt])).toBe(true);
            expect(f([y, z], [y, z])).toBe(true);
            expect(f([y, y], [y, z])).toBe(false);
            expect(f([y, y], [y])).toBe(false);
        });

        it('disregards initial indices', () => {
            expect(f([y, z], [z, y])).toBe(true);
        });
    });

    describe('insertMany', () => {
        const f = insertMany;
        const g = f(1)(['a', 'b']);

        it('returns None if index is out of bounds', () => {
            expect(g([])).toEqual(O.none);
        });

        it('returns updated array wrapped in Some if index is okay', () => {
            expect(f(0)(['x'])([])).toEqual(O.some(['x']));
            expect(g(['x'])).toEqual(O.some(['x', 'a', 'b']));
            expect(g(['x', 'y'])).toEqual(O.some(['x', 'a', 'b', 'y']));

            fc.assert(fc.property(
                fc.array(fc.anything(), 1, 5) as fc.Arbitrary<NonEmptyArray<unknown>>, fc.integer(0, 10),
                (xs, i) => O.isSome(f(i)(xs)(xs)) === i <= xs.length,
            ));

            fc.assert(fc.property(
                fc.array(fc.string(), 1, 20),
                xs => expect(pipe(g(xs), O.map(length))).toEqual(O.some(xs.length + 2)),
            ));
        });

        it('does not mutate input', () => {
            const xs: NonEmptyArray<number> = [1, 2, 3];
            const ys: NonEmptyArray<number> = [4, 5];
            const zs = f(1)(ys)(xs);

            expect(xs).toEqual([1, 2, 3]);
            expect(ys).toEqual([4, 5]);
            expect(zs).toEqual(O.some([1, 4, 5, 2, 3]));
        });
    });
});

