---
title: Boolean.ts
nav_order: 2
parent: Modules
---

## Boolean overview

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [allPass](#allpass)
  - [and](#and)
  - [anyPass](#anypass)
  - [both](#both)
  - [either](#either)
  - [invert](#invert)
  - [or](#or)
  - [xor](#xor)

---

# utils

## allPass

Given an array of predicates, returns a predicate that returns true if the
argument passes all of the predicates.

**Signature**

```ts
export declare const allPass: <A>(fs: Predicate<A>[]) => Predicate<A>
```

Added in v0.4.0

## and

Returns `true` if both arguments are `true`, else `false`. Equivalent to
logical conjunction.

**Signature**

```ts
export declare const and: (x: boolean) => Endomorphism<boolean>
```

Added in v0.4.0

## anyPass

Given an array of predicates, returns a predicate that returns true if the
argument passes any of the predicates.

**Signature**

```ts
export declare const anyPass: <A>(fs: Predicate<A>[]) => Predicate<A>
```

Added in v0.4.0

## both

Combine two predicates under conjunction.

**Signature**

```ts
export declare const both: <A>(f: Predicate<A>) => Endomorphism<Predicate<A>>
```

**Example**

```ts
import { both } from 'fp-ts-std/Boolean'
import { Predicate } from 'fp-ts/function'

const gt5: Predicate<number> = (x) => x > 5
const lt10: Predicate<number> = (x) => x < 10
const gt5AndLt10: Predicate<number> = both(gt5)(lt10)

assert.strictEqual(gt5AndLt10(3), false)
assert.strictEqual(gt5AndLt10(8), true)
assert.strictEqual(gt5AndLt10(12), false)
```

Added in v0.5.0

## either

Combine two predicates under disjunction.

**Signature**

```ts
export declare const either: <A>(f: Predicate<A>) => Endomorphism<Predicate<A>>
```

**Example**

```ts
import { either } from 'fp-ts-std/Boolean'
import { Predicate } from 'fp-ts/function'

const lt5: Predicate<number> = (x) => x < 5
const gt10: Predicate<number> = (x) => x > 10
const lt5OrGt10: Predicate<number> = either(lt5)(gt10)

assert.strictEqual(lt5OrGt10(3), true)
assert.strictEqual(lt5OrGt10(8), false)
assert.strictEqual(lt5OrGt10(12), true)
```

Added in v0.5.0

## invert

Invert a boolean.

**Signature**

```ts
export declare const invert: Endomorphism<boolean>
```

Added in v0.4.0

## or

Returns `true` if one or both arguments are `true`, else `false`. Equivalent
to logical disjunction.

**Signature**

```ts
export declare const or: (x: boolean) => Endomorphism<boolean>
```

Added in v0.4.0

## xor

Returns `true` if one argument is `true` and the other is `false`, else
`false`. Equivalent to exclusive logical disjunction.

**Signature**

```ts
export declare const xor: (x: boolean) => Endomorphism<boolean>
```

Added in v0.4.0
