---
title: String.ts
nav_order: 11
parent: Modules
---

## String overview

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [append](#append)
  - [concat](#concat)
  - [contains](#contains)
  - [endsWith](#endswith)
  - [fromNumber](#fromnumber)
  - [isEmpty](#isempty)
  - [isString](#isstring)
  - [length](#length)
  - [lines](#lines)
  - [match](#match)
  - [matchAll](#matchall)
  - [prepend](#prepend)
  - [reverse](#reverse)
  - [split](#split)
  - [startsWith](#startswith)
  - [surround](#surround)
  - [takeLeft](#takeleft)
  - [takeRight](#takeright)
  - [test](#test)
  - [trim](#trim)
  - [trimLeft](#trimleft)
  - [trimRight](#trimright)
  - [unappend](#unappend)
  - [unlines](#unlines)
  - [unprepend](#unprepend)
  - [unsurround](#unsurround)

---

# utils

## append

Append one string to another.

**Signature**

```ts
export declare const append: (appended: string) => (rest: string) => string
```

Added in v0.1.0

## concat

Concatenate two strings together.

**Signature**

```ts
export declare const concat: (x: string) => Endomorphism<string>
```

Added in v0.1.0

## contains

Check if a string contains a given substring.

**Signature**

```ts
export declare const contains: (substring: string) => Predicate<string>
```

Added in v0.1.0

## endsWith

Check if a string ends with the specified substring.

**Signature**

```ts
export declare const endsWith: (substring: string) => Predicate<string>
```

Added in v0.3.0

## fromNumber

Convert a number to a string.

**Signature**

```ts
export declare const fromNumber: (x: number) => string
```

Added in v0.1.0

## isEmpty

Check if a string is empty.

**Signature**

```ts
export declare const isEmpty: Predicate<string>
```

Added in v0.1.0

## isString

Refine a foreign value to a string.

**Signature**

```ts
export declare const isString: Refinement<unknown, string>
```

Added in v0.1.0

## length

Get the length of a string.

**Signature**

```ts
export declare const length: (x: string) => number
```

Added in v0.1.0

## lines

Split a string into substrings using any recognised newline as the separator.

**Signature**

```ts
export declare const lines: (target: string) => string[]
```

Added in v0.1.0

## match

Functional wrapper around `String.prototype.match`.

**Signature**

```ts
export declare const match: (r: RegExp) => (x: string) => Option<RegExpMatchArray>
```

Added in v0.1.0

## matchAll

A functional wrapper around `String.prototype.matchAll`.

If the provided `RegExp` is non-global, the function will return `None`.

**Signature**

```ts
export declare const matchAll: (r: RegExp) => (x: string) => Option<NonEmptyArray<RegExpMatchArray>>
```

Added in v0.5.0

## prepend

Prepend one string to another.

**Signature**

```ts
export declare const prepend: (prepended: string) => (rest: string) => string
```

Added in v0.1.0

## reverse

Reverse a string.

**Signature**

```ts
export declare const reverse: Endomorphism<string>
```

**Example**

```ts
import { reverse } from 'fp-ts-std/String'

assert.strictEqual(reverse('abc'), 'cba')
```

Added in v0.3.0

## split

Split a string into substrings using the specified separator and return them
as an array.

**Signature**

```ts
export declare const split: (on: string | RegExp) => (target: string) => string[]
```

Added in v0.1.0

## startsWith

Check if a string starts with the specified substring.

**Signature**

```ts
export declare const startsWith: (substring: string) => Predicate<string>
```

Added in v0.3.0

## surround

Surround a string. Equivalent to calling `prepend` and `append` with the
same outer value.

**Signature**

```ts
export declare const surround: (x: string) => Endomorphism<string>
```

Added in v0.1.0

## takeLeft

Keep the specified number of characters from the start of a string.

If `n` is larger than the available number of characters, the string will
be returned whole.

If `n` is not a positive number, an empty string will be returned.

If `n` is a float, it will be rounded down to the nearest integer.

**Signature**

```ts
export declare const takeLeft: (n: number) => Endomorphism<string>
```

Added in v0.3.0

## takeRight

Keep the specified number of characters from the end of a string.

If `n` is larger than the available number of characters, the string will
be returned whole.

If `n` is not a positive number, an empty string will be returned.

If `n` is a float, it will be rounded down to the nearest integer.

**Signature**

```ts
export declare const takeRight: (n: number) => Endomorphism<string>
```

Added in v0.3.0

## test

A functional wraper around `RegExp.prototype.test`.

**Signature**

```ts
export declare const test: (r: RegExp) => Predicate<string>
```

Added in v0.1.0

## trim

Trim both sides of a string.

**Signature**

```ts
export declare const trim: Endomorphism<string>
```

Added in v0.1.0

## trimLeft

Trim the left side of a string.

**Signature**

```ts
export declare const trimLeft: Endomorphism<string>
```

Added in v0.1.0

## trimRight

Trim the right side of a string.

**Signature**

```ts
export declare const trimRight: Endomorphism<string>
```

Added in v0.1.0

## unappend

Remove the end of a string, if it exists.

**Signature**

```ts
export declare const unappend: (end: string) => (val: string) => string
```

Added in v0.1.0

## unlines

Join newline-separated strings together.

**Signature**

```ts
export declare const unlines: (ys: string[]) => string
```

Added in v0.1.0

## unprepend

Remove the beginning of a string, if it exists.

**Signature**

```ts
export declare const unprepend: (start: string) => (val: string) => string
```

Added in v0.1.0

## unsurround

Remove the start and end of a string, if they both exist.

**Signature**

```ts
export declare const unsurround: (x: string) => Endomorphism<string>
```

Added in v0.1.0
